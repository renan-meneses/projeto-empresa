import { IClientRepository } from '../../domain/repositories/IClientRepository'

export class DeleteClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string) {
    const client = await this.clientRepository.findById(id)
    if (!client) {
      throw new Error('Cliente não encontrado')
    }
    await this.clientRepository.delete(id)
  }
}
