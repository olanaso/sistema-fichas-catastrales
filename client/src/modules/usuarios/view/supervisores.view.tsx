"use client";

import { useEffect, useState } from "react";
import TableUsuario from "../components/table/table-usuario";
import { UsuariosProvider, useUsuarios } from "../context/usuarios-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Componente de carga
function SupervisoresSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

// Componente interno que usa el contexto
function SupervisoresContent() {
  const { 
    usuarios, 
    isLoading, 
    error, 
    refreshUsuarios,
    pagination,
    handlePageChange,
    handlePageSizeChange
  } = useUsuarios();

  useEffect(() => {
    console.log('SupervisoresContent montado, iniciando refreshUsuarios');
    refreshUsuarios();
  }, [refreshUsuarios]);

  useEffect(() => {
    console.log('Estado actual:', { usuarios, isLoading, error, pagination });
  }, [usuarios, isLoading, error, pagination]);


  if (isLoading && usuarios.data.length === 0) {
    return <SupervisoresSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Error al cargar usuarios:</p>
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Por favor, intente recargar la página
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Supervisores</h2>
          <p className="text-muted-foreground">
            Gestiona los supervisores del sistema
          </p>
        </div>
      </div>
      
      {usuarios.data.length === 0 && !isLoading ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No se encontraron usuarios. Verifique la conexión con la base de datos.
          </AlertDescription>
        </Alert>
      ) : (
        <TableUsuario 
          usuarios={usuarios}
          loading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Componente principal que envuelve con el provider
export default function SupervisoresView() {
  return (
    <UsuariosProvider>
      <SupervisoresContent />
    </UsuariosProvider>
  );
}
