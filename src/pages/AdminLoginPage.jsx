import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      localStorage.setItem('adminToken', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Login failed. Check email/password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-shell">
      <div className="card login-card">
        <div className="brand">Advisory<span>Lead</span></div>
        <h1>Admin login</h1>
        <p className="muted">Secure access to jobs, bookings, contractors, and platform operations.</p>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          {error ? <p style={{ color: '#c0392b' }}>{error}</p> : null}
        </form>
      </div>
    </div>
  )
}