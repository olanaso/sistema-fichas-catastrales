"use client";

import { DataProvider, useData } from '@/context/data-context';
import { InspectorDto } from '@/models/inspector';

interface InspectoresProviderProps {
    children: React.ReactNode;
}

export function InspectoresProvider({ children }: InspectoresProviderProps) {
    return (
        <DataProvider<InspectorDto>
            tableName="inspectores"
            autoLoad={true}
        >
            {children}
        </DataProvider>
    );
}

export function useInspectores() {
    return useData<InspectorDto>();
}

// Hook para obtener inspectores activos
export function useInspectoresActivos() {
    const { data, isLoading, error, refreshData } = useData<InspectorDto>();

    const inspectoresActivos = data.filter(inspector => inspector.estareg === 1);

    return {
        data: inspectoresActivos,
        isLoading,
        error,
        refreshData
    };
}

// Hook para obtener opciones para select/combo
export function useInspectoresOptions() {
    const { data, isLoading } = useInspectoresActivos();

    const options = data.map(inspector => ({
        value: inspector.codinspector,
        label: inspector.nombres || inspector.codinspector,
        data: inspector
    }));

    return {
        options,
        isLoading
    };
}

// Hook para obtener inspectores por brigada
export function useInspectoresByBrigada(codbrigada: string | null) {
    const { data, isLoading, error, refreshData } = useInspectoresActivos();

    const inspectoresBrigada = codbrigada 
        ? data.filter(inspector => inspector.codbrigada === codbrigada)
        : [];

    return {
        data: inspectoresBrigada,
        isLoading,
        error,
        refreshData
    };
} 