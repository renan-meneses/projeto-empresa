import { Request, Response } from 'express'
import { CreateContractUseCase } from '../../application/use-cases/contracts/CreateContractUseCase'
import { UpdateContractUseCase } from '../../application/use-cases/contracts/UpdateContractUseCase'
import { DeleteContractUseCase } from '../../application/use-cases/contracts/DeleteContractUseCase'
import { GetContractsUseCase } from '../../application/use-cases/contracts/GetContractsUseCase'
import { createContractSchema } from '../../application/dtos/ContractDTO'

export class ContractController {
  constructor(
    private createContractUseCase: CreateContractUseCase,
    private updateContractUseCase: UpdateContractUseCase,
    private deleteContractUseCase: DeleteContractUseCase,
    private getContractsUseCase: GetContractsUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createContractSchema.parse(req.body)
      const contract = await this.createContractUseCase.execute(data)
      res.status(201).json(contract)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = createContractSchema.partial().parse(req.body)
      const contract = await this.updateContractUseCase.execute(req.params.id, data)
      res.json(contract)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteContractUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const contract = await this.getContractsUseCase.execute(req.params.id)
      res.json(contract)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clientId = req.query.clientId as string
      const contracts = await this.getContractsUseCase.execute(undefined, clientId)
      res.json(contracts)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
