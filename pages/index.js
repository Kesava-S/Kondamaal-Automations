import Link from 'next/link'

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>Business Automation.<br />Simplified.</h1>
                    <p>Reduce team costs and streamline operations with our intelligent AI workforce solutions.</p>
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
                            <p>Significantly reduce operational costs by automating repetitive tasks and workflows.</p>
                        </div>
                        <div className="card">
                            <h3>24/7 Operation</h3>
                            <p>Our automated systems work round the clock, ensuring your business never sleeps.</p>
                        </div>
                        <div className="card">
                            <h3>Scalable</h3>
                            <p>Solutions that grow with your business, handling increased workload effortlessly.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
