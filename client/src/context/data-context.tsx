"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getData } from '@/service/data.actions';

interface DataContextType<T> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
    setData: (data: T[]) => void;
    total: number;
    tableName: string;
}

interface DataProviderProps<T> {
    children: React.ReactNode;
    tableName: string;
    autoLoad?: boolean; // Auto-cargar datos al montar el componente
}

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export function DataProvider<T>({
    children,
    tableName,
    autoLoad = true
}: DataProviderProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            console.log(`Iniciando carga de ${tableName}...`);

            const result = await getData(tableName);
            console.log(`Resultado de la API para ${tableName}:`, result);

            if (result.success) {
                console.log(`Datos recibidos para ${tableName}:`, result.data);
                setData(result.data);
                setTotal(result.total);
            } else {
                console.error(`Error en la respuesta para ${tableName}:`, result.message);
                setError(result.message || `Error al cargar ${tableName}`);
                setData([]);
                setTotal(0);
            }
        } catch (err) {
            console.error(`Error loading ${tableName}:`, err);
            setError(`Error al cargar ${tableName}`);
            setData([]);
            setTotal(0);
        } finally {
            setIsLoading(false);
        }
    }, [tableName]);

    const refreshData = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    // Auto-cargar datos al montar el componente si autoLoad es true
    useEffect(() => {
        if (autoLoad) {
            fetchData();
        }
    }, [fetchData, autoLoad]);

    const value = {
        data,
        isLoading,
        error,
        refreshData,
        setData,
        total,
        tableName,
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
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context as DataContextType<T>;
} 