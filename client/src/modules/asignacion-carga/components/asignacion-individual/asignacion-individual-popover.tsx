"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserPlus } from "lucide-react";
import { FichaCatastro } from "@/models/fichacatastro";
import { Inspector } from "@/models/inspector";
import { asignarFichaIndividual, type FichaUpdateDto } from "../../action/asignacion-carga.actions";
import { toast } from "sonner";


interface AsignacionIndividualPopoverProps {
    ficha: FichaCatastro;
    inspectores: Inspector[];
    onAsignacionCompleta?: () => void;
    children: React.ReactNode;
}

export function AsignacionIndividualPopover({
    inspectores,
    ficha,
    onAsignacionCompleta,
    children
}: AsignacionIndividualPopoverProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [asignacion, setAsignacion] = useState({
        inspector: ficha.codinspector,
        fechaVisita: ficha.fecha_visita,
        observacion: ficha.observacion
    });

    const handleInspectorChange = (value: string | number) => {
        setAsignacion(prev => ({
            ...prev,
            inspector: String(value)
        }));
    };

    const handleInputChange = (field: string, value: string) => {
        setAsignacion(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAsignar = async () => {
        // Validaciones
        if (!asignacion.inspector) {
            toast.error("Debe seleccionar un inspector");
            return;
        }

        if (!asignacion.fechaVisita) {
            toast.error("Debe seleccionar una fecha de visita");
            return;
        }

        try {
            setLoading(true);

            const dto: FichaUpdateDto = {
                idficha: ficha.idficha,
                inspector: asignacion.inspector,
                encuestador: asignacion.inspector, // El encuestador es el mismo inspector
                fechaVisita: asignacion.fechaVisita.toString(),
                observacion: asignacion.observacion || undefined,
                codbrigada: inspectores.find(i => i.codinspector === asignacion.inspector)?.codbrigada || ""
            };

            const response = await asignarFichaIndividual(dto);

            if (response.success) {
                // Limpiar formulario
                setAsignacion({
                    inspector: "",
                    fechaVisita: "",
                    observacion: ""
                });

                // Cerrar popover
                setOpen(false);

                // Notificar al componente padre
                if (onAsignacionCompleta) {
                    onAsignacionCompleta();
                }
            }
        } catch (error) {
            console.error("Error al asignar ficha:", error);
        } finally {
            setLoading(false);
        }
    };

    const puedeAsignar = asignacion.inspector && asignacion.fechaVisita;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Asignar ficha individual</h4>
                    </div>

                    <div className="space-y-3">
                        {/* Inspector */}
                        <div className="space-y-2">
                            <Label>Inspector</Label>
                            <ComboboxControlled
                                options={inspectores
                                    .map(inspector => ({
                                        label: inspector.nombres,
                                        value: inspector.codinspector
                                    }))}
                                value={asignacion.inspector}
                                onChange={handleInspectorChange}
                                placeholder="Seleccionar inspector..."
                                searchPlaceholder="Buscar inspector..."
                                emptyMessage="No se encontraron inspectores"
                                loading={loading}
                                disabled={loading}
                            />
                        </div>

                        {/* Fecha de visita */}
                        <div className="space-y-2">
                            <Label>Fecha de visita</Label>
                            <Input
                                type="date"
                                value={asignacion.fechaVisita?.toString() || ""}
                                onChange={(e) => handleInputChange("fechaVisita", e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        {/* Observación */}
                        <div className="space-y-2">
                            <Label>Observación (opcional)</Label>
                            <Textarea
                                value={asignacion.observacion}
                                onChange={(e) => handleInputChange("observacion", e.target.value)}
                                placeholder="Ingrese observaciones..."
                                disabled={loading}
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex items-center gap-2 justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleAsignar}
                            disabled={!puedeAsignar || loading}
                            className="flex items-center gap-2"
                        >
                            <UserPlus className="h-4 w-4" />
                            {loading ? "Asignando..." : "Asignar"}
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
} 