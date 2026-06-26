import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../lib/api'

const homeownerServices = [
  'HVAC',
  'Roofing',
  'Plumbing',
  'Electrical',
  'General Repair',
]

const trustItems = [
  'Vetted local contractors',
  'Fast response and scheduling',
  'Clear homeowner booking flow',
]

const howItWorks = [
  {
    step: '01',
    title: 'Tell us what you need',
    copy: 'Choose your service, enter your zip code, and tell us when you want the work done.',
  },
  {
    step: '02',
    title: 'Get matched quickly',
    copy: 'We route your request to approved local contractors who are ready to take the job.',
  },
  {
    step: '03',
    title: 'Book with confidence',
    copy: 'Review the match, confirm details, and move forward with a clean booking experience.',
  },
]

const serviceCards = [
  { title: 'HVAC', copy: 'Repairs, tune-ups, replacements, and urgent cooling or heating needs.' },
  { title: 'Roofing', copy: 'Leaks, inspections, storm damage, and full roof replacement requests.' },
  { title: 'Plumbing', copy: 'Clogs, leaks, water heaters, fixture installs, and emergency plumbing work.' },
  { title: 'Electrical', copy: 'Panels, rewiring, lighting, troubleshooting, and installation projects.' },
]

export default function HomePage() {
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: 'HVAC',
    job_type: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    preferred_date: '',
    preferred_time: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [job, setJob] = useState(null)
  const [matches, setMatches] = useState([])
  const [selectedContractor, setSelectedContractor] = useState(null)

  const hasMatches = useMemo(() => matches.length > 0, [matches])

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleMatchSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setMatches([])
    setSelectedContractor(null)

    try {
      const created = await apiRequest('/jobs', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      setJob(created.job)

      const matched = await apiRequest(`/jobs/${created.job.id}/match`, {
        method: 'POST',
      })

      setMatches(matched.contractors || [])
    } catch (err) {
      setError(err.message || 'Something went wrong while matching your request.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSelectContractor(contractor) {
    if (!job?.id) return

    setIsLoading(true)
    setError('')

    try {
      const selected = await apiRequest(`/jobs/${job.id}/select-contractor`, {
        method: 'POST',
        body: JSON.stringify({ contractor_id: contractor.id }),
      })

      setSelectedContractor(selected.contractor)
    } catch (err) {
      setError(err.message || 'Failed to select contractor.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="marketing-page">
      <header className="site-header">
        <div className="site-nav">
          <Link to="/" className="site-logo">
            Advisory<span>Lead</span>
          </Link>

          <nav className="site-links">
            <a href="#services">Services</a>
            <a href="#how-it-works">How it works</a>
            <a href="#trust">Why homeowners choose us</a>
            <Link to="/contractors">For contractors</Link>
          </nav>

          <div className="site-actions">
            <Link to="/admin/login" className="site-secondary-btn">
              Admin
            </Link>
            <Link to="/contractors" className="site-primary-btn site-primary-btn--dark">
              Work with us
            </Link>
          </div>
        </div>
      </header>

      <main className="landing-shell">
        <section className="hero-grid">
          <div className="hero-copy-card">
            <span className="hero-kicker">For homeowners</span>
            <h1>Get matched in less than 3 minutes.</h1>
            <p className="hero-copy">
              AdvisoryLead helps homeowners request service, get routed to vetted local contractors,
              and move from inquiry to booking with a faster, cleaner experience.
            </p>

            <div className="hero-trust-row">
              {trustItems.map((item) => (
                <span key={item} className="hero-trust-pill">
                  {item}
                </span>
              ))}
            </div>

            <form className="hero-form" onSubmit={handleMatchSubmit}>
              <div className="hero-form-grid">
                <label className="hero-field">
                  <span>Service needed</span>
                  <select name="service_type" value={form.service_type} onChange={updateField}>
                    {homeownerServices.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="hero-field">
                  <span>Zip code</span>
                  <input
                    name="zip_code"
                    type="text"
                    placeholder="Enter zip code"
                    value={form.zip_code}
                    onChange={updateField}
                  />
                </label>

                <label className="hero-field">
                  <span>Preferred date</span>
                  <input
                    name="preferred_date"
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={form.preferred_date}
                    onChange={updateField}
                  />
                </label>
              </div>

              <div className="hero-form-grid hero-form-grid--details">
                <label className="hero-field hero-field--full">
                  <span>Describe the job</span>
                  <textarea
                    name="description"
                    placeholder="Tell us what is going on, what kind of help you need, and anything urgent."
                    value={form.description}
                    onChange={updateField}
                    rows={4}
                  />
                </label>
              </div>

              <div className="hero-form-actions">
                <button type="submit" className="site-primary-btn" disabled={isLoading}>
                  {isLoading ? 'Matching...' : 'Get matched now'}
                </button>
                <p>No long forms. Start your request and book faster with a streamlined flow.</p>
              </div>

              {error ? <p className="hero-status hero-status--error">{error}</p> : null}
            </form>

            {hasMatches ? (
              <section className="match-results">
                <div className="match-results-heading">
                  <span className="section-kicker">Top matches</span>
                  <h3>Choose a contractor to continue to booking.</h3>
                </div>

                <div className="match-results-grid">
                  {matches.map((contractor) => (
                    <article key={contractor.id} className="glass-card match-card">
                      <h4>{contractor.company_name || contractor.contact_name}</h4>
                      <p>{contractor.contact_name || 'Approved local contractor'}</p>
                      <p>{contractor.email}</p>
                      <p>{contractor.phone}</p>
                      <button
                        type="button"
                        className="site-primary-btn"
                        onClick={() => handleSelectContractor(contractor)}
                        disabled={isLoading}
                      >
                        Select contractor
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {selectedContractor ? (
              <section className="booking-panel glass-card">
                <span className="section-kicker">Booking</span>
                <h3>{selectedContractor.company_name || selectedContractor.contact_name}</h3>
                <p>Use the booking link below to choose an available appointment.</p>

                {selectedContractor.cal_booking_url ? (
                  <a
                    href={selectedContractor.cal_booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-primary-btn"
                  >
                    Open booking calendar
                  </a>
                ) : (
                  <p className="hero-status hero-status--error">
                    No Cal.com booking URL is set for this contractor yet.
                  </p>
                )}
              </section>
            ) : null}
          </div>

          <aside className="hero-visual-panel">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />

            <div className="hero-float-card hero-float-card-top">
              <span className="mini-label">Live routing</span>
              <strong>Request sent to available pros</strong>
              <p>Smart intake and faster lead distribution.</p>
            </div>

            <div className="hero-device">
              <div className="hero-device-header">
                <span className="hero-device-dot" />
                <span className="hero-device-dot" />
                <span className="hero-device-dot" />
              </div>

              <div className="hero-device-body">
                <div className="hero-device-badge">New homeowner request</div>
                <h3>Booking pipeline overview</h3>
                <div className="hero-chart-row">
                  <div className="hero-chart-card hero-chart-card--dark">
                    <span>Speed to match</span>
                    <strong>2m 41s</strong>
                  </div>
                  <div className="hero-chart-card">
                    <span>Available contractors</span>
                    <strong>{hasMatches ? matches.length : 14} nearby</strong>
                  </div>
                </div>

                <div className="hero-visual-rings">
                  <div className="hero-ring hero-ring-lg" />
                  <div className="hero-ring hero-ring-md" />
                  <div className="hero-ring hero-ring-sm" />
                </div>
              </div>
            </div>

            <div className="hero-float-card hero-float-card-bottom">
              <span className="mini-label">Homeowner experience</span>
              <strong>Cleaner path from request to booked job</strong>
              <p>Designed to reduce friction, speed up matching, and improve booking confidence.</p>
            </div>
          </aside>
        </section>

        <section className="service-section" id="services">
          <div className="section-heading">
            <span className="section-kicker">Popular categories</span>
            <h2>Choose the service you need and move quickly.</h2>
          </div>

          <div className="service-grid">
            {serviceCards.map((card) => (
              <article key={card.title} className="glass-card service-card">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section" id="how-it-works">
          <div className="section-heading">
            <span className="section-kicker">How it works</span>
            <h2>From service request to booked appointment.</h2>
          </div>

          <div className="steps-grid">
            {howItWorks.map((item) => (
              <article key={item.step} className="glass-card step-card">
                <span className="step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner" id="trust">
          <div>
            <span className="section-kicker">Built for trust</span>
            <h2>Homeowners get speed, clarity, and vetted local options.</h2>
            <p>
              We make it easier to request service, route leads intelligently, and create a booking
              experience that feels fast and polished.
            </p>
          </div>

          <div className="cta-banner-actions">
            <button type="button" className="site-primary-btn">
              Get matched now
            </button>
            <Link to="/contractors" className="site-secondary-btn">
              Work with us
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}