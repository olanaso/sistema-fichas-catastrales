"use client";

import { useState, useEffect } from "react";
import TableFichas from "../components/table/table-fichas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Database, Download, Loader2 } from "lucide-react";
import TitlePage from "@/components/custom/title-page";
import { FiltrosFichas } from "../components/filters/filtros-fichas";
import { FiltrosGestionFichas, getFichasConFiltrosGestion } from "../action/gestion-fichas.actions";
import { FichaCatastro } from "@/models/fichacatastro";
import { Button } from "@/components/ui/button";
import useExportExcel from "@/hooks/use-export-excel";
import { useDataMapper } from "@/hooks/use-data-mapper";
import { useFiltrosPersistentes } from "@/hooks/use-filtros-persistentes";

export default function GestionFichasView() {
  const { exportToExcel } = useExportExcel();
  const { mapDataWithDescriptions, isLoading } = useDataMapper();

  const [fichasFiltradas, setFichasFiltradas] = useState<FichaCatastro[]>([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(false);
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosGestionFichas>({});

  // Hook para persistencia de filtros
  const { filtros, isLoaded, tieneFiltrosAplicados } = useFiltrosPersistentes<FiltrosGestionFichas>(
    "gestion-fichas-filtros",
    {
      grupo: "",
      inspector: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "",
    }
  );

  const handleFiltrar = async (filtros: FiltrosGestionFichas) => {
    try {
      setLoadingFiltros(true);
      setFiltrosAplicados(filtros);

      const fichasResultado = await getFichasConFiltrosGestion(filtros);
      setFichasFiltradas(fichasResultado);
      setMostrarResultados(true);

      console.log("fichasResultado", fichasResultado[0]);

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

  // Aplicar filtros guardados automáticamente cuando se carga la página
  const aplicarFiltrosGuardados = async () => {
    if (isLoaded && tieneFiltrosAplicados()) {
      await handleFiltrar(filtros);
    }
  };

  // Efecto para aplicar filtros guardados al cargar
  useEffect(() => {
    aplicarFiltrosGuardados();
  }, [isLoaded]);

  const handleRefresh = async () => {
    // Si hay filtros aplicados, recargar con esos filtros
    if (Object.keys(filtrosAplicados).length > 0) {
      await handleFiltrar(filtrosAplicados);
    }
  };

  const handleExportar = async () => {
    try {
      const mappedData = await mapDataWithDescriptions(fichasFiltradas, {
        dataAttributes: ["tiposervicio", "tipoaccesoriosconex_a", "tipoaccesoriosnoreglamentados_a",
          "tipoacccomercial", "tipocaja_a", "tipocaja_d",
          "estadocaja_a", "estadocaja_d"
        ],
        tableNames: ["tiposervicio", "tipoaccesoriosconex", "tipoaccesoriosnoreglamentados",
          "tipoacccomercial", "tipocaja", "tipocaja",
          "tipoestcaja", "tipoestcaja"
        ],
        tableAttributes: ["tiposervicio", "tipoaccesoriosconex", "tipoaccesoriosnoreglamentados",
          "tipoacccomercial", "tipocaja", "tipocaja",
          "estadocaja", "estadocaja"
        ],
        conditionalAttributes: [
          {
            numeroTabla: 6,
            atributo: "tipocon",
            valor: "001"
          },
          {
            numeroTabla: 7,
            atributo: "tipocon",
            valor: "002"
          }
        ]
      });

      console.log("mappedData", mappedData[0]);

      // exportToExcel(mappedData, {
      //   headers: [
      //     "ID Ficha", "Empresa", "Sucursal", "Provincia", "Sector", "Manzana", "Lote", "Sublote", "Cliente", "Nro Catastro",
      //     "Cuadra", "Nro Municipal", "Mz Municipal", "Lt Municipal", "Número Dirección", "Referencia", "Referencia Nueva", "Dirección Nueva", "Dirección Campo", "Dirección", "Nro Calle", "Urbanización",
      //     "Tipo Construcción", "Nro Pisos", "Tipo Material Const", "Tipo Predio",
      //     "Tipo Servicio", "Tipo Servicio Nuevo", "Tipo ABA", "Piscina", "Código Almacenaje", "Tipo Usuario", "Estado Servicio",
      //     "Propietario", "Propietario Nuevo", "DNI", "Habitada", "Habitantes", "Tipo Responsable", "Celular", "Nro Contrato", "Email", "Datos Correctos",
      //     "Código Reservorio", "Sector Abastecimiento", "Catetar", "Catetar Nuevo", "Unidad Uso Temporal", "Actividad", "Razón Social",
      //     "Situación Conexión Agua", "Pavimento Conexión Agua", "Vereda Agua", "Código Diámetro Agua", "Código Diámetro Agua Nuevo", "Tipo Material Agua", "Tipo Ingreso", "Con Caja Agua", "Tipo Caja Agua", "Localización Caja Agua", "Estado Caja Agua", "Con Tapa Agua", "Tipo Tapa Agua", "Estado Tapa Agua", "Llave Medidor", "Posición Medidor", "Tipo Corte Agua", "Tipo Cerrado", "Tipo Fugas Agua", "Tipo Caja Observación", "Tipo Accesorios Conexión Agua", "Estado Conexión Agua", "Tipo Accesorios No Reglamentados Agua", "Tipo Modelo Caja Conexión Agua",
      //     "Tiene Medidor", "Nro Medidor", "Nro Medidor Nuevo", "Modelo Medidor", "Año", "Lectura Última", "Fecha Instalación", "Marca Medidor", "Código Diámetro Medidor", "Lectura", "Tipo Facturación", "Tipo Lectura", "Estado Medidor", "Medidor Operativo", "Tipo Medidor",
      //     "Situación Conexión Desagüe", "Código Diámetro Desagüe", "Tipo Material Desagüe", "Con Caja Desagüe", "Tipo Caja Desagüe", "Localización Caja Desagüe", "Estado Caja Desagüe", "Con Tapa Desagüe", "Tipo Tapa Desagüe", "Estado Tapa Desagüe", "Tipo Fugas Desagüe", "Tipo Tapón Deo Desagüe", "Pavimento Conexión Agua Desagüe", "Vereda Desagüe", "Fugas Desagüe", "Tipo Modelo Caja Conexión Desagüe",
      //     "Horas por Día", "Días por Semana", "Presión Agua", "Suministro Luz",
      //     "Nro Lavatorios", "Estado Lavatorios", "Nro Lavadoras", "Estado Lavadoras", "Nro Water", "Estado Water", "Nro Duchas", "Estado Duchas", "Nro Urinarios", "Estado Urinarios", "Nro Grifos", "Estado Grifos", "Nro Piscina", "Estado Piscina", "Nro Tanque Cisterna", "Estado Tanque Cisterna", "Nro Tanque Elevado", "Estado Tanque Elevado",
      //     "Observación", "Observaciones", "Ficha Incompleta", "Tipo Acción Comercial", "Sospechoso VMA",
      //     "Medida Lote Frente", "Medida Eje Agua", "Medida Eje Desagüe",
      //     "Latitud", "Longitud",
      //     "Foto Fachada", "Foto Caja Agua", "Foto Caja Desagüe", "Foto Detalle 4", "Foto Detalle 5",
      //     "Fecha Visita", "Hora Visita",
      //     "Gestor", "Inspector", "Código Inspector", "Encuestador",
      //     "Código Brigada",
      //     "Usuario Modificador", "Fecha Modificación", "Creador", "Fecha Registro", "Fecha Registro",
      //     "Ficha Aprobada", "Fecha Aprobación", "Estado Ficha", "Fecha Entrega Ficha", "Est Duplicado", "Estareg",
      //     "Código Manzana", "Nro Lote", "Nro Sublote"
      //   ],
      //   fieldMapping: [
      //     "idficha", "codemp", "codsuc", "codprov", "codsector_new", "codmza_new", "nrolote_new", "nrosublote_new", "codcliente", "nrocatastro",
      //     "cuadra", "nromunic", "mzamunic", "ltemunic", "numero_dir", "referencia", "referencia_new", "direccion_new", "direccion_campo", "direccion", "nrocalle", "urbanizacion",
      //     "tipoconstruccion", "nropisos", "tipomaterialconst", "tipopredio",
      //     "tiposervicio", "tiposervicio_new", "tipoaba", "piscina", "codalmacenaje", "tipousuario", "estadoservicio",
      //     "propietario", "propietario_new", "dni", "habitada", "habitantes", "tiporesponsable", "celular", "nrocontrato", "email", "datos_correctos",
      //     "codreservorio", "codsectorabast", "catetar", "catetar_new", "unidusotmp", "actividad", "razonsocial",
      //     "situacionconex_a", "pavconagu_a", "vereda_a", "coddiametro_a", "coddiametro_anew", "tipomaterial_a", "tipoingreso", "concajaagua", "tipocaja_a", "loccaja_a", "estadocaja_a", "contapaagua", "tipotapa_a", "esttapa_a", "llavemed", "posicionmed", "tipocorte_a", "tipocerrado", "tipofugas_a", "tipocajaobserv", "tipoaccesoriosconex_a", "estconexion_a", "tipoaccesoriosnoreglamentados_a", "tipomodelocajaconex_a",
      //     "tienemedidor", "nromed", "nromed_new", "modelomed", "anio", "lecturaultima", "fechainstalacion", "marcamed", "coddiametro_m", "lectura", "tipofacturacion", "tipolectura", "estadomed", "medidoroperativo", "tipomed",
      //     "situacionconex_d", "coddiametro_d", "tipomaterial_d", "concajadesague", "tipocaja_d", "loccaja_d", "estadocaja_d", "contapadesague", "tipotapa_d", "esttapa_d", "tipofugas_d", "tipotapondeo_d", "pavconagu_d", "vereda_d", "fugasdesague", "tipomodelocajaconex_d",
      //     "horasxdia", "diasxsemana", "presionagu", "suministroluz",
      //     "nrolavatorios", "estadolavatorios", "nrolavadoras", "estadolavadoras", "nrowater", "estadowater", "nroduchas", "estadoduchas", "nrourinarios", "estadourinarios", "nrogrifos", "estadogrifos", "nropiscina", "estadopiscina", "nrotanquecisterna", "estadotanquecisterna", "nrotanqueelevado", "estadotanqueelevado",
      //     "observacion", "obs", "fichaincompleta", "tipoacccomercial", "sospechosovma",
      //     "medidalotefrente", "medidaejeagua", "medidaejedesague",
      //     "latitud", "longitud",
      //     "fotofachada", "fotocajaagua", "fotocajadesague", "fotodetalle4", "fotodetalle5",
      //     "fecha_visita", "hora_visita",
      //     "gestor", "inspector", "codinspector", "encuestador",
      //     "codbrigada",
      //     "usermodificador", "fechamodificacion", "creador", "fechareg", "fecharegistro",
      //     "fichaaprobada", "fechaaprobacion", "estadoficha", "fechaentregaficha", "est_duplicado", "estareg",
      //     "codmza", "nrolote", "nrosublote"
      //   ],
      //   filename: "fichas_catastrales.xlsx",
      //   sheetName: "Fichas Catastrales",
      // });
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
