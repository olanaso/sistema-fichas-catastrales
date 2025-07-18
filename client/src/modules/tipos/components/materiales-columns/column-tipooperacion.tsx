import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, Settings, FileText } from "lucide-react"
import { TipoOperacion } from "@/models/tipos"

export const columnsTipoOperacion: ColumnDef<TipoOperacion>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "tipooperacion",
        accessorKey: "tipooperacion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Tipo Operación" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    {row.original.tipooperacion}
                </div>
            );
        },
    },
    {
        id: "codoperacion",
        accessorKey: "codoperacion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código Operación" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    {row.original.codoperacion}
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
        id: "asuntocarta",
        accessorKey: "asuntocarta",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Asunto Carta" />
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
]; 