"use client";

import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import { ClienteDto } from "@/models/cliente";
import { columns } from "./columns";
import { Calle, Manzana, Sector, TipoCalle, TipoServicio } from "@/models/tipos";

interface TableGestionPadronProps {
  padronClientes: PaginatedData<ClienteDto>;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  tiposData?: {
    sectores: Sector[];
    manzanas: Manzana[];
    calles: Calle[];
    tiposervicios: TipoServicio[];
    tipocalle: TipoCalle[];
  };
}

export default function TableGestionPadron({ 
  padronClientes, 
  loading = false,
  onPageChange,
  onPageSizeChange,
  tiposData
}: TableGestionPadronProps) {

  return (
    <>
      {padronClientes.data.length > 0 ? (
        <BackendTable 
          columns={columns(tiposData || {
            sectores: [],
            manzanas: [],
            calles: [],
            tiposervicios: [],
            tipocalle: []
          })}
          data={padronClientes}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          toolbar={(table) => (
            <TableToolbar 
              table={table} 
              searchKey="propietario"
              searchPlaceholder="Buscar propietario..."
            />
          )}
          pageSize={padronClientes.size || 10}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay grupos de trabajo para mostrar</p>
        </div>
      )}
    </>
  );
} 