import * as z from "zod"

export const usuarioSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }).optional(),
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellidopa: z.string().min(2, {
    message: "El apellido paterno debe tener al menos 2 caracteres.",
  }),
  apellidoma: z.string().min(2, {
    message: "El apellido materno debe tener al menos 2 caracteres.",
  }),
  dni: z.string().min(8, {
    message: "El DNI debe tener al menos 8 caracteres.",
  }).max(8, {
    message: "El DNI debe tener máximo 8 caracteres.",
  }),
  accesototal: z.number().min(0).max(1, {
    message: "El acceso total debe ser 0 o 1.",
  }),
  activo: z.boolean(),
})

export type UsuarioFormValues = z.infer<typeof usuarioSchema> 