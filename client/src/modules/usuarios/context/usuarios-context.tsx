"use client";

import { UsuarioDto } from "@/models/usuario";
import { DataPaginatedProvider, useDataPaginated } from "@/context/data-paginated-context";

interface UsuariosProviderProps {
  children: React.ReactNode;
}

export function UsuariosProvider({ children }: UsuariosProviderProps) {
  return (
    <DataPaginatedProvider<UsuarioDto>
      tableName="usersystema"
      initialPageSize={10}
      searchColumns={["nombre", "apellidopa", "apellidoma", "dni", "email", "usuario"]}
    >
      {children}
    </DataPaginatedProvider>
  );
}

export function useUsuarios() {
  return useDataPaginated<UsuarioDto>();
} 