"use client";

import { InspectorDto } from "@/models/inspector";
import { columns } from "./columns";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import CreateInspectorForm from "../forms/create-inspector";
import { PaginatedData } from "@/components/table/table";
import { GrupoTrabajo } from "@/models/grupotrabajo";
import { useInspectores } from "../../context/inspectores-context";

interface TableInspectorProps {
  gruposDeTrabajo: GrupoTrabajo[];
  inspectores: PaginatedData<InspectorDto>;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TableInspector({ 
  gruposDeTrabajo,
  inspectores, 
  loading = false,
  onPageChange,
  onPageSizeChange 
}: TableInspectorProps) {
  const { searchData, searchParams } = useInspectores();

  const handleSearch = (searchValue: string) => {
    searchData(searchValue, searchParams.searchColumns);
  };

  return (
    <>
      {inspectores.data.length > 0 ? (
        <BackendTable 
          columns={columns(gruposDeTrabajo)} 
          data={inspectores}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="nombres"
              searchPlaceholder="Buscar por nombres, apellidos, DNI, email..."
              onSearch={handleSearch}
              searchColumns={searchParams.searchColumns}
              currentSearchValue={searchParams.searchValue}
              actions={<CreateInspectorForm gruposDeTrabajo={gruposDeTrabajo} />}
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