import { Request, Response } from 'express'
import { CreateExpenseUseCase } from '../../application/use-cases/expenses/CreateExpenseUseCase'
import { UpdateExpenseUseCase } from '../../application/use-cases/expenses/UpdateExpenseUseCase'
import { DeleteExpenseUseCase } from '../../application/use-cases/expenses/DeleteExpenseUseCase'
import { GetExpensesUseCase } from '../../application/use-cases/expenses/GetExpensesUseCase'
import { createExpenseSchema } from '../../application/dtos/ExpenseDTO'

export class ExpenseController {
  constructor(
    private createExpenseUseCase: CreateExpenseUseCase,
    private updateExpenseUseCase: UpdateExpenseUseCase,
    private deleteExpenseUseCase: DeleteExpenseUseCase,
    private getExpensesUseCase: GetExpensesUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createExpenseSchema.parse(req.body)
      const expense = await this.createExpenseUseCase.execute(data)
      res.status(201).json(expense)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const expense = await this.updateExpenseUseCase.execute(req.params.id, req.body)
      res.json(expense)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteExpenseUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const expense = await this.getExpensesUseCase.execute(req.params.id)
      res.json(expense)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const expenses = await this.getExpensesUseCase.execute()
      res.json(expenses)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
