import { Request, Response } from 'express'
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase'
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { loginSchema, registerSchema } from '../../application/dtos/AuthDTO'

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase
  ) {}

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body)
      const result = await this.loginUseCase.execute(data)
      res.json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body)
      const user = await this.registerUseCase.execute(data)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
