import { Outlet } from 'react-router-dom'

export default function ContractorLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f6f7fb',
        padding: '40px',
        color: '#111827',
      }}
    >
      <h1>Contractor Layout Test</h1>
      <Outlet />
    </div>
  )
}