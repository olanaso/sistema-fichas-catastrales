"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GrupoTrabajoDto } from '@/models/grupotrabajo';
import { toast } from 'sonner';
import { getPadronClientes } from '../action/gestionpadron.actions';
import { PaginatedData } from '@/components/table/table';
import { ClienteDto } from '@/models/cliente';

interface PadronClientesContextType {
  padronClientes: PaginatedData<ClienteDto>;
  isLoading: boolean;
  error: string | null;
  refreshPadronClientes: (page?: number, pageSize?: number) => Promise<void>;
  setPadronClientes: (padronClientes: PaginatedData<ClienteDto>) => void;
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

const PadronClientesContext = createContext<PadronClientesContextType | undefined>(undefined);

export function PadronClientesProvider({ children }: { children: React.ReactNode }) {
  const [padronClientes, setPadronClientes] = useState<PaginatedData<ClienteDto>>({
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

  const fetchPadronClientes = useCallback(async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getPadronClientes(page, pageSize);
      if (result.success) {
        setPadronClientes(result.data);
        setPagination({
          page: result.data.page,
          pageSize: result.data.size,
          total: result.data.total,
          totalPages: result.data.totalPages,
        });
      } else {
        console.error('Error en la respuesta:', result.message);
        setError(result.message || 'Error al cargar grupos de trabajo');
      }
    } catch (err) {
      console.error('Error loading grupos de trabajo:', err);
      setError('Error al cargar los grupos de trabajo');
      toast.error('Error al cargar los grupos de trabajo');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshPadronClientes = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchPadronClientes(currentPage, currentPageSize);
  }, [fetchPadronClientes, pagination.page, pagination.pageSize]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchPadronClientes(pagination.page, pagination.pageSize);
  }, [fetchPadronClientes, pagination.page, pagination.pageSize]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    await fetchPadronClientes(pagination.page, pagination.pageSize);
  }, [fetchPadronClientes, pagination.page, pagination.pageSize]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchPadronClientes(newPage, pagination.pageSize);
  }, [fetchPadronClientes, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchPadronClientes(0, newPageSize);
  }, [fetchPadronClientes]);

  const value = {
    padronClientes,
    isLoading,
    error,
    refreshPadronClientes,
    setPadronClientes,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    // Métodos optimizados simplificados
    refreshCurrentPage,
    forceRefresh,
  };

  return (
    <PadronClientesContext.Provider value={value}>
      {children}
    </PadronClientesContext.Provider>
  );
}

export function usePadronClientes() {
  const context = useContext(PadronClientesContext);
  if (context === undefined) {
    throw new Error('usePadronClientes must be used within a PadronClientesProvider');
  }
  return context;
} 