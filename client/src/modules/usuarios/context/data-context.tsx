"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getDataPaginada } from '../action/usuario.actions';
import { PaginatedData } from '@/components/table/table';

interface DataContextType<T> {
  data: PaginatedData<T>;
  isLoading: boolean;
  error: string | null;
  refreshData: (page?: number, pageSize?: number) => Promise<void>;
  setData: (data: PaginatedData<T>) => void;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  tableName: string;
  // Métodos optimizados simplificados
  refreshCurrentPage: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

interface DataProviderProps<T> {
  children: React.ReactNode;
  tableName: string;
  initialPageSize?: number;
}

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export function DataProvider<T>({ 
  children, 
  tableName, 
  initialPageSize = 10 
}: DataProviderProps<T>) {
  const [data, setData] = useState<PaginatedData<T>>({
    data: [],
    total: 0,
    page: 0,
    size: initialPageSize,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const fetchData = useCallback(async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Iniciando carga de ${tableName}...`, { page, pageSize });
      
      const result = await getDataPaginada(page, pageSize, tableName);
      console.log(`Resultado de la API para ${tableName}:`, result);
      
      if (result.success) {
        console.log(`Datos recibidos para ${tableName}:`, result.data);
        setData(result.data);
        setPagination({
          page: result.data.page,
          pageSize: result.data.size,
          total: result.data.total,
          totalPages: result.data.totalPages,
        });
      } else {
        console.error(`Error en la respuesta para ${tableName}:`, result.message);
        setError(result.message || `Error al cargar ${tableName}`);
      }
    } catch (err) {
      console.error(`Error loading ${tableName}:`, err);
      setError(`Error al cargar ${tableName}`);
    } finally {
      setIsLoading(false);
    }
  }, [tableName]);

  const refreshData = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchData(currentPage, currentPageSize);
  }, [fetchData, pagination.page, pagination.pageSize]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchData(pagination.page, pagination.pageSize);
  }, [fetchData, pagination.page, pagination.pageSize]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    console.log(`Forzando refresh de ${tableName}...`);
    await fetchData(pagination.page, pagination.pageSize);
  }, [fetchData, pagination.page, pagination.pageSize, tableName]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchData(newPage, pagination.pageSize);
  }, [fetchData, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchData(0, newPageSize);
  }, [fetchData]);

  const value = {
    data,
    isLoading,
    error,
    refreshData,
    setData,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    tableName,
    // Métodos optimizados simplificados
    refreshCurrentPage,
    forceRefresh,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData<T>() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context as DataContextType<T>;
} 