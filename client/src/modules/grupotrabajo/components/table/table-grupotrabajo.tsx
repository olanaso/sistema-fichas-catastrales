"use client";

import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import CreateGrupoTrabajoForm from "../forms/create-grupotrabajo";
import { PaginatedData } from "@/components/table/table";
import { createColumns } from "./columns";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";

interface TableGrupoTrabajoProps {
  gruposTrabajo: PaginatedData<GrupoTrabajoDto>;
  supervisores: Usuario[];
  inspectores: Inspector[];
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function TableGrupoTrabajo({ 
  gruposTrabajo, 
  supervisores,
  inspectores,
  loading = false,
  onPageChange,
  onPageSizeChange 
}: TableGrupoTrabajoProps) {

  const columns = createColumns({ supervisores, inspectores });

  return (
    <>
      {gruposTrabajo.data.length > 0 ? (
        <BackendTable 
          columns={columns} 
          data={gruposTrabajo}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="nombre"
              searchPlaceholder="Buscar grupos de trabajo..."
              actions={<CreateGrupoTrabajoForm supervisores={supervisores} inspectores={inspectores} />}
            />
          )}
          pageSize={gruposTrabajo.size || 10}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay grupos de trabajo para mostrar</p>
        </div>
      )}
    </>
  );
} 