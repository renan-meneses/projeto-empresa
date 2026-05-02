import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClientRepository } from '../infrastructure/database/repositories/PrismaClientRepository'
import { PrismaContractRepository } from '../infrastructure/database/repositories/PrismaContractRepository'
import { PrismaNoteRepository } from '../infrastructure/database/repositories/PrismaNoteRepository'
import { PrismaRevenueRepository } from '../infrastructure/database/repositories/PrismaRevenueRepository'
import { PrismaExpenseRepository } from '../infrastructure/database/repositories/PrismaExpenseRepository'
import { GetClientsUseCase } from '../application/use-cases/clients/GetClientsUseCase'
import { GetContractsUseCase } from '../application/use-cases/contracts/GetContractsUseCase'
import { GetNotesUseCase } from '../application/use-cases/notes/GetNotesUseCase'
import { GetRevenuesUseCase } from '../application/use-cases/revenues/GetRevenuesUseCase'
import { GetExpensesUseCase } from '../application/use-cases/expenses/GetExpensesUseCase'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const clientRepo = new PrismaClientRepository()
const contractRepo = new PrismaContractRepository()
const noteRepo = new PrismaNoteRepository()
const revenueRepo = new PrismaRevenueRepository()
const expenseRepo = new PrismaExpenseRepository()

const getClientsUseCase = new GetClientsUseCase(clientRepo)
const getContractsUseCase = new GetContractsUseCase(contractRepo)
const getNotesUseCase = new GetNotesUseCase(noteRepo)
const getRevenuesUseCase = new GetRevenuesUseCase(revenueRepo)
const getExpensesUseCase = new GetExpensesUseCase(expenseRepo)

app.get('/bff/dashboard', async (req, res) => {
  try {
    const [clients, contracts, notes, revenues, expenses] = await Promise.all([
      getClientsUseCase.execute(),
      getContractsUseCase.execute(),
      getNotesUseCase.execute(),
      getRevenuesUseCase.execute(),
      getExpensesUseCase.execute()
    ])

    const totalRevenue = revenues.reduce((sum: number, r: any) => sum + Number(r.value), 0)
    const totalExpense = expenses.reduce((sum: number, e: any) => sum + Number(e.value), 0)

    res.json({
      counts: {
        clients: clients.length,
        contracts: contracts.length,
        notes: notes.length,
        revenues: revenues.length,
        expenses: expenses.length
      },
      financial: {
        totalRevenue,
        totalExpense,
        balance: totalRevenue - totalExpense
      },
      recentRevenues: revenues.slice(0, 5),
      recentExpenses: expenses.slice(0, 5)
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/bff/clients/:id/summary', async (req, res) => {
  try {
    const clientId = req.params.id
    const [client, contracts, notes] = await Promise.all([
      getClientsUseCase.execute(clientId),
      getContractsUseCase.execute(undefined, clientId),
      getNotesUseCase.execute(undefined, clientId)
    ])

    res.json({ client, contracts, notes })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.BFF_PORT || 3001
app.listen(PORT, () => {
  console.log(`BFF Server running on port ${PORT}`)
})
