"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PadronClientesProvider, usePadronClientes } from "../context/gestionpadron-context";
import TableGestionPadron from "../components/table/table-gestionpadron";
import { PadronHistorico } from "@/models/padronhistorico";
import { getHistorialImportarPadronClientes } from "@/modules/importar-padron/action/importarpadron.actions";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { Badge } from "@/components/ui/badge";
import { Calle, Manzana, Sector, TipoCalle, TipoServicio } from "@/models/tipos";
import { obtenerDataDinamico } from "@/service/obtener-data-dinamico";

// Componente de carga
function PadronClientesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function PadronClientesContent() {
  const { 
    padronClientes, 
    isLoading, 
    error, 
    refreshPadronClientes,
    handlePageChange,
    handlePageSizeChange
  } = usePadronClientes();

  const [historial, setHistorial] = useState<PadronHistorico | null>(null);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [manzanas, setManzanas] = useState<Manzana[]>([]);
  const [calles, setCalles] = useState<Calle[]>([]);
  const [tiposervicios, setTiposervicios] = useState<TipoServicio[]>([]);
  const [tipocalle, setTipocalle] = useState<TipoCalle[]>([]);

  useEffect(() => {
    getHistorialImportarPadronClientes().then((data) => {
      setHistorial(data);
    });
    //crear un fetchAll para traer de varias tablas a la vez
    Promise.all([
      obtenerDataDinamico("sectores"),
      obtenerDataDinamico("manzanas"),
      obtenerDataDinamico("calles"),
      obtenerDataDinamico("tiposervicio"),
      obtenerDataDinamico("tipocalle")
    ]).then(([sectores, manzanas, calles, tiposervicios, tipocalle]) => {
      setSectores(sectores);
      setManzanas(manzanas);
      setCalles(calles);
      setTiposervicios(tiposervicios);
      setTipocalle(tipocalle);
    });
  }, []);

  useEffect(() => {
    refreshPadronClientes();
  }, [refreshPadronClientes]);

  if (isLoading && padronClientes.data.length === 0) {
    return <PadronClientesSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar padrón de clientes:</p>
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Por favor, intente recargar la página
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
          <h2 className="text-2xl font-bold tracking-tight">Padrón de clientes</h2>
          <p className="text-muted-foreground">
            Gestiona el padrón de clientes
          </p>
        </div>
      </div>

      {/* Bloque de historial de importación */}
      {historial && (
        <div className="border rounded-md bg-muted/50 p-4 mb-4">
          <div className="flex flex-wrap items-center gap-6 justify-between">
            <div>
              <div className="font-medium text-sm text-muted-foreground">Fecha de última importación:</div>
              <div className="font-bold text-md">
                {format(new Date(historial.fecha_importacion), "dd/MM/yyyy HH:mm", { locale: es })}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Cantidad de registros:</div>
              <div className="font-bold text-md">
                {historial.cantidad_registros.toLocaleString("es-PE")}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Importado por:</div>
              <div className="font-bold text-md">
                {historial.creador}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Estado:</div>
              <Badge className={"bg-green-200 text-green-900 font-bold px-6 py-1 text-sm"}>
                {historial.estado === "Exitoso" ? "Exitoso" : historial.estado}
              </Badge>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Observación:</div>
              <div className="font-bold text-md">
                {historial.observacion ? historial.observacion : "No hay observación"}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {padronClientes.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron grupos de trabajo. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableGestionPadron 
          padronClientes={padronClientes}
          tiposData={{
            sectores,
            manzanas,
            calles,
            tiposervicios,
            tipocalle
          }}  
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function PadronClientesView() {
  return (
    <PadronClientesProvider>
      <PadronClientesContent />
    </PadronClientesProvider>
  );
} 