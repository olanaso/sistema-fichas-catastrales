"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import {
  Calendar as CalendarIcon,
  Users,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  SquareDashedMousePointer,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { GrupoTrabajoDto } from "@/models/grupotrabajo";
import { InspectorDto } from "@/models/inspector";
import { UsuarioDto } from "@/models/usuario";
import {
  asignarFichasMasivo,
  getGruposTrabajo,
  getInspectoresByBrigada,
  type AsignacionGrupalRequest,
  type FichaUpdateMasivoDto,
} from "../../action/asignacion-carga.actions";
import { buscarPorColumna } from "@/service/obtener-data-dinamico";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { CustomBadge } from "@/components/custom/custom-badge";
import { useAuth } from "@/hooks/use-auth";

interface AsignacionGrupalProps {
  cantidadFichas: number;
  fichasSeleccionadas: number[];
  onAsignacionCompleta: () => void;
}

export function AsignacionGrupal({
  cantidadFichas,
  fichasSeleccionadas,
  onAsignacionCompleta,
}: AsignacionGrupalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingInspectores, setLoadingInspectores] = useState(false);
  const [loadingGrupos, setLoadingGrupos] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar expansión
  const [gruposTrabajo, setGruposTrabajo] = useState<GrupoTrabajoDto[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] =
    useState<GrupoTrabajoDto | null>(null);
  const [inspectores, setInspectores] = useState<InspectorDto[]>([]);
  const [liderGrupo, setLiderGrupo] = useState<UsuarioDto | null>(null);

  const [asignacion, setAsignacion] = useState({
    codgrupo: "",
    codinspector: "",
    observacion: "",
    fecha_visita: "",
  });
  const [fechaVisita, setFechaVisita] = useState<Date>();

  // Cargar grupos de trabajo al montar el componente
  useEffect(() => {
    loadGruposTrabajo();
  }, []);

  // Cargar inspectores y líder cuando se seleccione un grupo
  useEffect(() => {
    if (asignacion.codgrupo) {
      const grupo = gruposTrabajo.find(
        (g) => g.codgrupo === asignacion.codgrupo
      );
      setGrupoSeleccionado(grupo || null);

      if (grupo) {
        // Cargar inspectores de la brigada usando buscarPorColumna
        loadInspectores(asignacion.codgrupo);
        // Cargar datos del líder del grupo
        loadLiderGrupo(grupo.codlider);
      }
    } else {
      setGrupoSeleccionado(null);
      setInspectores([]);
      setLiderGrupo(null);
    }
  }, [asignacion.codgrupo, gruposTrabajo]);

  // Actualizar fecha_visita cuando cambie fechaVisita
  useEffect(() => {
    setAsignacion((prev) => ({
      ...prev,
      fecha_visita: fechaVisita ? format(fechaVisita, "yyyy-MM-dd") : "",
    }));
  }, [fechaVisita]);

  const loadGruposTrabajo = async () => {
    try {
      setLoadingGrupos(true);
      const grupos = await getGruposTrabajo();
      setGruposTrabajo(grupos);
    } catch (error) {
      console.error("Error al cargar grupos de trabajo:", error);
      toast.error("Error al cargar grupos de trabajo");
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
      if (
        asignacion.codinspector &&
        !inspectoresData.find((i) => i.codinspector === asignacion.codinspector)
      ) {
        setAsignacion((prev) => ({
          ...prev,
          codinspector: "",
        }));
      }
    } catch (error) {
      console.error("Error al cargar inspectores:", error);
      toast.error("Error al cargar inspectores");
    } finally {
      setLoadingInspectores(false);
    }
  };

  const loadLiderGrupo = async (codlider: string) => {
    try {
      if (!codlider) {
        setLiderGrupo(null);
        return;
      }

      const lideres = await buscarPorColumna<UsuarioDto>(
        "usersystema",
        "codusu",
        codlider
      );

      if (lideres && lideres.length > 0) {
        setLiderGrupo(lideres[0]);
      } else {
        setLiderGrupo(null);
        console.warn(`No se encontró el líder con código: ${codlider}`);
      }
    } catch (error) {
      console.error("Error al cargar datos del líder:", error);
      setLiderGrupo(null);
    }
  };

  // Configurar opciones de grupos de trabajo
  const grupoOptions = gruposTrabajo.map((grupo) => ({
    value: grupo.codgrupo,
    label: grupo.nombre,
  }));

  // Configurar opciones de inspectores
  const inspectorOptions = inspectores.map((inspector) => ({
    value: inspector.codinspector,
    label: inspector.nombres,
  }));

  const handleGrupoChange = (value: string | number) => {
    setAsignacion((prev) => ({
      ...prev,
      codgrupo: String(value),
      codinspector: "", // Limpiar inspector cuando cambie el grupo
    }));
  };

  const handleInspectorChange = (value: string | number) => {
    setAsignacion((prev) => ({
      ...prev,
      codinspector: String(value),
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setAsignacion((prev) => ({
      ...prev,
      [field]: value,
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

    if (!user?.codusu) {
      toast.error("Error: Usuario no autenticado");
      return;
    }

    try {
      setLoading(true);

      const dto: FichaUpdateMasivoDto = {
        codbrigada: asignacion.codgrupo, // varchar(20) NOT NULL
        codclientes: fichasSeleccionadas, // Array de códigos de clientes
        codinspector: asignacion.codinspector, // varchar(20) NOT NULL
        estado: "Programado", // varchar(20) NOT NULL
        observaciones: asignacion.observacion || undefined, // text NULL (opcional)
        fecha_visita: asignacion.fecha_visita, // date NULL (formato ISO)
        codcreador: user.codusu, // varchar NOT NULL
      };

      const response = await asignarFichasMasivo(dto);

      if (response.success) {
        // Limpiar formulario
        setAsignacion({
          codgrupo: "",
          codinspector: "",
          observacion: "",
          fecha_visita: "",
        });
        setFechaVisita(undefined);

        onAsignacionCompleta();
      }
    } catch (error) {
      console.error("Error al programar asignación:", error);
      toast.error("Error al programar la asignación");
    } finally {
      setLoading(false);
    }
  };

  const puedeAsignar =
    fichasSeleccionadas.length > 0 &&
    asignacion.codgrupo &&
    asignacion.codinspector &&
    asignacion.fecha_visita &&
    user?.codusu;

  // Función para obtener el nombre completo del líder
  const getLiderNombreCompleto = () => {
    if (!liderGrupo) {
      return grupoSeleccionado?.codlider || "No disponible";
    }
    return `${liderGrupo.nombre} ${liderGrupo.apellidopa} ${liderGrupo.apellidoma}`.trim();
  };

  return (
    <div className="mb-6">
      <div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Columna 1: Selección de Grupo y Líder */}
          <div className="space-y-1">
            {/* Grupo de trabajo */}
            <ComboboxControlled
              options={grupoOptions}
              value={asignacion.codgrupo}
              onChange={handleGrupoChange}
              placeholder="Seleccionar grupo..."
              searchPlaceholder="Buscar grupo..."
              emptyMessage="No se encontraron grupos"
              label="Grupo de trabajo a asignar"
              disabled={loading || loadingGrupos}
            />
            <Label className="text-sm text-muted-foreground pl-2">
              Líder: {getLiderNombreCompleto()}
            </Label>
          </div>

          {/* Columna 2: Selección de Inspector */}
          <div className="space-y-1 lg:col-span-1">
            {/* Inspector */}
            <ComboboxControlled
              options={inspectorOptions}
              value={asignacion.codinspector}
              onChange={handleInspectorChange}
              placeholder="Seleccionar inspector..."
              searchPlaceholder="Buscar inspector..."
              emptyMessage="No se encontraron inspectores"
              label="Inspector"
              disabled={
                !grupoSeleccionado ||
                loadingInspectores ||
                loading ||
                inspectores.length === 0
              }
            />
          </div>

          {/* Columna 3: Fecha de visita */}
          <div className="space-y-5">
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
                    onSelect={setFechaVisita}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Columna 4: Observación */}
          <div className="space-y-5 lg:col-span-1">
            <Label>Observación</Label>
            <Input
              value={asignacion.observacion}
              onChange={(e) => handleInputChange("observacion", e.target.value)}
              placeholder="Ingrese observaciones (opcional)"
              disabled={loading}
            />
          </div>

          {/* Botón programar */}
          <div className="space-y-1 mt-6">
            <Button
              onClick={handleProgramar}
              disabled={!puedeAsignar || loading}
              className="w-full flex items-center justify-center gap-2"
              size="sm"
            >
              <CalendarIcon className="h-4 w-4" />
              {loading ? "Programando..." : "Programar asignación"}
            </Button>
          </div>
        </div>
      </div>
      {inspectores.length > 0 && (
      <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-950/20 dark:border-orange-800">
        <SquareDashedMousePointer className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
          {inspectores.length} inspectores disponibles
        </span>
        <CustomBadge color="orange" className="text-xs">
            {Math.ceil(cantidadFichas/inspectores.length) - 1} fichas por inspector - {cantidadFichas % inspectores.length} fichas restantes
          </CustomBadge>
        </div>
      )}
    </div>
  );
}
