import MarketingLayout from '../layouts/MarketingLayout'

export default function HomePage() {
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
            <div className="form-strip">
              <div className="field">
                <label>Service</label>
                <select><option>HVAC</option><option>Roofing</option><option>Plumbing</option></select>
              </div>
              <div className="field">
                <label>Zip code</label>
                <input placeholder="33068" />
              </div>
              <div className="field">
                <label>Preferred date</label>
                <input placeholder="MM/DD/YYYY" />
              </div>
              <button className="btn btn-primary">Get matched fast</button>
            </div>
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

      <section className="section" id="how-it-works">
        <h2 className="section-title">How AdvisoryLead works</h2>
        <div className="grid-3">
          <div className="card feature-card"><h3>1. Capture</h3><p className="muted">Lead forms collect project details and save them into your backend.</p></div>
          <div className="card feature-card"><h3>2. Match</h3><p className="muted">Approved contractors get matched by service area, service type, and availability.</p></div>
          <div className="card feature-card"><h3>3. Book</h3><p className="muted">Bookings and confirmations run through one system.</p></div>
        </div>
      </section>

      <footer className="card footer">
        <div>
          <div className="brand">Advisory<span>Lead</span></div>
          <p className="muted">A modern lead-to-booking marketplace for home services.</p>
        </div>
        <button className="btn btn-primary">Book in 5 Minutes</button>
      </footer>
    </MarketingLayout>
  )
}