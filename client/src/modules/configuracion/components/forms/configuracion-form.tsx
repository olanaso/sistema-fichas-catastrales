"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { configuracionSchema, ConfiguracionFormValues } from "../../schema/configuracion.schema";
import { updateConfiguracion, uploadLogo } from "../../action/parametros.action";
import { CircleX, Save, Settings, Mail, Globe, Link, Image } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomSheet } from "@/components/custom/sheet";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { ImageUpload } from "@/components/custom/image-upload";
import { toast } from "sonner";
import { ConfiguracionDto } from "@/models/configuracion";
import { useConfiguracion } from "../../context/configuracion-context";

interface ConfiguracionFormProps {
  configuracion: ConfiguracionDto;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConfiguracionForm({
  configuracion,
  isOpen,
  onOpenChange,
}: ConfiguracionFormProps) {

  const { refreshConfiguracion } = useConfiguracion();

  const form = useForm<ConfiguracionFormValues>({
    resolver: zodResolver(configuracionSchema),
    defaultValues: {
      nombreSistema: configuracion.nombreSistema,
      nombreCorreo: configuracion.nombreCorreo,
      conexionSici1: configuracion.conexionSici1,
      conexionSici2: configuracion.conexionSici2,
      logo: configuracion.logo,
      clienteUrl: configuracion.clienteUrl,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ConfiguracionFormValues) {
    try {
      const result = await updateConfiguracion(values);
      if (result.success) {
        onOpenChange(false);
        toast.success(result.message);
        // Refrescar la configuración después de actualizar
        await refreshConfiguracion();
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al actualizar configuración:", error);
      toast.error("Error al actualizar configuración");
    }
  }

  const handleLogoUpload = async (file: File) => {
    try {
      const result = await uploadLogo(file);
      if (result.success) {
        form.setValue("logo", result.data.logo || result.data);
        toast.success(result.message);
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al subir logo:", error);
      toast.error("Error al subir logo");
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <>
      <CustomSheet
        open={isOpen}
        onOpenChange={onOpenChange}
        title="Editar configuración"
        description="Modifica la configuración del sistema"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="nombreSistema"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Nombre del sistema"
                      icon={<Settings className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "spaces"]}
                      helperText="Ejemplo: Sistema de Fichas Catastrales"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombreCorreo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Nombre del correo"
                      icon={<Mail className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "spaces"]}
                      helperText="Ejemplo: Sistema Catastral"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conexionSici1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={255}
                      label="Conexión SICI1"
                      icon={<Globe className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: http://localhost:8080/sici1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conexionSici2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={255}
                      label="Conexión SICI2"
                      icon={<Globe className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: http://localhost:8080/sici2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clienteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={255}
                      label="URL del cliente"
                      icon={<Link className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: http://localhost:3000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      onFileChange={handleLogoUpload}
                      label="Logo del sistema"
                      helperText="Sube el logo del sistema (PNG, JPG, GIF hasta 5MB)"
                      maxSize={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </CustomSheet>
    </>
  );
} 