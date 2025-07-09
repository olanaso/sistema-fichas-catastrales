import * as z from "zod"

export const configuracionSchema = z.object({
  nombreSistema: z.string().min(2, {
    message: "El nombre del sistema debe tener al menos 2 caracteres.",
  }).max(100, {
    message: "El nombre del sistema debe tener máximo 100 caracteres.",
  }),
  nombreCorreo: z.string().min(2, {
    message: "El nombre del correo debe tener al menos 2 caracteres.",
  }).max(100, {
    message: "El nombre del correo debe tener máximo 100 caracteres.",
  }),
  conexionSici1: z.string().url({
    message: "La conexión SICI1 debe ser una URL válida.",
  }),
  conexionSici2: z.string().url({
    message: "La conexión SICI2 debe ser una URL válida.",
  }),
  logo: z.string().optional(),
  clienteUrl: z.string().url({
    message: "La URL del cliente debe ser una URL válida.",
  }),
})

export type ConfiguracionFormValues = z.infer<typeof configuracionSchema> 