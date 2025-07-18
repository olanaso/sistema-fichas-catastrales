"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createGrupoTrabajoSchema,
  CreateGrupoTrabajoFormValues,
} from "../../schema/grupotrabajo.schema";
import { createGrupoTrabajo } from "../../action/grupotrabajo.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Plus, User, Users, X, UserPlus } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { useAuth } from "@/hooks/use-auth";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useGrupoTrabajo } from "../../context/grupotrabajo-context";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { DataCombobox } from "@/components/custom/data-combobox";
import { Badge } from "@/components/ui/badge";
import { ComboboxControlled } from "@/components/custom/combobox-controlled";

export default function CreateGrupoTrabajoForm({ supervisores, inspectores }: { supervisores: Usuario[], inspectores: Inspector[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { forceRefresh } = useGrupoTrabajo();

  const form = useForm<CreateGrupoTrabajoFormValues>({
    resolver: zodResolver(createGrupoTrabajoSchema),
    defaultValues: {
      nombre: "",
      activo: true,
      codlider: "",
    },
  });

  async function onSubmit(values: CreateGrupoTrabajoFormValues) {
    setIsLoading(true);
    try {
      const result = await createGrupoTrabajo(values);

      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar el nuevo grupo
        await forceRefresh();
        
        form.reset();
        setShowDialog(false);
      } else {
        toast.error(result.message || "Error al crear grupo de trabajo");
      }
    } catch (error) {
      toast.error("Error inesperado al crear grupo de trabajo");
      console.error("Error creating grupo de trabajo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    setShowDialog(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Crear grupo de trabajo
      </Button>
      <CustomDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Crear nuevo grupo de trabajo"
        description="Complete todos los campos para crear un nuevo grupo de trabajo"
        size="2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Bloque 1: Nombre y Líder */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información del Grupo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Nombre del grupo *"
                          placeholder="Ej: Grupo Inspección Norte"
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
                <FormField
                  control={form.control}
                  name="codlider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Líder del grupo *</FormLabel>
                      <FormControl>
                        <ComboboxControlled
                          options={supervisores.map((supervisor) => ({
                            value: supervisor.codusu,
                            label: `${supervisor.nombre} ${supervisor.apellidopa} ${supervisor.apellidoma}`,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Seleccionar líder..."
                          searchPlaceholder="Buscar líder..."
                          emptyMessage="No se encontraron líderes"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Estado del grupo */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Grupo activo
                      </div>
                      <div className="text-sm text-muted-foreground">
                        El grupo podrá ser asignado a tareas cuando esté activo
                      </div>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                    Creando...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Crear grupo
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
} 