import { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: string) {
    const expense = await this.expenseRepository.findById(id)
    if (!expense) throw new Error('Gasto não encontrado')
    await this.expenseRepository.delete(id)
  }
}
