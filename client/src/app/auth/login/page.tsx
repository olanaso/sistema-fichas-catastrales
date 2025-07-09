"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await login({ email, password });

      if (result.success) {
        toast.success("Inicio de sesión exitoso");
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Error en el inicio de sesión");
        toast.error(result.error || "Error en el inicio de sesión");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Ocurrió un error al iniciar sesión";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
          <p className="text-gray-500">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-200 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md">
              {success}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
          
          <div className="space-y-4">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-white px-2 text-muted-foreground">
                O continua con
              </span>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              disabled={isLoading}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-5 h-5 mr-2">
                <path
                  fill="currentColor"
                  d="M533.5 278.4c0-18.4-1.5-36.3-4.3-53.6H272v101.4h147.3c-6.3 34.1-25.2 63.1-53.7 82.3v68.3h86.7c50.7-46.7 80.2-115.6 80.2-198.4z"
                />
                <path
                  fill="currentColor"
                  d="M272 544.3c72.6 0 133.6-24.1 178.1-65.6l-86.7-68.3c-24.1 16.2-54.9 25.7-91.4 25.7-70.3 0-130-47.5-151.3-111.3H31.1v69.9c44.8 89.6 137.2 149.6 240.9 149.6z"
                />
                <path
                  fill="currentColor"
                  d="M120.7 324.8c-10.1-29.6-10.1-61.2 0-90.8V164H31.1c-42.1 83.5-42.1 182.8 0 266.3l89.6-69.5z"
                />
                <path
                  fill="currentColor"
                  d="M272 107.7c39.5-.6 77.4 13.6 106.5 40.1l79.6-79.6C408.8 24.6 342.2-1.1 272 0 168.3 0 75.9 59.9 31.1 149.5l89.6 69.9C142 155.2 201.7 107.7 272 107.7z"
                />
              </svg>
              Iniciar sesión con Google
            </Button>
          </div>
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
