export default function AdminDashboardPage() {
  function handleLogout() {
    localStorage.removeItem('adminToken')
    window.location.href = '/admin/login'
  }

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

          <section className="admin-stats">
            <article className="panel stat-panel">
              <p>Total jobs</p>
              <h2>0</h2>
              <span>Homeowner requests received</span>
            </article>

            <article className="panel stat-panel">
              <p>Contractors</p>
              <h2>0</h2>
              <span>Available in network</span>
            </article>

            <article className="panel stat-panel">
              <p>Bookings</p>
              <h2>0</h2>
              <span>Confirmed jobs tracked</span>
            </article>
          </section>

          <section className="admin-grid">
            <article className="panel panel-large">
              <p className="panel-label">Recent activity</p>
              <h3>Recent jobs</h3>
              <p className="panel-copy">
                No jobs yet. New homeowner form submissions will appear here.
              </p>
            </article>

            <article className="panel">
              <p className="panel-label">Network</p>
              <h3>Contractors</h3>
              <p className="panel-copy">No contractors loaded yet.</p>
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