export interface UserProps {
  id?: string
  email: string
  password: string
  name: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  id: string
  email: string
  password: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date

  constructor(props: UserProps) {
    this.id = props.id || crypto.randomUUID()
    this.email = props.email
    this.password = props.password
    this.name = props.name
    this.role = props.role || 'user'
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }
}
