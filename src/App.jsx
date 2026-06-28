import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContractorsPage from './pages/ContractorsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ContractorLayout from './layouts/ContractorLayout'
import ContractorLoginPage from './pages/ContractorLoginPage'
import ContractorDashboardPage from './pages/ContractorDashboardPage'
import './styles.css'

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('adminToken')
  return token ? children : <Navigate to="/admin/login" replace />
}

function ProtectedContractorRoute({ children }) {
  const token = localStorage.getItem('contractorToken')
  return token ? children : <Navigate to="/contractor/login" replace />
}

function PlaceholderPage({ title }) {
  return <div>{title}</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/contractor/login" element={<ContractorLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/contractor"
          element={
            <ProtectedContractorRoute>
              <ContractorLayout />
            </ProtectedContractorRoute>
          }
        >
          <Route index element={<ContractorDashboardPage />} />
          <Route path="profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="services" element={<PlaceholderPage title="Services" />} />
          <Route path="coverage" element={<PlaceholderPage title="Coverage" />} />
          <Route path="availability" element={<PlaceholderPage title="Availability" />} />
          <Route path="jobs" element={<PlaceholderPage title="Incoming Jobs" />} />
          <Route path="bookings" element={<PlaceholderPage title="Bookings" />} />
          <Route path="payouts" element={<PlaceholderPage title="Payouts" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}