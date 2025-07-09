"use client";

import { useEffect } from "react";
import { useConfiguracion } from "../context/configuracion-context";
import { ConfiguracionContainer } from "../components/configuracion-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConfiguracionTabsView() {
  const { configuracion, isLoading, error, refreshConfiguracion } = useConfiguracion();

  useEffect(() => {
    if (!configuracion) {
      refreshConfiguracion();
    }
  }, [configuracion, refreshConfiguracion]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 xs:p-4">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !configuracion) {
    return (
      <div className="min-h-screen bg-gray-50 xs:p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              {error || "No se pudo cargar la configuración"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 xs:p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Parámetros del Sistema</h1>
          <p className="mt-2">Administra la configuración del sistema dividida en tres bloques principales</p>
        </div>

        <ConfiguracionContainer configuracion={configuracion} />
      </div>
    </div>
  );
} 