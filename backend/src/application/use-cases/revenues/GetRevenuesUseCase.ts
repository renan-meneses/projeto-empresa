import { IRevenueRepository } from '../../domain/repositories/IRevenueRepository'

export class GetRevenuesUseCase {
  constructor(private revenueRepository: IRevenueRepository) {}

  async execute(id?: string) {
    if (id) {
      const revenue = await this.revenueRepository.findById(id)
      if (!revenue) throw new Error('Receita não encontrada')
      return revenue
    }
    return await this.revenueRepository.findAll()
  }
}
