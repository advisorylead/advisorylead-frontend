// src/components/ContractorProtectedRoute.jsx
import { Navigate } from 'react-router-dom'

export default function ContractorProtectedRoute({ children }) {
  const token = localStorage.getItem('contractorToken')

  if (!token) {
    return <Navigate to="/contractor/login" replace />
  }

  return children
}