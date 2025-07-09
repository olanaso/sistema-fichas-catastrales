"use client";

import { useEffect, useState } from "react";
import { ConfiguracionProvider, useConfiguracion } from "../context/configuracion-context";
import { ConfiguracionDisplay } from "../components/configuracion-display";
import { ConfiguracionForm } from "../components/forms/configuracion-form";
import { Skeleton } from "@/components/ui/skeleton";

// Componente de carga
function ConfiguracionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <Skeleton className="h-32" />
    </div>
  );
}

// Componente interno que usa el contexto
function ConfiguracionContent() {
  const { configuracion, isLoading, error, refreshConfiguracion } = useConfiguracion();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    refreshConfiguracion();
  }, [refreshConfiguracion]);

  if (isLoading) {
    return <ConfiguracionSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="p-4 text-center text-destructive">
          <p>{error}</p>
          <p className="text-sm text-muted-foreground">
            Por favor, intente recargar la página
          </p>
        </div>
      </div>
    );
  }

  if (!configuracion) {
    return (
      <div className="space-y-6">
        <div className="p-4 text-center">
          <p className="text-muted-foreground">No se encontró configuración</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConfiguracionDisplay 
        configuracion={configuracion} 
        onEdit={() => setIsEditOpen(true)} 
      />
      
      <ConfiguracionForm
        configuracion={configuracion}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}

// Componente principal que envuelve con el provider
export default function ConfiguracionView() {
  return (
    <ConfiguracionProvider>
      <ConfiguracionContent />
    </ConfiguracionProvider>
  );
} 