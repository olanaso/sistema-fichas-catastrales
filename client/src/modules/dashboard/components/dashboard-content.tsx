"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReunionDto, ServicioInstitucionDto } from "@/types/dashboard.types";

interface DashboardContentProps {
    proximasReuniones: ReunionDto[];
    serviciosPorVencer: ServicioInstitucionDto[];
}

// Función auxiliar para verificar si una fecha ha expirado
function isDateExpired(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
}

// Función auxiliar para formatear fecha
function formatDateReadable(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función auxiliar para formatear hora
function formatTimeReadable(timeString: string): string {
    return timeString;
}

export function DashboardContent({ proximasReuniones, serviciosPorVencer }: DashboardContentProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Próximas Reuniones */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Próximas Reuniones</CardTitle>
                            <CardDescription>
                                Reuniones programadas para los próximos días
                            </CardDescription>
                        </div>
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    {!proximasReuniones?.length ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No hay reuniones programadas
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {proximasReuniones.map((reunion) => (
                                <div
                                    key={reunion.id}
                                    className="flex items-start justify-between p-4 rounded-lg border bg-card"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{reunion.titulo}</p>
                                            <Badge
                                                variant={
                                                    reunion.estado === "PENDIENTE"
                                                        ? "default"
                                                        : reunion.estado === "ACEPTADA"
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                                className="text-xs"
                                            >
                                                {reunion.estado}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {reunion.institucion?.nombre || "Sin institución"}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDateReadable(reunion.fecha)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>
                                                    {formatTimeReadable(reunion.horaInicio)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Servicios por Vencer */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Servicios por Vencer</CardTitle>
                            <CardDescription>
                                Servicios que próximamente vencerán su contrato
                            </CardDescription>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    {!serviciosPorVencer?.length ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No hay servicios próximos a vencer
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {serviciosPorVencer.map((servicio) => (
                                <div
                                    key={servicio.id}
                                    className="flex items-start justify-between p-4 rounded-lg border bg-card"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{servicio.servicio?.nombre || "Servicio sin nombre"}</p>
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "text-xs",
                                                    isDateExpired(servicio.fechaFin) && "bg-destructive"
                                                )}
                                            >
                                                {isDateExpired(servicio.fechaFin) ? "Vencido" : "Por vencer"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {servicio.institucion?.nombre || "Sin institución"}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>
                                                    Vence: {servicio.fechaFin ? formatDateReadable(servicio.fechaFin) : "Sin fecha"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 