import { IContractRepository } from '../../domain/repositories/IContractRepository'
import { IClientRepository } from '../../domain/repositories/IClientRepository'
import { Contract } from '../../domain/entities/Contract'
import { CreateContractDTO } from '../dtos/ContractDTO'

export class CreateContractUseCase {
  constructor(
    private contractRepository: IContractRepository,
    private clientRepository: IClientRepository
  ) {}

  async execute(data: CreateContractDTO) {
    const client = await this.clientRepository.findById(data.clientId)
    if (!client) {
      throw new Error('Cliente não encontrado')
    }

    const contract = new Contract({
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined
    })

    return await this.contractRepository.create(contract)
  }
}
