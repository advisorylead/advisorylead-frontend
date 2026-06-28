import { Outlet } from 'react-router-dom'
import Sidebar from '../component/dashboard/Sidebar'
import Topbar from '../component/dashboard/Topbar'

export default function ContractorLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f6f7fb',
        color: '#111827',
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <Topbar />

        <main
          style={{
            flex: 1,
            padding: '24px',
            background: '#f6f7fb',
          }}
        >
          <div
            style={{
              minHeight: 'calc(100vh - 80px)',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}