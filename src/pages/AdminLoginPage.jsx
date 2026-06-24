import { useState } from 'react'
import { apiRequest } from '../lib/api'
import { Link } from 'react-router-dom'


export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'aliarif2811@gmail.com', password: 'Ar!FAl!1932!@' }),
      })

      if (data?.token) {
        localStorage.setItem('adminToken', data.token)
        window.location.href = '/admin/dashboard'
        return
      }

      setError('Invalid login response.')
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-shell">
        <section className="admin-login-brand-panel">
          <div className="admin-login-brand-wrap">
            <p className="admin-login-kicker">Admin portal</p>
            <h1>Manage jobs, contractors, and bookings in one place.</h1>
            <p className="admin-login-lead">
              AdvisoryLead operations stays organized with a faster dashboard, cleaner visibility,
              and one place to track incoming activity.
            </p>

            

            <div className="admin-login-feature-list">
              <div className="admin-login-feature">
                <span />
                <p>Track homeowner leads the moment they come in</p>
              </div>
              <div className="admin-login-feature">
                <span />
                <p>See contractor network and booking activity quickly</p>
              </div>
              <div className="admin-login-feature">
                <span />
                <p>Keep admin work focused inside one clean workspace</p>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-login-form-panel">
          <div className="admin-login-card">
            <div className="admin-login-topline">
              <Link to="/" className="admin-back-home">
                ← Back to home
              </Link>
            </div>

            <Link to="/" className="admin-login-logo">
              Advisory<span>Lead</span>
            </Link>
            <p className="admin-login-card-kicker">Secure sign in</p>
            <h2>Welcome back</h2>
            <p className="admin-login-copy">
              Use your admin credentials to access the operations dashboard.
            </p>

            <form onSubmit={handleSubmit} className="admin-login-form">
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </label>

              {error ? <p className="admin-login-error">{error}</p> : null}

              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Log in'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}