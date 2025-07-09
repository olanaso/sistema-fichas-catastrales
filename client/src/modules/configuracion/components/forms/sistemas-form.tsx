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
import { sistemasSchema, SistemasFormValues } from "../../schema/sistemas.schema";
import { updateSistemas } from "../../action/sistemas.action";
import { Server, Database, Globe } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { ConfiguracionDto } from "@/models/configuracion";
import { useConfiguracion } from "../../context/configuracion-context";

interface SistemasFormProps {
  configuracion: ConfiguracionDto;
}

export function SistemasForm({ configuracion }: SistemasFormProps) {
  const { refreshConfiguracion } = useConfiguracion();

  const form = useForm<SistemasFormValues>({
    resolver: zodResolver(sistemasSchema),
    defaultValues: {
      apiReniecRuc: configuracion.apiReniecRuc || "",
      hostDb: configuracion.hostDb || "",
      usuarioDb: configuracion.usuarioDb || "",
      passwordDb: configuracion.passwordDb || "",
      baseDatos: configuracion.baseDatos || "",
      conexionSici1: configuracion.conexionSici1,
      conexionSici2: configuracion.conexionSici2,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: SistemasFormValues) {
    try {
      const result = await updateSistemas(values);
      if (result.success) {
        toast.success(result.message);
        // Refrescar la configuración después de actualizar
        await refreshConfiguracion();
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al actualizar conexiones a sistemas:", error);
      toast.error("Error al actualizar conexiones a sistemas");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Server className="w-5 h-5" />
            Conexiones y APIs
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="apiReniecRuc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={255}
                      label="API RENIEC/RUC"
                      icon={<Server className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="URL de la API de RENIEC/RUC"
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
            <Database className="w-5 h-5" />
            Conexión a base de datos del sistema SICI
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hostDb"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Host de la Base de Datos"
                      icon={<Database className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: localhost o 192.168.1.100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usuarioDb"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Usuario de la Base de Datos"
                      icon={<Database className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Usuario de PostgreSQL"
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
              name="passwordDb"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      maxLength={100}
                      label="Contraseña de la Base de Datos"
                      icon={<Database className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Contraseña de PostgreSQL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseDatos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Nombre de la Base de Datos"
                      icon={<Database className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Nombre de la base de datos SICI"
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
            Actualizar conexiones a sistemas
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
} 