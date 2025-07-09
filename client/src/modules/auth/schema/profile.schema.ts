import { z } from "zod"

export const profileSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  numero_celular: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema> 