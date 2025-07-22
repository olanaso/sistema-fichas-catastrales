"use client";

import { UsuarioDto } from "@/models/usuario";
import { columns } from "./columns";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import CreateUsuarioForm from "../forms/create-usuario";
import { useUsuarios } from "../../context/usuarios-context";

interface TableUsuarioProps {
  usuarios: PaginatedData<UsuarioDto>;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TableUsuario({ 
  usuarios, 
  loading = false,
  onPageChange,
  onPageSizeChange 
}: TableUsuarioProps) {
  const { searchData, searchParams } = useUsuarios();

  const handleSearch = (searchValue: string) => {
    searchData(searchValue, searchParams.searchColumns);
  };

  return (
    <>
      {usuarios.data.length > 0 ? (
        <BackendTable 
          columns={columns} 
          data={usuarios}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="nombre"
              searchPlaceholder="Buscar por nombre, apellido, email, usuario..."
              onSearch={handleSearch}
              searchColumns={searchParams.searchColumns}
              currentSearchValue={searchParams.searchValue}
              actions={<CreateUsuarioForm />}
            />
          )}
          pageSize={usuarios.size || 10}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay usuarios para mostrar</p>
        </div>
      )}
    </>
  );
}
