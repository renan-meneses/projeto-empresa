import { Decimal } from '@prisma/client/runtime/library'

export interface NoteItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface NoteTax {
  type: string
  rate: number
  value: number
}

export interface NoteProps {
  id?: string
  number: string
  clientId?: string
  contractId?: string
  type: string
  status?: string
  items: NoteItem[]
  taxes: NoteTax[]
  totalValue: number | Decimal
  issueDate?: Date
  dueDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export class Note {
  id: string
  number: string
  clientId?: string
  contractId?: string
  type: string
  status: string
  items: NoteItem[]
  taxes: NoteTax[]
  totalValue: Decimal
  issueDate: Date
  dueDate?: Date
  createdAt: Date
  updatedAt: Date

  constructor(props: NoteProps) {
    this.id = props.id || crypto.randomUUID()
    this.number = props.number
    this.clientId = props.clientId
    this.contractId = props.contractId
    this.type = props.type
    this.status = props.status || 'draft'
    this.items = props.items
    this.taxes = props.taxes
    this.totalValue = new Decimal(props.totalValue.toString())
    this.issueDate = props.issueDate || new Date()
    this.dueDate = props.dueDate
    this.createdAt = props.createdAt || new Date()
    this.updatedAt = props.updatedAt || new Date()
  }

  calculateTaxes(): NoteTax[] {
    return this.taxes.map(tax => ({
      ...tax,
      value: Number(this.totalValue) * (tax.rate / 100)
    }))
  }
}
