"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createInspectorSchema,
  CreateInspectorFormValues,
} from "../../schema/inspector.schema";
import { createInspector } from "../../action/inspector.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Plus, UserPlus } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { useAuth } from "@/hooks/use-auth";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useInspectores } from "../../context/inspectores-context";
import { GrupoTrabajo } from "@/models/grupotrabajo";
import { DataCombobox } from "@/components/custom/data-combobox";

interface CreateInspectorFormProps {
  gruposDeTrabajo: GrupoTrabajo[];
}


export default function CreateInspectorForm({ gruposDeTrabajo }: CreateInspectorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useAuth();
  const { forceRefresh } = useInspectores();

  const form = useForm<CreateInspectorFormValues>({
    resolver: zodResolver(createInspectorSchema),
    defaultValues: {
      nombres: "",
      dni: "",
      codbrigada: "",
      clave: "",
      login: "",
      creador: user ? `${user.nombre} ${user.apellidopa}` : "system",
    },
  });

  // Actualizar el campo creador cuando cambie el usuario
  useEffect(() => {
    if (user) {
      form.setValue("creador", `${user.nombre} ${user.apellidopa}`);
    }
  }, [user, form]);

  async function onSubmit(values: CreateInspectorFormValues) {
    setIsLoading(true);
    try {
      const result = await createInspector(values);

      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar el nuevo inspector
        await forceRefresh();
        
        form.reset();
        setShowDialog(false);
      } else {
        toast.error(result.message || "Error al crear inspector");
      }
    } catch (error) {
      toast.error("Error inesperado al crear inspector");
      console.error("Error creating inspector:", error);
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
        Crear inspector
      </Button>
      <CustomDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Crear nuevo inspector"
        description="Complete todos los campos para crear un nuevo inspector"
        size="2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Información de brigada */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="codbrigada"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DataCombobox
                          options={gruposDeTrabajo.map(grupo => ({
                            label: grupo.nombre,
                            value: grupo.codgrupo
                          }))}
                          label="Grupo de trabajo *"
                          placeholder="Selecciona un grupo de trabajo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Información del creador */}
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Inspector registrado por:</span>{" "}
                {user ? `${user.nombre} ${user.apellidopa}` : "Sistema"}
              </p>
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
                    Creando...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Crear inspector
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