"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Database } from "lucide-react";
import { FiltrosAsignacion } from "../components/filters/filtros-asignacion";
import { AsignacionGrupal } from "../components/asignacion-grupal/asignacion-grupal";
import TableAsignacion from "../components/table/table-asignacion";
import {
  getFichasCatastralesPorColumnas,
  type FiltrosAsignacion as FiltrosAsignacionType,
} from "../action/asignacion-carga.actions";
import TitlePage from "@/components/custom/title-page";
import { getData } from "@/service/data.actions";
import { Inspector } from "@/models/inspector";
import { Cliente } from "@/models/cliente";


export default function AsignacionCargaView() {
  const [fichasSeleccionadas, setFichasSeleccionadas] = useState<number[]>([]);
  const [filtrosAplicados, setFiltrosAplicados] =
    useState<FiltrosAsignacionType>({});
  const [fichasFiltradas, setFichasFiltradas] = useState<Cliente[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [inspectores, setInspectores] = useState<Inspector[]>([]);

  useEffect(() => {
    getData("inspectores").then((data) => {
      setInspectores(data.data);
    });
  }, []);

  const handleFiltrar = async (filtros: FiltrosAsignacionType) => {
    try {
      setLoadingFiltros(true);
      setFiltrosAplicados(filtros);

      // Definir las columnas de la base de datos
      const columnas = ["codsuc", "codsector", "codmza", "estado"];

      // Obtener los valores correspondientes de los filtros
      const valores = [
        filtros.sucursal || "",
        filtros.sector || "",
        filtros.manzana || "",
        filtros.estadoRegistro || "",
      ];

      // Filtrar solo las columnas que tienen valores
      const columnasConValores = columnas.filter(
        (_, index) => valores[index] && valores[index].trim() !== ""
      );
      const valoresFiltrados = valores.filter(
        (valor) => valor && valor.trim() !== ""
      );

      if (columnasConValores.length === 0) {
        console.warn("No se proporcionaron filtros válidos");
        setFichasFiltradas([]);
        setMostrarResultados(true);
        return;
      }

      const fichasResultado = await getFichasCatastralesPorColumnas(
        columnasConValores,
        valoresFiltrados
      );
      setFichasFiltradas(fichasResultado);
      setMostrarResultados(true);

    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    } finally {
      setLoadingFiltros(false);
    }
  };

  const handleLimpiarFiltros = async () => {
    setFiltrosAplicados({});
    setFichasFiltradas([]);
    setMostrarResultados(false);
    setFichasSeleccionadas([]);
  };

  const handleSelectionChange = (selectedIds: number[]) => {
    setFichasSeleccionadas(selectedIds);
  };

  const handleAsignacionCompleta = async () => {
    // Limpiar selección y recargar datos filtrados
    setFichasSeleccionadas([]);
    if (Object.keys(filtrosAplicados).length > 0) {
      await handleFiltrar(filtrosAplicados);
    }
  };

  return (
    <div className="space-y-6">
      <TitlePage
        title="Asignación de carga"
        description="Gestiona la asignación de fichas catastrales a grupos de trabajo"
      />

      {/* Filtros */}
      <FiltrosAsignacion
        onFiltrar={handleFiltrar}
        onLimpiar={handleLimpiarFiltros}
        loading={loadingFiltros}
      />

      {/* Mostrar resultados solo después de filtrar */}
      {mostrarResultados && (
        <>
          {/* Asignación Grupal */}
          {filtrosAplicados.estadoRegistro === "SIN ASIGNAR" && (
          <AsignacionGrupal
            cantidadFichas={fichasFiltradas.length}
            fichasSeleccionadas={fichasSeleccionadas}
            onAsignacionCompleta={handleAsignacionCompleta}
          />
          )}

          {/* Tabla de fichas */}
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
            <TableAsignacion
              fichas={fichasFiltradas}
              inspectores={inspectores}
              onSelectionChange={handleSelectionChange}
              selectedFichas={fichasSeleccionadas}
              loading={loadingFiltros}
              onAsignacionCompleta={handleAsignacionCompleta}
            />
          )}
        </>
      )}

      {/* Mensaje inicial cuando no se han aplicado filtros */}
      {!mostrarResultados && (
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
