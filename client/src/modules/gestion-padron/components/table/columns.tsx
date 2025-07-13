import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { GrupoTrabajoDto } from "@/models/grupotrabajo"
import { Users, User, Circle, Shield } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import ActionTable from "./action-table"
import { ClienteDto } from "@/models/cliente"
import { format } from "date-fns"


export const columns = (): ColumnDef<ClienteDto>[] => [
  {
    id: "actions",  
    header: "Acciones",
    cell: ({ row }) => {
      return <ActionTable 
        cliente={row.original} 
      />
    },
  },
  {
    id: "codcatastral",
    accessorKey: "codcatastral",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código Catastral" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{row.original.codcatastral}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "codcliente",
    accessorKey: "codcliente",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      const codigo = row.original.codcliente;
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{codigo}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "codsector",
    accessorKey: "codsector",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Sector" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{row.original.codsector || "Sin código sector"}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "codcalle",
    accessorKey: "codcalle",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Calle" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{row.original.codcalle + " - " + row.original.nrocalle || "Sin código calle"}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "tiposervicio",
    accessorKey: "tiposervicio",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo de Servicio" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{row.original.tiposervicio || "Sin tipo de servicio"}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "propietario",
    accessorKey: "propietario",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Propietario" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          {row.original.propietario || "Sin propietario"}
          <br />
          {row.original.dni}
        </div>
      );
    },
  },
  {
    id: "telefono",
    accessorKey: "telefono",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Teléfono" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{row.original.telefono || "Sin teléfono"}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "fechareg",
    accessorKey: "fechareg",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Fecha Registro" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.original.fechareg ? format(new Date(row.original.fechareg), "dd/MM/yyyy HH:mm") : "Sin fecha de registro"}
        </div>
      );
    },
  },
] 