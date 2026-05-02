import api from './api'
import { Note } from '../types'

export const notesService = {
  getAll: (clientId?: string) => api.get<Note[]>('/notes', { params: { clientId } }),
  getById: (id: string) => api.get<Note>(`/notes/${id}`),
  create: (data: Partial<Note>) => api.post<Note>('/notes', data),
  update: (id: string, data: Partial<Note>) => api.put<Note>(`/notes/${id}`, data),
  delete: (id: string) => api.delete(`/notes/${id}`),
  calculateTaxes: (baseValue: number, taxRates: { type: string; rate: number }[]) =>
    api.post('/notes/calculate-taxes', { baseValue, taxRates })
}
