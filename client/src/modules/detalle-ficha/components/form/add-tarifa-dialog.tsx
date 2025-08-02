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
import { toast } from "sonner";
import { Loader2, Plus, DollarSign } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";
import { ComboboxOption } from "@/types/combobox";

// Schema de validación para el formulario de tarifa
const addTarifaSchema = z.object({
  catetar: z.string().min(1, "La categoría es requerida"),
  nomtar: z.string().min(1, "El nombre de tarifa es requerido"),
  tipocategoria: z.string().min(1, "El tipo de categoría es requerido"),
  actividad: z.string().min(1, "La actividad es requerida"),
  cantidad: z.string().min(1, "La cantidad es requerida"),
  razonsocial: z.string().min(1, "La razón social es requerida"),
  referencia: z.string().min(1, "La referencia es requerida"),
});

type AddTarifaFormValues = z.infer<typeof addTarifaSchema>;

interface AddTarifaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: ComboboxOption[];
  actividades: ComboboxOption[];
  codemp: string;
  codsuc: string;
  creador: string;
  codcliente: number;
  idficha: number;
}

export default function AddTarifaDialog({
  isOpen,
  onClose,
  categorias,
  actividades,
  codemp,
  codsuc,
  creador,
  codcliente,
  idficha,
}: AddTarifaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddTarifaFormValues>({
    resolver: zodResolver(addTarifaSchema),
    defaultValues: {
      catetar: "",
      nomtar: "",
      tipocategoria: "",
      actividad: "",
      cantidad: "",
      razonsocial: "",
      referencia: "",
    },
  });

  async function onSubmit(values: AddTarifaFormValues) {
    setIsLoading(true);
    try {
      // Datos del formulario
      const formData = {
        ...values,
        // Datos agregados al enviar al endpoint
        codemp,
        codsuc,
        creador,
        codcliente,
        idficha,
      };

      console.log("Datos del formulario a enviar:", formData);
      
      // TODO: Aquí irá la llamada al endpoint
      // const result = await addTarifa(formData);
      
      toast.success("Tarifa agregada correctamente");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Error al agregar la tarifa");
      console.error("Error adding tarifa:", error);
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
      title="Agregar nueva tarifa"
      description="Complete todos los campos para agregar una nueva tarifa"
      size="2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bloque 1: Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Información de la Tarifa</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="catetar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría *</FormLabel>
                    <FormControl>
                      <ComboboxControlled
                        options={categorias}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar categoría..."
                        searchPlaceholder="Buscar categoría..."
                        emptyMessage="No se encontraron categorías"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomtar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled
                        label="Nombre de tarifa *"
                        placeholder="Ej: Tarifa residencial"
                        required
                        maxLength={100}
                        textTransform="original"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bloque 2: Tipo y actividad */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipocategoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de categoría *</FormLabel>
                    <FormControl>
                      <ComboboxControlled
                        options={categorias}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar tipo..."
                        searchPlaceholder="Buscar tipo..."
                        emptyMessage="No se encontraron tipos"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actividad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actividad *</FormLabel>
                    <FormControl>
                      <ComboboxControlled
                        options={actividades}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar actividad..."
                        searchPlaceholder="Buscar actividad..."
                        emptyMessage="No se encontraron actividades"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bloque 3: Cantidad y razón social */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled
                        label="Cantidad *"
                        placeholder="Ej: 1"
                        required
                        type="numeric"
                        min="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="razonsocial"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled
                        label="Razón social *"
                        placeholder="Ej: Empresa ABC S.A."
                        required
                        maxLength={200}
                        textTransform="original"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Bloque 4: Referencia */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="referencia"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      label="Referencia *"
                      placeholder="Ej: REF-001"
                      required
                      maxLength={100}
                      textTransform="uppercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
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
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agregando...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Agregar tarifa
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CustomDialog>
  );
} 