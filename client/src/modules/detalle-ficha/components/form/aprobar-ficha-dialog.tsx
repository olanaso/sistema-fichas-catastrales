"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";

interface AprobarFichaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
}

export default function AprobarFichaDialog({
  isOpen,
  onClose,
  fichaId,
}: AprobarFichaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAprobar = async () => {
    setIsLoading(true);
    try {
      console.log("Aprobando ficha:", { fichaId });
      
      // TODO: Aquí irá la llamada al endpoint
      // const result = await aprobarFicha(fichaId);
      
      toast.success("Ficha aprobada correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al aprobar la ficha");
      console.error("Error approving ficha:", error);
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
      title="Aprobar ficha catastral"
      description="¿Está seguro que desea aprobar esta ficha?"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de confirmación */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                Ficha a aprobar:
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Ficha #{fichaId}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                Al aprobar la ficha, se marcará como "Finalizada" y no podrá ser modificada posteriormente.
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
                Asegúrese de que todos los datos de la ficha estén correctos antes de proceder con la aprobación.
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
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            onClick={handleAprobar}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Aprobando...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Aprobar ficha
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 