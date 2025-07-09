"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { empresaSchema, EmpresaFormValues } from "../../schema/empresa.schema";
import { updateEmpresa } from "../../action/empresa.action";
import { Building2, Settings, Mail, AtSign, Globe } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { ConfiguracionDto } from "@/models/configuracion";
import { useConfiguracion } from "../../context/configuracion-context";

interface EmpresaFormProps {
  configuracion: ConfiguracionDto;
}

export function EmpresaForm({ configuracion }: EmpresaFormProps) {
  const { refreshConfiguracion } = useConfiguracion();

  const form = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      nombreSistema: configuracion.nombreSistema,
      nombreCorreo: configuracion.nombreCorreo,
      clienteUrl: configuracion.clienteUrl,
      ruc: configuracion.ruc || "",
      razonSocial: configuracion.razonSocial || "",
      direccion: configuracion.direccion || "",
      pais: configuracion.pais || "",
      departamento: configuracion.departamento || "",
      provincia: configuracion.provincia || "",
      distrito: configuracion.distrito || "",
      correoSoporte: configuracion.correoSoporte || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: EmpresaFormValues) {
    try {
      const result = await updateEmpresa(values);
      if (result.success) {
        toast.success(result.message);
        // Refrescar la configuración después de actualizar
        await refreshConfiguracion();
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al actualizar información de empresa:", error);
      toast.error("Error al actualizar información de empresa");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración del Sistema
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="clienteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={255}
                      label="URL del Cliente"
                      icon={<Globe className="w-4 h-4" />}
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
              name="correoSoporte"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="email"
                      maxLength={100}
                      label="Correo de Soporte"
                      icon={<AtSign className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Correo para soporte técnico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Datos de la Empresa
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={11}
                      label="RUC"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["numeric"]}
                      helperText="11 dígitos numéricos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="razonSocial"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={200}
                      label="Razón Social"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "spaces"]}
                      helperText="Razón social de la empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={300}
                      label="Dirección"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "spaces", "symbols"]}
                      helperText="Dirección completa de la empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="País"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      helperText="País"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Departamento"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      helperText="Departamento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provincia"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Provincia"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      helperText="Provincia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="distrito"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Distrito"
                      icon={<Building2 className="w-4 h-4" />}
                      allowedCharacters={["letters", "spaces"]}
                      helperText="Distrito"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Guardando..."
            className="w-full md:w-auto"
          >
            Actualizar información de empresa
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
} 