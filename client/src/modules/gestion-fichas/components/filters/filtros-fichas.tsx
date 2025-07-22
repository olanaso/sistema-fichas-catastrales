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
  const [filtros, setFiltros] = useState<FiltrosGestionFichas>({
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
      if (filtros.grupo)  {
        try {
          setLoadingInspectores(true);
          const inspectoresData = await getInspectoresPorGrupo(filtros.grupo);
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
  }, [filtros.grupo]);

  // Actualizar filtros cuando cambien las fechas
  useEffect(() => {
    setFiltros(prev => ({
      ...prev,
      fechaInicio: fechaInicio ? format(fechaInicio, 'yyyy-MM-dd') : "",
      fechaFin: fechaFin ? format(fechaFin, 'yyyy-MM-dd') : "",
    }));
  }, [fechaInicio, fechaFin]);
  
  const handleGrupoChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      grupo: String(value),
      inspector: "", // Limpiar inspector cuando cambie el grupo
    }));
  };

  const handleInspectorChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      inspector: String(value),
    }));
  };

  const handleEstadoChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      estado: String(value),
    }));
  };

  const handleFiltrar = () => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(filtros).filter(
        ([_, value]) => value && value.trim() !== ""
      )
    );
    onFiltrar(filtrosLimpios);
  };

  const handleLimpiar = () => {
    setFiltros({
      grupo: "",
      inspector: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "",
    });
    setFechaInicio(undefined);
    setFechaFin(undefined);
    onLimpiar();
  };

  const tieneFiltrosAplicados = () => {
    // Si solo hay estado seleccionado, no considerar como filtros aplicados
    const filtrosSinEstado = {
      grupo: filtros.grupo,
      inspector: filtros.inspector,
      fechaInicio: filtros.fechaInicio,
      fechaFin: filtros.fechaFin,
    };
    
    const tieneOtrosFiltros = Object.values(filtrosSinEstado).some(
      (value) => value && value.trim() !== ""
    );
    
    // Si hay fecha inicio, debe haber fecha fin
    const fechasValidas = !filtros.fechaInicio || (filtros.fechaInicio && filtros.fechaFin);
    
    return tieneOtrosFiltros && fechasValidas;
  };

  return (
    <div className="mb-6">
      <div>
        <Label className="text-lg font-bold">Filtros</Label>
        <div className="flex gap-4 justify-center items-center lg:flex-row flex-col">
          <ComboboxControlled
            options={grupos}
            value={filtros.grupo}
            onChange={handleGrupoChange}
            placeholder="Seleccionar grupo..."
            searchPlaceholder="Buscar grupo..."
            emptyMessage="No se encontraron grupos"
            label="Equipos de trabajo"
            loading={loading}
            disabled={loading}
          />

          <ComboboxControlled
            options={inspectores}
            value={filtros.inspector}
            onChange={handleInspectorChange}
            placeholder="Seleccionar inspector..."
            searchPlaceholder="Buscar inspector..."
            emptyMessage="No se encontraron inspectores"
            label="Inspector"
            loading={loadingInspectores}
            disabled={!filtros.grupo || loadingInspectores}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="fecha-inicio">F. Inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !fechaInicio && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {fechaInicio ? (
                    format(fechaInicio, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="fecha-fin">F. Fin</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={!fechaInicio}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !fechaFin && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {fechaFin ? (
                    format(fechaFin, "PPP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={fechaFin}
                  onSelect={setFechaFin}
                  disabled={(date) => {
                    // Deshabilitar si no hay fecha inicio seleccionada
                    if (!fechaInicio) return true;
                    // Deshabilitar fechas anteriores a la fecha inicio
                    return date < fechaInicio;
                  }}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <ComboboxControlled
            options={estados}
            value={filtros.estado}
            onChange={handleEstadoChange}
            placeholder="Seleccionar estado..."
            searchPlaceholder="Buscar estado..."
            emptyMessage="No se encontraron estados"
            label="Estado"
            loading={loading}
            disabled={loading}
          />

          <div className="flex items-end gap-2 justify-center mt-0 lg:mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLimpiar}
              disabled={!tieneFiltrosAplicados() || externalLoading}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>

            <Button
              size="sm"
              onClick={handleFiltrar}
              disabled={!tieneFiltrosAplicados() || externalLoading}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              {externalLoading ? "Filtrando..." : "Filtrar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
