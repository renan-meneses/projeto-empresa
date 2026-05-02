import { z } from 'zod'

export const createContractSchema = z.object({
  clientId: z.string().uuid('ID do cliente inválido'),
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  value: z.number().positive('Valor deve ser positivo'),
  startDate: z.string().datetime('Data inválida'),
  endDate: z.string().datetime('Data inválida').optional(),
  status: z.string().optional()
})

export const updateContractSchema = createContractSchema.partial()

export type CreateContractDTO = z.infer<typeof createContractSchema>
export type UpdateContractDTO = z.infer<typeof updateContractSchema>
