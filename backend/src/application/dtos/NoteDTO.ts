import { z } from 'zod'

export const noteItemSchema = z.object({
  description: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  total: z.number().positive()
})

export const noteTaxSchema = z.object({
  type: z.string(),
  rate: z.number().min(0),
  value: z.number().min(0)
})

export const createNoteSchema = z.object({
  clientId: z.string().uuid().optional(),
  contractId: z.string().uuid().optional(),
  type: z.string(),
  items: z.array(noteItemSchema),
  taxes: z.array(noteTaxSchema),
  totalValue: z.number().positive(),
  dueDate: z.string().datetime().optional()
})

export const updateNoteSchema = createNoteSchema.partial()

export type CreateNoteDTO = z.infer<typeof createNoteSchema>
export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>
export type NoteItemDTO = z.infer<typeof noteItemSchema>
export type NoteTaxDTO = z.infer<typeof noteTaxSchema>
