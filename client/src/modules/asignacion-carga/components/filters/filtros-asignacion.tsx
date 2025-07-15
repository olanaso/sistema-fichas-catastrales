"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { Search, Filter, X } from "lucide-react";
import { getSectores, getManzanasPorSector, getEstadosPadron, type FiltrosAsignacion } from "../../action/asignacion-carga.actions";

interface FiltrosAsignacionProps {
    onFiltrar: (filtros: FiltrosAsignacion) => void;
    onLimpiar: () => void;
}

export function FiltrosAsignacion({ onFiltrar, onLimpiar }: FiltrosAsignacionProps) {
    const [loading, setLoading] = useState(false);
    const [sectores, setSectores] = useState<{ value: string, label: string }[]>([]);
    const [manzanas, setManzanas] = useState<{ value: string, label: string }[]>([]);
    const [estadosPadron, setEstadosPadron] = useState<{ value: string, label: string }[]>([]);

    const [filtros, setFiltros] = useState<FiltrosAsignacion>({
        sector: "",
        manzana: "",
        estadoPadron: ""
    });

    const [loadingManzanas, setLoadingManzanas] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        const cargarDatosIniciales = async () => {
            try {
                setLoading(true);
                const [sectoresData, estadosData] = await Promise.all([
                    getSectores(),
                    getEstadosPadron()
                ]);

                setSectores(sectoresData);
                setEstadosPadron(estadosData);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosIniciales();
    }, []);

    // Cargar manzanas cuando cambie el sector
    useEffect(() => {
        const cargarManzanas = async () => {
            if (filtros.sector) {
                try {
                    setLoadingManzanas(true);
                    const manzanasData = await getManzanasPorSector(filtros.sector);
                    setManzanas(manzanasData);
                } catch (error) {
                    console.error('Error al cargar manzanas:', error);
                    setManzanas([]);
                } finally {
                    setLoadingManzanas(false);
                }
            } else {
                setManzanas([]);
            }
        };

        cargarManzanas();
    }, [filtros.sector]);

    const handleSectorChange = (value: string | number) => {
        setFiltros(prev => ({
            ...prev,
            sector: String(value),
            manzana: "" // Limpiar manzana cuando cambie el sector
        }));
    };

    const handleManzanaChange = (value: string | number) => {
        setFiltros(prev => ({
            ...prev,
            manzana: String(value)
        }));
    };

    const handleEstadoPadronChange = (value: string | number) => {
        setFiltros(prev => ({
            ...prev,
            estadoPadron: String(value)
        }));
    };

    const handleFiltrar = () => {
        const filtrosLimpios = Object.fromEntries(
            Object.entries(filtros).filter(([_, value]) => value && value.trim() !== "")
        );
        onFiltrar(filtrosLimpios);
    };

    const handleLimpiar = () => {
        setFiltros({
            sector: "",
            manzana: "",
            estadoPadron: ""
        });
        onLimpiar();
    };

    const tieneFiltrosAplicados = Object.values(filtros).some(value => value && value.trim() !== "");

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="h-5 w-5" />
                    Filtros de Búsqueda
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <ComboboxControlled
                        options={sectores}
                        value={filtros.sector}
                        onChange={handleSectorChange}
                        placeholder="Seleccionar sector..."
                        searchPlaceholder="Buscar sector..."
                        emptyMessage="No se encontraron sectores"
                        label="Sector"
                        loading={loading}
                        disabled={loading}
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
                        value={filtros.estadoPadron}
                        onChange={handleEstadoPadronChange}
                        placeholder="Seleccionar estado..."
                        searchPlaceholder="Buscar estado..."
                        emptyMessage="No se encontraron estados"
                        label="Estado Padrón"
                        loading={loading}
                        disabled={loading}
                    />
                </div>

                <div className="flex items-center gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLimpiar}
                        disabled={!tieneFiltrosAplicados}
                        className="flex items-center gap-2"
                    >
                        <X className="h-4 w-4" />
                        Limpiar
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleFiltrar}
                        disabled={!tieneFiltrosAplicados}
                        className="flex items-center gap-2"
                    >
                        <Search className="h-4 w-4" />
                        Filtrar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 