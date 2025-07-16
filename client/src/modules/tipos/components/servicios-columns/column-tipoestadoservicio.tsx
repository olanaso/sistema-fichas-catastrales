import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, Activity, User } from "lucide-react"
import { TipoEstadoServicio } from "@/models/tipos"

export const columnsTipoEstadoServicio: ColumnDef<TipoEstadoServicio>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "estadoservicio",
        accessorKey: "estadoservicio",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Estado Servicio" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    {row.original.estadoservicio}
                </div>
            );
        },
    },
    {
        id: "idestadoservicio",
        accessorKey: "idestadoservicio",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="ID Estado" />
        },
        cell: ({ row }) => {
            const id = row.original.idestadoservicio;
            return (
                <div className="text-start flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-600" />
                    {id || "S/N"}
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
        id: "nombre",
        accessorKey: "nombre",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Nombre" />
        },
        cell: ({ row }) => {
            const nombre = row.original.nombre;
            return (
                <div className="text-start flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    {nombre || "S/N"}
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