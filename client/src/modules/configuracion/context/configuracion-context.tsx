"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ConfiguracionDto } from '@/models/configuracion';
import { getConfiguracion } from '../action/parametros.action';
import { toast } from 'sonner';

interface ConfiguracionContextType {
  configuracion: ConfiguracionDto | null;
  isLoading: boolean;
  error: string | null;
  refreshConfiguracion: () => Promise<void>;
  setConfiguracion: (configuracion: ConfiguracionDto) => void;
}

const ConfiguracionContext = createContext<ConfiguracionContextType | undefined>(undefined);

export function ConfiguracionProvider({ children }: { children: React.ReactNode }) {
  const [configuracion, setConfiguracion] = useState<ConfiguracionDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshConfiguracion = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getConfiguracion();
      
      if (result.success) {
        setConfiguracion(result.data);
      } else {
        setError(result.message || 'Error al cargar configuración');
        toast.error(result.message || 'Error al cargar configuración');
      }
    } catch (err) {
      console.error('Error loading configuracion:', err);
      setError('Error al cargar la configuración');
      toast.error('Error al cargar la configuración');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    configuracion,
    isLoading,
    error,
    refreshConfiguracion,
    setConfiguracion,
  };

  return (
    <ConfiguracionContext.Provider value={value}>
      {children}
    </ConfiguracionContext.Provider>
  );
}

export function useConfiguracion() {
  const context = useContext(ConfiguracionContext);
  if (context === undefined) {
    throw new Error('useConfiguracion must be used within a ConfiguracionProvider');
  }
  return context;
} 