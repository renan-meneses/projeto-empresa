import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import { RegisterDTO } from '../dtos/AuthDTO'
import bcrypt from 'bcrypt'

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: RegisterDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email já cadastrado')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = new User({
      email: data.email,
      password: hashedPassword,
      name: data.name
    })

    return await this.userRepository.create(user)
  }
}
