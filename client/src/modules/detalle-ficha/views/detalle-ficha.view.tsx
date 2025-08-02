"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Home,
  User,
  Droplets,
  Gauge,
  Waves,
  FileText,
  Image,
  Database,
  Printer,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Save,
  RefreshCcw,
} from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Componentes de las secciones
import DatosInmueble from "../components/datos-inmueble";
import DatosInmuebleSupervision from "../components/supervision/datos-inmueble-supervision";
import DatosUsuario from "../components/datos-usuario";
import DatosUsuarioSupervision from "../components/supervision/datos-usuario-supervision";
import DatosConexionAgua from "../components/datos-conexion-agua";
import DatosConexionAguaSupervision from "../components/supervision/datos-conexion-agua-supervision";
import DatosMedidor from "../components/datos-medidor";
import DatosMedidorSupervision from "../components/supervision/datos-medidor-supervision";
import DatosConexionDesague from "../components/datos-conexion-desague";
import DatosConexionDesagueSupervision from "../components/supervision/datos-conexion-desague-supervision";
import CalidadServicio from "../components/calidad-servicio";
import CalidadServicioSupervision from "../components/supervision/calidad-servicio-supervision";
import ImagenesAdjuntas from "../components/imagenes-adjuntas";
import DatosPadronOrigen from "../components/datos-padron-origen";
import DatosPadronOrigenSupervision from "../components/supervision/datos-padron-origen-supervision";
import { buscarExacto } from "@/service/data.actions";
import {
  establecerFichaParcial,
  finalizarFicha,
  observarFicha,
  actualizarFichaCatastro,
} from "../action/detalle-ficha.action";

// Importar diálogos de confirmación
import ObservarFichaDialog from "../components/form/observar-ficha-dialog";
import AprobarFichaDialog from "../components/form/aprobar-ficha-dialog";
import EstablecerParcialDialog from "../components/form/establecer-parcial-dialog";
import GuardarCambiosDialog from "../components/form/guardar-cambios-dialog";
import { FichaCatastro } from "@/models/fichacatastro";
import { Cliente } from "@/models/cliente";
import { Inspector } from "@/models/inspector";
import { Usuario } from "@/models/usuario";
import { useAuth } from "@/hooks/use-auth";

// Definir las secciones disponibles
const SECCIONES = [
  {
    id: "inmueble",
    titulo: "1. Datos del inmueble / predio",
    icono: Home,
    componente: DatosInmueble,
    componenteSupervision: DatosInmuebleSupervision,
  },
  {
    id: "usuario",
    titulo: "2. Datos del usuario",
    icono: User,
    componente: DatosUsuario,
    componenteSupervision: DatosUsuarioSupervision,
  },
  {
    id: "conexion-agua",
    titulo: "3. Datos de la conexión de agua",
    icono: Droplets,
    componente: DatosConexionAgua,
    componenteSupervision: DatosConexionAguaSupervision,
  },
  {
    id: "medidor",
    titulo: "4. Datos del medidor",
    icono: Gauge,
    componente: DatosMedidor,
    componenteSupervision: DatosMedidorSupervision,
  },
  {
    id: "conexion-desague",
    titulo: "5. Datos de la conexión de desagüe",
    icono: Waves,
    componente: DatosConexionDesague,
    componenteSupervision: DatosConexionDesagueSupervision,
  },
  {
    id: "calidad-servicio",
    titulo: "6. Calidad de servicio / Numero de Servicio / Observaciones",
    icono: FileText,
    componente: CalidadServicio,
    componenteSupervision: CalidadServicioSupervision,
  },
  {
    id: "imagenes",
    titulo: "7. Imágenes adjuntas",
    icono: Image,
    componente: ImagenesAdjuntas,
  },
  {
    id: "padron-origen",
    titulo: "8. Datos de padrón origen",
    icono: Database,
    componente: DatosPadronOrigen,
    componenteSupervision: DatosPadronOrigenSupervision,
  },
];

export default function DetalleFichaView({ codFicha }: { codFicha: number }) {
  const [ficha, setFicha] = useState<FichaCatastro | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seccionActiva, setSeccionActiva] = useState("inmueble");
  const [vistaSupervision, setVistaSupervision] = useState(false);
  const [inspector, setInspector] = useState<Inspector | null>(null);
  const [modificador, setModificador] = useState<Usuario | null>(null);
  const { user } = useAuth();
  const usuarioLogueado = user?.codusu;
  // diccionario de atributos que se van a actualizar de la ficha catastral
  const [atributosActualizar, setAtributosActualizar] = useState<{
    [key: string]: string;
  }>({});

  // Estados para los diálogos de confirmación
  const [showObservarDialog, setShowObservarDialog] = useState(false);
  const [showAprobarDialog, setShowAprobarDialog] = useState(false);
  const [showEstablecerParcialDialog, setShowEstablecerParcialDialog] =
    useState(false);
  const [showGuardarDialog, setShowGuardarDialog] = useState(false);

  useEffect(() => {
    const cargarFicha = async () => {
      if (!codFicha) return;

      try {
        setLoading(true);
        const resultado = await buscarExacto(
          "fichacatastro_eps",
          ["idficha"],
          [codFicha.toString()]
        );

        if (resultado.success && resultado.data) {
          const inspector = await buscarExacto(
            "inspectores",
            ["codinspector"],
            [resultado.data[0].encuestador]
          );

          const usuarioModificador = await buscarExacto(
            "usersystema",
            ["codusu"],
            [resultado.data[0].usermodificador]
          );
          if (inspector.success && inspector.data) {
            setInspector(inspector.data[0]);
          }
          if (usuarioModificador.success && usuarioModificador.data) {
            setModificador(usuarioModificador.data[0]);
          }
          setFicha(resultado.data[0]);
        } else {
          setError(resultado.error || "Error al cargar la ficha");
        }
      } catch (error) {
        setError("Error inesperado al cargar la ficha");
      } finally {
        setLoading(false);
      }
    };

    cargarFicha();
  }, [codFicha]);

  const obtenerEstadoFicha = () => {
    if (!ficha) return { texto: "Cargando...", color: "gray" };

    switch (ficha.estadoficha) {
      case "P":
        return { texto: "Parcial", color: "yellow" };
      case "F":
        return { texto: "Finalizado", color: "green" };
      case "O":
        return { texto: "Observado", color: "red" };
      default:
        return { texto: "Pendiente", color: "gray" };
    }
  };

  // Verificar si hay cambios pendientes
  const hayCambiosPendientes = Object.keys(atributosActualizar).length > 0;

  const formatearFecha = (fecha: string) => {
    try {
      return format(new Date(fecha), "dd/MM/yyyy h:mm a", { locale: es });
    } catch {
      return fecha;
    }
  };

  const handleVistaSupervision = async () => {
    const nuevaVistaSupervision = !vistaSupervision;
    setVistaSupervision(nuevaVistaSupervision);

    if (nuevaVistaSupervision && ficha) {
      const resultado = await buscarExacto(
        "clientes",
        ["codcliente"],
        [ficha.codcliente.toString()]
      );
      if (resultado.success && resultado.data) {
        setCliente(resultado.data[0]);
      }
    }
  };

  const handleActualizarAtributos = (atributo: string, valor: string) => {
    setAtributosActualizar({ ...atributosActualizar, [atributo]: valor });
  };

  const handleObservar = () => {
    setShowObservarDialog(true);
  };

  const handleAprobar = () => {
    setShowAprobarDialog(true);
  };

  const handleEstablecerParcial = () => {
    setShowEstablecerParcialDialog(true);
  };

  const handleGuardar = async () => {
    if (!ficha || Object.keys(atributosActualizar).length === 0) return;

    try {
      const columnas = Object.keys(atributosActualizar);
      const valores = Object.values(atributosActualizar);

      const result = await actualizarFichaCatastro({
        idficha: ficha.idficha,
        columnas,
        valores,
      });

      if (result.success) {
        setAtributosActualizar({});
        // Recargar la ficha para mostrar los cambios
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleCancelar = () => {
    setAtributosActualizar({});
    // TODO: Implementar lógica para cancelar
    console.log("Cancelar cambios");
  };

  // Funciones para cerrar los diálogos
  const handleCloseObservarDialog = () => {
    setShowObservarDialog(false);
  };

  const handleCloseAprobarDialog = () => {
    setShowAprobarDialog(false);
  };

  const handleCloseEstablecerParcialDialog = () => {
    setShowEstablecerParcialDialog(false);
  };

  const handleCloseGuardarDialog = () => {
    setShowGuardarDialog(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-96 lg:col-span-1" />
          <Skeleton className="h-96 lg:col-span-3" />
        </div>
      </div>
    );
  }

  if (error || !ficha) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar la ficha catastral:</p>
            <p>{error}</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const estado = obtenerEstadoFicha();
  const ComponenteSeccion = SECCIONES.find(
    (s) => s.id === seccionActiva
  )?.componente;
  const ComponenteSeccionSupervision = SECCIONES.find(
    (s) => s.id === seccionActiva
  )?.componenteSupervision;

  return (
    <div className="space-y-4">
      {/* Header compacto con información relevante */}
      <Card className="bg-gray-50 dark:bg-stone-900">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Información principal */}
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full bg-${estado.color}-500`}
              ></div>
              <div>
                <h2 className="text-lg font-semibold">
                  Ficha #{ficha.idficha}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-${estado.color}-600 border-${estado.color}-200 text-xs`}
                  >
                    {estado.texto}
                  </Badge>
                  {hayCambiosPendientes && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 border-orange-200 text-xs"
                    >
                      Cambios pendientes
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Información de fechas y acciones */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="text-left lg:max-w-[150px]">
                  <p className="text-xs text-muted-foreground truncate">
                    Encuestador
                  </p>
                  <p className="font-medium text-xs break-words">
                    {inspector?.nombres || "-"}
                  </p>
                </div>
                <div className="text-left lg:max-w-[150px]">
                  <p className="text-xs text-muted-foreground truncate">
                    Modificado
                  </p>
                  <p className="font-medium text-xs break-words">
                    {modificador?.nombre +
                      " " +
                      modificador?.apellidopa +
                      " " +
                      modificador?.apellidoma || "-"}
                  </p>
                </div>
                <div className="text-left lg:max-w-[100px]">
                  <p className="text-xs text-muted-foreground truncate">
                    Finalización
                  </p>
                  <p className="font-medium text-xs break-words">
                    {ficha.fechaaprobacion
                      ? formatearFecha(ficha.fechaaprobacion.toString())
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 px-3">
                  <Printer className="w-3 h-3 mr-1" />
                  <span className="text-xs">Imprimir</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido principal */}
      <div
        className={`grid grid-cols-1 gap-4 ${
          vistaSupervision ? "lg:grid-cols-12" : "lg:grid-cols-10"
        }`}
      >
        {/* Menú lateral */}
        <Card
          className={`${
            vistaSupervision ? "lg:col-span-1" : "lg:col-span-2"
          } bg-sidebar-accent transition-all duration-300`}
        >
          <CardContent className="p-2">
            <nav className="space-y-1">
              {SECCIONES.map((seccion) => {
                const Icono = seccion.icono;
                const isActive = seccionActiva === seccion.id;

                return (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActiva(seccion.id)}
                    className={`w-full text-left p-1.5 rounded transition-colors text-xs ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    title={vistaSupervision ? seccion.titulo : undefined}
                  >
                    <div
                      className={`flex items-start ${
                        vistaSupervision ? "justify-center" : "gap-1.5"
                      }`}
                    >
                      <Icono
                        className={`${
                          vistaSupervision ? "w-4 h-4" : "w-3 h-3"
                        } flex-shrink-0 mt-0.5`}
                      />
                      {!vistaSupervision && (
                        <span className="font-medium leading-tight break-words">
                          {seccion.titulo}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Contenido de la sección */}
        <Card
          className={`${
            vistaSupervision ? "lg:col-span-11" : "lg:col-span-8"
          } transition-all duration-300`}
        >
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icono =
                    SECCIONES.find((s) => s.id === seccionActiva)?.icono ||
                    Home;
                  return <Icono className="w-4 h-4" />;
                })()}
                <h3 className="text-lg font-semibold">
                  {SECCIONES.find((s) => s.id === seccionActiva)?.titulo}
                  {vistaSupervision && (
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      (Ficha Catastral)
                    </span>
                  )}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Vista supervisión
                </span>
                <Button
                  variant={vistaSupervision ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVistaSupervision()}
                  className="h-8 px-3"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {ComponenteSeccion && (
              <ComponenteSeccion
                ficha={ficha}
                cliente={cliente}
                vistaSupervision={vistaSupervision}
                handleActualizarAtributos={handleActualizarAtributos}
              />
            )}
          </CardContent>

          {/* Vista de supervisión */}
          {vistaSupervision && (
            <div className="dark:bg-gray-900 bg-gray-200 border-t border-gray-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icono =
                        SECCIONES.find((s) => s.id === seccionActiva)?.icono ||
                        Home;
                      return <Icono className="w-4 h-4" />;
                    })()}
                    <h3 className="text-lg font-semibold">
                      {SECCIONES.find((s) => s.id === seccionActiva)?.titulo}{" "}
                      <span className="text-xs text-muted-foreground">
                        (Padrón)
                      </span>
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {ComponenteSeccionSupervision && (
                  <ComponenteSeccionSupervision
                    ficha={ficha}
                    cliente={cliente}
                  />
                )}
              </CardContent>
            </div>
          )}
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        {estado.texto === "Observado" ? (
          // Botones para estado "Finalizado" o "Observado"
          <div className="flex justify-end gap-10">
            <div className="flex flex-row gap-2">
              <Button
                variant="default"
                size="sm"
                className="h-9 bg-green-500 hover:bg-green-400"
                onClick={handleAprobar}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Aprobar</span>
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={handleCancelar}
              >
                <RefreshCcw className="w-3 h-3 mr-1" />
                <span className="text-xs">Refrescar</span>
              </Button>
              <Button
                size="sm"
                className="h-9"
                onClick={handleGuardar}
                disabled={!hayCambiosPendientes}
              >
                <Save className="w-3 h-3 mr-1" />
                <span className="text-xs">Guardar cambios</span>
              </Button>
            </div>
          </div>
        ) : estado.texto === "Pendiente" ? (
          // Botones para estado "Pendiente" - solo establecer parcial
          <div className="flex justify-end gap-10">
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-orange-600 h-9"
                onClick={handleEstablecerParcial}
              >
                <Clock className="w-3 h-3 mr-1 text-orange-600" />
                <span className="text-xs text-orange-600">
                  Establecer parcial
                </span>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-9"
                onClick={handleObservar}
              >
                <AlertCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Observar</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-9 bg-green-600 hover:bg-green-500"
                onClick={handleAprobar}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Aprobar</span>
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                variant="link"
                size="sm"
                className="h-9 underline"
                onClick={handleCancelar}
              >
                <RefreshCcw className="w-3 h-3 mr-1" />
                <span className="text-xs">Refrescar</span>
              </Button>
              <Button
                size="sm"
                className="h-9"
                onClick={handleGuardar}
                disabled={!hayCambiosPendientes}
              >
                <Save className="w-3 h-3 " />
                <span className="text-xs">Guardar cambios</span>
              </Button>
            </div>
          </div>
        ) : estado.texto === "Parcial" ? (
          // Botones para otros estados (Parcial, Observado)
          <div className="flex justify-end gap-10">
            <div className="flex flex-row gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="h-9"
                onClick={handleObservar}
              >
                <AlertCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Observar</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-9 bg-green-500 hover:bg-green-400"
                onClick={handleAprobar}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Aprobar</span>
              </Button>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                variant="link"
                size="sm"
                className="h-9 underline"
                onClick={handleCancelar}
              >
                <RefreshCcw className="w-3 h-3 mr-1" />
                <span className="text-xs">Refrescar</span>
              </Button>
              <Button
                size="sm"
                className="h-9"
                onClick={handleGuardar}
                disabled={!hayCambiosPendientes}
              >
                <Save className="w-3 h-3 mr-1" />
                <span className="text-xs">Guardar cambios</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Diálogos de confirmación */}
      <ObservarFichaDialog
        isOpen={showObservarDialog}
        onClose={handleCloseObservarDialog}
        fichaId={ficha.idficha}
        codUsuario={usuarioLogueado || ""}
      />

      <AprobarFichaDialog
        isOpen={showAprobarDialog}
        onClose={handleCloseAprobarDialog}
        fichaId={ficha.idficha}
        codUsuario={usuarioLogueado || ""}
      />

      <EstablecerParcialDialog
        isOpen={showEstablecerParcialDialog}
        onClose={handleCloseEstablecerParcialDialog}
        fichaId={ficha.idficha}
        codUsuario={usuarioLogueado || ""}
      />

      <GuardarCambiosDialog
        isOpen={showGuardarDialog}
        onClose={handleCloseGuardarDialog}
        fichaId={ficha.idficha}
        atributosActualizar={atributosActualizar}
      />
    </div>
  );
}
