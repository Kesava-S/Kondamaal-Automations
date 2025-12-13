import Link from 'next/link'

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>Business Automation.<br />Simplified.</h1>
                    <p>Reduce workforce cost with AI Automation</p>
                    <Link href="/services" className="cta-button">
                        View Our Services
                    </Link>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="grid">
                        <div className="card">
                            <h3>Cost Effective</h3>
                            <p>We offer tailored pricing based on service needs, delivering the best quality at the most affordable rates.</p>
                        </div>
                        <div className="card">
                            <h3>24/7 Operation</h3>
                            <p>Our automated systems work round the clock, ensuring your business never sleeps.</p>
                        </div>
                        <div className="card">
                            <h3>Transparent</h3>
                            <p>Workflows are transparent and personalized for your business.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
