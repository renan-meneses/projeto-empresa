import { Request, Response } from 'express'
import { CreateClientUseCase } from '../../application/use-cases/clients/CreateClientUseCase'
import { UpdateClientUseCase } from '../../application/use-cases/clients/UpdateClientUseCase'
import { DeleteClientUseCase } from '../../application/use-cases/clients/DeleteClientUseCase'
import { GetClientsUseCase } from '../../application/use-cases/clients/GetClientsUseCase'
import { createClientSchema, updateClientSchema } from '../../application/dtos/ClientDTO'

export class ClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
    private getClientsUseCase: GetClientsUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createClientSchema.parse(req.body)
      const client = await this.createClientUseCase.execute(data)
      res.status(201).json(client)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = updateClientSchema.parse(req.body)
      const client = await this.updateClientUseCase.execute(req.params.id, data)
      res.json(client)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteClientUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const client = await this.getClientsUseCase.execute(req.params.id)
      res.json(client)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clients = await this.getClientsUseCase.execute()
      res.json(clients)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
