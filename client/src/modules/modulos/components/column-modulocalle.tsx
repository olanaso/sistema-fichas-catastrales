import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle, MapPin, Hash } from "lucide-react"
import { Calle } from "@/models/modulos"

export const columnsCalles: ColumnDef<Calle>[] = [
  {
    id: "index",
    header: "N°",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>
    },
  },
  {
    id: "codcalle",
    accessorKey: "codcalle",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código Calle" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <Hash className="w-4 h-4 text-blue-600" />
          <span className="font-mono text-blue-600">
            {row.original.codcalle}
          </span>
        </div>
      )
    },
  },
  {
    id: "tipocalle",
    accessorKey: "tipocalle",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo Calle" />
    },
    cell: ({ row }) => {
      return <div className="text-start">
        {row.original.tipocalle || 'Sin tipo'}
      </div>
    },
  },
  {
    id: "descripcioncalle",
    accessorKey: "descripcioncalle",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Descripción" />
    },
    cell: ({ row }) => {
      return (
        <div className="text-start flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{row.original.descripcioncalle || 'Sin descripción'}</span>
        </div>
      )
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
      return (
        <div className="text-start flex items-center gap-2">
          {estareg === 1 ? (
            <Circle className="w-3 h-3 fill-green-500 text-green-500" />
          ) : (
            <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          )}
          <span className={estareg === 1 ? "text-green-700" : "text-red-700"}>
            {estareg === 1 ? "Activo" : "Inactivo"}
          </span>
        </div>
      )
    },
  },
  {
    id: "creador",
    accessorKey: "creador",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Creador" />
    },
    cell: ({ row }) => {
      return <div className="text-start text-sm text-muted-foreground">
        {row.original.creador}
      </div>
    },
  },
  {
    id: "fechareg",
    accessorKey: "fechareg",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Fecha Registro" />
    },
    cell: ({ row }) => {
      const fecha = row.original.fechareg ? new Date(row.original.fechareg) : null;

      return (
        <div className="text-start flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <div className="text-xs">
            {fecha ? (
              <div>
                <div>{fecha.toLocaleDateString()}</div>
                <div className="text-muted-foreground">
                  {fecha.toLocaleTimeString()}
                </div>
              </div>
            ) : (
              "Sin fecha"
            )}
          </div>
        </div>
      );
          },
    },
  ]