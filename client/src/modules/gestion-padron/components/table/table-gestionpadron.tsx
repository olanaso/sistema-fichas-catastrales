"use client";

import { BackendTable } from "@/components/table/table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { PaginatedData } from "@/components/table/table";
import { ClienteDto } from "@/models/cliente";
import { columns } from "./columns";
import {
  Calle,
  Manzana,
  Sector,
  TipoCalle,
  TipoServicio,
} from "@/models/tipos";
import { CustomBadge } from "@/components/custom/custom-badge";
import { Circle, Info } from "lucide-react";
import { usePadronClientes } from "../../context/gestionpadron-context";
import { Card, CardContent } from "@/components/ui/card";

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
  tiposData,
}: TableGestionPadronProps) {
  const { searchData, searchParams } = usePadronClientes();

  const handleSearch = (searchValue: string) => {
    searchData(searchValue, searchParams.searchColumns);
  };

  return (
    <>
      <BackendTable
        columns={columns(
          tiposData || {
            sectores: [],
            manzanas: [],
            calles: [],
            tiposervicios: [],
            tipocalle: [],
          }
        )}
        data={padronClientes}
        loading={loading}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        toolbar={(table) => (
          <TableToolbar
            table={table}
            searchKey="propietario"
            searchPlaceholder="Buscar por propietario, DNI..."
            onSearch={handleSearch}
            searchColumns={searchParams.searchColumns}
            currentSearchValue={searchParams.searchValue}
          />
        )}
        pageSize={padronClientes.size || 10}
      />

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Leyenda de estados
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-gray-600" />
              <CustomBadge color="dark" className="text-xs">
                PENDIENTE
              </CustomBadge>
              <span className="text-xs text-muted-foreground">
                Fichas sin procesar
              </span>
            </div>
  
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-green-600" />
              <CustomBadge color="green" className="text-xs">
                COMPLETADO
              </CustomBadge>
              <span className="text-xs text-muted-foreground">
                Fichas completadas
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
