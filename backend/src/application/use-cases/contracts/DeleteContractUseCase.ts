import { IContractRepository } from '../../domain/repositories/IContractRepository'

export class DeleteContractUseCase {
  constructor(private contractRepository: IContractRepository) {}

  async execute(id: string) {
    const contract = await this.contractRepository.findById(id)
    if (!contract) {
      throw new Error('Contrato não encontrado')
    }
    await this.contractRepository.delete(id)
  }
}
