import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'

export default function ContractorDashboardPage() {
  const [contractor, setContractor] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem('contractorToken')

        const data = await apiRequest('/contractor-dashboard/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setContractor(data.contractor)
      } catch (err) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p>{error}</p>
  if (!contractor) return <p>No contractor data found.</p>

  return (
    <div>
      <h1>{contractor.company_name}</h1>
      <p>Status: {contractor.onboarding_status}</p>
      <p>Email: {contractor.email}</p>
      <p>Contact: {contractor.contact_name}</p>
    </div>
  )
}