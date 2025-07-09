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
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="id" />
    },
  },
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
      return <DataTableColumnHeader column={column} title="rol" />
    },
  },

]