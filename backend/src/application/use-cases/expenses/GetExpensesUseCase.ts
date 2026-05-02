import { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'

export class GetExpensesUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id?: string) {
    if (id) {
      const expense = await this.expenseRepository.findById(id)
      if (!expense) throw new Error('Gasto não encontrado')
      return expense
    }
    return await this.expenseRepository.findAll()
  }
}
