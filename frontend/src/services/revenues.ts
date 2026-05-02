import api from './api'
import { Revenue } from '../types'

export const revenuesService = {
  getAll: () => api.get<Revenue[]>('/revenues'),
  getById: (id: string) => api.get<Revenue>(`/revenues/${id}`),
  create: (data: Partial<Revenue>) => api.post<Revenue>('/revenues', data),
  update: (id: string, data: Partial<Revenue>) => api.put<Revenue>(`/revenues/${id}`, data),
  delete: (id: string) => api.delete(`/revenues/${id}`)
}
