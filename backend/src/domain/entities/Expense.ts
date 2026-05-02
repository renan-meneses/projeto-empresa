import { Decimal } from '@prisma/client/runtime/library'

export interface ExpenseProps {
  id?: string
  description: string
  value: number | Decimal
  date: Date
  category?: string
  supplier?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Expense {
  id: string
  description: string
  value: Decimal
  date: Date
  category?: string
  supplier?: string
  createdAt: Date
  updatedAt: Date

  constructor(props: ExpenseProps) {
    this.id = props.id || crypto.randomUUID()
    this.description = props.description
    this.value = new Decimal(props.value.toString())
    this.date = props.date
    this.category = props.category
    this.supplier = props.supplier
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }
}
