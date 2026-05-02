import { IClientRepository } from '../../domain/repositories/IClientRepository'

export class GetClientsUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id?: string) {
    if (id) {
      const client = await this.clientRepository.findById(id)
      if (!client) {
        throw new Error('Cliente não encontrado')
      }
      return client
    }
    return await this.clientRepository.findAll()
  }
}
