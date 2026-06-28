import { Outlet } from 'react-router-dom'
import Sidebar from '../component/dashboard/Sidebar'
import Topbar from '../component/dashboard/Topbar'

export default function ContractorLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f6f7fb' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <main style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}