"use client";

import { DataMigra } from "@/models/conexion-migra";
import { columns } from "./columns";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import ImportForm from "../form/import-form";
import { useImportarPadron } from "../../context/importarpadron-context";

interface TableImportarPadronProps {
  importarPadronClientes: PaginatedData<DataMigra>;
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
  const { searchData, searchParams } = useImportarPadron();

  const handleSearch = (searchValue: string) => {
    searchData(searchValue, searchParams.searchColumns);
  };

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
              searchKey="cliente"
              searchPlaceholder="Buscar por cliente, RUC, suministro, medidor..."
              onSearch={handleSearch}
              searchColumns={searchParams.searchColumns}
              currentSearchValue={searchParams.searchValue}
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