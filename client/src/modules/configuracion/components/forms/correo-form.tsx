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
import { correoSchema, CorreoFormValues } from "../../schema/correo.schema";
import { updateCorreo } from "../../action/correo.action";
import { AtSign } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { ConfiguracionDto } from "@/models/configuracion";
import { useConfiguracion } from "../../context/configuracion-context";

interface CorreoFormProps {
  configuracion: ConfiguracionDto;
}

export function CorreoForm({ configuracion }: CorreoFormProps) {
  const { refreshConfiguracion } = useConfiguracion();

  const form = useForm<CorreoFormValues>({
    resolver: zodResolver(correoSchema),
    defaultValues: {
      hostCorreo: configuracion.hostCorreo || "",
      passwordCorreo: configuracion.passwordCorreo || "",
      puertoCorreo: configuracion.puertoCorreo || 587,
      usuarioCorreo: configuracion.usuarioCorreo || "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: CorreoFormValues) {
    try {
      const result = await updateCorreo(values);
      if (result.success) {
        toast.success(result.message);
        // Refrescar la configuración después de actualizar
        await refreshConfiguracion();
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al actualizar configuración de correo:", error);
      toast.error("Error al actualizar configuración de correo");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AtSign className="w-5 h-5" />
            Configuración de Correo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hostCorreo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Host del Correo"
                      icon={<AtSign className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: smtp.gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usuarioCorreo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={100}
                      label="Usuario del Correo"
                      icon={<AtSign className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Usuario del servidor de correo"
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
              name="passwordCorreo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      maxLength={100}
                      label="Contraseña del Correo"
                      icon={<AtSign className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Contraseña del servidor de correo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="puertoCorreo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="text"
                      maxLength={5}
                      label="Puerto del Correo"
                      icon={<AtSign className="w-4 h-4" />}
                      allowedCharacters={["numeric"]}
                      helperText="Puerto del servidor (1-65535)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseInt(value) : 587);
                      }}
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
            Actualizar configuración de correo
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
} 