import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle, Grid, Map, Hash } from "lucide-react"
import { Manzana } from "@/models/modulos"

export const columnsManzanas: ColumnDef<Manzana>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "codmza",
        accessorKey: "codmza",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código Manzana" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Grid className="w-4 h-4 text-orange-600" />
                    <span className="font-mono text-orange-600">
                        {row.original.codmza}
                    </span>
                </div>
            )
        },
    },
    {
        id: "codsector",
        accessorKey: "codsector",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Sector" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Map className="w-4 h-4 text-purple-500" />
                    <span className="text-purple-600">
                        {row.original.codsector}
                    </span>
                </div>
            )
        },
    },
    {
        id: "descripcion",
        accessorKey: "descripcion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Descripción" />
        },
        cell: ({ row }) => {
            return <span>{row.original.descripcion || 'Sin descripción'}</span>
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