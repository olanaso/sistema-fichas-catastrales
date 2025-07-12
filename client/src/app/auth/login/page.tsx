"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { LoadingButton } from "@/components/custom/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("¡Registro exitoso! Por favor inicia sesión.");
    }
  }, [searchParams]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario") as string;
    const password = formData.get("password") as string;

    try {
      const result = await login({ usuario, password });

      if (result.success) {
        toast.success("Inicio de sesión exitoso");
        router.push("/dashboard");
        router.refresh();
      } else {
        //verificas si es un error de disabled o que contenga disables para setear el error en español
        if (result.error.includes("disabled")) {
          setError("Tu cuenta ha sido desactivada. Por favor, contacta al administrador.");
        } else {
          setError(result.error || "Error en el inicio de sesión");
          toast.error(result.error || "Error en el inicio de sesión");
        }
        //setError(result.error || "Error en el inicio de sesión");
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Ocurrió un error al iniciar sesión";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <CustomInputControlled
              type="text"
              name="usuario"
              label="Usuario"
              icon={<Mail className="w-4 h-4" />}
              placeholder="usuario"
              allowedCharacters={["letters", "numeric", "symbols"]}
              helperText="Ingresa tu usuario"
              textTransform="lowercase"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <CustomInputControlled
              type="password"
              name="password"
              icon={<Lock className="w-4 h-4" />}
              placeholder="••••••••"
              allowedCharacters={["letters", "numeric", "symbols"]}
              helperText="Ingresa tu contraseña"
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Mensajes de error y éxito */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}
          
          <LoadingButton
            type="submit"
            className="w-full"
            isLoading={isLoading}
            loadingText="Iniciando sesión..."
          >
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Sesión
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
}
