import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Anvil, Calendar, Circle, Droplet } from "lucide-react"
import { CustomBadge } from "@/components/custom/custom-badge"
import { TipoPavimento } from "@/models/tipos"
import { BadgeColor } from "@/types/custom-badge"

export const ColumnsTipoPavimento: ColumnDef<TipoPavimento>[] = [
  {
    id: "index",
    header: "N°",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>
    },
  },
  {
    id: "pavconagu",
    accessorKey: "pavconagu",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Código" />
    },
    cell: ({ row }) => {
      return <div className="text-start">
        {row.original.pavconagu}
      </div>
    },
  },
  {
    id: "tipocon",
    accessorKey: "tipocon",
    header: ({ column }) => {
      return <TableHeaderColumn column={column} title="Tipo de conexión" />
    },
    cell: ({ row }) => {
      const tipocon = row.original.tipocon
      let icon = <Anvil className="w-3.5 h-3.5" />
      let text = "DESAGUE"
      let color = "purple"
      if (tipocon === '001') {
        text = "AGUA";
        icon = <Droplet className="w-3.5 h-3.5" />
        color = "blue"
      }
      return <div className="text-start flex items-center gap-2">
        <CustomBadge color={color as BadgeColor} className="text-xs" icon={icon}>{text}</CustomBadge>
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
        const ficha = row.original;
        const fecha = ficha.fechareg ? new Date(ficha.fechareg) : null;

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