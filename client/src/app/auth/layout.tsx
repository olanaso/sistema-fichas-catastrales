"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useConfiguracionPublica } from "@/hooks/use-configuracion-publica";
import { getLogoUrl } from "@/lib/image-utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { configuracion, isLoading } = useConfiguracionPublica();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            {configuracion?.logo ? (
              <img
                src={getLogoUrl(configuracion.logo)}
                alt="Logo del sistema"
                className="h-6 w-auto object-contain"
                onError={(e) => {
                  // Si la imagen no carga, mostrar el ícono por defecto
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className="hidden flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {isLoading ? (
              <span className="animate-pulse bg-muted rounded px-2 py-1">
                Cargando...
              </span>
            ) : (
              configuracion?.nombreSistema || "SIS FICHAS"
            )}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* children */}
            {children}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/uploads/banner.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
