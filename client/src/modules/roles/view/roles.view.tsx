"use client";

import { useEffect } from "react";
import TableUsuario from "../components/table/table-usuario";
import { UsuariosProvider, useUsuarios } from "../context/usuarios-context";
import { Skeleton } from "@/components/ui/skeleton";

// Componente de carga
function UsuariosSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function UsuariosContent() {
  const { usuarios, isLoading, error, refreshUsuarios } = useUsuarios();

  useEffect(() => {
    refreshUsuarios();
  }, [refreshUsuarios]);

  if (isLoading) {
    return <UsuariosSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="p-4 text-center text-destructive">
          <p>{error}</p>
          <p className="text-sm text-muted-foreground">
            Por favor, intente recargar la página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TableUsuario usuarios={usuarios} />
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function UsuariosView() {
  return (
    <UsuariosProvider>
      <UsuariosContent />
    </UsuariosProvider>
  );
}
