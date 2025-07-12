"use client";

import { InspectorDto } from "@/models/inspector";
import { columns } from "./columns";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { CreateInspectorForm } from "../forms/create-inspector";
import { PaginatedData } from "@/components/table/table";

interface TableInspectorProps {
  inspectores: PaginatedData<InspectorDto>;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TableInspector({ 
  inspectores, 
  loading = false,
  onPageChange,
  onPageSizeChange 
}: TableInspectorProps) {

  return (
    <>
      {inspectores.data.length > 0 ? (
        <BackendTable 
          columns={columns} 
          data={inspectores}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="nombres"
              searchPlaceholder="Buscar inspectores..."
              actions={<CreateInspectorForm />}
            />
          )}
          pageSize={inspectores.size || 10}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay inspectores para mostrar</p>
        </div>
      )}
    </>
  );
} 