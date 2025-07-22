"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Search, Filter, X } from "lucide-react";
import {
  getSucursales,
  getSectoresPorSucursal,
  getManzanasPorSector,
  getEstadosPadron,
  type FiltrosAsignacion,
} from "../../action/asignacion-carga.actions";
import { ComboboxOption } from "@/types/combobox";
import { Label } from "@/components/ui/label";

interface FiltrosAsignacionProps {
  onFiltrar: (filtros: FiltrosAsignacion) => void;
  onLimpiar: () => void;
  loading?: boolean;
}

export function FiltrosAsignacion({
  onFiltrar,
  onLimpiar,
  loading: externalLoading = false,
}: FiltrosAsignacionProps) {
  const [loading, setLoading] = useState(false);
  const [sucursales, setSucursales] = useState<ComboboxOption[]>([]);
  const [sectores, setSectores] = useState<ComboboxOption[]>([]);
  const [manzanas, setManzanas] = useState<ComboboxOption[]>([]);
  const [estadosPadron, setEstadosPadron] = useState<ComboboxOption[]>([]);

  const [filtros, setFiltros] = useState<FiltrosAsignacion>({
    sucursal: "",
    sector: "",
    manzana: "",
    estadoRegistro: "",
  });

  const [loadingSectores, setLoadingSectores] = useState(false);
  const [loadingManzanas, setLoadingManzanas] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setLoading(true);
        const [sucursalesData, estadosData] = await Promise.all([
          getSucursales(),
          getEstadosPadron(),
        ]);

        setSucursales(sucursalesData);
        setEstadosPadron(estadosData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, []);

  // Cargar sectores cuando cambie la sucursal
  useEffect(() => {
    const cargarSectores = async () => {
      if (filtros.sucursal) {
        try {
          setLoadingSectores(true);
          const sectoresData = await getSectoresPorSucursal(filtros.sucursal);
          setSectores(sectoresData);
        } catch (error) {
          console.error("Error al cargar sectores:", error);
          setSectores([]);
        } finally {
          setLoadingSectores(false);
        }
      } else {
        setSectores([]);
      }
    };

    cargarSectores();
  }, [filtros.sucursal]);

  // Cargar manzanas cuando cambie el sector
  useEffect(() => {
    const cargarManzanas = async () => {
      if (filtros.sucursal && filtros.sector) {
        try {
          setLoadingManzanas(true);
          const manzanasData = await getManzanasPorSector(
            filtros.sucursal,
            filtros.sector
          );
          setManzanas(manzanasData);
        } catch (error) {
          console.error("Error al cargar manzanas:", error);
          setManzanas([]);
        } finally {
          setLoadingManzanas(false);
        }
      } else {
        setManzanas([]);
      }
    };

    cargarManzanas();
  }, [filtros.sucursal, filtros.sector]);

  const handleSucursalChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      sucursal: String(value),
      sector: "", // Limpiar sector cuando cambie la sucursal
      manzana: "", // Limpiar manzana cuando cambie la sucursal
    }));
  };

  const handleSectorChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      sector: String(value),
      manzana: "", // Limpiar manzana cuando cambie el sector
    }));
  };

  const handleManzanaChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      manzana: String(value),
    }));
  };

  const handleEstadoPadronChange = (value: string | number) => {
    setFiltros((prev) => ({
      ...prev,
      estadoRegistro: String(value),
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
      sucursal: "",
      sector: "",
      manzana: "",
      estadoRegistro: "",
    });
    onLimpiar();
  };

  const tieneFiltrosAplicados = Object.values(filtros).some(
    (value) => value && value.trim() !== ""
  );

  return (
    <div className="mb-6">
      <div>
      <Label className="text-lg font-bold">Filtros</Label>
        <div className="flex gap-4 justify-center items-center lg:flex-row flex-col">
          <ComboboxControlled
            options={sucursales}
            value={filtros.sucursal}
            onChange={handleSucursalChange}
            placeholder="Seleccionar sucursal..."
            searchPlaceholder="Buscar sucursal..."
            emptyMessage="No se encontraron sucursales"
            label="Sucursal"
            loading={loading}
            disabled={loading}
          />

          <ComboboxControlled
            options={sectores}
            value={filtros.sector}
            onChange={handleSectorChange}
            placeholder="Seleccionar sector..."
            searchPlaceholder="Buscar sector..."
            emptyMessage="No se encontraron sectores"
            label="Sector"
            loading={loadingSectores}
            disabled={!filtros.sucursal || loadingSectores}
          />

          <ComboboxControlled
            options={manzanas}
            value={filtros.manzana}
            onChange={handleManzanaChange}
            placeholder="Seleccionar manzana..."
            searchPlaceholder="Buscar manzana..."
            emptyMessage="No se encontraron manzanas"
            label="Manzana"
            loading={loadingManzanas}
            disabled={!filtros.sector || loadingManzanas}
          />

          <ComboboxControlled
            options={estadosPadron}
            value={filtros.estadoRegistro}
            onChange={handleEstadoPadronChange}
            placeholder="Seleccionar estado..."
            searchPlaceholder="Buscar estado..."
            emptyMessage="No se encontraron estados"
            label="Estado Padrón"
            loading={loading}
            disabled={loading}
          />

          <div className="flex items-end gap-2 justify-center mt-0 lg:mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLimpiar}
              disabled={!tieneFiltrosAplicados || externalLoading}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>

            <Button
              size="sm"
              onClick={handleFiltrar}
              disabled={!tieneFiltrosAplicados || externalLoading}
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
