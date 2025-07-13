import { z } from "zod";

// Esquema para crear grupo de trabajo
export const createGrupoTrabajoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede exceder 100 caracteres"),
  activo: z.boolean(),
  codlider: z.string().min(1, "El código del líder es requerido").max(10, "El código del líder no puede exceder 10 caracteres"),
  inspectores: z.string().min(1, "Los inspectores son requeridos").max(500, "La lista de inspectores es muy larga"),
});

// Esquema para actualizar grupo de trabajo
export const updateGrupoTrabajoSchema = z.object({
  codgrupo: z.string().min(1, "El código del grupo es requerido").max(20, "El código del grupo no puede exceder 20 caracteres"),
  nombre: z.string().min(1, "El nombre es requerido").max(100, "El nombre no puede exceder 100 caracteres"),
  activo: z.boolean(),
  codlider: z.string().min(1, "El código del líder es requerido").max(10, "El código del líder no puede exceder 10 caracteres"),
  inspectores: z.string().min(1, "Los inspectores son requeridos").max(500, "La lista de inspectores es muy larga"),
});

// Tipos TypeScript derivados de los esquemas
export type CreateGrupoTrabajoFormValues = z.infer<typeof createGrupoTrabajoSchema>;
export type UpdateGrupoTrabajoFormValues = z.infer<typeof updateGrupoTrabajoSchema>; 