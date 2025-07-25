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
  X
} from "lucide-react";
import { DetalleFichaResponse } from "../action/detalle-ficha.action";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Componentes de las secciones
import DatosInmueble from "../components/datos-inmueble";
import DatosUsuario from "../components/datos-usuario";
import DatosConexionAgua from "../components/datos-conexion-agua";
import DatosMedidor from "../components/datos-medidor";
import DatosConexionDesague from "../components/datos-conexion-desague";
import CalidadServicio from "../components/calidad-servicio";
import ImagenesAdjuntas from "../components/imagenes-adjuntas";
import DatosPadronOrigen from "../components/datos-padron-origen";
import { buscarExacto } from "@/service/data.actions";
import { FichaCatastro } from "@/models/fichacatastro";

// Definir las secciones disponibles
const SECCIONES = [
  {
    id: "inmueble",
    titulo: "1. Datos del inmueble / predio",
    icono: Home,
    componente: DatosInmueble
  },
  {
    id: "usuario",
    titulo: "2. Datos del usuario",
    icono: User,
    componente: DatosUsuario
  },
  {
    id: "conexion-agua",
    titulo: "3. Datos de la conexión de agua",
    icono: Droplets,
    componente: DatosConexionAgua
  },
  {
    id: "medidor",
    titulo: "4. Datos del medidor",
    icono: Gauge,
    componente: DatosMedidor
  },
  {
    id: "conexion-desague",
    titulo: "5. Datos de la conexión de desagüe",
    icono: Waves,
    componente: DatosConexionDesague
  },
  {
    id: "calidad-servicio",
    titulo: "6. Calidad de servicio / Numero de Servicio / Observaciones",
    icono: FileText,
    componente: CalidadServicio
  },
  {
    id: "imagenes",
    titulo: "7. Imágenes adjuntas",
    icono: Image,
    componente: ImagenesAdjuntas
  },
  {
    id: "padron-origen",
    titulo: "8. Datos de padrón origen",
    icono: Database,
    componente: DatosPadronOrigen
  }
];

export default function DetalleFichaView({ codFicha }: { codFicha: number }) {

  const [ficha, setFicha] = useState<FichaCatastro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seccionActiva, setSeccionActiva] = useState("inmueble");
  const [vistaSupervision, setVistaSupervision] = useState(false);

  useEffect(() => {
    const cargarFicha = async () => {
      if (!codFicha) return;

      try {
        setLoading(true);
        const resultado = await buscarExacto("fichacatastro_eps", ["idficha"], [codFicha.toString()]);

        if (resultado.success && resultado.data) {
          setFicha(resultado.data[0]);
        } else {
          setError(resultado.error || 'Error al cargar la ficha');
        }
      } catch (error) {
        setError('Error inesperado al cargar la ficha');
      } finally {
        setLoading(false);
      }
    };

    cargarFicha();
  }, [codFicha]);

  const obtenerEstadoFicha = () => {
    if (!ficha) return { texto: "Cargando...", color: "gray" };

    if (ficha.fichaaprobada === 1) {
      return { texto: "Aprobada", color: "green" };
    } else if (ficha.fichaaprobada === 0) {
      return { texto: "Pendiente", color: "blue" };
    } else {
      return { texto: "Rechazada", color: "red" };
    }
  };

  const formatearFecha = (fecha: string) => {
    try {
      return format(new Date(fecha), "dd/MM/yyyy h:mm a", { locale: es });
    } catch {
      return fecha;
    }
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
  const ComponenteSeccion = SECCIONES.find(s => s.id === seccionActiva)?.componente;

  return (
    <div className="space-y-4">
      {/* Header compacto con información relevante */}
      <Card className="bg-gray-50 dark:bg-stone-900">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Información principal */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-${estado.color}-500`}></div>
              <div>
                <h2 className="text-lg font-semibold">Ficha #{ficha.idficha}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-${estado.color}-600 border-${estado.color}-200 text-xs`}>
                    {estado.texto}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {ficha.encuestador && `por ${ficha.encuestador}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Información de fechas y acciones */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Encuestador</p>
                  <p className="font-medium text-xs">{ficha.encuestador || "-"}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Modificado</p>
                  <p className="font-medium text-xs">{ficha.usermodificador || "-"}</p>
                </div>
                <div className="text-left sm:col-span-2 lg:col-span-1">
                  <p className="text-xs text-muted-foreground">Finalización</p>
                  <p className="font-medium text-xs">
                    {ficha.fechaaprobacion ? formatearFecha(ficha.fechaaprobacion.toString()) : "-"}
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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Menú lateral */}
        <Card className="lg:col-span-1 bg-sidebar-accent">
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
                  >
                    <div className="flex items-start gap-1.5">
                      <Icono className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-tight break-words">
                        {seccion.titulo}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Contenido de la sección */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {(() => {
                  const Icono = SECCIONES.find(s => s.id === seccionActiva)?.icono || Home;
                  return <Icono className="w-4 h-4" />;
                })()}
                <h3 className="text-lg font-semibold">
                  {SECCIONES.find(s => s.id === seccionActiva)?.titulo}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Vista supervisión</span>
                <Button
                  variant={vistaSupervision ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVistaSupervision(!vistaSupervision)}
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
                vistaSupervision={vistaSupervision}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <X className="w-3 h-3 mr-1" />
          <span className="text-xs">Cancelar</span>
        </Button>
        <Button size="sm" className="h-9">
          <CheckCircle className="w-3 h-3 mr-1" />
          <span className="text-xs">Guardar</span>
        </Button>
      </div>
    </div>
  );
}