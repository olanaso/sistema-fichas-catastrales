import * as z from "zod"

export const sistemasSchema = z.object({
  // Bloque 3 - Conexiones a Sistemas
  apiReniecRuc: z.string().min(1, {
    message: "La API de RENIEC/RUC es obligatoria.",
  }).max(255, {
    message: "La API de RENIEC/RUC no puede exceder 255 caracteres.",
  }),
  hostDb: z.string().min(1, {
    message: "El host de la base de datos es obligatorio.",
  }).max(100, {
    message: "El host de la base de datos no puede exceder 100 caracteres.",
  }),
  usuarioDb: z.string().min(1, {
    message: "El usuario de la base de datos es obligatorio.",
  }).max(100, {
    message: "El usuario de la base de datos no puede exceder 100 caracteres.",
  }),
  passwordDb: z.string().min(1, {
    message: "La contraseña de la base de datos es obligatoria.",
  }).max(100, {
    message: "La contraseña de la base de datos no puede exceder 100 caracteres.",
  }),
  baseDatos: z.string().min(1, {
    message: "El nombre de la base de datos es obligatorio.",
  }).max(100, {
    message: "El nombre de la base de datos no puede exceder 100 caracteres.",
  }),
  conexionSici1: z.string().url({
    message: "La conexión SICI1 debe ser una URL válida.",
  }),
  conexionSici2: z.string().url({
    message: "La conexión SICI2 debe ser una URL válida.",
  }),
})

export type SistemasFormValues = z.infer<typeof sistemasSchema> 