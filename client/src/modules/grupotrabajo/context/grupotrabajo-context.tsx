"use client";

import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface GrupoTrabajoProviderProps {
  children: React.ReactNode;
}

export function GrupoTrabajoProvider({ children }: GrupoTrabajoProviderProps) {
  return (
    <DataPaginatedProvider<GrupoTrabajoDto>
      tableName="usp_grupotrabajo"
      initialPageSize={10}
      searchColumns={["nombre"]}
    >
      {children}
    </DataPaginatedProvider>
  );
}

export function useGrupoTrabajo() {
  return useDataPaginated<GrupoTrabajoDto>();
} 