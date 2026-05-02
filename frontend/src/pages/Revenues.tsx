import { useEffect, useState } from 'react'
import { revenuesService } from '../services/revenues'
import { clientsService } from '../services/clients'
import { Revenue, Client } from '../types'
import Navbar from '../components/Navbar'

export default function Revenues() {
  const [revenues, setRevenues] = useState<Revenue[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ description: '', value: '', date: '', clientId: '', category: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [revenuesRes, clientsRes] = await Promise.all([
      revenuesService.getAll(),
      clientsService.getAll()
    ])
    setRevenues(revenuesRes.data)
    setClients(clientsRes.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await revenuesService.create({
      ...formData,
      value: parseFloat(formData.value),
      date: formData.date
    })
    setShowForm(false)
    setFormData({ description: '', value: '', date: '', clientId: '', category: '' })
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      await revenuesService.delete(id)
      loadData()
    }
  }

  return (
    <div className="container">
      <Navbar title="Receitas" showBackButton />

      <div className="card">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: 20 }}>
          {showForm ? 'Cancelar' : 'Nova Receita'}
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
              <label>Cliente</label>
              <select value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})}>
                <option value="">Selecione...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map(revenue => (
              <tr key={revenue.id}>
                <td>{revenue.description}</td>
                <td>R$ {revenue.value.toFixed(2)}</td>
                <td>{new Date(revenue.date).toLocaleDateString()}</td>
                <td>{revenue.category}</td>
                <td>
                  <button onClick={() => handleDelete(revenue.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
