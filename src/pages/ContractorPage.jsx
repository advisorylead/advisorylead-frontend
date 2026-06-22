import MarketingLayout from '../layouts/MarketingLayout'

export default function ContractorPage() {
  return (
    <MarketingLayout>
      <section className="hero">
        <div className="card hero-copy">
          <div>
            <span className="eyebrow">For contractors</span>
            <h1>Run your service business from one command center.</h1>
            <p>
              Manage leads, bookings, invoicing, and future payouts through a contractor-focused operating system
              built for real home service businesses.
            </p>
            <div className="form-strip">
              <div className="field"><label>Company</label><input placeholder="Broward HVAC Experts" /></div>
              <div className="field"><label>Primary trade</label><select><option>HVAC</option><option>Roofing</option><option>Plumbing</option></select></div>
              <div className="field"><label>Service area</label><input placeholder="South Florida" /></div>
              <button className="btn btn-primary">Apply as contractor</button>
            </div>
          </div>
          <div className="dashboard-mini">
            <div className="card stat-card"><h3>10+</h3><p>Active projects</p></div>
            <div className="card stat-card"><h3>800+</h3><p>Hours booked</p></div>
            <div className="card stat-card"><h3>$5k</h3><p>Sample invoice total</p></div>
          </div>
        </div>
        <div className="card hero-visual">
          <div className="panel card"><h3>Dashboard overview</h3><p className="muted">See leads, bookings, availability, and invoice totals in one place.</p></div>
          <div className="panel card"><h3>Booking calendar</h3><p className="muted">Cal.com integration will sit here once scheduling is connected.</p></div>
          <div className="panel card"><h3>Payout readiness</h3><p className="muted">Stripe Connect onboarding status and payout setup will appear here.</p></div>
        </div>
      </section>
    </MarketingLayout>
  )
}