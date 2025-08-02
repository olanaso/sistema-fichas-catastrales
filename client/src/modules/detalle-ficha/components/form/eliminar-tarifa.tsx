"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { eliminarUnidadUsoPorItem } from "../../action/detalle-ficha.action";

interface DeleteTarifaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tarifaId: string | number;
  tarifaNombre: string;
  idficha: number; // Agregar idficha para la eliminación
  onTarifaDeleted?: () => void; // Callback para actualizar la lista de tarifas
}

export default function DeleteTarifaDialog({
  isOpen,
  onClose,
  tarifaId,
  tarifaNombre,
  idficha,
  onTarifaDeleted,
}: DeleteTarifaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      console.log("Eliminando tarifa:", { tarifaId, tarifaNombre, idficha });
      
      // Llamar a la API para eliminar la unidad de uso
      const result = await eliminarUnidadUsoPorItem(tarifaId.toString(), idficha);
      
      if (result.success) {
        onClose();
        
        // Actualizar la lista de tarifas si se proporciona el callback
        if (onTarifaDeleted) {
          onTarifaDeleted();
        }
      }
    } catch (error) {
      console.error("Error deleting tarifa:", error);
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
      title="Confirmar eliminación"
      description="¿Está seguro que desea eliminar esta tarifa?"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de la tarifa a eliminar */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                Tarifa a eliminar:
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {tarifaNombre}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Esta acción no se puede deshacer. La tarifa será eliminada permanentemente.
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
            onClick={handleDelete}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar tarifa
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 