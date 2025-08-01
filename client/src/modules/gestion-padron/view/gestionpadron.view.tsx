"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CalendarIcon, CheckCircleIcon, DatabaseIcon, FileTextIcon, FolderIcon, HashIcon, UserIcon } from "lucide-react";
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
    data: padronClientes, 
    isLoading, 
    error, 
    refreshData,
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
    refreshData();
  }, [refreshData]);

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
        <div className="border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-950 dark:to-indigo-950 p-4 mb-6 shadow-sm">
          {/* Primera fila - Información principal */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-3">
                         {/* Fecha de importación */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <CalendarIcon className="h-3 w-3 text-blue-600" />
                 <div className="font-medium text-xs text-muted-foreground">Fecha</div>
               </div>
               <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                 {format(new Date(historial.fechareg), "dd/MM/yyyy", { locale: es })}
               </div>
               <div className="text-xs text-muted-foreground">
                 {format(new Date(historial.fechareg), "HH:mm", { locale: es })}
               </div>
             </div>

                         {/* Cantidad de registros */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <DatabaseIcon className="h-3 w-3 text-green-600" />
                 <div className="font-medium text-xs text-muted-foreground">Registros</div>
               </div>
               <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                 {historial.cantidad_registros.toLocaleString("es-PE")}
               </div>
             </div>

             {/* Usuario creador */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <UserIcon className="h-3 w-3 text-purple-600" />
                 <div className="font-medium text-xs text-muted-foreground">Usuario</div>
               </div>
               <div className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">
                 {historial.creador}
               </div>
             </div>

             {/* Estado */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <CheckCircleIcon className="h-3 w-3 text-orange-600" />
                 <div className="font-medium text-xs text-muted-foreground">Estado</div>
               </div>
               <Badge 
                 className={`font-bold px-2 py-0.5 text-xs ${
                   historial.estado === "EXITOSO" 
                     ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700" 
                     : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700"
                 }`}
               >
                 {historial.estado === "EXITOSO" ? "Exitoso" : historial.estado}
               </Badge>
             </div>

             {/* Código de padrón */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <HashIcon className="h-3 w-3 text-indigo-600" />
                 <div className="font-medium text-xs text-muted-foreground">Código</div>
               </div>
               <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                 #{historial.codpadron}
               </div>
             </div>

             {/* Observación rápida */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-1 mb-1">
                 <FileTextIcon className="h-3 w-3 text-gray-600" />
                 <div className="font-medium text-xs text-muted-foreground">Obs.</div>
               </div>
               <div className="text-xs text-gray-900 dark:text-gray-100 truncate">
                 {historial.observacion || "Sin observación"}
               </div>
             </div>
          </div>

                     {/* Segunda fila - Información de backups */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {/* Backup clientes */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-2 mb-2">
                 <FolderIcon className="h-4 w-4 text-amber-600" />
                 <div className="font-medium text-sm text-muted-foreground">Backup clientes</div>
               </div>
               <div className="font-mono text-xs text-gray-900 dark:text-gray-100 break-all bg-gray-50 dark:bg-gray-700 p-2 rounded">
                 {historial.tablacliente_bk || "No disponible"}
               </div>
             </div>

             {/* Backup unidades de uso */}
             <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border dark:border-gray-700">
               <div className="flex items-center gap-2 mb-2">
                 <FolderIcon className="h-4 w-4 text-cyan-600" />
                 <div className="font-medium text-sm text-muted-foreground">Backup unidades</div>
               </div>
               <div className="font-mono text-xs text-gray-900 dark:text-gray-100 break-all bg-gray-50 dark:bg-gray-700 p-2 rounded">
                 {historial.tablauduso_bk || "No disponible"}
               </div>
             </div>
           </div>
        </div>
      )}
      
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