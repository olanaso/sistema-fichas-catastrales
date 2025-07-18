import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle, Store, MapPin, Phone, User } from "lucide-react"
import { Sucursal } from "@/models/modulos"

export const columnsSucursales: ColumnDef<Sucursal>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "codsuc",
        accessorKey: "codsuc",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Store className="w-4 h-4 text-green-600" />
                    <span className="font-mono text-green-600">
                        {row.original.codsuc}
                    </span>
                </div>
            )
        },
    },
    {
        id: "nombre",
        accessorKey: "nombre",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Sucursal" />
        },
        cell: ({ row }) => {
            return <span className="font-medium">{row.original.nombre}</span>
        },
    },
    {
        id: "direccion",
        accessorKey: "direccion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Dirección" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{row.original.direccion}</span>
                    </div>
                    {(row.original.provincia || row.original.distrito) && (
                        <div className="text-xs text-muted-foreground">
                            {row.original.distrito && `${row.original.distrito}, `}
                            {row.original.provincia}
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        id: "administrador",
        accessorKey: "administrador",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Administrador" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>{row.original.administrador}</span>
                </div>
            )
        },
    },
    {
        id: "telefono",
        accessorKey: "telefono",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Teléfono" />
        },
        cell: ({ row }) => {
            return row.original.telefono ? (
                <div className="text-start flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{row.original.telefono}</span>
                </div>
            ) : (
                <span className="text-muted-foreground">Sin teléfono</span>
            )
        },
    },
    {
        id: "viviendas",
        accessorKey: "viviendas",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Viviendas" />
        },
        cell: ({ row }) => {
            return <span className="text-center">
                {row.original.viviendas || 'N/A'}
            </span>
        },
    },
    {
        id: "densidad",
        accessorKey: "densidad",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Densidad" />
        },
        cell: ({ row }) => {
            return <span className="text-center">
                {row.original.densidad || 'N/A'}
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