import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle, MapPin, Hash, Users } from "lucide-react"
import { Sector } from "@/models/modulos"

export const columnsSectores: ColumnDef<Sector>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "codsector",
        accessorKey: "codsector",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código Sector" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="font-mono text-purple-600">
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
            return <span className="font-medium">{row.original.descripcion}</span>
        },
    },
    {
        id: "densidad",
        accessorKey: "densidad",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Densidad" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{row.original.densidad || 'N/A'}</span>
                </div>
            )
        },
    },
    {
        id: "c_sect",
        accessorKey: "c_sect",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="C. Sector" />
        },
        cell: ({ row }) => {
            return <span className="text-sm text-muted-foreground">
                {row.original.c_sect || 'N/A'}
            </span>
        },
    },
    {
        id: "codsicap",
        accessorKey: "codsicap",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="SICAP" />
        },
        cell: ({ row }) => {
            return <span className="text-sm text-muted-foreground">
                {row.original.codsicap || 'N/A'}
            </span>
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