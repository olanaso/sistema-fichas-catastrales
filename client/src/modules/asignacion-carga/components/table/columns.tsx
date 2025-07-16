"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { FichaCatastroDto } from "@/models/fichacatastro";
import { CustomBadge } from "@/components/custom/custom-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/custom/icon-button";
import {
    UserPlus,
    User,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Home,
    Building,
    Layers,
    Wrench,
    Zap,
    Waves,
    FileText
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Función auxiliar para construir la dirección completa desde DTO
const buildDireccionCompletaFromDto = (ficha: FichaCatastroDto): string => {
    return ficha.direccion_completa || 'Sin dirección';
};

export const columns = (
    onAsignarFicha: (ficha: FichaCatastroDto) => void
): ColumnDef<FichaCatastroDto>[] => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Seleccionar todas las filas"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Seleccionar fila"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const ficha = row.original;

                return (
                    <div className="flex items-center gap-1">
                        <IconButton
                            tooltip="Asignar ficha"
                            tooltipIcon={<UserPlus className="h-3 w-3" />}
                            onClick={() => onAsignarFicha(ficha)}
                            color="blue"
                            variant="ghost"
                        >
                            <UserPlus className="h-4 w-4" />
                        </IconButton>
                    </div>
                );
            },
            size: 80,
        },
        {
            id: "codigo_catastral",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Nro. Catastro" />;
            },
            cell: ({ row }) => {
                const ficha = row.original;
                const nrocatastro = ficha.nrocatastro;

                return (
                    <div className="text-start flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <CustomBadge color="purple" className="text-xs font-mono">
                            {nrocatastro || "Sin asignar"}
                        </CustomBadge>
                    </div>
                );
            },
            size: 140,
        },
        {
            id: "propietario",
            accessorKey: "propietario",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Propietario" />;
            },
            cell: ({ row }) => {
                const ficha = row.original;
                return (
                    <div className="text-start flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <div>
                            <div className="font-medium">{ficha.propietario || "Sin propietario"}</div>
                            {ficha.dni && (
                                <div className="text-xs text-muted-foreground">
                                    DNI: {ficha.dni}
                                </div>
                            )}
                        </div>
                    </div>
                );
            },
            size: 200,
        },
        {
            id: "direccion",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Dirección" />;
            },
            cell: ({ row }) => {
                const ficha = row.original;
                const direccion = buildDireccionCompletaFromDto(ficha);

                return (
                    <div className="text-start flex items-center gap-2">
                        <Home className="w-4 h-4 text-green-600" />
                        <div className="max-w-[220px] truncate" title={direccion}>
                            {direccion}
                        </div>
                    </div>
                );
            },
            size: 250,
        },
        {
            id: "inspector",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Inspector" />;
            },
            cell: ({ row }) => {
                const inspector = row.getValue("inspector") as string;

                return (
                    <div className="text-start flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-600" />
                        <div className="font-medium">
                            {inspector || (
                                <CustomBadge color="dark" className="text-xs">
                                    Sin asignar
                                </CustomBadge>
                            )}
                        </div>
                    </div>
                );
            },
            size: 150,
        },
        {
            id: "fecha_visita",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Fecha Visita" />;
            },
            cell: ({ row }) => {
                const fecha = row.getValue("fecha_visita") as string;

                return (
                    <div className="text-start flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <div className="text-xs">
                            {fecha ? (
                                <div>
                                    {format(new Date(fecha), "dd/MM/yyyy", { locale: es })}
                                </div>
                            ) : (
                                <CustomBadge color="dark" className="text-xs">
                                    Sin fecha
                                </CustomBadge>
                            )}
                        </div>
                    </div>
                );
            },
            size: 120,
        },
        {
            id: "estadoficha",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Estado" />;
            },
            cell: ({ row }) => {
                const estado = row.getValue("estadoficha") as string;

                let color: "green" | "red" | "amber" | "blue" | "purple" | "orange" | "dark" = "dark";
                let icon = <Clock className="w-4 h-4" />;
                let label = "PENDIENTE";

                switch (estado) {
                    case null:
                    case undefined:
                    case "":
                        color = "dark";
                        icon = <Clock className="w-4 h-4" />;
                        label = "PENDIENTE";
                        break;
                    case "P":
                        color = "blue";
                        icon = <AlertCircle className="w-4 h-4" />;
                        label = "PROCESO";
                        break;
                    case "F":
                        color = "green";
                        icon = <CheckCircle className="w-4 h-4" />;
                        label = "FINALIZADO";
                        break;
                    default:
                        color = "dark";
                        icon = <Clock className="w-4 h-4" />;
                        label = "PENDIENTE";
                        break;
                }

                return (
                    <div className="text-start flex items-center gap-2">
                        {icon}
                        <CustomBadge color={color} className="text-xs">
                            {label}
                        </CustomBadge>
                    </div>
                );
            },
            size: 120,
        },
        {
            id: "tipoconstruccion",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Tipo Construcción" />;
            },
            cell: ({ row }) => {
                const tipo = row.getValue("tipoconstruccion") as string;

                return (
                    <div className="text-start flex items-center gap-2">
                        <Building className="w-4 h-4 text-amber-600" />
                        <div className="max-w-[120px] truncate">
                            {tipo || (
                                <CustomBadge color="dark" className="text-xs">
                                    Sin especificar
                                </CustomBadge>
                            )}
                        </div>
                    </div>
                );
            },
            size: 150,
        },
        {
            id: "nropisos",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Nro. Pisos" />;
            },
            cell: ({ row }) => {
                const pisos = row.getValue("nropisos") as string;

                return (
                    <div className="text-start flex items-center gap-2">
                        <Layers className="w-4 h-4 text-green-600" />
                        <CustomBadge color="green" className="text-xs">
                            {pisos || "1"}
                        </CustomBadge>
                    </div>
                );
            },
            size: 100,
        },
        {
            id: "tiposervicio",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Tipo Servicio" />;
            },
            cell: ({ row }) => {
                const servicio = row.getValue("tiposervicio") as string;

                return (
                    <div className="text-start flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-blue-600" />
                        <div className="max-w-[100px] truncate">
                            {servicio || (
                                <CustomBadge color="dark" className="text-xs">
                                    Sin especificar
                                </CustomBadge>
                            )}
                        </div>
                    </div>
                );
            },
            size: 120,
        },
        {
            id: "suministroluz",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Suministro Luz" />;
            },
            cell: ({ row }) => {
                const suministro = row.getValue("suministroluz") as string;

                if (!suministro) {
                    return (
                        <div className="text-start flex items-center gap-2">
                            <Zap className="w-4 h-4 text-gray-400" />
                            <CustomBadge color="dark" className="text-xs">
                                Sin datos
                            </CustomBadge>
                        </div>
                    );
                }

                const tieneLuz = suministro.toLowerCase() === "si" || suministro === "1";

                return (
                    <div className="text-start flex items-center gap-2">
                        <Zap className={`w-4 h-4 ${tieneLuz ? 'text-green-600' : 'text-red-600'}`} />
                        <CustomBadge color={tieneLuz ? "green" : "red"} className="text-xs">
                            {tieneLuz ? "SÍ" : "NO"}
                        </CustomBadge>
                    </div>
                );
            },
            size: 120,
        },
        {
            id: "piscina",
            header: ({ column }) => {
                return <TableHeaderColumn column={column} title="Piscina" />;
            },
            cell: ({ row }) => {
                const piscina = row.getValue("piscina") as string;

                if (!piscina) {
                    return (
                        <div className="text-start flex items-center gap-2">
                            <Waves className="w-4 h-4 text-gray-400" />
                            <CustomBadge color="dark" className="text-xs">
                                Sin datos
                            </CustomBadge>
                        </div>
                    );
                }

                const tienePiscina = piscina.toLowerCase() === "si" || piscina === "1";

                return (
                    <div className="text-start flex items-center gap-2">
                        <Waves className={`w-4 h-4 ${tienePiscina ? 'text-blue-600' : 'text-gray-400'}`} />
                        <CustomBadge color={tienePiscina ? "blue" : "dark"} className="text-xs">
                            {tienePiscina ? "SÍ" : "NO"}
                        </CustomBadge>
                    </div>
                );
            },
            size: 100,
        }
    ]; 