import { Decimal } from '@prisma/client/runtime/library'

export interface RevenueProps {
  id?: string
  description: string
  value: number | Decimal
  date: Date
  clientId?: string
  contractId?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Revenue {
  id: string
  description: string
  value: Decimal
  date: Date
  clientId?: string
  contractId?: string
  category?: string
  createdAt: Date
  updatedAt: Date

  constructor(props: RevenueProps) {
    this.id = props.id || crypto.randomUUID()
    this.description = props.description
    this.value = new Decimal(props.value.toString())
    this.date = props.date
    this.clientId = props.clientId
    this.contractId = props.contractId
    this.category = props.category
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }
}
