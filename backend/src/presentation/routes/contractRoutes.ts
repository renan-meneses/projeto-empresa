import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { PrismaContractRepository } from '../../infrastructure/database/repositories/PrismaContractRepository'
import { PrismaClientRepository } from '../../infrastructure/database/repositories/PrismaClientRepository'
import { CreateContractUseCase } from '../../application/use-cases/contracts/CreateContractUseCase'
import { UpdateContractUseCase } from '../../application/use-cases/contracts/UpdateContractUseCase'
import { DeleteContractUseCase } from '../../application/use-cases/contracts/DeleteContractUseCase'
import { GetContractsUseCase } from '../../application/use-cases/contracts/GetContractsUseCase'
import { ContractController } from '../controllers/ContractController'

const router = Router()

const contractRepository = new PrismaContractRepository()
const clientRepository = new PrismaClientRepository()
const createContractUseCase = new CreateContractUseCase(contractRepository, clientRepository)
const updateContractUseCase = new UpdateContractUseCase(contractRepository)
const deleteContractUseCase = new DeleteContractUseCase(contractRepository)
const getContractsUseCase = new GetContractsUseCase(contractRepository)
const contractController = new ContractController(
  createContractUseCase,
  updateContractUseCase,
  deleteContractUseCase,
  getContractsUseCase
)

router.use(authMiddleware)
router.post('/', (req, res) => contractController.create(req, res))
router.put('/:id', (req, res) => contractController.update(req, res))
router.delete('/:id', (req, res) => contractController.delete(req, res))
router.get('/:id', (req, res) => contractController.get(req, res))
router.get('/', (req, res) => contractController.getAll(req, res))

export default router
