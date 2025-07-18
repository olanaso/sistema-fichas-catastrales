import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, Scissors, AlertTriangle } from "lucide-react"
import { TipoCorteServicio } from "@/models/tipos"

export const columnsTipoCorteServicio: ColumnDef<TipoCorteServicio>[] = [
  {
    id: "index",
    header: "N°",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>
    },
  },
  {
    id: "tipocon",
    accessorKey: "tipocon",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo Conexión" />
    },
  },
  {
    id: "tipocorte",
    accessorKey: "tipocorte",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código Corte" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <Scissors className="w-4 h-4 text-red-600" />
          {row.original.tipocorte}
        </div>
      );
    },
  },
  {
    id: "descripcion",
    accessorKey: "descripcion",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Descripción" />
    },
  },
  {
    id: "flagcore",
    accessorKey: "flagcore",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Flag Core" />
    },
    cell: ({ row }) => {
      const flagcore = row.original.flagcore;
      return (
        <div className="text-start flex items-center gap-2">
          {flagcore === 1 ? (
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400" />
          )}
          {flagcore ? "Sí" : "No"}
        </div>
      );
    },
  },
  {
    id: "orden",
    accessorKey: "orden",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Orden" />
    },
    cell: ({ row }) => {
      const orden = row.original.orden;
      return (
        <div className="text-start flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-600" />
          {orden || "S/N"}
        </div>
      );
    },
  },
  {
    id: "estareg",
    accessorKey: "estareg",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Estado" />
    },
    cell: ({ row }) => {
      const estareg = row.original.estareg
      let icon = <Circle />
      if (estareg) {
        icon = <Circle className="text-green-500 bg-green-500/10 p-1 rounded-full" />
      } else {
        icon = <Circle className="text-red-500 bg-red-500/10 p-1 rounded-full" />
      }
      return <div className="text-start flex items-center gap-2">{icon} {estareg ? "Activo" : "Inactivo"}</div>
    },
  },
] 