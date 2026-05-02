import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

interface NavbarProps {
  title: string
  showBackButton?: boolean
  showUserInfo?: boolean
}

export default function Navbar({ title, showBackButton, showUserInfo }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {showBackButton && (
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
              <h1 style={{ margin: 0 }}>{title}</h1>
            </Link>
          )}
          {!showBackButton && (
            <h1 style={{ color: 'white', margin: 0 }}>{title}</h1>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <button
            onClick={toggleTheme}
            className="btn"
            style={{ background: 'transparent', border: '1px solid white', color: 'white' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {showUserInfo && (
            <>
              <span style={{ color: 'white' }}>{user?.name}</span>
              <button onClick={logout} className="btn btn-danger">Sair</button>
            </>
          )}
          {showBackButton && (
            <Link to="/dashboard" className="btn btn-primary">Voltar</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
