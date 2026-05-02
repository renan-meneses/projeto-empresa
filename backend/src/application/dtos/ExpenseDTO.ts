import { z } from 'zod'

export const createExpenseSchema = z.object({
  description: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
  value: z.number().positive('Valor deve ser positivo'),
  date: z.string().datetime('Data inválida'),
  category: z.string().optional(),
  supplier: z.string().optional()
})

export const updateExpenseSchema = createExpenseSchema.partial()

export type CreateExpenseDTO = z.infer<typeof createExpenseSchema>
export type UpdateExpenseDTO = z.infer<typeof updateExpenseSchema>
