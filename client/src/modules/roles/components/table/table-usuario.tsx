"use client";

import { UsuarioDto } from "@/models/usuario";
import { columns } from "./columns";
import { DataTable } from "@/components/custom/data-table";
import { DataTableToolbar } from "@/components/custom/data-table-toolbar";
import { useUsuarios } from "../../context/usuarios-context";


interface TableUsuarioProps {
  usuarios: UsuarioDto[];
}

export default function TableUsuario ({ usuarios }: TableUsuarioProps) {
  const { refreshUsuarios, isLoading } = useUsuarios();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Roles del sistema</h2>
          <p className="text-muted-foreground">
            Visualiza los roles de tu sistema
          </p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={usuarios}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            searchKey="rol"
            searchPlaceholder="Buscar roles..."
          // actions={<CreateUsuarioForm />}
          />
        )}
        pageSize={10}
      />
    </>
  );
}
