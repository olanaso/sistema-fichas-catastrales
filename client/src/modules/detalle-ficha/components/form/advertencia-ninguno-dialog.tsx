"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, AlertTriangle, X } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { actualizarFichaCatastro } from "../../action/detalle-ficha.action";

interface AdvertenciaNingunoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
  tipoAccionComercial: string;
  onSuccess: () => void;
}

export default function AdvertenciaNingunoDialog({
  isOpen,
  onClose,
  fichaId,
  tipoAccionComercial,
  onSuccess,
}: AdvertenciaNingunoDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmar = async () => {
    setIsLoading(true);
    try {
      const result = await actualizarFichaCatastro({
        idficha: fichaId,
        columnas: ["asignado_accioncomercial", "tipoacccomercial"],
        valores: ["NULL", tipoAccionComercial],
      });

      if (result.success) {
        toast.success("Acción comercial removida correctamente");
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Error al remover acción comercial");
      console.error("Error removing commercial action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <CustomDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Advertencia - Remover Acción Comercial"
      description="¿Está seguro que desea remover la acción comercial?"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de advertencia */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                Acción Comercial:
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Se establecerá como "NINGUNO"
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Al confirmar, se removerá la asignación de inspector y se establecerá el tipo de acción comercial como vacío.
              </p>
            </div>
          </div>
        </div>

        {/* Advertencia adicional */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Confirmación requerida:
              </h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Esta acción actualizará la base de datos removiendo la asignación de inspector y el tipo de acción comercial.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmar}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Confirmar Remoción
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 