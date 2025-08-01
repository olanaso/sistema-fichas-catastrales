"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Search, X, Calendar } from "lucide-react";
import { ComboboxOption } from "@/types/combobox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { 
  getGruposTrabajo, 
  getInspectoresPorGrupo, 
  getEstadosFichas,
  FiltrosGestionFichas 
} from "../../action/gestion-fichas.actions";
import { useFiltrosPersistentes } from "@/hooks/use-filtros-persistentes";
import { AppliedFiltersBar } from "@/components/custom/applied-filters-bar";

interface FiltrosFichasProps {
  onFiltrar: (filtros: FiltrosGestionFichas) => void;
  onLimpiar: () => void;
  loading?: boolean;
}

export function FiltrosFichas({
  onFiltrar,
  onLimpiar,
  loading: externalLoading = false,
}: FiltrosFichasProps) {
  const [loading, setLoading] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  
  // Hook para persistencia de filtros
  const {
    filtros,
    guardarFiltrosAplicados,
    limpiarFiltros,
    tieneFiltrosAplicados,
    isLoaded
  } = useFiltrosPersistentes<FiltrosGestionFichas>(
    "gestion-fichas-filtros",
    {
      grupo: "",
      inspector: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "",
    }
  );

  // Estado local para el formulario
  const [filtrosFormulario, setFiltrosFormulario] = useState<FiltrosGestionFichas>({
    grupo: "",
    inspector: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "",
  });
  const [ grupos, setGrupos ] = useState<ComboboxOption[]>([]);
  const [ inspectores, setInspectores ] = useState<ComboboxOption[]>([]);
  const [ estados, setEstados ] = useState<ComboboxOption[]>([]);

  const [loadingInspectores, setLoadingInspectores] = useState(false);
  const [fechaInicio, setFechaInicio] = useState<Date>();
  const [fechaFin, setFechaFin] = useState<Date>();

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setLoading(true);
        const [gruposData, estadosData] = await Promise.all([
          getGruposTrabajo(),
          getEstadosFichas(),
        ]);
        setGrupos(gruposData);
        setEstados(estadosData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatosIniciales();
  }, []);

  // Cargar inspectores cuando cambie el grupo
  useEffect(() => {
    const cargarInspectores = async () => {
      if (filtrosFormulario.grupo)  {
        try {
          setLoadingInspectores(true);
          const inspectoresData = await getInspectoresPorGrupo(filtrosFormulario.grupo);
          setInspectores(inspectoresData);
        } catch (error) {
          console.error("Error al cargar inspectores:", error);
          setInspectores([]);
        } finally {
          setLoadingInspectores(false);
        }
      } else {
        setInspectores([]);
      }
    };

    cargarInspectores();
  }, [filtrosFormulario.grupo]);

  // Actualizar filtros cuando cambien las fechas
  useEffect(() => {
    setFiltrosFormulario(prev => ({
      ...prev,
      fechaInicio: fechaInicio ? format(fechaInicio, 'yyyy-MM-dd') : "",
      fechaFin: fechaFin ? format(fechaFin, 'yyyy-MM-dd') : "",
    }));
  }, [fechaInicio, fechaFin]);
  
  const handleGrupoChange = (value: string | number) => {
    setFiltrosFormulario((prev) => ({
      ...prev,
      grupo: String(value),
      inspector: "", // Limpiar inspector cuando cambie el grupo
    }));
  };

  const handleInspectorChange = (value: string | number) => {
    setFiltrosFormulario((prev) => ({
      ...prev,
      inspector: String(value),
    }));
  };

  const handleEstadoChange = (value: string | number) => {
    setFiltrosFormulario((prev) => ({
      ...prev,
      estado: String(value),
    }));
  };

  const handleFiltrar = () => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(filtrosFormulario).filter(
        ([_, value]) => value && value.trim() !== ""
      )
    );
    // Guardar filtros aplicados
    guardarFiltrosAplicados(filtrosLimpios);
    // Ocultar formulario
    setMostrarFormulario(false);
    onFiltrar(filtrosLimpios);
  };

  const handleLimpiar = () => {
    limpiarFiltros();
    setFiltrosFormulario({
      grupo: "",
      inspector: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "",
    });
    setFechaInicio(undefined);
    setFechaFin(undefined);
    setMostrarFormulario(true);
    onLimpiar();
  };

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  // Cargar filtros guardados cuando se carga el componente
  useEffect(() => {
    if (isLoaded && tieneFiltrosAplicados()) {
      // Si hay filtros guardados, ocultar el formulario
      setMostrarFormulario(false);
    }
  }, [isLoaded]);

  const tieneFiltrosAplicadosLocal = () => {
    // Si solo hay estado seleccionado, no considerar como filtros aplicados
    const filtrosSinEstado = {
      grupo: filtrosFormulario.grupo,
      inspector: filtrosFormulario.inspector,
      fechaInicio: filtrosFormulario.fechaInicio,
      fechaFin: filtrosFormulario.fechaFin,
    };
    
    const tieneOtrosFiltros = Object.values(filtrosSinEstado).some(
      (value) => value && value.trim() !== ""
    );
    
    // Si hay fecha inicio, debe haber fecha fin
    const fechasValidas = !filtrosFormulario.fechaInicio || (filtrosFormulario.fechaInicio && filtrosFormulario.fechaFin);
    
    return tieneOtrosFiltros && fechasValidas;
  };

  return (
    <div className="mb-4">
      {/* Mostrar barra de filtros aplicados si hay filtros guardados y no se muestra el formulario */}
      {tieneFiltrosAplicados() && !mostrarFormulario && (
        <AppliedFiltersBar
          filtros={filtros}
          onLimpiar={handleLimpiar}
          onMostrarFormulario={handleMostrarFormulario}
          grupos={grupos}
          inspectores={inspectores}
          estados={estados}
        />
      )}

      {/* Mostrar formulario de filtros */}
      {mostrarFormulario && (
        <div>
          <Label className="text-base font-semibold">Filtros</Label>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mt-2">
          <ComboboxControlled
            options={grupos}
            value={filtrosFormulario.grupo}
            onChange={handleGrupoChange}
            placeholder="Seleccionar..."
            searchPlaceholder="Buscar grupo..."
            emptyMessage="No se encontraron grupos"
            label="Equipos"
            loading={loading}
            disabled={loading}
          />

          <ComboboxControlled
            options={inspectores}
            value={filtrosFormulario.inspector}
            onChange={handleInspectorChange}
            placeholder="Seleccionar..."
            searchPlaceholder="Buscar inspector..."
            emptyMessage="No se encontraron inspectores"
            label="Inspector"
            loading={loadingInspectores}
            disabled={!filtrosFormulario.grupo || loadingInspectores}
          />

          <div className="space-y-1">
            <Label>F. Inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left font-normal h-9",
                    !fechaInicio && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-3 w-3" />
                  {fechaInicio ? (
                    format(fechaInicio, "dd/MM/yyyy")
                  ) : (
                    <span className="text-xs">Seleccionar</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={fechaInicio}
                  onSelect={setFechaInicio}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label htmlFor="fecha-fin">F. Fin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!fechaInicio}
                  className={cn(
                    "w-full justify-start text-left font-normal h-9",
                    !fechaFin && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-3 w-3" />
                  {fechaFin ? (
                    format(fechaFin, "dd/MM/yyyy")
                  ) : (
                    <span className="text-xs">Seleccionar</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={fechaFin}
                  onSelect={setFechaFin}
                  disabled={(date) => {
                    if (!fechaInicio) return true;
                    return date < fechaInicio;
                  }}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <ComboboxControlled
            options={estados}
            value={filtrosFormulario.estado}
            onChange={handleEstadoChange}
            placeholder="Seleccionar..."
            searchPlaceholder="Buscar estado..."
            emptyMessage="No se encontraron estados"
            label="Estado"
            loading={loading}
            disabled={loading}
          />

          <div className="flex items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLimpiar}
              disabled={!tieneFiltrosAplicadosLocal() || externalLoading}
              className="flex items-center gap-1 h-9 px-3"
            >
              <X className="h-3 w-3" />
              <span className="text-xs">Limpiar</span>
            </Button>

            <Button
              size="sm"
              onClick={handleFiltrar}
              disabled={!tieneFiltrosAplicadosLocal() || externalLoading}
              className="flex items-center gap-1 h-9 px-3"
            >
              <Search className="h-3 w-3" />
              <span className="text-xs">
                {externalLoading ? "Filtrando..." : "Filtrar"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
