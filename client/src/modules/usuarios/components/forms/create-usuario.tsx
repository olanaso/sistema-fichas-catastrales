"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUsuarioSchema,
  CreateUsuarioFormValues,
} from "../../schema/usuario.schema";
import { createUsuario } from "../../action/usuario.actions";
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
import { Loader2, Plus, UserPlus } from "lucide-react";
import { CustomDialog } from "@/components/custom/dialog";
import { useAuth } from "@/hooks/use-auth";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { useUsuarios } from "../../context/usuarios-context";

export default function CreateUsuarioForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useAuth();
  const { forceRefresh } = useUsuarios();

  const form = useForm<CreateUsuarioFormValues>({
    resolver: zodResolver(createUsuarioSchema),
    defaultValues: {
      usuario: "",
      nombre: "",
      apellidopa: "",
      apellidoma: "",
      dni: "",
      email: "",
      telefono: "",
      password: "",
      creador: user ? `${user.nombre} ${user.apellidopa}` : "system",
      activo: true,
      accesototal: 0,
    },
  });

  // Actualizar el campo creador cuando cambie el usuario
  useEffect(() => {
    if (user) {
      form.setValue("creador", `${user.nombre} ${user.apellidopa}`);
    }
  }, [user, form]);

  async function onSubmit(values: CreateUsuarioFormValues) {
    setIsLoading(true);
    try {
      const result = await createUsuario(values);

      if (result.success) {
        toast.success(result.message);
        
        // Refrescar la tabla para mostrar el nuevo usuario
        await forceRefresh();
        
        form.reset();
        setShowDialog(false);
      } else {
        toast.error(result.message || "Error al crear usuario");
      }
    } catch (error) {
      toast.error("Error inesperado al crear usuario");
      console.error("Error creating usuario:", error);
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
        Crear usuario
      </Button>
      <CustomDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Crear nuevo usuario"
        description="Complete todos los campos para crear un nuevo usuario supervisor"
        size="2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomInputControlled
                          label="Contraseña *"
                          placeholder="Mínimo 8 caracteres"
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

            {/* Estado del usuario */}
            <div className="space-y-4 flex flex-col col-span-2">
              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-full">
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

            {/* Información del creador */}
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Usuario registrado por:</span>{" "}
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
                    Crear usuario
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
