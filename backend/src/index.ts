import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './presentation/routes/authRoutes'
import clientRoutes from './presentation/routes/clientRoutes'
import contractRoutes from './presentation/routes/contractRoutes'
import noteRoutes from './presentation/routes/noteRoutes'
import revenueRoutes from './presentation/routes/revenueRoutes'
import expenseRoutes from './presentation/routes/expenseRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/contracts', contractRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/revenues', revenueRoutes)
app.use('/api/expenses', expenseRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`)
})
