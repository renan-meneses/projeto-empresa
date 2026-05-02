import { Router } from 'express'
import { PrismaUserRepository } from '../../infrastructure/database/repositories/PrismaUserRepository'
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase'
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase'
import { AuthController } from '../controllers/AuthController'

const router = Router()

const userRepository = new PrismaUserRepository()
const loginUseCase = new LoginUseCase(userRepository)
const registerUseCase = new RegisterUseCase(userRepository)
const authController = new AuthController(loginUseCase, registerUseCase)

router.post('/login', (req, res) => authController.login(req, res))
router.post('/register', (req, res) => authController.register(req, res))

export default router
