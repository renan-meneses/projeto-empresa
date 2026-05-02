import { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'

export class UpdateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: string, data: any) {
    const expense = await this.expenseRepository.findById(id)
    if (!expense) throw new Error('Gasto não encontrado')

    Object.assign(expense, {
      ...data,
      date: data.date ? new Date(data.date) : expense.date,
      updatedAt: new Date()
    })

    return await this.expenseRepository.update(expense)
  }
}
