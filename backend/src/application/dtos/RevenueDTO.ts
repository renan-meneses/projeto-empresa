import { z } from 'zod'

export const createRevenueSchema = z.object({
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  value: z.number().positive('Valor deve ser positivo'),
  date: z.string().datetime('Data inválida'),
  clientId: z.string().uuid().optional(),
  contractId: z.string().uuid().optional(),
  category: z.string().optional()
})

export const updateRevenueSchema = createRevenueSchema.partial()

export type CreateRevenueDTO = z.infer<typeof createRevenueSchema>
export type UpdateRevenueDTO = z.infer<typeof updateRevenueSchema>
