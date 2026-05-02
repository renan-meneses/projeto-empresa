import { Request, Response } from 'express'
import { CreateRevenueUseCase } from '../../application/use-cases/revenues/CreateRevenueUseCase'
import { UpdateRevenueUseCase } from '../../application/use-cases/revenues/UpdateRevenueUseCase'
import { DeleteRevenueUseCase } from '../../application/use-cases/revenues/DeleteRevenueUseCase'
import { GetRevenuesUseCase } from '../../application/use-cases/revenues/GetRevenuesUseCase'
import { createRevenueSchema } from '../../application/dtos/RevenueDTO'

export class RevenueController {
  constructor(
    private createRevenueUseCase: CreateRevenueUseCase,
    private updateRevenueUseCase: UpdateRevenueUseCase,
    private deleteRevenueUseCase: DeleteRevenueUseCase,
    private getRevenuesUseCase: GetRevenuesUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createRevenueSchema.parse(req.body)
      const revenue = await this.createRevenueUseCase.execute(data)
      res.status(201).json(revenue)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const revenue = await this.updateRevenueUseCase.execute(req.params.id, req.body)
      res.json(revenue)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteRevenueUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const revenue = await this.getRevenuesUseCase.execute(req.params.id)
      res.json(revenue)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const revenues = await this.getRevenuesUseCase.execute()
      res.json(revenues)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
