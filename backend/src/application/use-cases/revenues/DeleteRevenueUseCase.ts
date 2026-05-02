import { IRevenueRepository } from '../../domain/repositories/IRevenueRepository'

export class DeleteRevenueUseCase {
  constructor(private revenueRepository: IRevenueRepository) {}

  async execute(id: string) {
    const revenue = await this.revenueRepository.findById(id)
    if (!revenue) throw new Error('Receita não encontrada')
    await this.revenueRepository.delete(id)
  }
}
