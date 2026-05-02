import { Decimal } from '@prisma/client/runtime/library'

export interface ContractProps {
  id?: string
  clientId: string
  title: string
  description?: string
  value: number | Decimal
  startDate: Date
  endDate?: Date
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Contract {
  id: string
  clientId: string
  title: string
  description?: string
  value: Decimal
  startDate: Date
  endDate?: Date
  status: string
  createdAt: Date
  updatedAt: Date

  constructor(props: ContractProps) {
    this.id = props.id || crypto.randomUUID()
    this.clientId = props.clientId
    this.title = props.title
    this.description = props.description
    this.value = new Decimal(props.value.toString())
    this.startDate = props.startDate
    this.endDate = props.endDate
    this.status = props.status || 'active'
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }
}
