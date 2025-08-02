"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, User, AlertTriangle } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { ComboboxOption } from "@/types/combobox";
import { getData } from "@/service/data.actions";
import { Inspector } from "@/models/inspector";
import { actualizarFichaCatastro } from "../../action/detalle-ficha.action";

interface SeleccionarInspectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
  tipoAccionComercial: string;
  onSuccess: () => void;
}

export default function SeleccionarInspectorDialog({
  isOpen,
  onClose,
  fichaId,
  tipoAccionComercial,
  onSuccess,
}: SeleccionarInspectorDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inspectorSeleccionado, setInspectorSeleccionado] = useState<string>("");
  const [inspectores, setInspectores] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    if (isOpen) {
      cargarInspectores();
    }
  }, [isOpen]);

  const cargarInspectores = async () => {
    try {
      const resultado = await getData("inspectores");
      if (resultado.success && resultado.data) {
        const opciones = resultado.data.map((inspector: Inspector) => ({
          value: inspector.codinspector,
          label: `${inspector.codinspector} - ${inspector.nombres}`,
        }));
        setInspectores(opciones);
      }
    } catch (error) {
      console.error("Error al cargar inspectores:", error);
      toast.error("Error al cargar la lista de inspectores");
    }
  };

  const handleGuardar = async () => {
    if (!inspectorSeleccionado) {
      toast.error("Debe seleccionar un inspector");
      return;
    }

    setIsLoading(true);
    try {
      const result = await actualizarFichaCatastro({
        idficha: fichaId,
        columnas: ["asignado_accioncomercial", "tipoacccomercial"],
        valores: [inspectorSeleccionado, tipoAccionComercial],
      });

      if (result.success) {
        toast.success("Inspector asignado correctamente");
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error("Error al asignar inspector");
      console.error("Error assigning inspector:", error);
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
      title="Asignar Inspector"
      description="Seleccione un inspector para asignar a esta acción comercial"
      size="md"
    >
      <div className="space-y-6">
        {/* Información de la acción */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Tipo de Acción Comercial:
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Código: {tipoAccionComercial}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                Al seleccionar un inspector y guardar, se actualizará la base de datos con la asignación.
              </p>
            </div>
          </div>
        </div>

        {/* Selector de inspector */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Inspector a asignar *</label>
          <ComboboxControlled
            options={inspectores}
            value={inspectorSeleccionado}
            placeholder="Seleccione un inspector..."
            onChange={(value) => setInspectorSeleccionado(value.toString())}
          />
        </div>

        {/* Advertencia */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Confirmación requerida:
              </h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Esta acción actualizará la base de datos con el inspector seleccionado y el tipo de acción comercial.
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
            onClick={handleGuardar}
            disabled={isLoading || !inspectorSeleccionado}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <User className="mr-2 h-4 w-4" />
                Asignar Inspector
              </>
            )}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
} 