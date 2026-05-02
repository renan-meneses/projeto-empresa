import { IRevenueRepository } from '../../domain/repositories/IRevenueRepository'
import { IClientRepository } from '../../domain/repositories/IClientRepository'
import { IContractRepository } from '../../domain/repositories/IContractRepository'
import { Revenue } from '../../domain/entities/Revenue'
import { CreateRevenueDTO } from '../dtos/RevenueDTO'

export class CreateRevenueUseCase {
  constructor(
    private revenueRepository: IRevenueRepository,
    private clientRepository: IClientRepository,
    private contractRepository: IContractRepository
  ) {}

  async execute(data: CreateRevenueDTO) {
    if (data.clientId) {
      const client = await this.clientRepository.findById(data.clientId)
      if (!client) throw new Error('Cliente não encontrado')
    }

    if (data.contractId) {
      const contract = await this.contractRepository.findById(data.contractId)
      if (!contract) throw new Error('Contrato não encontrado')
    }

    const revenue = new Revenue({
      ...data,
      date: new Date(data.date)
    })

    return await this.revenueRepository.create(revenue)
  }
}
