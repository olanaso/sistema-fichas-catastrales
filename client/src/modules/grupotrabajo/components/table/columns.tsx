import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { GrupoTrabajoDto } from "@/models/grupotrabajo"
import { Users, User, Circle, Shield } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import ActionTable from "./action-table"
import { Usuario } from "@/models/usuario"
import { Inspector } from "@/models/inspector"

interface ColumnsProps {
  supervisores: Usuario[]
  inspectores: Inspector[]
}

export const createColumns = ({ supervisores, inspectores }: ColumnsProps): ColumnDef<GrupoTrabajoDto>[] => [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ActionTable 
        grupoTrabajo={row.original} 
        supervisores={supervisores}
        inspectores={inspectores}
      />
    },
  },
  {
    id: "codgrupo",
    accessorKey: "codgrupo",
    header: "Código",
    cell: ({ row }) => {
      const codigo = row.original.codgrupo;
      return (
        <div className="text-start">
          <CustomBadge color="purple" className="text-xs">{codigo}</CustomBadge>
        </div>
      );
    },
  },
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          {row.original.nombre || "Sin nombre"}
        </div>
      );
    },
  },
  {
    id: "codlider",
    accessorKey: "codlider",
    header: "Líder",
    cell: ({ row }) => {
      const lider = supervisores.find(supervisor => supervisor.codusu === row.original.codlider);
      return (
        <div className="text-start flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          {lider ? `${lider.nombre} ${lider.apellidopa}` : "Sin líder"}
        </div>
      );
    },
  },
  {
    id: "inspectores",
    accessorKey: "inspectores",
    header: "Inspectores",
    cell: ({ row }) => {
      const count = inspectores.filter(i => i.codbrigada === row.original.codgrupo).length;      
      
      return (
        <div className="text-start">
          <CustomBadge color="orange" className="text-xs">
            {count} inspector{count !== 1 ? 'es' : ''}
          </CustomBadge>
        </div>
      );
    },
  },
  {
    id: "activo",
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const activo = row.original.activo;
      
      let icon = <Circle />
      if (activo) {
        icon = <Circle className="text-green-500 bg-green-500/10 p-1 rounded-full" />
      } else {
        icon = <Circle className="text-red-500 bg-red-500/10 p-1 rounded-full" />
      }
      return (
        <div className="text-start flex items-center gap-2">
          {icon} 
          {activo ? "Activo" : "Inactivo"}
        </div>
      );
    },
  }
] 