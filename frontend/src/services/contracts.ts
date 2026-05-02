import api from './api'
import { Contract } from '../types'

export const contractsService = {
  getAll: (clientId?: string) => api.get<Contract[]>('/contracts', { params: { clientId } }),
  getById: (id: string) => api.get<Contract>(`/contracts/${id}`),
  create: (data: Partial<Contract>) => api.post<Contract>('/contracts', data),
  update: (id: string, data: Partial<Contract>) => api.put<Contract>(`/contracts/${id}`, data),
  delete: (id: string) => api.delete(`/contracts/${id}`)
}
