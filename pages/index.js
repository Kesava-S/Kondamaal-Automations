import Link from 'next/link'
import Head from 'next/head'
import { faqs } from '../data/faqs'

export default function Home() {
    return (
        <>
            <Head>
                <title>Kondamaal | AI & Business Automation</title>
                <meta name="description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <meta property="og:title" content="Kondamaal | AI & Business Automation" />
                <meta property="og:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />
                <meta property="og:url" content="https://kondamaal.com/" />

                <meta name="twitter:title" content="Kondamaal | AI & Business Automation" />
                <meta name="twitter:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Kondamaal Automations",
                            "url": "https://kondamaal.com",
                            "logo": "https://kondamaal.com/logo.png",
                            "description": "Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation.",
                            "email": "support@kondamaal.com",
                            "sameAs": []
                        })
                    }}
                />
            </Head>
            <section className="hero">
                <div className="container">
                    <h1>Kondamaal<br />AI & Business Automation partner</h1>
                    <p>Save time with AI Automation</p>
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
                    <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Why Kondamaal</h2>
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>AI Automation partner for your business</p>
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
            <section className="services-section" style={{ background: '#fbfbfd' }}>
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="grid" style={{ marginBottom: '3rem' }}>
                        {faqs.filter(f => [3, 5, 8].includes(f.id)).map((faq) => (
                            <div key={faq.id} className="card">
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/faq" style={{ color: '#0071e3', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            View all FAQs <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
