"use client";

import { useState } from "react";
import { ConfiguracionTabs } from "./configuracion-tabs";
import { EmpresaForm } from "./forms/empresa-form";
import { CorreoForm } from "./forms/correo-form";
import { SistemasForm } from "./forms/sistemas-form";
import { ConfiguracionDto } from "@/models/configuracion";

type TabType = "empresa" | "correo" | "sistemas";

interface ConfiguracionContainerProps {
  configuracion: ConfiguracionDto;
}

export function ConfiguracionContainer({ configuracion }: ConfiguracionContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("empresa");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar con tabs verticales */}
      <div className="lg:col-span-1">
        <ConfiguracionTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Contenido principal */}
      <div className="lg:col-span-3">
        {activeTab === "empresa" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Información de Empresa</h2>
              <p className="text-muted-foreground">
                Configura la información básica del sistema y los datos de la empresa.
              </p>
            </div>
            <EmpresaForm configuracion={configuracion} />
          </div>
        )}

        {activeTab === "correo" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Configuración de Correo</h2>
              <p className="text-muted-foreground">
                Configura los parámetros del servidor de correo para el envío de notificaciones.
              </p>
            </div>
            <CorreoForm configuracion={configuracion} />
          </div>
        )}

        {activeTab === "sistemas" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Conexiones a Sistemas</h2>
              <p className="text-muted-foreground">
                Configura las conexiones a sistemas externos y la base de datos.
              </p>
            </div>
            <SistemasForm configuracion={configuracion} />
          </div>
        )}
      </div>
    </div>
  );
} 