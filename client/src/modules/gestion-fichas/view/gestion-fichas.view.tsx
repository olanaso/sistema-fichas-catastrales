"use client";

import { useEffect } from "react";
import TableFichas from "../components/table/table-fichas";
import {
  GestionFichasProvider,
  useGestionFichas,
} from "../context/gestion-fichas-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText, Database } from "lucide-react";
import TitlePage from "@/components/custom/title-page";

// Componente de carga
function GestionFichasSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function GestionFichasContent() {
  const {
    data: fichas,
    isLoading,
    error,
    refreshData,
    pagination,
    handlePageChange,
    handlePageSizeChange,
  } = useGestionFichas();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
  }, [fichas, isLoading, error, pagination]);

  if (isLoading && fichas.data.length === 0) {
    return <GestionFichasSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <TitlePage
          title="Gestión de fichas catastrales"
          description="Visualiza las fichas catastrales"
        />

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar fichas catastrales:</p>
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Verifique la conexión con la base de datos o que la tabla
              'fichacatastro_eps' exista
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
          title="Gestión de fichas catastrales"
          description="Visualiza las fichas catastrales"
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="w-4 h-4" />
          <span>Total: {fichas.total || 0} fichas</span>
        </div>
      </div>

      {fichas.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">
              No se encontraron fichas catastrales
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <TableFichas
          fichas={fichas}
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function GestionFichasView() {
  return (
    <GestionFichasProvider>
      <GestionFichasContent />
    </GestionFichasProvider>
  );
}
