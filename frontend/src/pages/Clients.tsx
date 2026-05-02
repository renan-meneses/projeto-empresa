import { useEffect, useState } from 'react'
import { clientsService } from '../services/clients'
import { Client } from '../types'
import Navbar from '../components/Navbar'

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', document: '', address: '' })

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    const res = await clientsService.getAll()
    setClients(res.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await clientsService.create(formData)
    setShowForm(false)
    setFormData({ name: '', email: '', phone: '', document: '', address: '' })
    loadClients()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      await clientsService.delete(id)
      loadClients()
    }
  }

  return (
    <div className="container">
      <Navbar title="Clientes" showBackButton />

      <div className="card">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: 20 }}>
          {showForm ? 'Cancelar' : 'Novo Cliente'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label>Nome</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Documento</label>
              <input value={formData.document} onChange={e => setFormData({...formData, document: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button onClick={() => handleDelete(client.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
