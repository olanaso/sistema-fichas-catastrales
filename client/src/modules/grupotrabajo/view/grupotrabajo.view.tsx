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
import TitlePage from "@/components/custom/title-page";

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
        <TitlePage
          title="Grupos de trabajo"
          description="Gestiona los grupos de trabajo y sus inspectores asignados"
        />
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