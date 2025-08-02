"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, AlertTriangle, Eye } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";

// Schema de validación para el formulario de observación
const observarFichaSchema = z.object({
  detalleObservacion: z.string().min(10, "El detalle de observación debe tener al menos 10 caracteres"),
});

type ObservarFichaFormValues = z.infer<typeof observarFichaSchema>;

interface ObservarFichaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fichaId: number;
}

export default function ObservarFichaDialog({
  isOpen,
  onClose,
  fichaId,
}: ObservarFichaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ObservarFichaFormValues>({
    resolver: zodResolver(observarFichaSchema),
    defaultValues: {
      detalleObservacion: "",
    },
  });

  async function onSubmit(values: ObservarFichaFormValues) {
    setIsLoading(true);
    try {
      const formData = {
        fichaId,
        detalleObservacion: values.detalleObservacion,
      };

      console.log("Observando ficha:", formData);
      
      // TODO: Aquí irá la llamada al endpoint
      // const result = await observarFicha(formData);
      
      toast.success("Ficha observada correctamente");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Error al observar la ficha");
      console.error("Error observing ficha:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <CustomDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Observar ficha catastral"
      description="Complete el detalle de observación para marcar la ficha como observada"
      size="lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Información de advertencia */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Ficha a observar:
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Ficha #{fichaId}
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                  Al observar la ficha, se marcará como "Observada" y requerirá correcciones antes de poder ser aprobada.
                </p>
              </div>
            </div>
          </div>

          {/* Campo de detalle de observación */}
          <FormField
            control={form.control}
            name="detalleObservacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detalle de observación *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describa los detalles de la observación que requiere corrección..."
                    className="min-h-[120px] resize-none"
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground">
                    {field.value.length}/500 caracteres
                  </span>
                </div>
              </FormItem>
            )}
          />

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
              type="submit" 
              variant="destructive"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Observando...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Observar ficha
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
} 