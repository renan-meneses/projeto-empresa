import { INoteRepository } from '../../domain/repositories/INoteRepository'

export class UpdateNoteUseCase {
  constructor(private noteRepository: INoteRepository) {}

  async execute(id: string, data: any) {
    const note = await this.noteRepository.findById(id)
    if (!note) throw new Error('Nota não encontrada')

    Object.assign(note, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : note.dueDate,
      updatedAt: new Date()
    })

    return await this.noteRepository.update(note)
  }
}
