"use client";

import { useEffect, useState } from "react";
import TableInspector from "../components/table/table-inspector";
import { InspectoresProvider, useInspectores } from "../context/inspectores-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getData } from "@/service/data.actions";
import { GrupoTrabajo } from "@/models/grupotrabajo";
import { obtenerDataDinamico } from "@/service/obtener-data-dinamico";

// Componente de carga
function InspectoresSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function InspectoresContent() {
  const { 
    data: inspectores, 
    isLoading, 
    error, 
    refreshData,
    handlePageChange,
    handlePageSizeChange
  } = useInspectores();
  const [gruposDeTrabajo, setGruposDeTrabajo] = useState<GrupoTrabajo[]>([]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    //obtener data de la tabla de grupos de trabajo
    obtenerDataDinamico("usp_grupotrabajo").then((data) => {
      setGruposDeTrabajo(data);
    });
  }, []);

  if (isLoading && inspectores.data.length === 0) {
    return <InspectoresSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar inspectores:</p>
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
          <h2 className="text-2xl font-bold tracking-tight">Inspectores</h2>
          <p className="text-muted-foreground">
            Gestiona los inspectores del sistema
          </p>
        </div>
      </div>
      
      {inspectores.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron inspectores. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableInspector 
          gruposDeTrabajo={gruposDeTrabajo}
          inspectores={inspectores}
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function InspectoresView() {
  return (
    <InspectoresProvider>
      <InspectoresContent />
    </InspectoresProvider>
  );
} 