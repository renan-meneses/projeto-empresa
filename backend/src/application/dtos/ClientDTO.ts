import { z } from 'zod'

export const createClientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  document: z.string().optional(),
  address: z.string().optional()
})

export const updateClientSchema = createClientSchema.partial()

export type CreateClientDTO = z.infer<typeof createClientSchema>
export type UpdateClientDTO = z.infer<typeof updateClientSchema>
