"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Clock, AlertTriangle } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { establecerFichaParcial } from "../../action/detalle-ficha.action";

interface EstablecerParcialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
  codUsuario: string;
}

export default function EstablecerParcialDialog({
  isOpen,
  onClose,
  fichaId,
  codUsuario,
}: EstablecerParcialDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEstablecerParcial = async () => {
    setIsLoading(true);
    try {
      const result = await establecerFichaParcial(fichaId, codUsuario);
      
      if (result.success) {
        toast.success("Ficha establecida como parcial correctamente");
        onClose();
        // Recargar la página para mostrar los cambios
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error al establecer ficha como parcial");
      console.error("Error setting ficha as partial:", error);
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
      title="Establecer ficha como parcial"
      description="¿Está seguro que desea establecer esta ficha como parcial?"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de confirmación */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Ficha a establecer como parcial:
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Ficha #{fichaId}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Al establecer como parcial, la ficha podrá ser evaluada y posteriormente aprobada u observada.
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
                Esta acción marcará la ficha como "Parcial" y permitirá su evaluación posterior.
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
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            onClick={handleEstablecerParcial}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Estableciendo...
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Establecer como parcial
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 