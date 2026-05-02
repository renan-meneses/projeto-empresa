import { INoteRepository } from '../../domain/repositories/INoteRepository'
import { IClientRepository } from '../../domain/repositories/IClientRepository'
import { IContractRepository } from '../../domain/repositories/IContractRepository'
import { Note } from '../../domain/entities/Note'
import { CreateNoteDTO } from '../dtos/NoteDTO'

export class CreateNoteUseCase {
  constructor(
    private noteRepository: INoteRepository,
    private clientRepository: IClientRepository,
    private contractRepository: IContractRepository
  ) {}

  async execute(data: CreateNoteDTO) {
    if (data.clientId) {
      const client = await this.clientRepository.findById(data.clientId)
      if (!client) throw new Error('Cliente não encontrado')
    }

    if (data.contractId) {
      const contract = await this.contractRepository.findById(data.contractId)
      if (!contract) throw new Error('Contrato não encontrado')
    }

    const number = await this.noteRepository.generateNumber()

    const note = new Note({
      ...data,
      number,
      totalValue: data.totalValue,
      items: data.items,
      taxes: data.taxes,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    })

    return await this.noteRepository.create(note)
  }
}
