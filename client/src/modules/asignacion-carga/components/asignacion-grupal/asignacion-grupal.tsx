"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Calendar, Users, ChevronDown, ChevronUp } from "lucide-react";
import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { InspectorDto } from "@/models/inspector";
import { asignarFichasGrupal, getGruposTrabajo, getInspectoresByBrigada, type AsignacionGrupalRequest } from "../../action/asignacion-carga.actions";
import { toast } from "sonner";

interface AsignacionGrupalProps {
    fichasSeleccionadas: number[];
    onAsignacionCompleta: () => void;
}

export function AsignacionGrupal({
    fichasSeleccionadas,
    onAsignacionCompleta
}: AsignacionGrupalProps) {
    const [loading, setLoading] = useState(false);
    const [loadingInspectores, setLoadingInspectores] = useState(false);
    const [loadingGrupos, setLoadingGrupos] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar expansión
    const [gruposTrabajo, setGruposTrabajo] = useState<GrupoTrabajoDto[]>([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState<GrupoTrabajoDto | null>(null);
    const [inspectores, setInspectores] = useState<InspectorDto[]>([]);

    const [asignacion, setAsignacion] = useState({
        codgrupo: "",
        codinspector: "",
        observacion: "",
        fecha_visita: ""
    });

    // Cargar grupos de trabajo al montar el componente
    useEffect(() => {
        loadGruposTrabajo();
    }, []);

    // Cargar inspectores cuando se seleccione un grupo
    useEffect(() => {
        if (asignacion.codgrupo) {
            const grupo = gruposTrabajo.find(g => g.codgrupo === asignacion.codgrupo);
            setGrupoSeleccionado(grupo || null);

            // Cargar inspectores de la brigada usando buscarPorColumna
            loadInspectores(asignacion.codgrupo);
        } else {
            setGrupoSeleccionado(null);
            setInspectores([]);
        }
    }, [asignacion.codgrupo, gruposTrabajo]);

    const loadGruposTrabajo = async () => {
        try {
            setLoadingGrupos(true);
            const grupos = await getGruposTrabajo();
            setGruposTrabajo(grupos);
        } catch (error) {
            console.error('Error al cargar grupos de trabajo:', error);
            toast.error('Error al cargar grupos de trabajo');
        } finally {
            setLoadingGrupos(false);
        }
    };

    const loadInspectores = async (codbrigada: string) => {
        try {
            setLoadingInspectores(true);
            const inspectoresData = await getInspectoresByBrigada(codbrigada);
            setInspectores(inspectoresData);

            // Limpiar inspector seleccionado si no está en la nueva lista
            if (asignacion.codinspector && !inspectoresData.find(i => i.codinspector === asignacion.codinspector)) {
                setAsignacion(prev => ({
                    ...prev,
                    codinspector: ""
                }));
            }
        } catch (error) {
            console.error('Error al cargar inspectores:', error);
            toast.error('Error al cargar inspectores');
        } finally {
            setLoadingInspectores(false);
        }
    };

    // Configurar opciones de grupos de trabajo
    const grupoOptions = gruposTrabajo.map(grupo => ({
        value: grupo.codgrupo,
        label: grupo.nombre
    }));

    // Configurar opciones de inspectores
    const inspectorOptions = inspectores.map(inspector => ({
        value: inspector.codinspector,
        label: inspector.nombres
    }));

    const handleGrupoChange = (value: string | number) => {
        setAsignacion(prev => ({
            ...prev,
            codgrupo: String(value),
            codinspector: "" // Limpiar inspector cuando cambie el grupo
        }));
    };

    const handleInspectorChange = (value: string | number) => {
        setAsignacion(prev => ({
            ...prev,
            codinspector: String(value)
        }));
    };

    const handleInputChange = (field: string, value: string) => {
        setAsignacion(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleProgramar = async () => {
        // Validaciones
        if (!asignacion.codgrupo) {
            toast.error("Debe seleccionar un grupo de trabajo");
            return;
        }

        if (!asignacion.codinspector) {
            toast.error("Debe seleccionar un inspector");
            return;
        }

        if (!asignacion.fecha_visita) {
            toast.error("Debe seleccionar una fecha de visita");
            return;
        }

        if (fichasSeleccionadas.length === 0) {
            toast.error("Debe seleccionar al menos una ficha para asignar");
            return;
        }

        try {
            setLoading(true);

            const request: AsignacionGrupalRequest = {
                fichas: fichasSeleccionadas,
                codgrupo: asignacion.codgrupo,
                codinspector: asignacion.codinspector,
                observacion: asignacion.observacion,
                fecha_visita: asignacion.fecha_visita
            };

            const response = await asignarFichasGrupal(request);

            if (response.success) {
                // Limpiar formulario
                setAsignacion({
                    codgrupo: "",
                    codinspector: "",
                    observacion: "",
                    fecha_visita: ""
                });

                onAsignacionCompleta();
            }
        } catch (error) {
            console.error('Error al programar asignación:', error);
            toast.error('Error al programar la asignación');
        } finally {
            setLoading(false);
        }
    };

    const puedeAsignar = fichasSeleccionadas.length > 0 &&
        asignacion.codgrupo &&
        asignacion.codinspector &&
        asignacion.fecha_visita;

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5" />
                        Asignación Grupal
                        {fichasSeleccionadas.length > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                ({fichasSeleccionadas.length} fichas seleccionadas)
                            </span>
                        )}
                    </CardTitle>
                    
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleExpand}
                        className="h-8 w-8 p-0"
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            
            {isExpanded && (
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Columna 1: Selección de Grupo y Líder */}
                        <div className="space-y-5">
                            {/* Grupo de trabajo */}
                            <ComboboxControlled
                                options={grupoOptions}
                                value={asignacion.codgrupo}
                                onChange={handleGrupoChange}
                                placeholder="Seleccionar grupo..."
                                searchPlaceholder="Buscar grupo..."
                                emptyMessage="No se encontraron grupos"
                                label="Grupo de trabajo"
                                disabled={loading || loadingGrupos}
                            />
                        </div>

                        <div className="space-y-5">
                            {/* Líder de grupo */}
                            <div className="space-y-2">
                                <Label>Líder de grupo</Label>
                                <Input
                                    value={grupoSeleccionado?.codlider || ""}
                                    placeholder="Seleccione un grupo primero"
                                    disabled={true}
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        {/* Columna 2: Selección de Inspector */}
                        <div className="space-y-5 lg:col-span-2">
                            {/* Inspector */}
                            <ComboboxControlled
                                options={inspectorOptions}
                                value={asignacion.codinspector}
                                onChange={handleInspectorChange}
                                placeholder="Seleccionar inspector..."
                                searchPlaceholder="Buscar inspector..."
                                emptyMessage="No se encontraron inspectores"
                                label="Inspector"
                                disabled={!grupoSeleccionado || loadingInspectores || loading || inspectores.length === 0}
                            />
                        </div>

                        {/* Columna 3: Fecha de visita */}
                        <div className="space-y-5">

                            {/* Fecha de visita */}
                            <div className="space-y-2">
                                <Label>Fecha de visita</Label>
                                <Input
                                    type="date"
                                    value={asignacion.fecha_visita}
                                    onChange={(e) => handleInputChange("fecha_visita", e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Columna 4: Observación */}
                        <div className="space-y-5 lg:col-span-2">
                            <Label>Observación</Label>
                            <Input
                                value={asignacion.observacion}
                                onChange={(e) => handleInputChange("observacion", e.target.value)}
                                placeholder="Ingrese observaciones (opcional)"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-3 lg:col-span-4">
                            {/* Resumen */}
                            <div className="p-3 rounded-lg border">
                                <div className="text-sm font-medium mb-2">Resumen de Asignación</div>
                                <div className="text-sm flex-col grid lg:grid-cols-2 gap-1">
                                    <div>📋 Fichas: {fichasSeleccionadas.length}</div>
                                    <div>👥 Grupo: {grupoSeleccionado?.nombre || "No seleccionado"}</div>
                                    <div>👤 Inspector: {inspectores.find(i => i.codinspector === asignacion.codinspector)?.nombres || "No seleccionado"}</div>
                                    <div>📅 Fecha: {asignacion.fecha_visita || "No seleccionada"}</div>
                                </div>
                            </div>

                            {/* Botón programar */}
                            <Button
                                onClick={handleProgramar}
                                disabled={!puedeAsignar || loading}
                                className="w-full flex items-center justify-center gap-2"
                                size="lg"
                            >
                                <Calendar className="h-4 w-4" />
                                {loading ? "Programando..." : "Programar Asignación"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
} 