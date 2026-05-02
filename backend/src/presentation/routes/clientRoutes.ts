import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { PrismaClientRepository } from '../../infrastructure/database/repositories/PrismaClientRepository'
import { CreateClientUseCase } from '../../application/use-cases/clients/CreateClientUseCase'
import { UpdateClientUseCase } from '../../application/use-cases/clients/UpdateClientUseCase'
import { DeleteClientUseCase } from '../../application/use-cases/clients/DeleteClientUseCase'
import { GetClientsUseCase } from '../../application/use-cases/clients/GetClientsUseCase'
import { ClientController } from '../controllers/ClientController'

const router = Router()

const clientRepository = new PrismaClientRepository()
const createClientUseCase = new CreateClientUseCase(clientRepository)
const updateClientUseCase = new UpdateClientUseCase(clientRepository)
const deleteClientUseCase = new DeleteClientUseCase(clientRepository)
const getClientsUseCase = new GetClientsUseCase(clientRepository)
const clientController = new ClientController(
  createClientUseCase,
  updateClientUseCase,
  deleteClientUseCase,
  getClientsUseCase
)

router.use(authMiddleware)
router.post('/', (req, res) => clientController.create(req, res))
router.put('/:id', (req, res) => clientController.update(req, res))
router.delete('/:id', (req, res) => clientController.delete(req, res))
router.get('/:id', (req, res) => clientController.get(req, res))
router.get('/', (req, res) => clientController.getAll(req, res))

export default router
