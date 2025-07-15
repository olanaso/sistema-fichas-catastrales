"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateGrupoTrabajoSchema, UpdateGrupoTrabajoFormValues } from "../../schema/grupotrabajo.schema";
import { updateGrupoTrabajo } from "../../action/grupotrabajo.actions";
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
import { Loader2, Users, Edit, Plus, User, X, UserPlus } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useGrupoTrabajo } from "../../context/grupotrabajo-context";
import { IconButton } from "@/components/custom/icon-button";
import { Usuario } from "@/models/usuario";
import { Inspector } from "@/models/inspector";
import { DataCombobox } from "@/components/custom/data-combobox";

interface UpdateGrupoTrabajoFormProps {
  grupoTrabajo: any // Tipo del grupo de trabajo a editar
  supervisores: Usuario[]
  inspectores: Inspector[]
  onSuccess?: () => void
  onCancel?: () => void
}

export default function UpdateGrupoTrabajoForm({ 
  grupoTrabajo, 
  supervisores, 
  inspectores, 
  onSuccess, 
  onCancel 
}: UpdateGrupoTrabajoFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { forceRefresh } = useGrupoTrabajo();

  const form = useForm<UpdateGrupoTrabajoFormValues>({
    resolver: zodResolver(updateGrupoTrabajoSchema),
    defaultValues: {
      codgrupo: "",
      nombre: "",
      activo: true,
      codlider: "",
    },
  });

  // Actualizar valores del formulario cuando cambie el grupo de trabajo
  useEffect(() => {
    if (grupoTrabajo) {

      form.reset({
        codgrupo: grupoTrabajo.codgrupo || "",
        nombre: grupoTrabajo.nombre || "",
        activo: grupoTrabajo.activo ?? true,
        codlider: grupoTrabajo.codlider || "",
      });
    }
  }, [grupoTrabajo, form]);

  async function onSubmit(values: UpdateGrupoTrabajoFormValues) {
    setIsLoading(true);
    try {
      const result = await updateGrupoTrabajo(values);
      
      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
        
        setShowDialog(false);
        onSuccess?.();
      } else {
        toast.error(result.message || "Error al actualizar grupo de trabajo");
      }
    } catch (error) {
      toast.error("Error inesperado al actualizar grupo de trabajo");
      console.error("Error updating grupo de trabajo:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    setShowDialog(false);
    onCancel?.();
  };

  const handleEdit = () => {
    setShowDialog(true);
  };

  if (!grupoTrabajo) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-center text-muted-foreground">
          No se ha seleccionado ningún grupo de trabajo para editar
        </p>
      </div>
    );
  }

  return (
    <>
      <IconButton
        tooltip="Actualizar grupo de trabajo"
        tooltipIcon={<Edit className="h-3 w-3" />}
        onClick={handleEdit}
        disabled={isLoading}
        color="blue"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
      </IconButton>

      <CustomDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Editar grupo de trabajo"
        description="Modifique los campos que desee actualizar del grupo de trabajo"
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
                        <DataCombobox
                          placeholder="Seleccione un líder"
                          options={supervisores.map((supervisor) => ({
                            value: supervisor.codusu,
                            label: `${supervisor.nombre} ${supervisor.apellidopa}`,
                            icon: <User className="w-4 h-4" />,
                          }))}
                          {...field}
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
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Actualizar grupo
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