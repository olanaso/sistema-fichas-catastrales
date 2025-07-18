"use client";

import { DataTable } from "@/components/custom/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface TableModulosProps {
  data: any[];
  columns: ColumnDef<any>[];
  searchPlaceholder?: string;
}

export default function TableModulos({ 
  data, 
  columns,
  searchPlaceholder = "Buscar en todos los campos..."
}: TableModulosProps) {

  return (
    <>
      {data.length > 0 ? (
        <DataTable 
          columns={columns} 
          data={data}
          toolbar={(table) => (
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-1 items-center space-x-2">
                  <Input
                    placeholder={searchPlaceholder}
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-[50vw] xl:max-w-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                  />
                </div>
              </div>
            </div>
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
