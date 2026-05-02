export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  document?: string
  address?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  clientId: string
  title: string
  description?: string
  value: number
  startDate: string
  endDate?: string
  status: string
  createdAt: string
  updatedAt: string
}

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

export interface Note {
  id: string
  number: string
  clientId?: string
  contractId?: string
  type: string
  status: string
  items: NoteItem[]
  taxes: NoteTax[]
  totalValue: number
  issueDate: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface Revenue {
  id: string
  description: string
  value: number
  date: string
  clientId?: string
  contractId?: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface Expense {
  id: string
  description: string
  value: number
  date: string
  category?: string
  supplier?: string
  createdAt: string
  updatedAt: string
}

export interface DashboardData {
  counts: {
    clients: number
    contracts: number
    notes: number
    revenues: number
    expenses: number
  }
  financial: {
    totalRevenue: number
    totalExpense: number
    balance: number
  }
  recentRevenues: Revenue[]
  recentExpenses: Expense[]
}
