import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { PrismaExpenseRepository } from '../../infrastructure/database/repositories/PrismaExpenseRepository'
import { CreateExpenseUseCase } from '../../application/use-cases/expenses/CreateExpenseUseCase'
import { UpdateExpenseUseCase } from '../../application/use-cases/expenses/UpdateExpenseUseCase'
import { DeleteExpenseUseCase } from '../../application/use-cases/expenses/DeleteExpenseUseCase'
import { GetExpensesUseCase } from '../../application/use-cases/expenses/GetExpensesUseCase'
import { ExpenseController } from '../controllers/ExpenseController'

const router = Router()

const expenseRepository = new PrismaExpenseRepository()
const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository)
const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository)
const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository)
const getExpensesUseCase = new GetExpensesUseCase(expenseRepository)
const expenseController = new ExpenseController(
  createExpenseUseCase,
  updateExpenseUseCase,
  deleteExpenseUseCase,
  getExpensesUseCase
)

router.use(authMiddleware)
router.post('/', (req, res) => expenseController.create(req, res))
router.put('/:id', (req, res) => expenseController.update(req, res))
router.delete('/:id', (req, res) => expenseController.delete(req, res))
router.get('/:id', (req, res) => expenseController.get(req, res))
router.get('/', (req, res) => expenseController.getAll(req, res))

export default router
