import { IExpenseRepository } from '../../../domain/repositories/IExpenseRepository'
import { Expense } from '../../../domain/entities/Expense'
import prisma from '../prisma/PrismaClient'

export class PrismaExpenseRepository implements IExpenseRepository {
  async create(expense: Expense): Promise<Expense> {
    return await prisma.expense.create({
      data: {
        id: expense.id,
        description: expense.description,
        value: expense.value,
        date: expense.date,
        category: expense.category,
        supplier: expense.supplier
      }
    }) as unknown as Expense
  }

  async findById(id: string): Promise<Expense | null> {
    return await prisma.expense.findUnique({
      where: { id }
    }) as unknown as Expense | null
  }

  async findAll(): Promise<Expense[]> {
    return await prisma.expense.findMany() as unknown as Expense[]
  }

  async findByDateRange(start: Date, end: Date): Promise<Expense[]> {
    return await prisma.expense.findMany({
      where: {
        date: {
          gte: start,
          lte: end
        }
      }
    }) as unknown as Expense[]
  }

  async update(expense: Expense): Promise<Expense> {
    return await prisma.expense.update({
      where: { id: expense.id },
      data: {
        description: expense.description,
        value: expense.value,
        date: expense.date,
        category: expense.category,
        supplier: expense.supplier,
        updatedAt: new Date()
      }
    }) as unknown as Expense
  }

  async delete(id: string): Promise<void> {
    await prisma.expense.delete({
      where: { id }
    })
  }
}
