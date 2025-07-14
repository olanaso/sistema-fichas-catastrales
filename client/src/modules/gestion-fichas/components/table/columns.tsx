import { ColumnDef } from "@tanstack/react-table";
import { TableHeaderColumn } from "@/components/table/table-header-column";
import { FichaCatastroDto } from "@/models/fichacatastro";
import {
    FileText,
    User,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Home,
    Droplets,
    Gauge,
    Shield
} from "lucide-react";
import { CustomBadge } from "@/components/custom/custom-badge";
import { formatCodigoCatastral, getEstadoFichaLabel } from "@/models/fichacatastro";
import GestionFichasActionTable from "./action-table";

export const columns: ColumnDef<FichaCatastroDto>[] = [
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            return <GestionFichasActionTable ficha={row.original} />;
        },
    },
    {
        id: "codigo_catastral",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Código Catastral" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            const codigo = [
                ficha.codsuc,
                ficha.codsector_new,
                ficha.codmza_new,
                ficha.nrolote_new,
                ficha.nrosublote_new
            ].filter(Boolean).join('-') || 'Sin código';

            return (
                <div className="text-start">
                    <CustomBadge color="purple" className="text-xs font-mono">
                        {codigo}
                    </CustomBadge>
                </div>
            );
        },
    },
    {
        id: "estado_ficha",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Estado" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            const estado = ficha.estadoficha;
            const aprobada = ficha.fichaaprobada === 1;

            let color: "green" | "red" | "amber" | "blue" | "purple" | "orange" | "dark" = "dark";
            let icon = <Clock className="w-4 h-4" />;

            if (aprobada) {
                color = "green";
                icon = <CheckCircle className="w-4 h-4" />;
            } else if (estado === 'R') {
                color = "red";
                icon = <XCircle className="w-4 h-4" />;
            } else if (estado === 'P') {
                color = "amber";
                icon = <AlertCircle className="w-4 h-4" />;
            } else if (estado === 'E') {
                color = "blue";
                icon = <Clock className="w-4 h-4" />;
            }

            return (
                <div className="text-start flex items-center gap-2">
                    {icon}
                    <CustomBadge color={color} className="text-xs">
                        {aprobada ? "Aprobada" : getEstadoFichaLabel(estado)}
                    </CustomBadge>
                </div>
            );
        },
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
    },
    {
        id: "direccion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Dirección" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            return (
                <div className="text-start flex items-center gap-2">
                    <Home className="w-4 h-4 text-green-600" />
                    <div className="max-w-xs truncate">
                        {ficha.direccion_completa || "Sin dirección"}
                    </div>
                </div>
            );
        },
    },
    {
        id: "servicios",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Servicios" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            const servicios = [];

            if (ficha.tiene_agua) servicios.push("Agua");
            if (ficha.tiene_desague) servicios.push("Desagüe");
            if (ficha.tiene_medidor) servicios.push("Medidor");

            return (
                <div className="text-start flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <div className="flex flex-wrap gap-1">
                        {servicios.length > 0 ? (
                            servicios.map((servicio, index) => (
                                <CustomBadge key={index} color="blue" className="text-xs">
                                    {servicio}
                                </CustomBadge>
                            ))
                        ) : (
                            <CustomBadge color="dark" className="text-xs">
                                Sin servicios
                            </CustomBadge>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        id: "medidor",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Medidor" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;

            if (!ficha.tiene_medidor) {
                return (
                    <div className="text-start flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-gray-400" />
                        <CustomBadge color="dark" className="text-xs">
                            Sin medidor
                        </CustomBadge>
                    </div>
                );
            }

            return (
                <div className="text-start flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-green-600" />
                    <div>
                        <div className="font-medium text-xs">
                            {ficha.nromed || "Sin número"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {ficha.marcamed || "Sin marca"}
                        </div>
                        {ficha.lecturaultima && (
                            <div className="text-xs text-muted-foreground">
                                Lectura: {ficha.lecturaultima}
                            </div>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        id: "ubicacion",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Ubicación GPS" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            const tieneGPS = ficha.latitud && ficha.longitud;

            return (
                <div className="text-start flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${tieneGPS ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                        {tieneGPS ? (
                            <div className="text-xs">
                                <div>Lat: {parseFloat(ficha.latitud!).toFixed(6)}</div>
                                <div>Lng: {parseFloat(ficha.longitud!).toFixed(6)}</div>
                            </div>
                        ) : (
                            <CustomBadge color="dark" className="text-xs">
                                Sin GPS
                            </CustomBadge>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        id: "fecha_registro",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Fecha Registro" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;
            const fecha = ficha.fechareg ? new Date(ficha.fechareg) : null;

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
    {
        id: "cliente",
        header: ({ column }) => {
            return <TableHeaderColumn column={column} title="Cliente" />;
        },
        cell: ({ row }) => {
            const ficha = row.original;

            return (
                <div className="text-start flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <CustomBadge color="purple" className="text-xs">
                        {ficha.codcliente}
                    </CustomBadge>
                </div>
            );
        },
    },
]; 