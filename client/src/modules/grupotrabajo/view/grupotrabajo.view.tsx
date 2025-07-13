"use client";

import { useEffect, useState } from "react";
import TableGrupoTrabajo from "../components/table/table-grupotrabajo";
import { GrupoTrabajoProvider, useGrupoTrabajo } from "../context/grupotrabajo-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { getDataTable } from "../action/grupotrabajo.actions";

// Componente de carga
function GrupoTrabajoSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function GrupoTrabajoContent() {
  const { 
    gruposTrabajo, 
    isLoading, 
    error, 
    refreshGruposTrabajo,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useGrupoTrabajo();

  const [supervisores, setSupervisores] = useState<Usuario[]>([]);
  const [inspectores, setInspectores] = useState<Inspector[]>([]);

  useEffect(() => {
    refreshGruposTrabajo();
  }, [refreshGruposTrabajo]);

  useEffect(() => {
    getDataTable("usersystema").then((data) => {
        setSupervisores(data);
      });
      getDataTable("inspectores").then((data) => {
        setInspectores(data);
      });
  }, [gruposTrabajo, isLoading, error, pagination]);

  if (isLoading && gruposTrabajo.data.length === 0) {
    return <GrupoTrabajoSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar grupos de trabajo:</p>
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
          <h2 className="text-2xl font-bold tracking-tight">Grupos de Trabajo</h2>
          <p className="text-muted-foreground">
            Gestiona los grupos de trabajo y sus inspectores asignados
          </p>
        </div>
      </div>
      
      {gruposTrabajo.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron grupos de trabajo. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableGrupoTrabajo 
          gruposTrabajo={gruposTrabajo}
          supervisores={supervisores}
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
export default function GrupoTrabajoView() {
  return (
    <GrupoTrabajoProvider>
      <GrupoTrabajoContent />
    </GrupoTrabajoProvider>
  );
} 