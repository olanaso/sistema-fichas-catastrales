import { hash, compare } from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12 // Número de rondas de hasheo (más alto = más seguro pero más lento)
  return await hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
} 