import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { PrismaNoteRepository } from '../../infrastructure/database/repositories/PrismaNoteRepository'
import { PrismaClientRepository } from '../../infrastructure/database/repositories/PrismaClientRepository'
import { PrismaContractRepository } from '../../infrastructure/database/repositories/PrismaContractRepository'
import { CreateNoteUseCase } from '../../application/use-cases/notes/CreateNoteUseCase'
import { UpdateNoteUseCase } from '../../application/use-cases/notes/UpdateNoteUseCase'
import { DeleteNoteUseCase } from '../../application/use-cases/notes/DeleteNoteUseCase'
import { GetNotesUseCase } from '../../application/use-cases/notes/GetNotesUseCase'
import { CalculateTaxesUseCase } from '../../application/use-cases/notes/CalculateTaxesUseCase'
import { NoteController } from '../controllers/NoteController'

const router = Router()

const noteRepository = new PrismaNoteRepository()
const clientRepository = new PrismaClientRepository()
const contractRepository = new PrismaContractRepository()
const createNoteUseCase = new CreateNoteUseCase(noteRepository, clientRepository, contractRepository)
const updateNoteUseCase = new UpdateNoteUseCase(noteRepository)
const deleteNoteUseCase = new DeleteNoteUseCase(noteRepository)
const getNotesUseCase = new GetNotesUseCase(noteRepository)
const calculateTaxesUseCase = new CalculateTaxesUseCase()
const noteController = new NoteController(
  createNoteUseCase,
  updateNoteUseCase,
  deleteNoteUseCase,
  getNotesUseCase,
  calculateTaxesUseCase
)

router.use(authMiddleware)
router.post('/', (req, res) => noteController.create(req, res))
router.put('/:id', (req, res) => noteController.update(req, res))
router.delete('/:id', (req, res) => noteController.delete(req, res))
router.get('/:id', (req, res) => noteController.get(req, res))
router.get('/', (req, res) => noteController.getAll(req, res))
router.post('/calculate-taxes', (req, res) => noteController.calculateTaxes(req, res))

export default router
