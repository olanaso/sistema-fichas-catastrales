"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toggleStatusSchema, ToggleStatusFormValues, updateUsuarioSchema, UpdateUsuarioFormValues } from "../../schema/usuario.schema"
import { updateUsuario } from "../../action/usuario.actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Loader2, Power } from "lucide-react"
import { CustomInputControlled } from "@/components/custom/input-controlled"

interface ToggleStatusModalProps {
  usuario: any
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function ToggleStatusModal({ 
  usuario, 
  isOpen, 
  onOpenChange, 
  onSuccess 
}: ToggleStatusModalProps) {
  const [isLoading, setIsLoading] = useState(false)

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
        activo: !usuario.activo, // Invertir el estado actual
        password: usuario.password || "",
      })
    }
  }, [usuario, form])

  async function onSubmit(values: UpdateUsuarioFormValues) {
    setIsLoading(true)
    try {
      const result = await updateUsuario(values)
      
      if (result.success) {
        toast.success(result.message)
        onOpenChange(false)
        onSuccess?.()
      } else {
        toast.error(result.message || "Error al cambiar estado del usuario")
      }
    } catch (error) {
      toast.error("Error inesperado al cambiar estado del usuario")
      console.error("Error toggling status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  const isActivating = form.watch("activo")
  const currentStatus = usuario?.activo ? "activo" : "inactivo"
  const newStatus = isActivating ? "activo" : "inactivo"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            Cambiar Estado del Usuario
          </DialogTitle>
          <DialogDescription>
            ¿Está seguro que desea cambiar el estado del usuario{" "}
            <span className="font-semibold">{usuario?.usuario || usuario?.nombre}</span>?
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                Estado actual: <span className="font-medium">{currentStatus}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Nuevo estado: <span className="font-medium">{newStatus}</span>
              </p>
            </div>

            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Usuario activo</div>
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
                    <Power className="mr-2 h-4 w-4" />
                    {isActivating ? "Activar" : "Desactivar"}
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