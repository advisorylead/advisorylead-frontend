import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContractorPage from './pages/ContractorPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ContractorDashboardPage from './pages/ContractorDashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/for-contractors" element={<ContractorPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/portal" element={<ContractorDashboardPage />} />
    </Routes>
  )
}