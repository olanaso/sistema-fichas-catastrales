"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { UserPlus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Inspector } from "@/models/inspector";
import { asignarFichaIndividual, type FichaUpdateDto } from "../../action/asignacion-carga.actions";
import { toast } from "sonner";
import { Cliente } from "@/models/cliente";
import { useAuth } from "@/hooks/use-auth";

interface AsignacionIndividualPopoverProps {
    ficha: Cliente;
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
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [asignacion, setAsignacion] = useState({
        codinspector: ficha.codinspector || "",
        fecha_visita: ficha.fecha_visita || "",
        observaciones: ficha.observaciones || ""
    });
    const [fechaVisita, setFechaVisita] = useState<Date | undefined>(
        ficha.fecha_visita ? new Date(ficha.fecha_visita) : undefined
    );

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

    // Actualizar fecha_visita en asignacion cuando cambie fechaVisita
    const handleFechaVisitaChange = (date: Date | undefined) => {
        setFechaVisita(date);
        setAsignacion(prev => ({
            ...prev,
            fecha_visita: date ? format(date, 'yyyy-MM-dd') : ""
        }));
    };

    const handleAsignar = async () => {
        // Validaciones
        if (!asignacion.codinspector) {
            toast.error("Debe seleccionar un inspector");
            return;
        }

        if (!asignacion.fecha_visita) {
            toast.error("Debe seleccionar una fecha de visita");
            return;
        }

        if (!user?.codusu) {
            toast.error("Error: Usuario no autenticado");
            return;
        }

        try {
            setLoading(true);

            // Obtener el código de brigada del inspector seleccionado
            const inspectorSeleccionado = inspectores.find(i => i.codinspector === asignacion.codinspector);
            const codbrigada = inspectorSeleccionado?.codbrigada || "";

            if (!codbrigada) {
                toast.error("Error: No se pudo determinar la brigada del inspector");
                return;
            }

            const dto: FichaUpdateDto = {
                codbrigada: codbrigada, // varchar(20) NOT NULL
                codcliente: ficha.codcliente, // int4 NOT NULL
                codinspector: asignacion.codinspector, // varchar(20) NOT NULL
                estado: "Programado", // varchar(20) NOT NULL
                observaciones: asignacion.observaciones || undefined, // text NULL (opcional)
                fecha_visita: asignacion.fecha_visita, // date NULL (formato ISO)
                codcreador: user.codusu, // varchar NOT NULL
            };

            const response = await asignarFichaIndividual(dto);

            if (response.success) {
                // Limpiar formulario
                setAsignacion({
                    codinspector: "",
                    fecha_visita: "",
                    observaciones: ""
                });
                setFechaVisita(undefined);

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

    const puedeAsignar = asignacion.codinspector && asignacion.fecha_visita && user?.codusu;

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
                                value={asignacion.codinspector}
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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !fechaVisita && "text-muted-foreground"
                                        )}
                                        disabled={loading}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {fechaVisita ? (
                                            format(fechaVisita, "PPP", { locale: es })
                                        ) : (
                                            <span>Seleccionar fecha</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <CalendarComponent
                                        mode="single"
                                        selected={fechaVisita}
                                        onSelect={handleFechaVisitaChange}
                                        locale={es}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Observación */}
                        <div className="space-y-2">
                            <Label>Observación (opcional)</Label>
                            <Textarea
                                value={asignacion.observaciones}
                                onChange={(e) => handleInputChange("observaciones", e.target.value)}
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