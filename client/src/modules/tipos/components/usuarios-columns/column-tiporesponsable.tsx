import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Circle, Hash, UserCog, Link } from "lucide-react"
import { TipoResponsable } from "@/models/tipos"

export const columnsTipoResponsable: ColumnDef<TipoResponsable>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "tiporesponsable",
        accessorKey: "tiporesponsable",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Tipo Responsable" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-purple-600" />
                    {row.original.tiporesponsable}
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
        id: "codequivalencia",
        accessorKey: "codequivalencia",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código Equivalencia" />
        },
        cell: ({ row }) => {
            const codigo = row.original.codequivalencia;
            return (
                <div className="text-start flex items-center gap-2">
                    <Link className="w-4 h-4 text-cyan-600" />
                    {codigo || "S/N"}
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