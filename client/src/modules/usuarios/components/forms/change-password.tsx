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
import { passwordSchema, PasswordFormValues } from "../../schema/password.schema";
import { changePassword } from "../../action/usuario.actions";
import { CircleX, Lock, Save } from "lucide-react";
import { LoadingButton } from "@/components/custom/loading-button";
import { CustomDialog } from "@/components/custom/dialog";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { toast } from "sonner";
import { UsuarioDto } from "@/models/usuario";

interface ChangePasswordFormProps {
  usuario: UsuarioDto;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordForm({
  usuario,
  isOpen,
  onOpenChange,
}: ChangePasswordFormProps) {

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: PasswordFormValues) {
    try {
      const result = await changePassword(usuario.id, values.password);
      if (result.success) {
        onOpenChange(false);
        form.reset();
        toast.success(result.message);
      } else {
        toast.error(result.message || result.error);
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      toast.error("Error al cambiar contraseña");
    }
  }

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <>
      <CustomDialog
        open={isOpen}
        onOpenChange={onOpenChange}
        title="Cambiar contraseña"
        description={`Cambia la contraseña de ${usuario.nombres} ${usuario.apellidos}`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      maxLength={20}
                      label="Nueva contraseña"
                      icon={<Lock className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: PASS_$_213"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      maxLength={20}
                      label="Confirmar nueva contraseña"
                      icon={<Lock className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Repite la nueva contraseña"
                      {...field}
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
                Cambiar contraseña
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