import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column"
import AcctionTable from "./action-table"
import { UsuarioDto } from "@/models/usuario"
import { Circle } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"

export const columns: ColumnDef<UsuarioDto>[] = [
  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => {
  //     return <AcctionTable usuario={row.original} />
  //   },
  // },

  {
    id: "codigo",
    accessorKey: "codigo",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Codigo" />
    },
  },
  {
    id: "rol",
    accessorKey: "rol",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nombre del rol" />
    },
  },
  {
    id: "descripcion",
    accessorKey: "descripcion",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Descripción" />
    },
    cell: ({ row }) => {
      // Aqui se va a dar la descripcion no esta en abse de datos cree un switch para dar la descripcion en base a la descripcion del rol
      switch (row.original.id) {
        case 1:
          return <div className="text-sm text-gray-500">Administrador maestro del sistema</div>
        case 2:
          return <div className="text-sm text-gray-500">Supervisor del personal inspector</div>
        case 3:
          return <div className="text-sm text-gray-500">Inspector encargado de completar las fichas catastrales</div>
        default:
          return <div className="text-sm text-gray-500">Rol no definido</div>

      }
    },
  },
  {
    id: "estado",
    accessorKey: "estado",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Estado" />
    },
    cell: ({ row }) => {
      return <CustomBadge color={true ? "green" : "red"} className="text-xs">
        {true ? "Activo" : "Inactivo"}
      </CustomBadge>
    },
  },

]