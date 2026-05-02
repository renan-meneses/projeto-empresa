import { IUserRepository } from '../../../domain/repositories/IUserRepository'
import { User } from '../../../domain/entities/User'
import prisma from '../prisma/PrismaClient'

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role
      }
    }) as User
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }
    }) as User | null
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    }) as User | null
  }

  async update(user: User): Promise<User> {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role,
        updatedAt: new Date()
      }
    }) as User
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    })
  }
}
