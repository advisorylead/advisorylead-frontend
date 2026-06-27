import { NavLink } from 'react-router-dom'

const links = [
  { to: '/contractor', label: 'Overview', end: true },
  { to: '/contractor/profile', label: 'Profile' },
  { to: '/contractor/services', label: 'Services' },
  { to: '/contractor/coverage', label: 'Coverage' },
  { to: '/contractor/availability', label: 'Availability' },
  { to: '/contractor/jobs', label: 'Incoming Jobs' },
  { to: '/contractor/bookings', label: 'Bookings' },
  { to: '/contractor/payouts', label: 'Payouts' },
  { to: '/contractor/settings', label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '240px',
        background: '#111827',
        color: '#fff',
        padding: '24px 16px',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>
        AdvisoryLead
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 12px',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              background: isActive ? '#2563eb' : 'transparent',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}