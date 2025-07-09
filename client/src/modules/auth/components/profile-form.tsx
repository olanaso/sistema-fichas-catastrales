"use client"

import { useState } from "react"
import { User, Mail, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { ProfileFormData, profileSchema } from "../schema"
import { updateUserProfile } from "../actions/auth.actions"
import { UsuarioDto } from "@/models/usuario"

interface ProfileFormProps {
  userData: UsuarioDto
  onUpdate: (updatedData: Partial<UsuarioDto>) => void
}

export function ProfileForm({ userData, onUpdate }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    email: userData.email,
    dni: userData.dni || "",
  })

  // Obtener iniciales para el avatar
  const getInitials = (nombres: string, apellidos: string) => {
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validar datos
      const validatedData = profileSchema.parse(formData)
      
      const result = await updateUserProfile(userData.id.toString(), validatedData)
      
      if (result.success) {
        toast.success(result.message || "Perfil actualizado exitosamente")
        // Actualizar datos locales
        onUpdate({
          email: formData.email,
          dni: formData.dni || "",
        })
      } else {
        toast.error(result.error || "Error al actualizar el perfil")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al actualizar el perfil")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Editar perfil
        </CardTitle>
        <CardDescription>Actualiza tu información personal y datos de contacto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar y nombre */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage 
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png" 
              alt="Avatar" 
            />
            <AvatarFallback className="text-lg">
              {getInitials(userData.nombres, userData.apellidos)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold ">
              {`${userData.nombres} ${userData.apellidos}`}
            </h3>
            <p className="">Usuario del sistema</p>
          </div>
        </div>

        {/* Formulario de perfil */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input 
                id="firstName" 
                value={userData.nombres} 
                className="bg-gray-50" 
                disabled 
              />
              <p className="text-xs text-gray-500">El nombre no se puede editar</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input 
                id="lastName" 
                value={userData.apellidos} 
                className="bg-gray-50" 
                disabled 
              />
              <p className="text-xs text-gray-500">El apellido no se puede editar</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">Número de DNI</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="dni"
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="pl-10"
                  placeholder="12345678"
                  maxLength={8}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 