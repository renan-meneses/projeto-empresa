import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

interface ValidationError {
  path: string[]
  message: string
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    try {
      await login(email, password)
    } catch (err: any) {
      const data = err.response?.data
      if (data?.error && Array.isArray(data.error)) {
        setErrors(data.error.map((e: ValidationError) => e.message))
      } else {
        setErrors([data?.error || 'Erro ao fazer login'])
      }
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <button
          onClick={toggleTheme}
          className="btn"
          style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 20 }}>Login</h2>
        {errors.length > 0 && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errors.map((err, i) => <div key={i}>{err}</div>)}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
