export default function Topbar() {
  return (
    <header
      style={{
        height: '72px',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '20px' }}>Contractor Dashboard</h2>
      <div style={{ fontSize: '14px', color: '#6b7280' }}>Logged in contractor</div>
    </header>
  )
}