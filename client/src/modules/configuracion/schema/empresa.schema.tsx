import * as z from "zod"

export const empresaSchema = z.object({
  // Bloque 1 - Información de Empresa
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
  clienteUrl: z.string().url({
    message: "La URL del cliente debe ser una URL válida.",
  }),
  ruc: z.string().regex(/^[0-9]{11}$/, {
    message: "El RUC debe tener exactamente 11 dígitos numéricos.",
  }).optional().or(z.literal("")),
  razonSocial: z.string().max(200, {
    message: "La razón social no puede exceder 200 caracteres.",
  }).optional().or(z.literal("")),
  direccion: z.string().max(300, {
    message: "La dirección no puede exceder 300 caracteres.",
  }).optional().or(z.literal("")),
  pais: z.string().max(100, {
    message: "El país no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  departamento: z.string().max(100, {
    message: "El departamento no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  provincia: z.string().max(100, {
    message: "La provincia no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  distrito: z.string().max(100, {
    message: "El distrito no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  correoSoporte: z.string().email({
    message: "El formato del correo de soporte no es válido.",
  }).max(100, {
    message: "El correo de soporte no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
})

export type EmpresaFormValues = z.infer<typeof empresaSchema> 