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

interface AsignacionGrupalProps {
  fichasSeleccionadas: number[];
  onAsignacionCompleta: () => void;
}

export function AsignacionGrupal({
  fichasSeleccionadas,
  onAsignacionCompleta,
}: AsignacionGrupalProps) {
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

      const lideres = await buscarPorColumna<UsuarioDto>("usersystema", "codusu", codlider);
      
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

    try {
      setLoading(true);

      const dto: FichaUpdateMasivoDto = {
        idfichas: fichasSeleccionadas,
        inspector: asignacion.codinspector,
        encuestador: asignacion.codinspector, // El encuestador es el mismo inspector
        fechaVisita: asignacion.fecha_visita,
        observacion: asignacion.observacion || undefined,
        codbrigada: asignacion.codgrupo, // El código de brigada es el mismo que el grupo
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
    asignacion.fecha_visita;

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
                <Input
                  type="date"
                  value={asignacion.fecha_visita}
                  onChange={(e) =>
                    handleInputChange("fecha_visita", e.target.value)
                  }
                  disabled={loading}
                />
              </div>
            </div>

            {/* Columna 4: Observación */}
            <div className="space-y-5 lg:col-span-1">
              <Label>Observación</Label>
              <Input
                value={asignacion.observacion}
                onChange={(e) =>
                  handleInputChange("observacion", e.target.value)
                }
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
                <Calendar className="h-4 w-4" />
                {loading ? "Programando..." : "Programar asignación"}
              </Button>
            </div>

            {/* <div className="space-y-3 lg:col-span-4"> */}
            {/* Resumen */}
            {/* <div className="p-3 rounded-lg border">
                <div className="text-sm font-medium mb-2">
                  Resumen de Asignación
                </div>
                <div className="text-sm flex-col grid lg:grid-cols-2 gap-1">
                  <div>📋 Fichas: {fichasSeleccionadas.length}</div>
                  <div>
                    👥 Grupo: {grupoSeleccionado?.nombre || "No seleccionado"}
                  </div>
                  <div>
                    👤 Inspector:{" "}
                    {inspectores.find(
                      (i) => i.codinspector === asignacion.codinspector
                    )?.nombres || "No seleccionado"}
                  </div>
                  <div>
                    📅 Fecha: {asignacion.fecha_visita || "No seleccionada"}
                  </div>
                </div>
              </div> */}
            {/* </div> */}
        </div>
      </div>
    </div>
  );
}
