"use client";

import { User, Mail, CreditCard, Shield, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UsuarioDto } from "@/models/usuario";

interface AccountInfoProps {
  userData: UsuarioDto;
}

export function AccountInfo({ userData }: AccountInfoProps) {
  // Obtener iniciales para el avatar
  const getInitials = (nombres: string, apellidos: string) => {
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  // Obtener el rol principal (el primero de la lista)
  const getMainRole = () => {
    return userData.rol && userData.rol.length > 0 ? userData.rol[0] : null;
  };

  const mainRole = getMainRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Información de mi cuenta
        </CardTitle>
        <CardDescription>Datos personales y configuración de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar y nombre */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage 
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png" 
              alt="Avatar" 
            />
            <AvatarFallback className="text-lg">
              {getInitials(userData.nombres, userData.apellidos)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {`${userData.nombres} ${userData.apellidos}`}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant={userData.activo ? "default" : "secondary"}>
                {userData.activo ? "Activo" : "Inactivo"}
              </Badge>
              {mainRole && (
                <Badge variant="outline">
                  {mainRole.rol}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Información personal */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Información Personal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="font-medium">Nombres:</span>
              </div>
              <p className="text-gray-900">{userData.nombres}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="font-medium">Apellidos:</span>
              </div>
              <p className="text-gray-900">{userData.apellidos}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Correo Electrónico:</span>
              </div>
              <p className="text-gray-900">{userData.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="h-4 w-4" />
                <span className="font-medium">DNI:</span>
              </div>
              <p className="text-gray-900">{userData.dni || "No especificado"}</p>
            </div>
          </div>
        </div>

        {/* Información de roles */}
        {userData.rol && userData.rol.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Roles y Permisos</h4>
            <div className="space-y-3">
              {userData.rol.map((rol, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{rol.rol}</p>
                      <p className="text-sm text-gray-600">Código: {rol.codigo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado de la cuenta */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Estado de la Cuenta</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {userData.enabled ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.enabled ? "Cuenta Habilitada" : "Cuenta Deshabilitada"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.enabled ? "Tu cuenta está activa" : "Tu cuenta está inactiva"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {userData.accountNonLocked ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.accountNonLocked ? "Cuenta No Bloqueada" : "Cuenta Bloqueada"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.accountNonLocked ? "Puedes acceder normalmente" : "Acceso restringido"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {userData.accountNonExpired ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.accountNonExpired ? "Cuenta No Expirada" : "Cuenta Expirada"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.accountNonExpired ? "Vigencia válida" : "Requiere renovación"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {userData.credentialsNonExpired ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {userData.credentialsNonExpired ? "Credenciales Válidas" : "Credenciales Expiradas"}
                </p>
                <p className="text-sm text-gray-600">
                  {userData.credentialsNonExpired ? "Contraseña vigente" : "Cambiar contraseña"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 