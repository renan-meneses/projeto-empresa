import { useEffect, useState } from 'react'
import { contractsService } from '../services/contracts'
import { clientsService } from '../services/clients'
import { Contract, Client } from '../types'
import Navbar from '../components/Navbar'

export default function Contracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ clientId: '', title: '', value: '', startDate: '', endDate: '' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [contractsRes, clientsRes] = await Promise.all([
      contractsService.getAll(),
      clientsService.getAll()
    ])
    setContracts(contractsRes.data)
    setClients(clientsRes.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await contractsService.create({
      ...formData,
      value: parseFloat(formData.value),
      startDate: formData.startDate,
      endDate: formData.endDate || undefined
    })
    setShowForm(false)
    setFormData({ clientId: '', title: '', value: '', startDate: '', endDate: '' })
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Confirmar exclusão?')) {
      await contractsService.delete(id)
      loadData()
    }
  }

  return (
    <div className="container">
      <Navbar title="Contratos" showBackButton />

      <div className="card">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success" style={{ marginBottom: 20 }}>
          {showForm ? 'Cancelar' : 'Novo Contrato'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <div className="form-group">
              <label>Cliente</label>
              <select value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})} required>
                <option value="">Selecione...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Título</label>
              <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Valor</label>
              <input type="number" step="0.01" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Data Início</label>
              <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Data Fim</label>
              <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </form>
        )}

        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.title}</td>
                <td>{clients.find(c => c.id === contract.clientId)?.name}</td>
                <td>R$ {contract.value.toFixed(2)}</td>
                <td>{contract.status}</td>
                <td>
                  <button onClick={() => handleDelete(contract.id)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
