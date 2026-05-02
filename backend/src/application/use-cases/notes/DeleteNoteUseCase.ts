import { INoteRepository } from '../../domain/repositories/INoteRepository'

export class DeleteNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string) {
    const note = await this.noteRepository.findById(id)
    if (!note) throw new Error('Nota não encontrada')
    await this.noteRepository.delete(id)
  }
}
