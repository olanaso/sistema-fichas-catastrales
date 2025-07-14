"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GrupoTrabajoDto } from '@/models/grupotrabajo';
import { toast } from 'sonner';
import { getImportarPadronClientes } from '../action/importarpadron.actions';
import { PaginatedData } from '@/components/table/table';
import { ClienteDto } from '@/models/cliente';

interface ImportarPadronClientesContextType {
  importarPadronClientes: PaginatedData<ClienteDto>;
  isLoading: boolean;
  error: string | null;
  refreshImportarPadronClientes: (page?: number, pageSize?: number) => Promise<void>;
  setImportarPadronClientes: (importarPadronClientes: PaginatedData<ClienteDto>) => void;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  // Métodos optimizados simplificados
  refreshCurrentPage: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

const ImportarPadronClientesContext = createContext<ImportarPadronClientesContextType | undefined>(undefined);

export function ImportarPadronClientesProvider({ children }: { children: React.ReactNode }) {
  const [importarPadronClientes, setImportarPadronClientes] = useState<PaginatedData<ClienteDto>>({
    data: [],
    total: 0,
    page: 0,
    size: 10,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchImportarPadronClientes = useCallback(async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getImportarPadronClientes(page, pageSize);
      if (result.success) {
        setImportarPadronClientes(result.data);
        setPagination({
          page: result.data.page,
          pageSize: result.data.size,
          total: result.data.total,
          totalPages: result.data.totalPages,
        });
      } else {
        console.error('Error en la respuesta:', result.message);
        setError(result.message || 'Error al cargar importar padrón de clientes');
      }
    } catch (err) {
      console.error('Error loading importar padrón de clientes:', err);
      setError('Error al cargar el importar padrón de clientes');
      toast.error('Error al cargar el importar padrón de clientes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshImportarPadronClientes = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchImportarPadronClientes(currentPage, currentPageSize);
  }, [fetchImportarPadronClientes, pagination.page, pagination.pageSize]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchImportarPadronClientes(pagination.page, pagination.pageSize);
  }, [fetchImportarPadronClientes, pagination.page, pagination.pageSize]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    await fetchImportarPadronClientes(pagination.page, pagination.pageSize);
  }, [fetchImportarPadronClientes, pagination.page, pagination.pageSize]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchImportarPadronClientes(newPage, pagination.pageSize);
  }, [fetchImportarPadronClientes, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchImportarPadronClientes(0, newPageSize);
  }, [fetchImportarPadronClientes]);

  const value = {
    importarPadronClientes,
    isLoading,
    error,
    refreshImportarPadronClientes,
    setImportarPadronClientes,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    // Métodos optimizados simplificados
    refreshCurrentPage,
    forceRefresh,
  };

  return (
    <ImportarPadronClientesContext.Provider value={value}>
      {children}
    </ImportarPadronClientesContext.Provider>
  );
}

export function useImportarPadronClientes() {
  const context = useContext(ImportarPadronClientesContext);
  if (context === undefined) {
    throw new Error('useImportarPadronClientes must be used within a ImportarPadronClientesProvider');
  }
  return context;
} 