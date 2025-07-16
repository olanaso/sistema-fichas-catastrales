"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Users, Database } from "lucide-react";
import { AsignacionCargaProvider, useAsignacionCarga } from "../context/asignacion-carga-context";
import { FiltrosAsignacion } from "../components/filters/filtros-asignacion";
import { AsignacionGrupal } from "../components/asignacion-grupal/asignacion-grupal";
import TableAsignacion from "../components/table/table-asignacion";
import { getFichasConFiltros, type FiltrosAsignacion as FiltrosAsignacionType } from "../action/asignacion-carga.actions";

// Componente de carga
function AsignacionCargaSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </div>
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[600px] w-full" />
        </div>
    );
}

// Componente interno que usa el contexto
function AsignacionCargaContent() {
    const {
        data: fichas,
        isLoading,
        error,
        refreshData,
        pagination,
        handlePageChange,
        handlePageSizeChange
    } = useAsignacionCarga();

    const [fichasSeleccionadas, setFichasSeleccionadas] = useState<number[]>([]);
    const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosAsignacionType>({});

    // Cargar datos iniciales
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    useEffect(() => {
        console.log("Fichas para asignación cargadas:", fichas);
    }, [fichas, isLoading, error, pagination]);

    const handleFiltrar = async (filtros: FiltrosAsignacionType) => {
        try {
            setFiltrosAplicados(filtros);
            // Por ahora, solo aplicar filtros localmente
            // En una implementación real, se enviarían los filtros al backend
            await getFichasConFiltros(filtros);
            await refreshData();
        } catch (error) {
            console.error('Error al aplicar filtros:', error);
        }
    };

    const handleLimpiarFiltros = async () => {
        setFiltrosAplicados({});
        await refreshData();
    };

    const handleSelectionChange = (selectedIds: number[]) => {
        // Obtener los IDs de las fichas de la página actual
        const currentPageIds = fichas.data.map(ficha => ficha.idficha);

        // Remover las fichas de la página actual de las selecciones anteriores
        const fichasOtrasPaginas = fichasSeleccionadas.filter(id => !currentPageIds.includes(id));

        // Combinar con las nuevas selecciones de la página actual
        const nuevasSelecciones = [...fichasOtrasPaginas, ...selectedIds];

        // Solo actualizar si realmente cambió
        if (JSON.stringify(nuevasSelecciones.sort()) !== JSON.stringify(fichasSeleccionadas.sort())) {
            setFichasSeleccionadas(nuevasSelecciones);
        }
    };

    const handleAsignacionCompleta = async () => {
        // Limpiar selección y recargar datos
        setFichasSeleccionadas([]);
        await refreshData();
    };

    if (isLoading && fichas.data.length === 0) {
        return <AsignacionCargaSkeleton />;
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            Asignación de Carga
                        </h2>
                        <p className="text-muted-foreground">
                            Gestiona la asignación de fichas catastrales a grupos de trabajo
                        </p>
                    </div>
                </div>

                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <p className="font-semibold">Error al cargar fichas catastrales:</p>
                        <p>{error}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Verifique la conexión con la base de datos o que la tabla 'fichacatastro_eps' exista
                        </p>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Asignación de Carga
                    </h2>
                    <p className="text-muted-foreground">
                        Gestiona la asignación de fichas catastrales a grupos de trabajo
                    </p>
                </div>

            </div>

            {/* Filtros */}
            <FiltrosAsignacion
                onFiltrar={handleFiltrar}
                onLimpiar={handleLimpiarFiltros}
            />

            {/* Asignación Grupal */}
            <AsignacionGrupal
                fichasSeleccionadas={fichasSeleccionadas}
                onAsignacionCompleta={handleAsignacionCompleta}
            />

            {/* Tabla de fichas */}
            {fichas.data.length === 0 && !isLoading ? (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <p className="font-semibold">No se encontraron fichas catastrales</p>
                        {Object.keys(filtrosAplicados).length > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Intente ajustar los filtros de búsqueda
                            </p>
                        )}
                    </AlertDescription>
                </Alert>
            ) : (
                <TableAsignacion
                    fichas={fichas}
                    loading={isLoading}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    onSelectionChange={handleSelectionChange}
                    selectedFichas={fichasSeleccionadas}
                />
            )}
        </div>
    );
}

// Componente principal que envuelve con el provider
export default function AsignacionCargaView() {
    return (
        <AsignacionCargaProvider>
            <AsignacionCargaContent />
        </AsignacionCargaProvider>
    );
} 