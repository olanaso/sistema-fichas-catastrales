"use client";

import { useEffect, useState } from "react";
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
import { Tarifa } from "@/models/tarifas";
import { buscarExacto } from "@/service/data.actions";
import { registrarUnidadUso, RegistrarUnidadUsoDto } from "../../action/detalle-ficha.action";

// Schema de validación para el formulario de tarifa
const addTarifaSchema = z.object({
  tarifa: z.string().min(1, "La tarifa es requerida"),
  actividad: z.string().min(1, "La actividad es requerida"),
  cantidad: z.string().min(1, "La cantidad es requerida"),
  razonsocial: z.string().min(1, "La razón social es requerida"),
  referencia: z.string().min(1, "La referencia es requerida"),
});

type AddTarifaFormValues = z.infer<typeof addTarifaSchema>;

interface AddTarifaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actividades: ComboboxOption[];
  codemp: string;
  codsuc: string;
  creador: string;
  codcliente: number;
  idficha: number;
  onTarifaAdded?: () => void; // Callback para actualizar la lista de tarifas
}

export default function AddTarifaDialog({
  isOpen,
  onClose,
  actividades,
  codemp,
  codsuc,
  creador,
  codcliente,
  idficha,
  onTarifaAdded,
}: AddTarifaDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tarifas, setTarifas] = useState<ComboboxOption[]>([]);

  useEffect(() => {
    const fetchTarifas = async () => {
      const tarifas = await buscarExacto("tarifas", ['codsuc'],[codsuc]);
      setTarifas(tarifas.data.map((tarifa: Tarifa) => ({
        value: tarifa.catetar,
        label: tarifa.nomtar,
      })));
    };
    fetchTarifas();
  }, [codemp, codsuc, codcliente, idficha]);

  const form = useForm<AddTarifaFormValues>({
    resolver: zodResolver(addTarifaSchema),
    defaultValues: {
      tarifa: "",
      actividad: "",
      cantidad: "",
      razonsocial: "",
      referencia: "",
    },
  });

  async function onSubmit(values: AddTarifaFormValues) {
    setIsLoading(true);
    try {
      // Preparar los datos para la API
      const unidadUsoData: RegistrarUnidadUsoDto = {
        codcliente,
        tarifa: values.tarifa, // Usar catetar como tarifa
        actividad: values.actividad,
        cantidad: values.cantidad,
        razonsocial: values.razonsocial,
        referencia: values.referencia,
        idficha,
      };

      console.log("Datos del formulario a enviar:", unidadUsoData);
      
      // Llamar a la API para registrar la unidad de uso
      const result = await registrarUnidadUso(unidadUsoData);
      
      if (result.success) {
        form.reset();
        onClose();
        
        // Actualizar la lista de tarifas si se proporciona el callback
        if (onTarifaAdded) {
          onTarifaAdded();
        }
      }
    } catch (error) {
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
            <h3 className="text-lg font-semibold text-muted-foreground">Información de la Tarifa</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tarifa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategoría *</FormLabel>
                    <FormControl>
                      <ComboboxControlled
                        options={tarifas}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Seleccionar subcategoría..."
                        searchPlaceholder="Buscar subcategoría..."
                        emptyMessage="No se encontraron subcategorías"
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