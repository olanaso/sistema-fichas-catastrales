import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle } from "lucide-react"
import { TipoConexion } from "@/models/tipos"

export const columnsTipoConexion: ColumnDef<TipoConexion>[] = [
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
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      return <div className="text-start">
        {row.original.tipocon}
      </div>
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
  {
    id: "fecha_registro",
    header: ({ column }) => {
        return <TableHeaderColumn column={column} title="Fecha Registro" />;
    },
    cell: ({ row }) => {
        const item = row.original;
        const fecha = item.fechareg ? new Date(item.fechareg) : null;

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