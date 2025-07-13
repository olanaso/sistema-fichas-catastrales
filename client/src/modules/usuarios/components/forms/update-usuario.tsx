"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUsuarioSchema, UpdateUsuarioFormValues } from "../../schema/usuario.schema";
import { upsertUsuario } from "../../action/usuario.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, User, Edit } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useUsuarios } from "../../context/usuarios-context";
import { IconButton } from "@/components/custom/icon-button";

interface UpdateUsuarioFormProps {
  usuario: any // Tipo del usuario a editar
  onSuccess?: () => void
  onCancel?: () => void
}

export default function UpdateUsuarioForm({ usuario, onSuccess, onCancel }: UpdateUsuarioFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { forceRefresh } = useUsuarios();

  const form = useForm<UpdateUsuarioFormValues>({
    resolver: zodResolver(updateUsuarioSchema),
    defaultValues: {
      codusu: "",
      usuario: "",
      nombre: "",
      apellidopa: "",
      apellidoma: "",
      dni: "",
      email: "",
      telefono: "",
      creador: "system",
      activo: true,
      password: "",
      accesototal: 0,
    },
  });

  // Actualizar valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (usuario) {
      form.reset({
        codusu: usuario.codusu || "",
        usuario: usuario.usuario || "",
        nombre: usuario.nombre || "",
        apellidopa: usuario.apellidopa || "",
        apellidoma: usuario.apellidoma || "",
        dni: usuario.dni || "",
        email: usuario.email || "",
        telefono: usuario.telefono || "",
        creador: usuario.creador || "system",
        activo: usuario.activo ?? true,
        password: usuario.password || "",
        accesototal: usuario.accesototal || 0,
      });
    }
  }, [usuario, form]);

  async function onSubmit(values: UpdateUsuarioFormValues) {
    setIsLoading(true);
    try {
      const result = await upsertUsuario(values);
      
      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar los cambios
        await forceRefresh();
        
        setShowDialog(false);
        onSuccess?.();
      } else {
        toast.error(result.message || "Error al actualizar usuario");
      }
    } catch (error) {
      toast.error("Error inesperado al actualizar usuario");
      console.error("Error updating usuario:", error);
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

  if (!usuario) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <p className="text-center text-muted-foreground">
          No se ha seleccionado ningún usuario para editar
        </p>
      </div>
    );
  }

  return (
    <>
      <IconButton
          tooltip="Editar usuario"
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
        title="Editar usuario"
        description="Modifique los campos que desee actualizar del usuario"
        size="2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="codusu"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Código de usuario *"
                          placeholder="Ej: admin01"
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
                  name="usuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Nombre de usuario *"
                          placeholder="Ej: admin01"
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
              </div>
            </div>

            {/* Información personal */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Nombre *"
                          placeholder="Ej: Juan"
                          required
                          maxLength={50}
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
                  name="apellidopa"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Apellido paterno *"
                          placeholder="Ej: Pérez"
                          required
                          maxLength={50}
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
                  name="apellidoma"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Apellido materno *"
                          placeholder="Ej: Gómez"
                          required
                          maxLength={50}
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

            {/* Información de contacto */}
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
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Teléfono *"
                          placeholder="999999999"
                          required
                          type="numeric"
                          maxLength={9}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Correo electrónico *"
                          placeholder="usuario@example.com"
                          required
                          type="email"
                          maxLength={100}
                          textTransform="lowercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Estado del usuario */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Usuario activo
                      </div>
                      <div className="text-sm text-muted-foreground">
                        El usuario podrá acceder al sistema cuando esté activo
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
              <FormField
                control={form.control}
                name="accesototal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">
                        Acceso total
                      </div>
                      <div className="text-sm text-muted-foreground">
                        El usuario podrá acceder a todas las funcionalidades del sistema.
                      </div>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                    Actualizar Usuario
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
