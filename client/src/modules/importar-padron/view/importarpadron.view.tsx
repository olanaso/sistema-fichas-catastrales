"use client";

import { useEffect, useState } from "react";
import TableImportarPadron from "../components/table/table-importarpadron";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { ImportarPadronClientesProvider, useImportarPadronClientes } from "../context/importarpadron-context";
import { getHistorialImportarPadronClientes } from "../action/importarpadron.actions";
import { PadronHistorico } from "@/models/padronhistorico";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

// Componente de carga
function ImportarPadronClientesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function ImportarPadronClientesContent() {
  const { 
    importarPadronClientes, 
    isLoading, 
    error, 
    refreshImportarPadronClientes,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useImportarPadronClientes();

  const [historial, setHistorial] = useState<PadronHistorico | null>(null);

  useEffect(() => {
    refreshImportarPadronClientes();
  }, [refreshImportarPadronClientes]);

  useEffect(() => {
    getHistorialImportarPadronClientes().then((data) => {
      setHistorial(data);
    });
  }, []);

  if (isLoading && importarPadronClientes.data.length === 0) {
    return <ImportarPadronClientesSkeleton />;
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
        <div className="border rounded-md bg-muted/50 p-4 mb-4">
          <div className="flex flex-wrap items-center gap-6 justify-between">
            <div>
              <div className="font-medium text-sm text-muted-foreground">Fecha de última importación:</div>
              <div className="font-bold text-lg">
                {format(new Date(historial.fecha_importacion), "dd/MM/yyyy HH:mm", { locale: es })}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Cantidad de registros:</div>
              <div className="font-bold text-lg">
                {historial.cantidad_registros.toLocaleString("es-PE")}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Importado por:</div>
              <div className="font-bold text-lg">
                {historial.creador}
              </div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground">Estado:</div>
              <Badge className={"bg-green-200 text-green-900 font-bold px-6 py-2 text-base"}>
                {historial.estado === "Exitoso" ? "Exitoso" : historial.estado}
              </Badge>
            </div>
          </div>
        </div>
      )}
      
      {importarPadronClientes.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron importar padrón de clientes. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableImportarPadron 
          importarPadronClientes={importarPadronClientes}
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function ImportarPadronClientesView() {
  return (
    <ImportarPadronClientesProvider>
      <ImportarPadronClientesContent />
    </ImportarPadronClientesProvider>
  );
} 