import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column"
import AcctionTable from "./action-table"
import { UsuarioDto } from "@/models/usuario"
import { Circle } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"

export const columns: ColumnDef<UsuarioDto>[] = [
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <AcctionTable usuario={row.original} />
    },
  },
  {
    id: "nombres",
    accessorKey: "nombres",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nombres" />
    },
  },
  {
    id: "apellidos",
    accessorKey: "apellidos",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Apellidos" />
    },
  },
  {
    id: "dni",
    accessorKey: "dni",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="DNI" />
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
  {
    id: "rol",
    accessorKey: "rol",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rol" />
    },
    cell: ({ row }) => {
      return <div className="text-start">
        <CustomBadge color="purple" className="text-xs">{row.original.rol[0].rol}</CustomBadge>
      </div>
    },
  },
  {
    id: "activo",
    accessorKey: "activo",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Estado" />
    },
    cell: ({ row }) => {
      const activo = row.original.activo
      let icon = <Circle />
      if (activo) {
        icon = <Circle className="text-green-500 bg-green-500/10 p-1 rounded-full" />
      } else {
        icon = <Circle className="text-red-500 bg-red-500/10 p-1 rounded-full" />
      }
      return <div className="text-start flex items-center gap-2">{icon} {activo ? "Activo" : "Inactivo"}</div>
    },
  }
]