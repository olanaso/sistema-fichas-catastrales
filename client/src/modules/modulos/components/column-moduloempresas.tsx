import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderColumn } from "@/components/table/table-header-column"
import { Calendar, Circle, Building2, Phone, Mail, Globe, MapPin } from "lucide-react"
import { Empresa } from "@/models/modulos"

export const columnsEmpresas: ColumnDef<Empresa>[] = [
    {
        id: "index",
        header: "N°",
        cell: ({ row }) => {
            return <div className="text-start">{row.index + 1}</div>
        },
    },
    {
        id: "codemp",
        accessorKey: "codemp",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="font-mono text-blue-600">
                        {row.original.codemp}
                    </span>
                </div>
            )
        },
    },
    {
        id: "nombre",
        accessorKey: "nombre",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Empresa" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start">
                    <div className="font-medium">{row.original.nombre}</div>
                    <div className="text-sm text-muted-foreground">{row.original.ruc}</div>
                </div>
            )
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
                <div className="text-start flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>{row.original.direccion}</span>
                </div>
            )
        },
    },
    {
        id: "rep_legal",
        accessorKey: "rep_legal",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Representante Legal" />
        },
        cell: ({ row }) => {
            return <div className="text-start">{row.original.rep_legal}</div>
        },
    },
    {
        id: "telefono",
        accessorKey: "telefono",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Contacto" />
        },
        cell: ({ row }) => {
            return (
                <div className="text-start text-sm">
                    {row.original.telefono && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-500" />
                            <span>{row.original.telefono}</span>
                        </div>
                    )}
                    {row.original.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-500" />
                            <span>{row.original.email}</span>
                        </div>
                    )}
                    {row.original.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-gray-500" />
                            <span>{row.original.website}</span>
                        </div>
                    )}
                </div>
            )
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