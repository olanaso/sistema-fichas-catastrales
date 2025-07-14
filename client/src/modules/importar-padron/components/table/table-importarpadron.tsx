"use client";

import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import { ClienteDto } from "@/models/cliente";
import { columns } from "./columns";
import ImportForm from "../form/import-form";

interface TableImportarPadronProps {
  importarPadronClientes: PaginatedData<ClienteDto>;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TableImportarPadron({ 
  importarPadronClientes, 
  loading = false,
  onPageChange,
  onPageSizeChange 
}: TableImportarPadronProps) {

  return (
    <>
      {importarPadronClientes.data.length > 0 ? (
        <BackendTable 
          columns={columns()}
          data={importarPadronClientes}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="propietario"
              searchPlaceholder="Buscar propietario..."
              actions={<ImportForm />}
            />
          )}
          pageSize={importarPadronClientes.size || 10}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay importar padrón de clientes para mostrar</p>
        </div>
      )}
    </>
  );
} 