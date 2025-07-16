import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, Gauge, CheckCircle, XCircle } from "lucide-react"
import { TipoEstadoMedidor } from "@/models/tipos"

export const columnsTipoEstadoMedidor: ColumnDef<TipoEstadoMedidor>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "estadomed",
        accessorKey: "estadomed",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Estado Medidor" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-orange-600" />
                    {row.original.estadomed}
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
        id: "permitelectura",
        accessorKey: "permitelectura",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Permite Lectura" />
        },
        cell: ({ row }) => {
            const permite = row.original.permitelectura;
            return (
                <div className="text-start flex items-center gap-2">
                    {permite ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-red-600" />
                    }
                    {permite ? "Sí" : "No"}
                </div>
            );
        },
    },
    {
        id: "inoperativo",
        accessorKey: "inoperativo",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Inoperativo" />
        },
        cell: ({ row }) => {
            const inoperativo = row.original.inoperativo;
            return (
                <div className="text-start flex items-center gap-2">
                    {inoperativo ? 
                        <XCircle className="w-4 h-4 text-red-600" /> : 
                        <CheckCircle className="w-4 h-4 text-green-600" />
                    }
                    {inoperativo ? "Sí" : "No"}
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
]; 