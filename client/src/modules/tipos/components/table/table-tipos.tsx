"use client";

import { UsuarioDto } from "@/models/usuario";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import { columns } from "@/modules/usuarios/components/table/columns";
import { DataTable } from "@/components/custom/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface TableTiposProps {
  data: any[];
  columns: ColumnDef<any>[];
}

export default function TableTipos({ 
  data, 
  columns
}: TableTiposProps) {

  return (
    <>
      {data.length > 0 ? (
        <DataTable 
          columns={columns} 
          data={data}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="descripcion"
              searchPlaceholder="Buscar tipos de datos..."
            />
          )}
          pageSize={5}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay datos para mostrar</p>
        </div>
      )}
    </>
  );
}
