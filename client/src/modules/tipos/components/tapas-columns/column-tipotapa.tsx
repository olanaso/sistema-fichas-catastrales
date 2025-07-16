import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, Shield } from "lucide-react"
import { TipoTapa } from "@/models/tipos"

export const columnsTipoTapa: ColumnDef<TipoTapa>[] = [
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
        id: "tipotapa",
        accessorKey: "tipotapa",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Tipo Tapa" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    {row.original.tipotapa}
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
]; 