"use client";

import { useTransition } from "react";
import {
  Edit,
  Printer,
  ArrowRightLeft,
  CheckCircle,
  Download,
} from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { FichaCatastro } from "@/models/fichacatastro";
import { imprimirFicha, migrarFicha, aprobarFicha, descargarFichaDoc } from "../../action/gestion-fichas.actions";
import { useRouter } from "next/navigation";

interface GestionFichasActionTableProps {
  ficha: FichaCatastro;
  onRefresh?: () => void; // Callback para refrescar datos
}

export default function GestionFichasActionTable({
  ficha,
  onRefresh,
}: GestionFichasActionTableProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEditarFicha = () => {
    router.push(`/gestion-fichas/${ficha.idficha}`);
  };

  const handleImprimirFicha = () => {
    startTransition(async () => {
      await imprimirFicha(ficha.idficha);
    });
  };

  const handleMigrarFicha = () => {
    startTransition(async () => {
      await migrarFicha(ficha.idficha);
      onRefresh?.();
    });
  };

  const handleAprobarFicha = () => {
    startTransition(async () => {
      await aprobarFicha(ficha.idficha);
      onRefresh?.();
    });
  };

  const handleDescargarFicha = () => {
    startTransition(async () => {
      await descargarFichaDoc(ficha.codcliente);
    });
  };

  const isAprobada = ficha.estadoficha === "F";
  const isParcial = ficha.estadoficha === "P";

  return (
    <div className="flex items-center gap-1">
      {/* Botón Editar */}
      <IconButton
        tooltip="Editar ficha"
        tooltipIcon={<Edit className="h-3 w-3" />}
        onClick={handleEditarFicha}
        disabled={isPending}
        color="blue"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
      </IconButton>

      {/* Botón Imprimir */}
      {/* <IconButton
        tooltip="Imprimir ficha"
        tooltipIcon={<Printer className="h-3 w-3" />}
        onClick={handleImprimirFicha}
        disabled={!isAprobada}
        color="purple"
        variant="ghost"
      >
        <Printer className="h-4 w-4" />
      </IconButton> */}

      {/* Botón Descargar */}
      <IconButton
        tooltip="Descargar ficha en Word"
        tooltipIcon={<Download className="h-3 w-3" />}
        onClick={handleDescargarFicha}
        disabled={!isAprobada}
        color="purple"
        variant="ghost"
      >
        <Download className="h-4 w-4" />
      </IconButton>

      {/* Botón Migrar */}
      {/* <IconButton
        tooltip="Migrar ficha"
        tooltipIcon={<ArrowRightLeft className="h-3 w-3" />}
        onClick={handleMigrarFicha}
        disabled={!isAprobada}
        color="orange"
        variant="ghost"
      >
        <ArrowRightLeft className="h-4 w-4" />
      </IconButton> */}

      {/* <IconButton
        tooltip="Aprobar ficha"
        tooltipIcon={<CheckCircle className="h-3 w-3" />}
        onClick={handleAprobarFicha}
        disabled={!isParcial}
        color="green"
        variant="ghost"
      >
        <CheckCircle className="h-4 w-4" />
      </IconButton> */}
    </div>
  );
}
