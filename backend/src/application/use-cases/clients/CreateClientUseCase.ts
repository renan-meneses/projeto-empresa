import { IClientRepository } from '../../domain/repositories/IClientRepository'
import { Client } from '../../domain/entities/Client'
import { CreateClientDTO } from '../dtos/ClientDTO'

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(data: CreateClientDTO) {
    const existingClient = await this.clientRepository.findByEmail(data.email)
    if (existingClient) {
      throw new Error('Email já cadastrado')
    }

    const client = new Client(data)
    return await this.clientRepository.create(client)
  }
}
