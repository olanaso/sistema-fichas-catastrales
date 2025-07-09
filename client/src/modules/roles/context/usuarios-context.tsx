"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { UsuarioDto } from '@/models/usuario';
import { getRoles, getUsuarios } from '../action/usuario.actions';
import { toast } from 'sonner';

interface UsuariosContextType {
  usuarios: UsuarioDto[];
  isLoading: boolean;
  error: string | null;
  refreshUsuarios: () => Promise<void>;
  setUsuarios: (usuarios: UsuarioDto[]) => void;
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

export function UsuariosProvider ({ children }: { children: React.ReactNode }) {
  const [usuarios, setUsuarios] = useState<UsuarioDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getRoles();

      if (result.success) {
        setUsuarios(result.data || []);
      } else {
        setError(result.message || 'Error al cargar usuarios');
        toast.error(result.message || 'Error al cargar usuarios');
      }
    } catch (err) {
      console.error('Error loading usuarios:', err);
      setError('Error al cargar los usuarios');
      toast.error('Error al cargar los usuarios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    usuarios,
    isLoading,
    error,
    refreshUsuarios,
    setUsuarios,
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios () {
  const context = useContext(UsuariosContext);
  if (context === undefined) {
    throw new Error('useUsuarios must be used within a UsuariosProvider');
  }
  return context;
} 