"use client";

import { useTransition, useState } from "react";
import {
  Edit,
  Printer,
  ArrowRightLeft,
  CheckCircle,
  Download,
  FileText,
  FileImage,
} from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { FichaCatastro } from "@/models/fichacatastro";
import { imprimirFicha, migrarFicha, aprobarFicha, descargarFichaDoc } from "../../action/gestion-fichas.actions";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface GestionFichasActionTableProps {
  ficha: FichaCatastro;
  onRefresh?: () => void; // Callback para refrescar datos
}

export default function GestionFichasActionTable({
  ficha,
  onRefresh,
}: GestionFichasActionTableProps) {
  const [isPending, startTransition] = useTransition();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

  const handleDescargarFichaWord = () => {
    startTransition(async () => {
      await descargarFichaDoc(ficha.codcliente);
      setIsPopoverOpen(false);
    });
  };

  const handleDescargarFichaPDF = () => {
    startTransition(async () => {
      // TODO: Implementar descarga en PDF
      console.log("Descargando ficha en PDF:", ficha.codcliente);
      setIsPopoverOpen(false);
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

      {/* Botón Descargar con Popover */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <IconButton
            tooltip="Descargar ficha"
            tooltipIcon={<Download className="h-3 w-3" />}
            disabled={!isAprobada}
            color="purple"
            variant="ghost"
          >
            <Download className="h-4 w-4" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleDescargarFichaWord}
              disabled={isPending}
            >
              <FileText className="h-4 w-4 mr-2" />
              Descargar en Word
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleDescargarFichaPDF}
              disabled={isPending}
            >
              <FileImage className="h-4 w-4 mr-2" />
              Descargar en PDF
            </Button>
          </div>
        </PopoverContent>
      </Popover>

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
