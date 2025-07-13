"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GrupoTrabajoDto } from '@/models/grupotrabajo';
import { toast } from 'sonner';
import { getGruposTrabajoPaginados } from '../action/grupotrabajo.actions';
import { PaginatedData } from '@/components/table/table';

interface GrupoTrabajoContextType {
  gruposTrabajo: PaginatedData<GrupoTrabajoDto>;
  isLoading: boolean;
  error: string | null;
  refreshGruposTrabajo: (page?: number, pageSize?: number) => Promise<void>;
  setGruposTrabajo: (gruposTrabajo: PaginatedData<GrupoTrabajoDto>) => void;
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

const GrupoTrabajoContext = createContext<GrupoTrabajoContextType | undefined>(undefined);

export function GrupoTrabajoProvider({ children }: { children: React.ReactNode }) {
  const [gruposTrabajo, setGruposTrabajo] = useState<PaginatedData<GrupoTrabajoDto>>({
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

  const fetchGruposTrabajo = useCallback(async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getGruposTrabajoPaginados(page, pageSize);
      if (result.success) {
        setGruposTrabajo(result.data);
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

  const refreshGruposTrabajo = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchGruposTrabajo(currentPage, currentPageSize);
  }, [fetchGruposTrabajo, pagination.page, pagination.pageSize]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchGruposTrabajo(pagination.page, pagination.pageSize);
  }, [fetchGruposTrabajo, pagination.page, pagination.pageSize]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    await fetchGruposTrabajo(pagination.page, pagination.pageSize);
  }, [fetchGruposTrabajo, pagination.page, pagination.pageSize]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchGruposTrabajo(newPage, pagination.pageSize);
  }, [fetchGruposTrabajo, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchGruposTrabajo(0, newPageSize);
  }, [fetchGruposTrabajo]);

  const value = {
    gruposTrabajo,
    isLoading,
    error,
    refreshGruposTrabajo,
    setGruposTrabajo,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    // Métodos optimizados simplificados
    refreshCurrentPage,
    forceRefresh,
  };

  return (
    <GrupoTrabajoContext.Provider value={value}>
      {children}
    </GrupoTrabajoContext.Provider>
  );
}

export function useGrupoTrabajo() {
  const context = useContext(GrupoTrabajoContext);
  if (context === undefined) {
    throw new Error('useGrupoTrabajo must be used within a GrupoTrabajoProvider');
  }
  return context;
} 