import { useEffect, useState } from 'react'
import { expensesService } from '../services/expenses'
import { Expense } from '../types'
import Navbar from '../components/Navbar'

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ description: '', value: '', date: '', category: '', supplier: '' })

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    const res = await expensesService.getAll()
    setExpenses(res.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await expensesService.create({
      ...formData,
      value: parseFloat(formData.value),
      date: formData.date
    })
    setShowForm(false)
    setFormData({ description: '', value: '', date: '', category: '', supplier: '' })
    loadExpenses()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      await expensesService.delete(id)
      loadExpenses()
    }
  }

  return (
    <div className="container">
      <Navbar title="Gastos" showBackButton />

      <div className="card">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: 20 }}>
          {showForm ? 'Cancelar' : 'Novo Gasto'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label>Descrição</label>
              <input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Valor</label>
              <input type="number" step="0.01" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Fornecedor</label>
              <input value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Fornecedor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>R$ {expense.value.toFixed(2)}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.supplier}</td>
                <td>
                  <button onClick={() => handleDelete(expense.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
