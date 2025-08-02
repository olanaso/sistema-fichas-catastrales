"use client";

import { useEffect, useState } from "react";
import TableImportarPadron from "../components/table/table-importarpadron";
import { ImportarPadronProvider, useImportarPadron } from "../context/importarpadron-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircleIcon, DatabaseIcon, FileTextIcon, FolderIcon, HashIcon, UserIcon, Calendar as CalendarIcon } from "lucide-react";
import { getHistorialImportarPadronClientes } from "../action/importarpadron.actions";
import { PadronHistorico } from "@/models/padronhistorico";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

// Componente de carga
function ImportarPadronSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function ImportarPadronContent() {
  const { 
    data: importarPadronData, 
    isLoading, 
    error, 
    refreshData,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useImportarPadron();

  const [historial, setHistorial] = useState<PadronHistorico | null>(null);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    getHistorialImportarPadronClientes().then((data) => {
      setHistorial(data);
    });
  }, []);

  if (isLoading && importarPadronData.data.length === 0) {
    return <ImportarPadronSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar importar padrón de clientes:</p>
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
          <h2 className="text-2xl font-bold tracking-tight">Importar padrón de clientes</h2>
          <p className="text-muted-foreground">
            Gestiona el importar padrón de clientes
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
      
      {importarPadronData.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron importar padrón de clientes. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableImportarPadron 
          importarPadronClientes={importarPadronData}
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function ImportarPadronView() {
  return (
    <ImportarPadronProvider>
      <ImportarPadronContent />
    </ImportarPadronProvider>
  );
} 