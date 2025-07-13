import * as z from "zod"

// Esquema para crear usuario
export const createUsuarioSchema = z.object({
  usuario: z.string().min(1, {
    message: "El nombre de usuario es requerido.",
  }),
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
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(9, {
    message: "El teléfono debe tener al menos 9 caracteres.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  creador: z.string().min(1, {
    message: "El creador es requerido.",
  }),
  activo: z.boolean(),
  accesototal: z.number()
})

// Esquema para editar usuario (sin password)
export const updateUsuarioSchema = z.object({
  codusu: z.string().min(1, {
    message: "El código de usuario es requerido.",
  }),
  usuario: z.string().min(1, {
    message: "El nombre de usuario es requerido.",
  }),
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
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(9, {
    message: "El teléfono debe tener al menos 9 caracteres.",
  }),
  creador: z.string().min(1, {
    message: "El creador es requerido.",
  }),
  activo: z.boolean(),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  accesototal: z.number()
})

// Esquema para cambiar contraseña
export const changePasswordSchema = z.object({
  codusu: z.string().min(1, {
    message: "El código de usuario es requerido.",
  }),
  usuario: z.string().min(1, {
    message: "El nombre de usuario es requerido.",
  }),
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
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(9, {
    message: "El teléfono debe tener al menos 9 caracteres.",
  }),
  creador: z.string().min(1, {
    message: "El creador es requerido.",
  }),
  activo: z.boolean(),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  accesototal: z.number()
})

// Esquema para cambiar estado (activo/inactivo)
export const toggleStatusSchema = z.object({
  codusu: z.string().min(1, {
    message: "El código de usuario es requerido.",
  }),
  usuario: z.string().min(1, {
    message: "El nombre de usuario es requerido.",
  }),
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
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(9, {
    message: "El teléfono debe tener al menos 9 caracteres.",
  }),
  creador: z.string().min(1, {
    message: "El creador es requerido.",
  }),
  activo: z.boolean(),
})

export type CreateUsuarioFormValues = z.infer<typeof createUsuarioSchema>
export type UpdateUsuarioFormValues = z.infer<typeof updateUsuarioSchema>
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
export type ToggleStatusFormValues = z.infer<typeof toggleStatusSchema>

// Mantener compatibilidad con el esquema anterior
export const usuarioSchema = createUsuarioSchema
export type UsuarioFormValues = CreateUsuarioFormValues 