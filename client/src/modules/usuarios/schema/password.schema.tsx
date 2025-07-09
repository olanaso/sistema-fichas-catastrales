import * as z from "zod"

export const passwordSchema = z.object({
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  confirmPassword: z.string().min(8, {
    message: "La confirmación debe tener al menos 8 caracteres.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type PasswordFormValues = z.infer<typeof passwordSchema> 