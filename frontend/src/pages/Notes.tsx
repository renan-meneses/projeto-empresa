import { useEffect, useState } from 'react'
import { notesService } from '../services/notes'
import { clientsService } from '../services/clients'
import { Note, Client } from '../types'
import { Link } from 'react-router-dom'

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    clientId: '',
    type: 'invoice',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    taxes: [{ type: 'ISS', rate: 5, value: 0 }],
    totalValue: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [notesRes, clientsRes] = await Promise.all([
      notesService.getAll(),
      clientsService.getAll()
    ])
    setNotes(notesRes.data)
    setClients(clientsRes.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const totalValue = formData.items.reduce((sum, item) => sum + item.total, 0)
    await notesService.create({ ...formData, totalValue })
    setShowForm(false)
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      await notesService.delete(id)
      loadData()
    }
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container">
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            <h1 style={{ margin: 0 }}>Notas</h1>
          </Link>
          <Link to="/dashboard" className="btn btn-primary">Voltar</Link>
        </div>
      </nav>

      <div className="card">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: 20 }}>
          {showForm ? 'Cancelar' : 'Nova Nota'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label>Cliente</label>
              <select value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})}>
                <option value="">Selecione...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="invoice">Fatura</option>
                <option value="receipt">Recibo</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Gerar Nota</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Valor Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note.id}>
                <td>{note.number}</td>
                <td>{clients.find(c => c.id === note.clientId)?.name}</td>
                <td>{note.type}</td>
                <td>R$ {note.totalValue.toFixed(2)}</td>
                <td>{note.status}</td>
                <td>
                  <button onClick={() => handleDelete(note.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
