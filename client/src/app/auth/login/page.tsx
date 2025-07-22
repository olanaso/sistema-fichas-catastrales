"use client";

import { Suspense } from "react";
import { LoadingButton } from "@/components/custom/loading-button";
import { LogIn } from "lucide-react";
import { LoginFormComponent } from "./login-form";

// Componente de carga para Suspense
function LoginFormSkeleton() {
  return (
    <div className="w-full shadow-xl rounded-lg border bg-card text-card-foreground">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-center">Iniciar Sesión</h3>
        <p className="text-sm text-muted-foreground text-center">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-10 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-10 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginFormComponent />
    </Suspense>
  );
}
