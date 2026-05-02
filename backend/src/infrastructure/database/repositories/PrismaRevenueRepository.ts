import { IRevenueRepository } from '../../../domain/repositories/IRevenueRepository'
import { Revenue } from '../../../domain/entities/Revenue'
import prisma from '../prisma/PrismaClient'

export class PrismaRevenueRepository implements IRevenueRepository {
  async create(revenue: Revenue): Promise<Revenue> {
    return await prisma.revenue.create({
      data: {
        id: revenue.id,
        description: revenue.description,
        value: revenue.value,
        date: revenue.date,
        clientId: revenue.clientId,
        contractId: revenue.contractId,
        category: revenue.category
      }
    }) as unknown as Revenue
  }

  async findById(id: string): Promise<Revenue | null> {
    return await prisma.revenue.findUnique({
      where: { id }
    }) as unknown as Revenue | null
  }

  async findAll(): Promise<Revenue[]> {
    return await prisma.revenue.findMany() as unknown as Revenue[]
  }

  async findByDateRange(start: Date, end: Date): Promise<Revenue[]> {
    return await prisma.revenue.findMany({
      where: {
        date: {
          gte: start,
          lte: end
        }
      }
    }) as unknown as Revenue[]
  }

  async update(revenue: Revenue): Promise<Revenue> {
    return await prisma.revenue.update({
      where: { id: revenue.id },
      data: {
        description: revenue.description,
        value: revenue.value,
        date: revenue.date,
        clientId: revenue.clientId,
        contractId: revenue.contractId,
        category: revenue.category,
        updatedAt: new Date()
      }
    }) as unknown as Revenue
  }

  async delete(id: string): Promise<void> {
    await prisma.revenue.delete({
      where: { id }
    })
  }
}
