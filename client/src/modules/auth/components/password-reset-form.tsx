"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { passwordResetSchema, type PasswordResetFormData } from "../schema/password-reset.schema";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface PasswordResetFormProps {
  onSuccess?: () => void;
}

export function PasswordResetForm({ onSuccess }: PasswordResetFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await forgotPassword({ email: data.email });

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Se ha enviado un correo con las instrucciones para restablecer tu contraseña" });
        toast.success("Correo de recuperación enviado exitosamente");
        reset();
        onSuccess?.();
      } else {
        setMessage({ type: "error", text: result.error || "Error al enviar el correo de recuperación" });
        toast.error(result.error || "Error al enviar el correo de recuperación");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Error interno del servidor. Por favor, inténtalo de nuevo.";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" />
              Recuperación de contraseña
            </CardTitle>
            <CardDescription>
              Te enviaremos un enlace seguro a tu correo electrónico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-200 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 