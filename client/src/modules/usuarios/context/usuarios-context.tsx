"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { UsuarioDto } from '@/models/usuario';
import { toast } from 'sonner';
import { getSupervisoresYAdministradores } from '../action/usuario.actions';
import { PaginatedData } from '@/components/table/table';

interface UsuariosContextType {
  usuarios: PaginatedData<UsuarioDto>;
  isLoading: boolean;
  error: string | null;
  refreshUsuarios: (page?: number, pageSize?: number) => Promise<void>;
  setUsuarios: (usuarios: PaginatedData<UsuarioDto>) => void;
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

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

export function UsuariosProvider({ children }: { children: React.ReactNode }) {
  const [usuarios, setUsuarios] = useState<PaginatedData<UsuarioDto>>({
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

  const fetchUsuarios = useCallback(async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Iniciando carga de usuarios...', { page, pageSize });
      
      const result = await getSupervisoresYAdministradores(page, pageSize, 'usersystema');
      console.log('Resultado de la API:', result);
      
      if (result.success) {
        console.log('Datos recibidos:', result.data);
        setUsuarios(result.data);
        setPagination({
          page: result.data.page,
          pageSize: result.data.size,
          total: result.data.total,
          totalPages: result.data.totalPages,
        });
      } else {
        console.error('Error en la respuesta:', result.message);
        setError(result.message || 'Error al cargar usuarios');
      }
    } catch (err) {
      console.error('Error loading usuarios:', err);
      setError('Error al cargar los usuarios');
      toast.error('Error al cargar los usuarios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUsuarios = useCallback(async (page?: number, pageSize?: number) => {
    const currentPage = page ?? pagination.page;
    const currentPageSize = pageSize ?? pagination.pageSize;
    await fetchUsuarios(currentPage, currentPageSize);
  }, [fetchUsuarios, pagination.page, pagination.pageSize]);

  // Método optimizado para refrescar solo la página actual
  const refreshCurrentPage = useCallback(async () => {
    await fetchUsuarios(pagination.page, pagination.pageSize);
  }, [fetchUsuarios, pagination.page, pagination.pageSize]);

  // Método para forzar un refresh completo (útil después de operaciones CRUD)
  const forceRefresh = useCallback(async () => {
    console.log('Forzando refresh de usuarios...');
    await fetchUsuarios(pagination.page, pagination.pageSize);
  }, [fetchUsuarios, pagination.page, pagination.pageSize]);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchUsuarios(newPage, pagination.pageSize);
  }, [fetchUsuarios, pagination.pageSize]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPagination(prev => ({ ...prev, page: 0, pageSize: newPageSize }));
    fetchUsuarios(0, newPageSize);
  }, [fetchUsuarios]);

  const value = {
    usuarios,
    isLoading,
    error,
    refreshUsuarios,
    setUsuarios,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    // Métodos optimizados simplificados
    refreshCurrentPage,
    forceRefresh,
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  const context = useContext(UsuariosContext);
  if (context === undefined) {
    throw new Error('useUsuarios must be used within a UsuariosProvider');
  }
  return context;
} 