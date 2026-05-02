import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Contracts from './pages/Contracts'
import Notes from './pages/Notes'
import Revenues from './pages/Revenues'
import Expenses from './pages/Expenses'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/clients" element={isAuthenticated ? <Clients /> : <Navigate to="/login" />} />
      <Route path="/contracts" element={isAuthenticated ? <Contracts /> : <Navigate to="/login" />} />
      <Route path="/notes" element={isAuthenticated ? <Notes /> : <Navigate to="/login" />} />
      <Route path="/revenues" element={isAuthenticated ? <Revenues /> : <Navigate to="/login" />} />
      <Route path="/expenses" element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default App
