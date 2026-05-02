import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import bff from '../services/bff'
import { DashboardData } from '../types'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    bff.get('/dashboard').then(res => setData(res.data)).catch(console.error)
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (!data) return <div>Carregando...</div>

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container">
          <h1 style={{ color: 'white', margin: 0 }}>Gestão Empresarial</h1>
          <div>
            <span style={{ color: 'white', marginRight: 20 }}>{user?.name}</span>
            <button onClick={handleLogout} className="btn btn-danger">Sair</button>
          </div>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginBottom: 30 }}>
        <Link to="/clients" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Clientes</h3>
          <p style={{ fontSize: 24 }}>{data.counts.clients}</p>
        </Link>
        <Link to="/contracts" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Contratos</h3>
          <p style={{ fontSize: 24 }}>{data.counts.contracts}</p>
        </Link>
        <Link to="/notes" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Notas</h3>
          <p style={{ fontSize: 24 }}>{data.counts.notes}</p>
        </Link>
        <Link to="/revenues" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Receitas</h3>
          <p style={{ fontSize: 24 }}>{data.counts.revenues}</p>
        </Link>
        <Link to="/expenses" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Gastos</h3>
          <p style={{ fontSize: 24 }}>{data.counts.expenses}</p>
        </Link>
      </div>

      <div className="card">
        <h3>Resumo Financeiro</h3>
        <p>Receitas: R$ {data.financial.totalRevenue.toFixed(2)}</p>
        <p>Gastos: R$ {data.financial.totalExpense.toFixed(2)}</p>
        <p><strong>Saldo: R$ {data.financial.balance.toFixed(2)}</strong></p>
      </div>
    </div>
  )
}
