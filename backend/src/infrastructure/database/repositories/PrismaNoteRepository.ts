import { INoteRepository } from '../../../domain/repositories/INoteRepository'
import { Note } from '../../../domain/entities/Note'
import prisma from '../prisma/PrismaClient'

export class PrismaNoteRepository implements INoteRepository {
  async create(note: Note): Promise<Note> {
    return await prisma.note.create({
      data: {
        id: note.id,
        number: note.number,
        clientId: note.clientId,
        contractId: note.contractId,
        type: note.type,
        status: note.status,
        items: note.items,
        taxes: note.taxes,
        totalValue: note.totalValue,
        issueDate: note.issueDate,
        dueDate: note.dueDate
      }
    }) as unknown as Note
  }

  async findById(id: string): Promise<Note | null> {
    return await prisma.note.findUnique({
      where: { id }
    }) as unknown as Note | null
  }

  async findByNumber(number: string): Promise<Note | null> {
    return await prisma.note.findUnique({
      where: { number }
    }) as unknown as Note | null
  }

  async findByClientId(clientId: string): Promise<Note[]> {
    return await prisma.note.findMany({
      where: { clientId }
    }) as unknown as Note[]
  }

  async findAll(): Promise<Note[]> {
    return await prisma.note.findMany() as unknown as Note[]
  }

  async update(note: Note): Promise<Note> {
    return await prisma.note.update({
      where: { id: note.id },
      data: {
        clientId: note.clientId,
        contractId: note.contractId,
        type: note.type,
        status: note.status,
        items: note.items,
        taxes: note.taxes,
        totalValue: note.totalValue,
        dueDate: note.dueDate,
        updatedAt: new Date()
      }
    }) as unknown as Note
  }

  async delete(id: string): Promise<void> {
    await prisma.note.delete({
      where: { id }
    })
  }

  async generateNumber(): Promise<string> {
    const lastNote = await prisma.note.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    const lastNumber = lastNote ? parseInt(lastNote.number) : 0
    return String(lastNumber + 1).padStart(6, '0')
  }
}
