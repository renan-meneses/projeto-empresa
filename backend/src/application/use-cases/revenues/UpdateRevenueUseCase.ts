import { IRevenueRepository } from '../../domain/repositories/IRevenueRepository'

export class UpdateRevenueUseCase {
  constructor(private revenueRepository: IRevenueRepository) {}

  async execute(id: string, data: any) {
    const revenue = await this.revenueRepository.findById(id)
    if (!revenue) throw new Error('Receita não encontrada')

    Object.assign(revenue, {
      ...data,
      date: data.date ? new Date(data.date) : revenue.date,
      updatedAt: new Date()
    })

    return await this.revenueRepository.update(revenue)
  }
}
