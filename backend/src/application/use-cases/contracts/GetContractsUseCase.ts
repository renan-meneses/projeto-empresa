import { IContractRepository } from '../../domain/repositories/IContractRepository'

export class GetContractsUseCase {
  constructor(private contractRepository: IContractRepository) {}

  async execute(id?: string, clientId?: string) {
    if (id) {
      const contract = await this.contractRepository.findById(id)
      if (!contract) {
        throw new Error('Contrato não encontrado')
      }
      return contract
    }
    if (clientId) {
      return await this.contractRepository.findByClientId(clientId)
    }
    return await this.contractRepository.findAll()
  }
}
