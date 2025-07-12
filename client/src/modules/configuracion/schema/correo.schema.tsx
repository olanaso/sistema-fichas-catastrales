import * as z from "zod"

export const correoSchema = z.object({
  // Bloque 2 - Configuración de Correo
  id: z.number().optional(),
  host_correo: z.string().min(1, {
    message: "El host del correo es obligatorio.",
  }).max(100, {
    message: "El host del correo no puede exceder 100 caracteres.",
  }),
  password_correo: z.string().min(1, {
    message: "La contraseña del correo es obligatoria.",
  }).max(100, {
    message: "La contraseña del correo no puede exceder 100 caracteres.",
  }),
  puerto_correo: z.number().min(1, {
    message: "El puerto del correo debe ser mayor a 0.",
  }).max(65535, {
    message: "El puerto del correo no puede exceder 65535.",
  }),
  usuario_correo: z.string().min(1, {
    message: "El usuario del correo es obligatorio.",
  }).max(100, {
    message: "El usuario del correo no puede exceder 100 caracteres.",
  }),
})

export type CorreoFormValues = z.infer<typeof correoSchema> 