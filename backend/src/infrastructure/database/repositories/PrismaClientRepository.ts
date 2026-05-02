import { IClientRepository } from '../../../domain/repositories/IClientRepository'
import { Client } from '../../../domain/entities/Client'
import prisma from '../prisma/PrismaClient'

export class PrismaClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    return await prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        document: client.document,
        address: client.address,
        active: client.active
      }
    }) as Client
  }

  async findById(id: string): Promise<Client | null> {
    return await prisma.client.findUnique({
      where: { id }
    }) as Client | null
  }

  async findByEmail(email: string): Promise<Client | null> {
    return await prisma.client.findUnique({
      where: { email }
    }) as Client | null
  }

  async findAll(): Promise<Client[]> {
    return await prisma.client.findMany() as Client[]
  }

  async update(client: Client): Promise<Client> {
    return await prisma.client.update({
      where: { id: client.id },
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        document: client.document,
        address: client.address,
        active: client.active,
        updatedAt: new Date()
      }
    }) as Client
  }

  async delete(id: string): Promise<void> {
    await prisma.client.delete({
      where: { id }
    })
  }
}
