import { Expense } from '../entities/Expense'

export interface IExpenseRepository {
  create(expense: Expense): Promise<Expense>
  findById(id: string): Promise<Expense | null>
  findAll(): Promise<Expense[]>
  findByDateRange(start: Date, end: Date): Promise<Expense[]>
  update(expense: Expense): Promise<Expense>
  delete(id: string): Promise<void>
}
