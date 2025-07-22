"use client";

import { ClienteDto } from "@/models/cliente";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface PadronClientesProviderProps {
  children: React.ReactNode;
}

export function PadronClientesProvider({ children }: PadronClientesProviderProps) {
  return (
    <DataPaginatedProvider<ClienteDto>
      tableName="clientes"
      initialPageSize={10}
      searchColumns={["propietario", "dni"]}
    >
      {children}
    </DataPaginatedProvider>
  );
}

export function usePadronClientes() {
  return useDataPaginated<ClienteDto>();
} 