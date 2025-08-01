"use client";

import { DataMigra } from "@/models/conexion-migra";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface ImportarPadronProviderProps {
  children: React.ReactNode;
}

export function ImportarPadronProvider({ children }: ImportarPadronProviderProps) {
  return (
    <DataPaginatedProvider<DataMigra>
      tableName="vista_padron_sici"
      initialPageSize={10}
      searchColumns={["cliente", "provincia", "sucursal", "calle", "urbanizacion", "tipo_construccion", "tipo_usuarioa"]}
    >
      {children}
    </DataPaginatedProvider>
  );
}

export function useImportarPadron() {
  return useDataPaginated<DataMigra>();
} 