import * as z from "zod"

export const configuracionSchema = z.object({
  // Grupo 1: Configuración del Sistema y Empresa
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
  logo: z.string().optional(),
  
  // Datos de la empresa
  ruc: z.string().regex(/^[0-9]{11}$/, {
    message: "El RUC debe tener exactamente 11 dígitos numéricos.",
  }).optional().or(z.literal("")),
  razonSocial: z.string().max(200, {
    message: "La razón social no puede exceder 200 caracteres.",
  }).optional().or(z.literal("")),
  direccion: z.string().max(300, {
    message: "La dirección no puede exceder 300 caracteres.",
  }).optional().or(z.literal("")),
  nombreComercial: z.string().max(200, {
    message: "El nombre comercial no puede exceder 200 caracteres.",
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
  
  // Grupo 2: Configuración de Correo
  correoSoporte: z.string().email({
    message: "El formato del correo de soporte no es válido.",
  }).max(100, {
    message: "El correo de soporte no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  hostCorreo: z.string().max(100, {
    message: "El host del correo no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  passwordCorreo: z.string().max(100, {
    message: "La contraseña del correo no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  puertoCorreo: z.union([
    z.number().min(1, {
      message: "El puerto del correo debe ser mayor a 0.",
    }).max(65535, {
      message: "El puerto del correo no puede exceder 65535.",
    }),
    z.literal("")
  ]).optional(),
  usuarioCorreo: z.string().max(100, {
    message: "El usuario del correo no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  
  // Grupo 3: Conexiones SICI y APIs
  conexionSici1: z.string().url({
    message: "La conexión SICI1 debe ser una URL válida.",
  }),
  conexionSici2: z.string().url({
    message: "La conexión SICI2 debe ser una URL válida.",
  }),
  clienteUrl: z.string().url({
    message: "La URL del cliente debe ser una URL válida.",
  }),
  apiReniecRuc: z.string().max(255, {
    message: "La API de RENIEC/RUC no puede exceder 255 caracteres.",
  }).optional().or(z.literal("")),
  
  // Configuración de base de datos PostgreSQL
  hostDb: z.string().max(100, {
    message: "El host de la base de datos no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  usuarioDb: z.string().max(100, {
    message: "El usuario de la base de datos no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  passwordDb: z.string().max(100, {
    message: "La contraseña de la base de datos no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
  baseDatos: z.string().max(100, {
    message: "El nombre de la base de datos no puede exceder 100 caracteres.",
  }).optional().or(z.literal("")),
})

export type ConfiguracionFormValues = z.infer<typeof configuracionSchema> 