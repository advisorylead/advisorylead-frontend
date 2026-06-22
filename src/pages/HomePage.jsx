import { useState } from 'react'
import MarketingLayout from '../layouts/MarketingLayout'
import { apiRequest } from '../lib/api'


export default function HomePage() {
  const [service, setService] = useState('HVAC')
  const [zip, setZip] = useState('33068')
  const [date, setDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setSubmitting(true)

    try {
      await apiRequest('/jobs', {
        method: 'POST',
        body: JSON.stringify({
          customer_name: 'Website lead',
          customer_email: 'lead@advisorylead.com',
          customer_phone: '0000000000',
          service_type: service.toLowerCase(),
          job_description: `Online request for ${service}`,
          address_line1: '',
          city: '',
          state: '',
          zip_code: zip,
          preferred_date: date || null,
          preferred_time_window: null,
          source: 'website',
        }),
      })
      setMessage('Request sent. We’ll match you to a contractor shortly.')
      setDate('')
    } catch (err) {
      setMessage('Could not send request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MarketingLayout>
      <section className="hero">
        <div className="card hero-copy">
          <div>
            <span className="eyebrow">Homeowners</span>
            <h1>Book vetted contractors in less than 5 minutes.</h1>
            <p>
              AdvisoryLead connects homeowners with approved local contractors, captures leads, routes requests,
              and keeps the booking process moving fast.
            </p>
            <form className="form-strip" onSubmit={handleSubmit}>
              <div className="field">
                <label>Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  <option>HVAC</option>
                  <option>Roofing</option>
                  <option>Plumbing</option>
                </select>
              </div>
              <div className="field">
                <label>Zip code</label>
                <input value={zip} onChange={(e) => setZip(e.target.value)} />
              </div>
              <div className="field">
                <label>Preferred date</label>
                <input
                  placeholder="MM/DD/YYYY"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Get matched fast'}
              </button>
            </form>
            {message && <p style={{ marginTop: 12 }}>{message}</p>}
          </div>
          <div className="dashboard-mini">
            <div className="card stat-card"><h3>5 min</h3><p>Average booking speed</p></div>
            <div className="card stat-card"><h3>94%</h3><p>Lead response rate</p></div>
            <div className="card stat-card"><h3>1 hub</h3><p>Ops from lead to invoice</p></div>
          </div>
        </div>
        <div className="card hero-visual">
          <div className="house-visual" />
          <div className="panel card" style={{ padding: 20 }}>
            <span className="badge">Live booking flow</span>
            <h3>From request to booked job</h3>
            <p className="muted">Customer lead capture, contractor matching, booking confirmation, and admin visibility in one pipeline.</p>
          </div>
        </div>
      </section>

      {/* keep the rest of the sections as you have them */}
    </MarketingLayout>
  )
}