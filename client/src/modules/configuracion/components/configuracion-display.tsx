"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Mail, Globe, Link, Edit, Building2, AtSign, Server, Database } from "lucide-react";
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Grupo 1: Configuración del Sistema y Empresa */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Building2 className="w-5 h-5" />
              Sistema y Empresa
            </CardTitle>
            <CardDescription>
              Configuración básica del sistema y datos de la empresa
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
            {configuracion.ruc && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">RUC</label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {configuracion.ruc}
                  </p>
                </div>
              </>
            )}
            {configuracion.razonSocial && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Razón Social</label>
                  <p className="text-sm">{configuracion.razonSocial}</p>
                </div>
              </>
            )}
            {configuracion.nombreComercial && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nombre Comercial</label>
                  <p className="text-sm">{configuracion.nombreComercial}</p>
                </div>
              </>
            )}
            {(configuracion.pais || configuracion.departamento || configuracion.provincia || configuracion.distrito) && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ubicación</label>
                  <p className="text-sm">
                    {[configuracion.distrito, configuracion.provincia, configuracion.departamento, configuracion.pais]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Grupo 2: Configuración de Correo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <AtSign className="w-5 h-5" />
              Configuración de Correo
            </CardTitle>
            <CardDescription>
              Configuración del servidor de correo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {configuracion.correoSoporte ? (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Correo de Soporte</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {configuracion.correoSoporte}
                  </p>
                  <Badge variant="secondary">Configurado</Badge>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Correo de Soporte</label>
                <Badge variant="destructive">Sin configurar</Badge>
              </div>
            )}
            
            {configuracion.hostCorreo && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Host del Correo</label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {configuracion.hostCorreo}
                  </p>
                </div>
              </>
            )}
            
            {configuracion.puertoCorreo && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Puerto del Correo</label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {configuracion.puertoCorreo}
                  </p>
                </div>
              </>
            )}
            
            {configuracion.usuarioCorreo && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Usuario del Correo</label>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {configuracion.usuarioCorreo}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Grupo 3: Conexiones SICI y APIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <Server className="w-5 h-5" />
              Conexiones y APIs
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
            <Separator />
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
            {configuracion.apiReniecRuc && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">API RENIEC/RUC</label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {configuracion.apiReniecRuc}
                    </p>
                    <Badge variant="secondary">Configurado</Badge>
                  </div>
                </div>
              </>
            )}
            
            {/* Configuración de Base de Datos */}
            {(configuracion.hostDb || configuracion.usuarioDb || configuracion.baseDatos) && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Base de Datos PostgreSQL
                  </label>
                  <div className="space-y-2 mt-2">
                    {configuracion.hostDb && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Host:</span>
                        <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {configuracion.hostDb}
                        </p>
                      </div>
                    )}
                    {configuracion.usuarioDb && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Usuario:</span>
                        <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {configuracion.usuarioDb}
                        </p>
                      </div>
                    )}
                    {configuracion.baseDatos && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Base de datos:</span>
                        <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {configuracion.baseDatos}
                        </p>
                      </div>
                    )}
                    <Badge variant="secondary" className="text-xs">Configurado</Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 