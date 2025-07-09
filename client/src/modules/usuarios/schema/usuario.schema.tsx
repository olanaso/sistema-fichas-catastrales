import * as z from "zod"

export const usuarioSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }).optional(),
  nombres: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellidos: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  dni: z.string().min(8, {
    message: "El DNI debe tener al menos 8 caracteres.",
  }).max(8, {
    message: "El DNI debe tener máximo 8 caracteres.",
  }),
  idRol: z.number({
    required_error: "Debe seleccionar un rol.",
  }),
  activo: z.boolean(),
})

export type UsuarioFormValues = z.infer<typeof usuarioSchema> 