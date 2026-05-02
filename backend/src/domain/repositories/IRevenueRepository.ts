import { Revenue } from '../entities/Revenue'

export interface IRevenueRepository {
  create(revenue: Revenue): Promise<Revenue>
  findById(id: string): Promise<Revenue | null>
  findAll(): Promise<Revenue[]>
  findByDateRange(start: Date, end: Date): Promise<Revenue[]>
  update(revenue: Revenue): Promise<Revenue>
  delete(id: string): Promise<void>
}
