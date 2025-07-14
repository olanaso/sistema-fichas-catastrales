"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/custom/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { Import, Loader2, Lock, User, Users } from "lucide-react";
import { CustomTextarea } from "@/components/custom/custom-textarea";

// Esquema de validación
const importSchema = z.object({
  usuario: z.string().min(1, "El usuario es obligatorio"),
  contrasena: z.string().min(1, "La contraseña es obligatoria"),
  observacion: z.string().min(1, "La observación es obligatoria"),
});

type ImportFormValues = z.infer<typeof importSchema>;

export default function ImportForm() {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      usuario: "",
      contrasena: "",
      observacion: "",
    },
  });

  const handleCancel = () => {
    form.reset();
    setShowDialog(false);
  };

  const onSubmit = async (values: ImportFormValues) => {
    setIsLoading(true);
    try {
      // Simulación de petición a la API
      await new Promise((res) => setTimeout(res, 1200));
      toast.success("¡Importación enviada correctamente!");
      form.reset();
      setShowDialog(false);
    } catch (error: any) {
      toast.error("Error al importar: " + (error?.message || "Error desconocido"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        Importar padrón
      </Button>
      <CustomDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Confirmación para importación de la información"
        description=""
        size="md"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="usuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Usuario <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <CustomInputControlled
                      placeholder="Ingrese su usuario"
                      required
                      icon={<User className="w-4 h-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contrasena"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contraseña <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      placeholder="Ingrese su contraseña"
                      required
                      icon={<Lock className="w-4 h-4" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Observación <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <CustomTextarea
                      className="w-full border rounded px-2 py-1"
                      placeholder="Ingrese una observación"
                      required
                      rows={4}
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                    Importando...
                  </>
                ) : (
                  <>
                    <Import className="mr-2 h-4 w-4" />
                    Importar
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