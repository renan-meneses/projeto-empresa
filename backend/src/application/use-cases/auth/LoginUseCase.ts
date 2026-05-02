import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { LoginDTO } from '../dtos/AuthDTO'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email)
    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  }
}
