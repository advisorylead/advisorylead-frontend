import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../lib/api'

export default function ContractorLoginPage() {
  const navigate = useNavigate()

  async function handleGoogleSuccess(credentialResponse) {
    try {
      const data = await apiRequest('/auth/google/contractor', {
        method: 'POST',
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      })

      localStorage.setItem('contractorToken', data.token)
      localStorage.setItem('contractorData', JSON.stringify(data.contractor))

      navigate('/contractor/dashboard')
    } catch (err) {
      alert(err.message || 'Google login failed')
    }
  }

  return (
    <div className="contractor-login-page">
      <h1>Contractor login</h1>
      <p>Sign in with the Google account tied to your contractor application.</p>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => alert('Google sign-in failed')}
      />
    </div>
  )
}