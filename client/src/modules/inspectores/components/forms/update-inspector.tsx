"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateInspectorSchema, UpdateInspectorFormValues } from "../../schema/inspector.schema";
import { updateInspector } from "../../action/inspector.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, User, Edit } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useInspectores } from "../../context/inspectores-context";
import { IconButton } from "@/components/custom/icon-button";

interface UpdateInspectorFormProps {
  inspector: any // Tipo del inspector a editar
  onSuccess?: () => void
  onCancel?: () => void
}

export default function UpdateInspectorForm({ inspector, onSuccess, onCancel }: UpdateInspectorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { forceRefresh } = useInspectores();

  const form = useForm<UpdateInspectorFormValues>({
    resolver: zodResolver(updateInspectorSchema),
    defaultValues: {
      codinspector: "",
      nombres: "",
      dni: "",
      codbrigada: "",
      clave: "",
      login: "",
      creador: "system",
    },
  });

  // Actualizar valores del formulario cuando cambie el inspector
  useEffect(() => {
    if (inspector) {
      form.reset({
        codinspector: inspector.codinspector || inspector.codigo || "",
        nombres: inspector.nombres || "",
        dni: inspector.dni || "",
        codbrigada: inspector.codbrigada || "",
        clave: inspector.clave || "",
        login: inspector.login || "",
        creador: inspector.creador || "system",
      });
    }
  }, [inspector, form]);

  async function onSubmit(values: UpdateInspectorFormValues) {
    setIsLoading(true);
    try {
      const result = await updateInspector(values);
      
      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
        
        setShowDialog(false);
        onSuccess?.();
      } else {
        toast.error(result.message || "Error al actualizar inspector");
      }
    } catch (error) {
      toast.error("Error inesperado al actualizar inspector");
      console.error("Error updating inspector:", error);
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

  if (!inspector) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-center text-muted-foreground">
          No se ha seleccionado ningún inspector para editar
        </p>
      </div>
    );
  }

  return (
    <>
      <IconButton
        tooltip="Actualizar inspector"
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
        title="Editar inspector"
        description="Modifique los campos que desee actualizar del inspector"
        size="2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="codinspector"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Código de inspector *"
                          placeholder="Ej: 001"
                          required
                          maxLength={20}
                          textTransform="uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Nombres completos *"
                          placeholder="Ej: Juan Pérez"
                          required
                          maxLength={100}
                          textTransform="capitalize"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Información personal */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="DNI *"
                          placeholder="12345678"
                          required
                          type="numeric"
                          maxLength={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codbrigada"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Código de brigada *"
                          placeholder="Ej: 003"
                          required
                          maxLength={10}
                          textTransform="uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Información de acceso */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Login *"
                          placeholder="Ej: jperez"
                          required
                          maxLength={20}
                          textTransform="lowercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clave"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Clave *"
                          placeholder="Mínimo 6 caracteres"
                          required
                          type="password"
                          maxLength={50}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Actualizar Inspector
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