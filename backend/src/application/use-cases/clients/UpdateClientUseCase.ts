import { IClientRepository } from '../../domain/repositories/IClientRepository'
import { UpdateClientDTO } from '../dtos/ClientDTO'

export class UpdateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(id: string, data: UpdateClientDTO) {
    const client = await this.clientRepository.findById(id)
    if (!client) {
      throw new Error('Cliente não encontrado')
    }

    if (data.email && data.email !== client.email) {
      const existingClient = await this.clientRepository.findByEmail(data.email)
      if (existingClient) {
        throw new Error('Email já cadastrado')
      }
    }

    Object.assign(client, data)
    client.updatedAt = new Date()
    return await this.clientRepository.update(client)
  }
}
