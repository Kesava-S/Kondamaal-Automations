import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Kondamaal Automations | Business Automation Simplified</title>
                <meta name="description" content="Affordable business automation solutions. Simplify marketing, sales, lead capture, and reporting with AI automation and reduce workforce costs." />

                <meta property="og:title" content="Kondamaal Automations | Business Automation Simplified" />
                <meta property="og:description" content="Affordable business automation solutions. Simplify marketing, sales, lead capture, and reporting with AI automation and reduce workforce costs." />
                <meta property="og:url" content="https://kondamaal.com/" />

                <meta name="twitter:title" content="Kondamaal Automations | Business Automation Simplified" />
                <meta name="twitter:description" content="Affordable business automation solutions. Simplify marketing, sales, lead capture, and reporting with AI automation and reduce workforce costs." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Kondamaal Automations",
                            "url": "https://kondamaal.com",
                            "logo": "https://kondamaal.com/logo.png",
                            "description": "Affordable business automation solutions. Simplify marketing, sales, lead capture, and reporting with AI automation.",
                            "email": "support@kondamaal.com",
                            "sameAs": []
                        })
                    }}
                />
            </Head>
            <section className="hero">
                <div className="container">
                    <h1>Business Automation.<br />Simplified.</h1>
                    <p>Reduce workforce cost with AI Automation</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-consultation" className="cta-button">
                            Book Free Consultation
                        </Link>
                        <Link href="/services" className="cta-button" style={{ background: 'transparent', color: '#0071e3', border: '1px solid #0071e3', boxShadow: 'none' }}>
                            View Services
                        </Link>
                    </div>
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
