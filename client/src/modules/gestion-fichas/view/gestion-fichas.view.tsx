"use client";

import { useState } from "react";
import TableFichas from "../components/table/table-fichas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Database, Download, Loader2 } from "lucide-react";
import TitlePage from "@/components/custom/title-page";
import { FiltrosFichas } from "../components/filters/filtros-fichas";
import { FiltrosGestionFichas, getFichasConFiltrosGestion } from "../action/gestion-fichas.actions";
import { FichaCatastro } from "@/models/fichacatastro";
import { Button } from "@/components/ui/button";
import useExportExcel from "@/hooks/use-export-excel";
import { useDataMapperTipos } from "@/hooks/use-data-mapper-tipos";
import { listaTiposMap } from "../utils/lista-tipos-map";
import { listaDataExportFieldMapping, listaDataExportHeaders } from "../utils/lista-data-export";

export default function GestionFichasView() {
  const { exportToExcel } = useExportExcel();
  const { mapDataWithDescriptions, isLoading } = useDataMapperTipos();

  const [fichasFiltradas, setFichasFiltradas] = useState<FichaCatastro[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosGestionFichas>({});

  const handleFiltrar = async (filtros: FiltrosGestionFichas) => {
    try {
      setLoadingFiltros(true);
      setFiltrosAplicados(filtros);

      const fichasResultado = await getFichasConFiltrosGestion(filtros);
      setFichasFiltradas(fichasResultado);
      setMostrarResultados(true);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    } finally {
      setLoadingFiltros(false);
    }
  };

  const handleLimpiar = async () => {
    setFichasFiltradas([]);
    setMostrarResultados(false);
    setFiltrosAplicados({});
  };

  const handleRefresh = async () => {
    // Si hay filtros aplicados, recargar con esos filtros
    if (Object.keys(filtrosAplicados).length > 0) {
      await handleFiltrar(filtrosAplicados);
    }
  };

  const handleExportar = async () => {
    try {
      const mappedData = await mapDataWithDescriptions(fichasFiltradas, listaTiposMap);

      exportToExcel(mappedData, {
        headers: listaDataExportHeaders,
        fieldMapping: listaDataExportFieldMapping,
        filename: "fichas_catastrales.xlsx",
        sheetName: "Fichas Catastrales",
      });

    } catch (error) {
      console.error("Error al exportar fichas:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TitlePage
          title="Gestión de fichas catastrales"
          description="Visualiza las fichas catastrales"
        />
        <Button variant="outline" onClick={handleExportar} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span>Exportar fichas</span>
        </Button>
      </div>

      <FiltrosFichas
        onFiltrar={handleFiltrar}
        onLimpiar={handleLimpiar}
        loading={loadingFiltros}
      />

      {/* Mostrar resultados solo después de filtrar */}
      {mostrarResultados && (
        <>
          {fichasFiltradas.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-semibold">
                  No se encontraron fichas catastrales con los filtros aplicados
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Intente ajustar los filtros de búsqueda
                </p>
              </AlertDescription>
            </Alert>
          ) : (
            <TableFichas
              fichas={fichasFiltradas}
              loading={loadingFiltros}
              onRefresh={handleRefresh}
            />
          )}
        </>
      )}

      {/* Mensaje inicial cuando no se han aplicado filtros y no hay datos */}
      {!mostrarResultados && fichasFiltradas.length === 0 && !loadingFiltros && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">
              Seleccione filtros para buscar fichas catastrales
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Use los filtros de arriba para comenzar la búsqueda de fichas
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
