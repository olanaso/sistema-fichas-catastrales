import * as z from "zod"

export const sistemasSchema = z.object({
  // Bloque 3 - Conexiones a Sistemas
  id: z.number().optional(),
  api_reniec_ruc: z.string().min(1, {
    message: "La API de RENIEC/RUC es obligatoria.",
  }).max(255, {
    message: "La API de RENIEC/RUC no puede exceder 255 caracteres.",
  }),
  host_db: z.string().min(1, {
    message: "El host de la base de datos es obligatorio.",
  }).max(100, {
    message: "El host de la base de datos no puede exceder 100 caracteres.",
  }),
  usuario_db: z.string().min(1, {
    message: "El usuario de la base de datos es obligatorio.",
  }).max(100, {
    message: "El usuario de la base de datos no puede exceder 100 caracteres.",
  }),
  password_db: z.string().min(1, {
    message: "La contraseña de la base de datos es obligatoria.",
  }).max(100, {
    message: "La contraseña de la base de datos no puede exceder 100 caracteres.",
  }),
  base_datos: z.string().min(1, {
    message: "El nombre de la base de datos es obligatorio.",
  }).max(100, {
    message: "El nombre de la base de datos no puede exceder 100 caracteres.",
  }),
  conexion_sici1: z.string().url({
    message: "La conexión SICI1 debe ser una URL válida.",
  }),
  conexion_sici2: z.string().url({
    message: "La conexión SICI2 debe ser una URL válida.",
  }),
})

export type SistemasFormValues = z.infer<typeof sistemasSchema> 