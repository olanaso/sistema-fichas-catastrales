"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { getDataPaginada } from '@/service/data.actions';
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
  // Nuevos métodos para búsqueda
  searchData: (searchValue: string, searchColumns?: string[]) => Promise<void>;
  searchParams: {
    searchValue: string;
    searchColumns: string[];
  };
}

interface DataPaginatedProviderProps<T> {
  children: React.ReactNode;
  tableName: string;
  initialPageSize?: number;
  searchColumns?: string[];
}

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export function DataPaginatedProvider<T>({ 
  children, 
  tableName, 
  initialPageSize = 10,
  searchColumns = []
}: DataPaginatedProviderProps<T>) {
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
  const [searchParams, setSearchParams] = useState({
    searchValue: "",
    searchColumns: searchColumns,
  });

  const fetchData = useCallback(async (page: number, pageSize: number, searchValue?: string, searchColumns?: string[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await getDataPaginada(page, pageSize, tableName, searchValue, searchColumns);
      
      if (result.success) {
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
  }, [tableName, searchParams.searchColumns]);

  const refreshData = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchData(currentPage, currentPageSize, searchParams.searchValue, searchParams.searchColumns);
  }, [fetchData, pagination.page, pagination.pageSize, searchParams]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchData(pagination.page, pagination.pageSize, searchParams.searchValue, searchParams.searchColumns);
  }, [fetchData, pagination.page, pagination.pageSize, searchParams]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    await fetchData(pagination.page, pagination.pageSize, searchParams.searchValue, searchParams.searchColumns);
  }, [fetchData, pagination.page, pagination.pageSize, searchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchData(newPage, pagination.pageSize, searchParams.searchValue, searchParams.searchColumns);
  }, [fetchData, pagination.pageSize, searchParams]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchData(0, newPageSize, searchParams.searchValue, searchParams.searchColumns);
  }, [fetchData, searchParams]);

  // Nuevo método para búsqueda
  const searchData = useCallback(async (searchValue: string, searchColumns?: string[]) => {
    const columns = searchColumns || searchParams.searchColumns;
    setSearchParams({ searchValue, searchColumns: columns });
    setPagination(prev => ({ ...prev, page: 0 })); // Reset a la primera página
    await fetchData(0, pagination.pageSize, searchValue, columns);
  }, [fetchData, pagination.pageSize, searchParams.searchColumns]);

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
    // Nuevos métodos para búsqueda
    searchData,
    searchParams,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataPaginated<T>() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataPaginatedProvider');
  }
  return context as DataContextType<T>;
} 