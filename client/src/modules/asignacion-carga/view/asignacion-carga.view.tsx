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
import { buscarExacto, getData } from "@/service/data.actions";
import { Inspector } from "@/models/inspector";
import { Cliente } from "@/models/cliente";
import { AsignacionTrabajo } from "@/models/asignacion-trabajo";
import { Button } from "@/components/ui/button";

export default function AsignacionCargaView() {
  const [fichasSeleccionadas, setFichasSeleccionadas] = useState<number[]>([]);
  const [filtrosAplicados, setFiltrosAplicados] =
    useState<FiltrosAsignacionType>({});
  const [fichasFiltradas, setFichasFiltradas] = useState<Cliente[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [inspectores, setInspectores] = useState<Inspector[]>([]);
  const [asignaciones, setAsignaciones] = useState<AsignacionTrabajo[]>([]);
  const [loadingVerAsignaciones, setLoadingVerAsignaciones] = useState(false);
  const [filtrosExternos, setFiltrosExternos] = useState<FiltrosAsignacionType | undefined>(undefined);

  // Función para recargar asignaciones
  const recargarAsignaciones = async () => {
    try {
      const data = await buscarExacto("usp_programacion_trabajo", ["estado"], ["Programado"]);
      setAsignaciones(data.data);
      console.log("Asignaciones recargadas:", data.data.length, "asignaciones encontradas");
    } catch (error) {
      console.error("Error al recargar asignaciones:", error);
    }
  };

  useEffect(() => {
    getData("inspectores").then((data) => {
      setInspectores(data.data);
    });
    recargarAsignaciones();
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
    setFiltrosExternos(undefined);
    setGrupoTrabajoSeleccionado("");
  };

  const handleSelectionChange = (selectedIds: number[]) => {
    setFichasSeleccionadas(selectedIds);
  };

  const handleAsignacionCompleta = async () => {
    // Limpiar selección y recargar datos filtrados
    setFichasSeleccionadas([]);
    
    // Recargar asignaciones para mostrar los cambios inmediatamente
    await recargarAsignaciones();
    
    if (Object.keys(filtrosAplicados).length > 0) {
      await handleFiltrar(filtrosAplicados);
    }
  };

  const handleVerAsignaciones = async () => {
    try {
      setLoadingVerAsignaciones(true);
      
      // Obtener el último registro de asignaciones
      if (asignaciones.length === 0) {
        console.warn("No hay asignaciones disponibles");
        return;
      }

      const ultimaAsignacion = asignaciones[asignaciones.length - 1];
      
      // Buscar el cliente correspondiente usando buscarExacto
      const clienteData = await buscarExacto(
        "clientes", 
        ["codcliente"], 
        [ultimaAsignacion.codcliente.toString()]
      );

      if (!clienteData.data || clienteData.data.length === 0) {
        console.error("No se encontró el cliente correspondiente");
        return;
      }

      const cliente = clienteData.data[0] as Cliente;
      
      // Aplicar filtros automáticamente con los datos del cliente
      const filtrosAutomaticos: FiltrosAsignacionType = {
        sucursal: cliente.codsuc,
        sector: cliente.codsector,
        manzana: cliente.codmza || "",
        estadoRegistro: "SIN ASIGNAR"
      };

      // Establecer filtros externos para que se muestren en la interfaz
      setFiltrosExternos(filtrosAutomaticos);

      // Aplicar los filtros
      await handleFiltrar(filtrosAutomaticos);

      // Setear el grupo de trabajo en la asignación grupal
      // Esto se manejará a través de un callback que pasaremos al componente AsignacionGrupal
      setGrupoTrabajoSeleccionado(ultimaAsignacion.codbrigada);

    } catch (error) {
      console.error("Error al recuperar asignación:", error);
    } finally {
      setLoadingVerAsignaciones(false);
    }
  };

  // Estado para el grupo de trabajo seleccionado
  const [grupoTrabajoSeleccionado, setGrupoTrabajoSeleccionado] = useState<string>("");

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
        filtrosExternos={filtrosExternos}
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
              grupoPreseleccionado={grupoTrabajoSeleccionado}
              asignacionesProgramadas={asignaciones}
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

      {asignaciones.length > 0 && !mostrarResultados && (
        <Alert className="mt-4 border-2 border-purple-500 text-purple-500 bg-purple-100 dark:bg-gray-950 flex gap-2 justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 !text-purple-500" />
            <AlertDescription>
              <p className="font-semibold">
                Se encontraron {asignaciones.length} asignaciones programadas
              </p>
            </AlertDescription>
          </div>
          <Button 
            variant="default" 
            onClick={handleVerAsignaciones}
            disabled={loadingVerAsignaciones}
          >
            {loadingVerAsignaciones ? "Cargando..." : "Ver asignaciones"}
          </Button>
        </Alert>
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
