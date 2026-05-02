export interface ClientProps {
  id?: string
  name: string
  email: string
  phone?: string
  document?: string
  address?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class Client {
  id: string
  name: string
  email: string
  phone?: string
  document?: string
  address?: string
  active: boolean
  createdAt: Date
  updatedAt: Date

  constructor(props: ClientProps) {
    this.id = props.id || crypto.randomUUID()
    this.name = props.name
    this.email = props.email
    this.phone = props.phone
    this.document = props.document
    this.address = props.address
    this.active = props.active ?? true
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }
}
