import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { PrismaRevenueRepository } from '../../infrastructure/database/repositories/PrismaRevenueRepository'
import { PrismaClientRepository } from '../../infrastructure/database/repositories/PrismaClientRepository'
import { PrismaContractRepository } from '../../infrastructure/database/repositories/PrismaContractRepository'
import { CreateRevenueUseCase } from '../../application/use-cases/revenues/CreateRevenueUseCase'
import { UpdateRevenueUseCase } from '../../application/use-cases/revenues/UpdateRevenueUseCase'
import { DeleteRevenueUseCase } from '../../application/use-cases/revenues/DeleteRevenueUseCase'
import { GetRevenuesUseCase } from '../../application/use-cases/revenues/GetRevenuesUseCase'
import { RevenueController } from '../controllers/RevenueController'

const router = Router()

const revenueRepository = new PrismaRevenueRepository()
const clientRepository = new PrismaClientRepository()
const contractRepository = new PrismaContractRepository()
const createRevenueUseCase = new CreateRevenueUseCase(revenueRepository, clientRepository, contractRepository)
const updateRevenueUseCase = new UpdateRevenueUseCase(revenueRepository)
const deleteRevenueUseCase = new DeleteRevenueUseCase(revenueRepository)
const getRevenuesUseCase = new GetRevenuesUseCase(revenueRepository)
const revenueController = new RevenueController(
  createRevenueUseCase,
  updateRevenueUseCase,
  deleteRevenueUseCase,
  getRevenuesUseCase
)

router.use(authMiddleware)
router.post('/', (req, res) => revenueController.create(req, res))
router.put('/:id', (req, res) => revenueController.update(req, res))
router.delete('/:id', (req, res) => revenueController.delete(req, res))
router.get('/:id', (req, res) => revenueController.get(req, res))
router.get('/', (req, res) => revenueController.getAll(req, res))

export default router
