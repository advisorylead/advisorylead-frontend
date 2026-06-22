import { Link } from 'react-router-dom'

export default function MarketingLayout({ children }) {
  return (
    <div className="page-shell">
      <nav className="nav">
        <Link to="/" className="brand">Advisory<span>Lead</span></Link>
        <div className="nav-links">
          <Link to="/">For Homeowners</Link>
          <Link to="/for-contractors">For Contractors</Link>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link className="btn btn-secondary" to="/admin/login">Admin</Link>
          <Link className="btn btn-primary" to="/for-contractors">Grow Your Business</Link>
        </div>
      </nav>
      {children}
    </div>
  )
}