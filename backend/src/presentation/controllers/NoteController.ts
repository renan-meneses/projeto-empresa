import { Request, Response } from 'express'
import { CreateNoteUseCase } from '../../application/use-cases/notes/CreateNoteUseCase'
import { UpdateNoteUseCase } from '../../application/use-cases/notes/UpdateNoteUseCase'
import { DeleteNoteUseCase } from '../../application/use-cases/notes/DeleteNoteUseCase'
import { GetNotesUseCase } from '../../application/use-cases/notes/GetNotesUseCase'
import { CalculateTaxesUseCase } from '../../application/use-cases/notes/CalculateTaxesUseCase'
import { createNoteSchema } from '../../application/dtos/NoteDTO'

export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private updateNoteUseCase: UpdateNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNotesUseCase: GetNotesUseCase,
    private calculateTaxesUseCase: CalculateTaxesUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = createNoteSchema.parse(req.body)
      const note = await this.createNoteUseCase.execute(data)
      res.status(201).json(note)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const note = await this.updateNoteUseCase.execute(req.params.id, req.body)
      res.json(note)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteNoteUseCase.execute(req.params.id)
      res.status(204).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async get(req: Request, res: Response) {
    try {
      const note = await this.getNotesUseCase.execute(req.params.id)
      res.json(note)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clientId = req.query.clientId as string
      const notes = await this.getNotesUseCase.execute(undefined, clientId)
      res.json(notes)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async calculateTaxes(req: Request, res: Response) {
    try {
      const { baseValue, taxRates } = req.body
      const result = this.calculateTaxesUseCase.execute({ baseValue, taxRates })
      res.json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
