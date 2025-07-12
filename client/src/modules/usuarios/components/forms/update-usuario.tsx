"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { usuarioSchema, UsuarioFormValues } from "../../schema/usuario.schema";
import { updateUsuario } from "../../action/usuario.actions";
import { CircleX, Mail, Save, User, CreditCard, Shield, CheckSquare } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomDialog } from "@/components/custom/dialog";
import { UsuarioDto } from "@/models/usuario";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useUsuarios } from "../../context/usuarios-context";

interface UpdateUsuarioFormProps {
  usuario: UsuarioDto;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateUsuarioForm({
  usuario,
  isOpen,
  onOpenChange,
}: UpdateUsuarioFormProps) {

  const { refreshUsuarios } = useUsuarios();

  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      email: usuario.email,
      nombre: usuario.nombre,
      apellidopa: usuario.apellidopa,
      apellidoma: usuario.apellidoma,
      dni: usuario.dni,
      accesototal: usuario.accesototal,
      activo: usuario.activo,
    },
  });

  // Actualizar los valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (isOpen) {
      form.reset({
        email: usuario.email,
        nombre: usuario.nombre,
        apellidopa: usuario.apellidopa,
        apellidoma: usuario.apellidoma,
        dni: usuario.dni,
        accesototal: usuario.accesototal,
        activo: usuario.activo,
      });
    }
  }, [usuario, isOpen, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UsuarioFormValues) {
    try {
      const result = await updateUsuario(parseInt(usuario.codusu), values);
      if (result.success) {
        onOpenChange(false);
        form.reset();
        toast.success(result.message);
        // Refrescar la tabla después de actualizar el usuario
        await refreshUsuarios();
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      toast.error("Error al actualizar usuario");
    }
  }

  const handleCancel = () => {
    form.reset(); // Limpiar el formulario
    onOpenChange(false); // Cerrar el sheet
  };

  return (
    <>
      <CustomDialog
        open={isOpen}
        onOpenChange={onOpenChange}
        title="Actualizar usuario"
        description="Completa la información para actualizar el usuario."
        size="2xl"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-4 space-y-4"
          >
            {/* Primera fila: DNI y Nombre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled 
                      type="text"
                      maxLength={8}
                      label="DNI"
                      icon={<CreditCard className="w-4 h-4" />}
                      allowedCharacters={["numeric"]}
                      helperText="Ejemplo: 12345678"
                      {...field} />
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
                      type="text"
                      maxLength={100}
                      label="Nombre"
                      icon={<User className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      textTransform="capitalize"
                      helperText="Ejemplo: Juan Carlos"
                      {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Segunda fila: Apellido Paterno y Apellido Materno */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="apellidopa"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled 
                      type="text"
                      maxLength={100}
                      label="Apellido Paterno"
                      icon={<User className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      textTransform="capitalize"
                      {...field} />
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
                      type="text"
                      maxLength={100}
                      label="Apellido Materno"
                      icon={<User className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      textTransform="capitalize"
                      {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tercera fila: Email y Nivel de Acceso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomInputControlled 
                      type="email"
                      maxLength={100}
                      label="Correo electrónico"
                      icon={<Mail className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: usuario@ejemplo.com"
                      textTransform="lowercase"
                      {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accesototal"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Nivel de Acceso</Label>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione el nivel de acceso" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Acceso Total
                              </div>
                            </SelectItem>
                            <SelectItem value="0">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Acceso Limitado
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cuarta fila: Checkbox de activo */}
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="activo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        Usuario activo
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        El usuario podrá acceder al sistema
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText="Guardando..."
                className="w-[49%]"
              >
                <Save className="w-4 h-4" />
                Guardar cambios
              </LoadingButton>
              <Button
                type="button"
                variant="outline"
                className="w-[49%]"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <CircleX className="w-4 h-4" />
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
}
