import { IExpenseRepository } from '../../domain/repositories/IExpenseRepository'
import { Expense } from '../../domain/entities/Expense'
import { CreateExpenseDTO } from '../dtos/ExpenseDTO'

export class CreateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(data: CreateExpenseDTO) {
    const expense = new Expense({
      ...data,
      date: new Date(data.date)
    })

    return await this.expenseRepository.create(expense)
  }
}
