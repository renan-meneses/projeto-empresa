import { IContractRepository } from '../../../domain/repositories/IContractRepository'
import { Contract } from '../../../domain/entities/Contract'
import prisma from '../prisma/PrismaClient'

export class PrismaContractRepository implements IContractRepository {
  async create(contract: Contract): Promise<Contract> {
    return await prisma.contract.create({
      data: {
        id: contract.id,
        clientId: contract.clientId,
        title: contract.title,
        description: contract.description,
        value: contract.value,
        startDate: contract.startDate,
        endDate: contract.endDate,
        status: contract.status
      }
    }) as unknown as Contract
  }

  async findById(id: string): Promise<Contract | null> {
    return await prisma.contract.findUnique({
      where: { id }
    }) as unknown as Contract | null
  }

  async findByClientId(clientId: string): Promise<Contract[]> {
    return await prisma.contract.findMany({
      where: { clientId }
    }) as unknown as Contract[]
  }

  async findAll(): Promise<Contract[]> {
    return await prisma.contract.findMany() as unknown as Contract[]
  }

  async update(contract: Contract): Promise<Contract> {
    return await prisma.contract.update({
      where: { id: contract.id },
      data: {
        clientId: contract.clientId,
        title: contract.title,
        description: contract.description,
        value: contract.value,
        startDate: contract.startDate,
        endDate: contract.endDate,
        status: contract.status,
        updatedAt: new Date()
      }
    }) as unknown as Contract
  }

  async delete(id: string): Promise<void> {
    await prisma.contract.delete({
      where: { id }
    })
  }
}
