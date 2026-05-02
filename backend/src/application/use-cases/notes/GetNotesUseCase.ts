import { INoteRepository } from '../../domain/repositories/INoteRepository'

export class GetNotesUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id?: string, clientId?: string) {
    if (id) {
      const note = await this.noteRepository.findById(id)
      if (!note) throw new Error('Nota não encontrada')
      return note
    }
    if (clientId) {
      return await this.noteRepository.findByClientId(clientId)
    }
    return await this.noteRepository.findAll()
  }
}
