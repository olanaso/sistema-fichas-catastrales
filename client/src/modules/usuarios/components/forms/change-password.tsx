"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema, ChangePasswordFormValues } from "../../schema/usuario.schema"
import { updateUsuario } from "../../action/usuario.actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Lock } from "lucide-react"
import { CustomInputControlled } from "@/components/custom/input-controlled"

interface ChangePasswordModalProps {
  usuario: any
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function ChangePasswordModal({ 
  usuario, 
  isOpen, 
  onOpenChange, 
  onSuccess 
}: ChangePasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
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
    },
  })

  // Actualizar valores cuando cambie el usuario
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
        password: "",
      })
    }
  }, [usuario, form])

  async function onSubmit(values: ChangePasswordFormValues) {
    setIsLoading(true)
    try {
      const result = await updateUsuario(values)
      
      if (result.success) {
        toast.success(result.message)
        form.reset()
        onOpenChange(false)
        onSuccess?.()
      } else {
        toast.error(result.message || "Error al cambiar contraseña")
      }
    } catch (error) {
      toast.error("Error inesperado al cambiar contraseña")
      console.error("Error changing password:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Cambiar Contraseña
          </DialogTitle>
          <DialogDescription>
            Ingrese la nueva contraseña para el usuario{" "}
            <span className="font-semibold">{usuario?.usuario || usuario?.nombre}</span>
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      label="Nueva contraseña *"
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
            
            <DialogFooter>
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
                    Cambiando...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Cambiar Contraseña
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 