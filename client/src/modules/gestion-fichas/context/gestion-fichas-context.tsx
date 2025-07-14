"use client";

import { FichaCatastroDto } from "@/models/fichacatastro";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface GestionFichasProviderProps {
    children: React.ReactNode;
}

export function GestionFichasProvider({ children }: GestionFichasProviderProps) {
    return (
        <DataPaginatedProvider<FichaCatastroDto>
            tableName="fichacatastro_eps"
            initialPageSize={10}
        >
            {children}
        </DataPaginatedProvider>
    );
}

export function useGestionFichas() {
    return useDataPaginated<FichaCatastroDto>();
} 