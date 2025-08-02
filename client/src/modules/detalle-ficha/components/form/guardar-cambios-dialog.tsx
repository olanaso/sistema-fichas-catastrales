"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, AlertTriangle } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";

interface GuardarCambiosDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
  atributosActualizar: { [key: string]: string };
}

export default function GuardarCambiosDialog({
  isOpen,
  onClose,
  fichaId,
  atributosActualizar,
}: GuardarCambiosDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardar = async () => {
    setIsLoading(true);
    try {
      const formData = {
        fichaId,
        atributosActualizar,
      };

      console.log("Guardando cambios:", formData);
      
      // TODO: Aquí irá la llamada al endpoint
      // const result = await guardarCambiosFicha(formData);
      
      toast.success("Cambios guardados correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al guardar los cambios");
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const cantidadCambios = Object.keys(atributosActualizar).length;

  return (
    <CustomDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Guardar cambios"
      description="¿Está seguro que desea guardar los cambios realizados?"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de cambios */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Save className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Cambios a guardar:
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Ficha #{fichaId} - {cantidadCambios} campo{cantidadCambios !== 1 ? 's' : ''} modificado{cantidadCambios !== 1 ? 's' : ''}
              </p>
              {cantidadCambios > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Campos modificados:
                  </p>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 mt-1 space-y-1">
                    {Object.keys(atributosActualizar).slice(0, 3).map((campo) => (
                      <li key={campo} className="ml-2">
                        • {campo}: {atributosActualizar[campo]}
                      </li>
                    ))}
                    {Object.keys(atributosActualizar).length > 3 && (
                      <li className="ml-2 text-blue-500">
                        • ... y {Object.keys(atributosActualizar).length - 3} más
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advertencia */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Confirmación:
              </h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Los cambios se guardarán en la base de datos. Esta acción no se puede deshacer.
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
            className="w-full sm:w-auto"
            onClick={handleGuardar}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 