export default function Careers() {
    return (
        <section className="view active">
            <header className="hero" style={{ padding: '8rem 2rem 4rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>தனிப்பட்ட முயற்சி தரும் வெற்றி என்பது, அணிவகுப்பு முயற்சியில் பெருமை.</h2>
                <p className="subtitle" style={{ fontStyle: 'italic' }}>Individual effort brings success, collective effort brings pride.</p>
            </header>

            <section className="inquiry-section">
                <div className="card full-width" style={{ textAlign: 'left', lineHeight: 1.6 }}>
                    <h3>About Us</h3>
                    <p>Our company embraces curious minds from all backgrounds—no need for top degrees, just the passion to learn quickly, think logically, and solve problems.</p>
                </div>

                <div className="card full-width">
                    <h3>Open Roles</h3>
                    <div className="job-list">
                        <p>Loading open positions...</p>
                        {/* Fetch jobs from Supabase here */}
                    </div>
                </div>
            </section>
        </section>
    )
}
