"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, AtSign, Server } from "lucide-react";
import { EmpresaForm } from "./forms/empresa-form";
import { CorreoForm } from "./forms/correo-form";
import { SistemasForm } from "./forms/sistemas-form";
import { ConfiguracionDto } from "@/models/configuracion";

interface ConfiguracionTabsProps {
  configuracion: ConfiguracionDto;
}

export function ConfiguracionTabs({ configuracion }: ConfiguracionTabsProps) {
  return (
    <Tabs defaultValue="empresa" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="empresa" className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Información de Empresa
        </TabsTrigger>
        <TabsTrigger value="correo" className="flex items-center gap-2">
          <AtSign className="w-4 h-4" />
          Configuración de Correo
        </TabsTrigger>
        <TabsTrigger value="sistemas" className="flex items-center gap-2">
          <Server className="w-4 h-4" />
          Conexiones a Sistemas
        </TabsTrigger>
      </TabsList>

      <TabsContent value="empresa" className="space-y-6">
        <div className="space-y-4 p-4">
          <EmpresaForm configuracion={configuracion} />
        </div>
      </TabsContent>

      <TabsContent value="correo" className="space-y-6">
        <div className="space-y-4 p-4">
          <CorreoForm configuracion={configuracion} />
        </div>
      </TabsContent>

      <TabsContent value="sistemas" className="space-y-6">
        <div className="space-y-4 p-4">
          <SistemasForm configuracion={configuracion} />
        </div>
      </TabsContent>
    </Tabs>
  );
} 