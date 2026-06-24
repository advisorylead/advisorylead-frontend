import { Link } from 'react-router-dom'
import { useState } from 'react'

const trades = ['HVAC', 'Roofing', 'Plumbing', 'Electrical', 'General Repair', 'Other']

const perks = [
  'Consistent homeowner lead flow',
  'Cleaner booking pipeline and visibility',
  'Faster response handling and intake',
  'Professional onboarding experience',
]

export default function ContractorsPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="marketing-page contractors-page">
      <header className="site-header">
        <div className="site-nav">
          <Link to="/" className="site-logo">
            Advisory<span>Lead</span>
          </Link>

          <nav className="site-links">
            <a href="#benefits">Benefits</a>
            <a href="#apply">Apply</a>
            <a href="#process">How it works</a>
          </nav>
        </div>
      </header>

      <main className="landing-shell">
        <section className="contractor-hero">
          <div className="contractor-copy">
            <span className="hero-kicker">For contractors</span>
            <h1>Work with us and grow with better lead flow.</h1>
            <p className="hero-copy">
              Join AdvisoryLead to receive homeowner requests, improve follow-up speed, and take part
              in a more structured booking experience.
            </p>

            <div className="contractor-perk-list" id="benefits">
              {perks.map((perk) => (
                <div key={perk} className="contractor-perk-item">
                  <span />
                  <p>{perk}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="contractor-form-card" id="apply">
            {!submitted ? (
              <>
                <span className="section-kicker">Contractor application</span>
                <h2>Tell us about your business.</h2>
                <p>
                  Fill out this short form and we’ll review your service area, trade, and company details.
                </p>

                <form className="contractor-form" onSubmit={handleSubmit}>
                  <div className="contractor-form-grid">
                    <label className="hero-field">
                      <span>Full name</span>
                      <input type="text" placeholder="Your name" required />
                    </label>

                    <label className="hero-field">
                      <span>Company name</span>
                      <input type="text" placeholder="Business name" required />
                    </label>

                    <label className="hero-field">
                      <span>Email</span>
                      <input type="email" placeholder="name@company.com" required />
                    </label>

                    <label className="hero-field">
                      <span>Phone</span>
                      <input type="text" placeholder="(555) 555-5555" required />
                    </label>

                    <label className="hero-field">
                      <span>Primary trade</span>
                      <select defaultValue="HVAC">
                        {trades.map((trade) => (
                          <option key={trade}>{trade}</option>
                        ))}
                      </select>
                    </label>

                    <label className="hero-field">
                      <span>Service area</span>
                      <input type="text" placeholder="City, county, or zip codes" required />
                    </label>
                  </div>

                  <label className="hero-field">
                    <span>Tell us about your business</span>
                    <textarea
                      rows="5"
                      placeholder="Years in business, licenses, insurance, specialties, and availability"
                    />
                  </label>

                  <button type="submit" className="site-primary-btn contractor-submit">
                    Apply now
                  </button>
                </form>
              </>
            ) : (
              <div className="form-success-card">
                <span className="section-kicker">Application received</span>
                <h2>Thanks for your interest.</h2>
                <p>
                  Your contractor application has been captured in the frontend flow. Next, we can wire
                  this form to a backend endpoint and save submissions for admin review.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="story-section" id="process">
          <div className="section-heading">
            <span className="section-kicker">Process</span>
            <h2>Simple onboarding for approved contractors.</h2>
          </div>

          <div className="steps-grid">
            <article className="glass-card step-card">
              <span className="step-number">01</span>
              <h3>Apply with your business details</h3>
              <p>Share your trade, service area, contact info, and a short company overview.</p>
            </article>

            <article className="glass-card step-card">
              <span className="step-number">02</span>
              <h3>Get reviewed for fit</h3>
              <p>We evaluate alignment, service coverage, and readiness for homeowner requests.</p>
            </article>

            <article className="glass-card step-card">
              <span className="step-number">03</span>
              <h3>Start receiving opportunities</h3>
              <p>Once approved, you can enter a cleaner lead and booking workflow.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}