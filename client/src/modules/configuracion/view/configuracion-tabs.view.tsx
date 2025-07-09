"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfiguracionTabs } from "../components/configuracion-tabs";
import { useConfiguracion } from "../context/configuracion-context";
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
      <div className="container mx-auto py-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[500px]" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[400px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !configuracion) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              {error || "No se pudo cargar la configuración"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración del sistema dividida en tres bloques principales.
        </p>
      </div>

      <div className="space-y-4 p-4">
        <ConfiguracionTabs configuracion={configuracion} />
      </div>

    </div>
  );
} 