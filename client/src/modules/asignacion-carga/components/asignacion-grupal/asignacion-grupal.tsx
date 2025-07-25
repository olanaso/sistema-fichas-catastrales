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
  X,
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
import { AsignacionTrabajo } from "@/models/asignacion-trabajo";
import { buscarExacto } from "@/service/data.actions";

interface AsignacionGrupalProps {
  cantidadFichas: number;
  fichasSeleccionadas: number[];
  onAsignacionCompleta: () => void;
  grupoPreseleccionado?: string;
  asignacionesProgramadas?: AsignacionTrabajo[];
}

export function AsignacionGrupal({
  cantidadFichas,
  fichasSeleccionadas,
  onAsignacionCompleta,
  grupoPreseleccionado,
  asignacionesProgramadas = [],
}: AsignacionGrupalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingInspectores, setLoadingInspectores] = useState(false);
  const [loadingGrupos, setLoadingGrupos] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar expansión
  const [isAsignacionesExpanded, setIsAsignacionesExpanded] = useState(false); // Estado para colapso de asignaciones
  const [loadingGrabar, setLoadingGrabar] = useState(false);
  const [loadingCancelar, setLoadingCancelar] = useState(false);
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

  // Preseleccionar grupo de trabajo cuando se proporcione la prop
  useEffect(() => {
    if (grupoPreseleccionado && gruposTrabajo.length > 0) {
      const grupo = gruposTrabajo.find(g => g.codgrupo === grupoPreseleccionado);
      if (grupo) {
        setAsignacion(prev => ({
          ...prev,
          codgrupo: grupoPreseleccionado
        }));
      }
    }
  }, [grupoPreseleccionado, gruposTrabajo]);

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

  // Función para agrupar asignaciones por inspector
  const getAsignacionesAgrupadasPorInspector = () => {
    const agrupadas = new Map();
    
    asignacionesProgramadas.forEach((asignacion) => {
      const key = `${asignacion.codinspector}-${asignacion.codbrigada}`;
      
      if (!agrupadas.has(key)) {
        agrupadas.set(key, {
          codinspector: asignacion.codinspector,
          codbrigada: asignacion.codbrigada,
          cantidadClientes: 0,
          fechas: new Set()
        });
      }
      
      const grupo = agrupadas.get(key);
      grupo.cantidadClientes++;
      
      if (asignacion.fecha_visita) {
        grupo.fechas.add(asignacion.fecha_visita);
      }
    });
    
    return Array.from(agrupadas.values());
  };

  const handleGrabarProgramacion = async () => {
    try {
      setLoadingGrabar(true);
      // TODO: Implementar acción de grabar programación en el backend
      console.log("Grabando programación...");
      toast.success("Programación grabada exitosamente");
      onAsignacionCompleta();
    } catch (error) {
      console.error("Error al grabar programación:", error);
      toast.error("Error al grabar la programación");
    } finally {
      setLoadingGrabar(false);
    }
  };

  const handleCancelarProgramacion = async () => {
    try {
      setLoadingCancelar(true);
      // TODO: Implementar acción de cancelar programación en el backend
      console.log("Cancelando programación...");
      toast.success("Programación cancelada exitosamente");
      onAsignacionCompleta();
    } catch (error) {
      console.error("Error al cancelar programación:", error);
      toast.error("Error al cancelar la programación");
    } finally {
      setLoadingCancelar(false);
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

      {/* Sección de Asignaciones Programadas */}
      {asignacionesProgramadas.length > 0 && (
        <div className="mt-4 space-y-3">
          <Separator />
          
          {/* Resumen de Asignaciones - Más compacto */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {asignacionesProgramadas.length} asignaciones programadas
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <CustomBadge color="blue" className="text-xs">
                      Pendiente de confirmación
                    </CustomBadge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botón para expandir/colapsar */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAsignacionesExpanded(!isAsignacionesExpanded)}
                  className="h-6 w-6 p-0"
                >
                  {isAsignacionesExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>

            {/* Detalle de Asignaciones (Colapsable) - Más compacto */}
            {isAsignacionesExpanded && (
              <div className="mt-3 space-y-2">
                {getAsignacionesAgrupadasPorInspector().map((grupo, index) => (
                  <div
                    key={`${grupo.codinspector}-${grupo.codbrigada}-${index}`}
                    className="p-2 bg-white border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Inspector:</span>
                        <p className="text-gray-600 dark:text-gray-400 truncate">
                          {grupo.codinspector}
                        </p>
                        <p className="text-gray-500">Cód: {grupo.codinspector}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Grupo:</span>
                        <p className="text-gray-600 dark:text-gray-400 truncate">
                          {grupo.codbrigada}
                        </p>
                        <p className="text-gray-500">Cód: {grupo.codbrigada}</p>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Fechas:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          {grupo.fechas.size > 0 ? Array.from(grupo.fechas).map(f => format(new Date(f as string), "dd/MM/yyyy")).join(", ") : "No definida"}
                        </p>
                        <p className="text-gray-500">Clientes: {grupo.cantidadClientes}</p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Clientes:</span>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                          {grupo.cantidadClientes} clientes asignados
                        </p>
                        <p className="text-gray-500">Estado: Programado</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Botones de Acción - Más compactos */}
            <div className="flex gap-2 justify-end mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelarProgramacion}
                disabled={loadingCancelar}
                className="flex items-center gap-1 h-8 px-3"
              >
                <X className="h-3 w-3" />
                {loadingCancelar ? "Cancelando..." : "Cancelar"}
              </Button>
              
              <Button
                size="sm"
                onClick={handleGrabarProgramacion}
                disabled={loadingGrabar}
                className="flex items-center gap-1 h-8 px-3 bg-green-600 hover:bg-green-700"
              >
                <CheckSquare className="h-3 w-3" />
                {loadingGrabar ? "Grabando..." : "Grabar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
