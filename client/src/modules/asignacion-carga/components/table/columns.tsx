"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { FichaCatastro, FichaCatastroDto } from "@/models/fichacatastro";
import { CustomBadge } from "@/components/custom/custom-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/custom/icon-button";
import {
  UserPlus,
  User,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Home,
  Building,
  Layers,
  Wrench,
  Zap,
  Waves,
  FileText,
  Info,
  Circle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AsignacionIndividualPopover } from "../asignacion-individual/asignacion-individual-popover";
import { Inspector } from "@/models/inspector";
import { Cliente } from "@/models/cliente";

export const columns = (inspectores: Inspector[], onAsignacionCompleta?: () => void): ColumnDef<Cliente>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todas las filas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const ficha = row.original;

      //obtener el estado de la ficha
      const estado = ficha.codinspector ? "A" : "P";
      //designar el color y el texto del estado
      const color = estado === "A" ? "green" : estado === "P" ? "blue" : "dark";
      const texto = estado === "A" ? "Cliente asignado" : "Cliente sin asignar";

      return (
        <div className="flex items-center gap-1">
          <AsignacionIndividualPopover inspectores={inspectores} ficha={ficha} onAsignacionCompleta={onAsignacionCompleta}>
            <IconButton
              tooltip="Asignar ficha"
              tooltipIcon={<UserPlus className="h-3 w-3" />}
              color="blue"
              variant="ghost"
            >
              <UserPlus className="h-4 w-4" />
            </IconButton>
          </AsignacionIndividualPopover>
          
          <IconButton
            tooltip={texto}
            tooltipIcon={<Circle className="h-3 w-3" />}
            color={color}
            variant="ghost"
          >
            <Circle className="h-4 w-4" />
          </IconButton>
        </div>
      );
    },
    size: 80,
  },
  {
    id: "inspector",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Inspector" />;
    },
    cell: ({ row }) => {
      const inspector = row.original.inspector || "Sin asignar";
      const codinspector = row.original.codinspector || "";

      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-orange-600" />
          <div>
            <div className="font-medium">
              {inspector}
            </div>
            <div className="text-xs text-muted-foreground">
              {codinspector}
            </div>
          </div>
        </div>
      );
    },
    size: 150,
  },
  {
    id: "fechaasignacion",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Fecha Asignación" />;
    },
    cell: ({ row }) => {
      const fecha = row.original.fechaasignacion;

      return (
        <div className="text-start flex items-center gap-2">
          <Calendar className="w-4 h-4 text-lime-600" />
          <div className="text-xs">
            {fecha ? (
              <div>{format(new Date(fecha), "dd/MM/yyyy", { locale: es })}</div>
            ) : (
              <CustomBadge color="dark" className="text-xs">
                Sin fecha
              </CustomBadge>
            )}
          </div>
        </div>
      );
    },
    size: 120,
  },
  {
    id: "codigo_catastral",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Nro. Catastro" />;
    },
    cell: ({ row }) => {
      const ficha = row.original;
      const nrocatastro =
        ficha.codsuc +
        "-" +
        ficha.codsector +
        "-" +
        ficha.codmza +
        "-" +
        ficha.codcliente;

      return (
        <div className="text-start flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          <CustomBadge color="purple" className="text-xs font-mono">
            {nrocatastro || "Sin asignar"}
          </CustomBadge>
        </div>
      );
    },
    size: 140,
  },
  {
    id: "propietario",
    accessorKey: "propietario",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Propietario" />;
    },
    cell: ({ row }) => {
      const ficha = row.original;
      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <div>
            <div className="font-medium">
              {ficha.propietario || "Sin propietario"}
            </div>
            {ficha.dni && (
              <div className="text-xs text-muted-foreground">
                DNI: {ficha.dni}
              </div>
            )}
          </div>
        </div>
      );
    },
    size: 200,
  },
  {
    id: "direccion",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Dirección" />;
    },
    cell: ({ row }) => {
      const ficha = row.original;
      const direccion = ficha.direcc || "Sin dirección";

      return (
        <div className="text-start flex items-center gap-2">
          <Home className="w-4 h-4 text-green-600" />
          <div className="w-[220px] truncate break-words whitespace-normal">
            {direccion}
          </div>
        </div>
      );
    },
    size: 250,
  },
  {
    id: "tiposervicio",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo Servicio" />;
    },
    cell: ({ row }) => {
      const tipo = row.original.tiposervicio || "Sin especificar";

      return (
        <div className="text-start flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-600" />
          <div className="max-w-[120px] truncate">
            {tipo}
          </div>
        </div>
      );
    },
    size: 150,
  },
];
