"use client";

import { DataProvider, useData } from '@/context/data-context';
import { TipoUsuarioDto } from '@/models/tipousuario';

interface TipoUsuarioProviderProps {
    children: React.ReactNode;
}

export function TipoUsuarioProvider({ children }: TipoUsuarioProviderProps) {
    return (
        <DataProvider<TipoUsuarioDto>
            tableName="tipousuario"
            autoLoad={true}
        >
            {children}
        </DataProvider>
    );
}

export function useTipoUsuario() {
    return useData<TipoUsuarioDto>();
}

// Hook adicional para obtener datos ordenados
export function useTipoUsuarioOrdenado() {
    const { data, isLoading, error, refreshData } = useData<TipoUsuarioDto>();

    // Ordenar por el campo 'orden' o por descripción
    const dataOrdenada = data.sort((a, b) => {
        if (a.orden && b.orden) {
            return a.orden - b.orden;
        }
        return (a.descripcion || '').localeCompare(b.descripcion || '');
    });

    return {
        data: dataOrdenada,
        isLoading,
        error,
        refreshData
    };
}

// Hook para obtener opciones para select/combo
export function useTipoUsuarioOptions() {
    const { data, isLoading } = useTipoUsuario();

    const options = data
        .filter(tipo => tipo.estareg === 1) // Solo activos
        .map(tipo => ({
            value: tipo.tipousuario,
            label: tipo.descripcion || tipo.tipousuario,
            data: tipo
        }));

    return {
        options,
        isLoading
    };
} 