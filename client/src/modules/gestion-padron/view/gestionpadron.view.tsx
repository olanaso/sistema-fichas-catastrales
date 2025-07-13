"use client";

import { useEffect, useState } from "react";
import TableGrupoTrabajo from "../components/table/table-grupotrabajo";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { PadronClientesProvider, usePadronClientes } from "../context/grupotrabajo-context";
import TableGestionPadron from "../components/table/table-grupotrabajo";

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
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = usePadronClientes();

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
          <h2 className="text-2xl font-bold tracking-tight">Padrón de Clientes</h2>
          <p className="text-muted-foreground">
            Gestiona el padrón de clientes
          </p>
        </div>
      </div>
      
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