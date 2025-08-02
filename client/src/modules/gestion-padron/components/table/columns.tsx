import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { Circle, User, MapPin, Building, Droplets, Gauge, Phone, FileText } from "lucide-react";
import { CustomBadge } from "@/components/custom/custom-badge";
import { ClienteDto } from "@/models/cliente";
import {
  Calle,
  Manzana,
  Sector,
  TipoCalle,
  TipoServicio,
} from "@/models/tipos";
import { IconButton } from "@/components/custom/icon-button";
import { IconButtonColor } from "@/types/icon-button";

export const columns = (tiposData: {
  sectores: Sector[];
  manzanas: Manzana[];
  calles: Calle[];
  tipocalle: TipoCalle[];
  tiposervicios: TipoServicio[];
}): ColumnDef<ClienteDto>[] => [
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
    accessorKey: "codcatastral",
    header: "Ubicación",
    cell: ({ row }) => {
      const data = row.original;
      const calle = tiposData.calles.find(c => c.codcalle === data.codcalle);
      const tipocalle = tiposData.tipocalle.find(t => t.tipocalle === calle?.tipocalle);
      
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-blue-900 dark:text-blue-100">
            {data.codsuc} - {data.codsector}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Mz: {data.codmza || "-"} | Lt: {data.nrolote || "-"}
            {data.nrosublote && ` | SubLt: ${data.nrosublote}`}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {tipocalle?.descripcioncorta || ""} {calle?.descripcioncalle || "Sin calle"} {data.nrocalle || ""}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {data.codcatastral || "Sin código catastral"}
          </div>
        </div>
      );
    },
  },
  {
    id: "cliente",
    accessorKey: "propietario",
    header: "Cliente",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-green-900 dark:text-green-100">
            {data.propietario || "Sin propietario"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Cod: {data.codcliente}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            DNI: {data.dni || "-"} / RUC: {data.ruc || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Tel: {data.telefono || "-"}
          </div>
          <CustomBadge color="blue" className="text-xs">
            {data.tipousuario || "Sin tipo"}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "servicios",
    accessorKey: "tiposervicio",
    header: "Servicios",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-purple-900 dark:text-purple-100">
            Serv: {data.tiposervicio || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Estado: {data.estadoservicio || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Contrato: {data.nrocontrato || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Sin mora: {data.sinmora ? "Sí" : "No"}
          </div>
          {data.estadoregistro !== undefined && (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Reg: {data.estadoregistro === 1 ? "Activo" : "Inactivo"}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "conexiones",
    accessorKey: "estadoservicio_a",
    header: "Conexiones",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-cyan-900 dark:text-cyan-100">
            Agua: {data.estadoservicio_a || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Diám: {data.diametro_a || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Material: {data.tipomterial || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Desagüe: {data.estadoservicio_d || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Diám D: {data.diametro_d || "-"}
          </div>
        </div>
      );
    },
  },
  {
    id: "medidor",
    accessorKey: "nro_medidor",
    header: "Medidor",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-start space-y-1">
          <div className="text-xs font-medium text-orange-900 dark:text-orange-100">
            N° {data.nro_medidor || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Inst: {data.fecha_inst || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Diám: {data.diametro_m || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Usos: {data.cant_uso || "-"}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Caja: {data.loccaja_a || "-"}
          </div>
        </div>
      );
    },
  },
  {
    id: "asignacion",
    header: "Asignación",
    cell: ({ row }) => {
      const data = row.original;
      const estado = data.codinspector ? true : false;
      let color = estado ? "green" : "dark";
      let texto = estado ? "Asignado" : "No asignado";
      
      return (
        <div className="text-start space-y-1">
          <div className="flex items-center gap-1">
            <IconButton
              tooltip={texto}
              color={color as IconButtonColor}
              children={<Circle className="w-3 h-3" />}
            />
          </div>
                     {data.inspector && (
             <div className="text-xs text-gray-600 dark:text-gray-400">
               Insp: {data.inspector}
             </div>
           )}
           {data.fechaasignacion && (
             <div className="text-xs text-gray-600 dark:text-gray-400">
               Asign: {data.fechaasignacion}
             </div>
           )}
        </div>
      );
    },
  },
];
