"use client";

import { InspectorDto } from "@/models/inspector";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface InspectoresProviderProps {
  children: React.ReactNode;
}

export function InspectoresProvider({ children }: InspectoresProviderProps) {
  return (
    <DataPaginatedProvider<InspectorDto>
      tableName="inspectores"
      initialPageSize={10}
      searchColumns={["nombres", "dni"]}
    >
      {children}
    </DataPaginatedProvider>
  );
}

export function useInspectores() {
  return useDataPaginated<InspectorDto>();
} 