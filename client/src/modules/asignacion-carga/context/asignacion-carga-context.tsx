"use client";

import { DataPaginatedProvider, useDataPaginated } from '@/context/data-paginated-context';
import { FichaCatastroDto } from '@/models/fichacatastro';

interface AsignacionCargaProviderProps {
    children: React.ReactNode;
}

export function AsignacionCargaProvider({ children }: AsignacionCargaProviderProps) {
    return (
        <DataPaginatedProvider<FichaCatastroDto>
            tableName="fichacatastro_eps"
            initialPageSize={10}
        >
            {children}
        </DataPaginatedProvider>
    );
}

export function useAsignacionCarga() {
    return useDataPaginated<FichaCatastroDto>();
} 