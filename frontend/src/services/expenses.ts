import api from './api'
import { Expense } from '../types'

export const expensesService = {
  getAll: () => api.get<Expense[]>('/expenses'),
  getById: (id: string) => api.get<Expense>(`/expenses/${id}`),
  create: (data: Partial<Expense>) => api.post<Expense>('/expenses', data),
  update: (id: string, data: Partial<Expense>) => api.put<Expense>(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`)
}
