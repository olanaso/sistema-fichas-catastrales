import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { User, MapPin, Building, Droplets, Gauge } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import { format } from "date-fns"
import { DataMigra } from "@/models/conexion-migra"

export const columns = (): ColumnDef<DataMigra>[] => [
  {
    id: "index",
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>
    },
  },
  {
    id: "ubicacion",
    accessorKey: "sector",
    header: "Ubicación",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-blue-900">
            {data.provincia} - {data.sucursal}
          </div>
          <div className="text-xs text-gray-600">
            Zona: {data.prezona} | Sector: {data.sector || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Mz: {data.manzana} | Lt: {data.lote}
            {data.sublote && ` | SubLt: ${data.sublote}`}
          </div>
          <div className="text-xs text-gray-600">
            {data.calle} {data.cuadra}
          </div>
          {data.urbanizacion && (
            <div className="text-xs text-gray-600">
              Urb: {data.urbanizacion}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "cliente",
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-green-900">
            {data.cliente || "Sin cliente"}
            <br />
            Cod: {data.codcliente}
          </div>
          <div className="text-xs text-gray-600">
            RUC: {data.ruc || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Tel: {data.telefono || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Hab: {data.nro_habitantes || "-"}
          </div>
          <CustomBadge color="blue" className="text-xs">
            {data.tipo_responsable || "Sin tipo"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "predio",
    accessorKey: "suministro",
    header: "Predio",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-purple-900">
            Sum: {data.suministro || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Const: {data.tipo_construccion || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Piso: {data.piso || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Serv: {data.tipo_servicio || "-"}
          </div>
          {data.piscina_desc && (
            <div className="text-xs text-blue-600">
              Piscina: {data.piscina_desc}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "conexion",
    accessorKey: "tipo_abastecimiento",
    header: "Conexión",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-cyan-900">
            Agua: {data.tipo_abastecimiento || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Reserv: {data.tipo_reservorio || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Usuario: {data.tipo_usuarioa || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Desagüe: {data.situacion_desague || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Material: {data.tipo_material_d || "-"}
          </div>
        </div>
      );
    },
  },
  {
    id: "medidor",
    accessorKey: "medidor",
    header: "Medidor",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-orange-900">
            N° {data.medidor || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Inst: {data.fecha_instalacion || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Diám: {data.diametro_medidor || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Usos: {data.cant_uso || "-"}
          </div>
          <div className="text-xs text-gray-600">
            Loc: {data.localizacion_desague || "-"}
          </div>
        </div>
      );
    },
  },
] 