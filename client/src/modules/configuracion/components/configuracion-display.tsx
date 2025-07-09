"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Mail, Globe, Link, Image, Edit } from "lucide-react";
import { ConfiguracionDto } from "@/models/configuracion";

interface ConfiguracionDisplayProps {
  configuracion: ConfiguracionDto;
  onEdit: () => void;
}

export function ConfiguracionDisplay({ configuracion, onEdit }: ConfiguracionDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h2>
          <p className="text-muted-foreground">
            Gestiona la configuración general del sistema
          </p>
        </div>
        <Button onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Editar configuración
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Settings className="w-5 h-5" />
              Información del Sistema
            </CardTitle>
            <CardDescription>
              Configuración básica del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nombre del Sistema</label>
              <p className="text-md font-semibold text-primary">{configuracion.nombreSistema}</p>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nombre del Correo</label>
              <p className="text-md font-semibold text-primary">{configuracion.nombreCorreo}</p>
            </div>
          </CardContent>
        </Card>

        {/* Conexiones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Globe className="w-5 h-5" />
              Conexiones
            </CardTitle>
            <CardDescription>
              URLs de conexión a servicios externos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Conexión SICI1</label>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {configuracion.conexionSici1}
                </p>
                <Badge variant="secondary">Activa</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-muted-foreground">Conexión SICI2</label>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {configuracion.conexionSici2}
                </p>
                <Badge variant="secondary">Activa</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Link className="w-5 h-5" />
              URL del Cliente
            </CardTitle>
            <CardDescription>
              URL principal del sistema cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm font-medium text-muted-foreground">URL del Cliente</label>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {configuracion.clienteUrl || "No configurado"}
                </p>
                {configuracion.clienteUrl ? (
                  <Badge variant="secondary">Configurado</Badge>
                ) : (
                  <Badge variant="destructive">Sin configurar</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Image className="w-5 h-5" />
              Logo del Sistema
            </CardTitle>
            <CardDescription>
              Logo actual del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {configuracion.logo ? (
                <div className="space-y-2">
                  <img
                    src={configuracion.logo}
                    alt="Logo del sistema"
                    className="max-h-32 mx-auto rounded-lg border"
                  />
                  <p className="text-sm text-center text-muted-foreground">
                    Logo actual del sistema
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No hay logo configurado
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 