import { IContractRepository } from '../../domain/repositories/IContractRepository'
import { UpdateContractDTO } from '../dtos/ContractDTO'

export class UpdateContractUseCase {
  constructor(private contractRepository: IContractRepository) {}

  async execute(id: string, data: UpdateContractDTO) {
    const contract = await this.contractRepository.findById(id)
    if (!contract) {
      throw new Error('Contrato não encontrado')
    }

    Object.assign(contract, {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : contract.startDate,
      endDate: data.endDate ? new Date(data.endDate) : contract.endDate
    })
    contract.updatedAt = new Date()

    return await this.contractRepository.update(contract)
  }
}
