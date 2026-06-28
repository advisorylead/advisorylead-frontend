import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'

export default function AdminDashboardPage() {
  const [contractors, setContractors] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoadingId, setActionLoadingId] = useState('')
  const [error, setError] = useState('')

  function handleLogout() {
    localStorage.removeItem('adminToken')
    window.location.href = '/admin/login'
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await apiRequest('/contractors')
        setContractors(data.contractors || [])
      } catch (err) {
        setError(err.message || 'Failed to load contractors')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  async function handleApprove(contractorId) {
    setError('')
    setActionLoadingId(contractorId)

    try {
      const data = await apiRequest(`/contractors/${contractorId}/approve`, {
        method: 'PATCH',
      })

      setContractors((prev) =>
        prev.map((contractor) =>
          contractor.id === contractorId ? data.contractor : contractor
        )
      )
    } catch (err) {
      setError(err.message || 'Failed to approve contractor')
    } finally {
      setActionLoadingId('')
    }
  }

  async function handleReject(contractorId) {
    setError('')
    setActionLoadingId(contractorId)

    try {
      const data = await apiRequest(`/contractors/${contractorId}/reject`, {
        method: 'PATCH',
      })

      setContractors((prev) =>
        prev.map((contractor) =>
          contractor.id === contractorId ? data.contractor : contractor
        )
      )
    } catch (err) {
      setError(err.message || 'Failed to reject contractor')
    } finally {
      setActionLoadingId('')
    }
  }

  const pendingContractors = contractors.filter(
    (contractor) => contractor.onboarding_status === 'pending'
  )

  return (
    <div className="admin-dashboard-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            Advisory<span>Lead</span>
          </div>

          <div className="admin-sidebar-label">Operations</div>

          <nav className="admin-nav">
            <a className="is-active" href="#overview">Overview</a>
            <a href="#jobs">Jobs</a>
            <a href="#contractors">Contractors</a>
            <a href="#bookings">Bookings</a>
          </nav>

          <button className="admin-logout" onClick={handleLogout}>
            Log out
          </button>
        </aside>

        <main className="admin-main">
          <div className="admin-topbar">
            <div>
              <p className="admin-eyebrow">Admin dashboard</p>
              <h1>Platform overview</h1>
            </div>

            <div className="admin-status-pill">Live backend connected</div>
          </div>

          {error ? <p className="admin-login-error">{error}</p> : null}

          <section className="admin-stats">
            <article className="panel stat-panel">
              <p>Total jobs</p>
              <h2>0</h2>
              <span>Homeowner requests received</span>
            </article>

            <article className="panel stat-panel">
              <p>Contractors</p>
              <h2>{contractors.length}</h2>
              <span>Available in network</span>
            </article>

            <article className="panel stat-panel">
              <p>Pending applications</p>
              <h2>{pendingContractors.length}</h2>
              <span>Awaiting review</span>
            </article>
          </section>

          <section className="admin-grid">
            <article className="panel panel-large" id="contractors">
              <p className="panel-label">Recent activity</p>
              <h3>Contractor applications</h3>

              {loading ? (
                <p className="panel-copy">Loading contractors...</p>
              ) : contractors.length === 0 ? (
                <p className="panel-copy">No contractors loaded yet.</p>
              ) : (
                <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
                  {contractors.map((contractor) => (
                    <div
                      key={contractor.id}
                      style={{
                        padding: '16px',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        borderRadius: '12px',
                        background: '#fff',
                      }}
                    >
                      <strong>{contractor.company_name}</strong>

                      <p style={{ margin: '6px 0' }}>
                        {contractor.contact_name || 'No contact'} • {contractor.email || 'No email'}
                      </p>

                      <p style={{ margin: '6px 0' }}>
                        Status: {contractor.onboarding_status || 'pending'} • Approved:{' '}
                        {contractor.is_approved ? 'Yes' : 'No'}
                      </p>

                      <p style={{ margin: '6px 0 0' }}>
                        {contractor.notes || 'No notes provided'}
                      </p>

                      {contractor.onboarding_status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                          <button
                            type="button"
                            onClick={() => handleApprove(contractor.id)}
                            disabled={actionLoadingId === contractor.id}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: 'none',
                              background: '#16a34a',
                              color: '#fff',
                              cursor: 'pointer',
                              opacity: actionLoadingId === contractor.id ? 0.7 : 1,
                            }}
                          >
                            {actionLoadingId === contractor.id ? 'Saving...' : 'Approve'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReject(contractor.id)}
                            disabled={actionLoadingId === contractor.id}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: 'none',
                              background: '#dc2626',
                              color: '#fff',
                              cursor: 'pointer',
                              opacity: actionLoadingId === contractor.id ? 0.7 : 1,
                            }}
                          >
                            {actionLoadingId === contractor.id ? 'Saving...' : 'Reject'}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="panel">
              <p className="panel-label">Network</p>
              <h3>Pending contractors</h3>
              <p className="panel-copy">
                {pendingContractors.length > 0
                  ? `${pendingContractors.length} contractor application(s) awaiting review.`
                  : 'No pending contractor applications.'}
              </p>
            </article>

            <article className="panel">
              <p className="panel-label">Scheduling</p>
              <h3>Bookings</h3>
              <p className="panel-copy">No bookings yet.</p>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}