import { z } from "zod";

// Esquema para crear inspector
export const createInspectorSchema = z.object({
  nombres: z.string().min(1, "Los nombres son requeridos").max(100, "Los nombres no pueden exceder 100 caracteres"),
  dni: z.string().min(8, "El DNI debe tener 8 dígitos").max(8, "El DNI debe tener 8 dígitos"),
  codbrigada: z.string().min(1, "El código de brigada es requerido").max(10, "El código de brigada no puede exceder 10 caracteres"),
  clave: z.string().min(6, "La clave debe tener al menos 6 caracteres").max(50, "La clave no puede exceder 50 caracteres"),
  login: z.string().min(1, "El login es requerido").max(20, "El login no puede exceder 20 caracteres"),
  creador: z.string().min(1, "El creador es requerido").max(50, "El creador no puede exceder 50 caracteres"),
});

// Esquema para actualizar inspector
export const updateInspectorSchema = z.object({
  codinspector: z.string().min(1, "El código de inspector es requerido").max(20, "El código de inspector no puede exceder 20 caracteres"),
  nombres: z.string().min(1, "Los nombres son requeridos").max(100, "Los nombres no pueden exceder 100 caracteres"),
  dni: z.string().min(8, "El DNI debe tener 8 dígitos").max(8, "El DNI debe tener 8 dígitos"),
  codbrigada: z.string().min(1, "El código de brigada es requerido").max(10, "El código de brigada no puede exceder 10 caracteres"),
  clave: z.string().min(6, "La clave debe tener al menos 6 caracteres").max(50, "La clave no puede exceder 50 caracteres"),
  login: z.string().min(1, "El login es requerido").max(20, "El login no puede exceder 20 caracteres"),
  creador: z.string().min(1, "El creador es requerido").max(50, "El creador no puede exceder 50 caracteres"),
});

// Tipos TypeScript derivados de los esquemas
export type CreateInspectorFormValues = z.infer<typeof createInspectorSchema>;
export type UpdateInspectorFormValues = z.infer<typeof updateInspectorSchema>; 