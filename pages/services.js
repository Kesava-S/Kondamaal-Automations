import Head from 'next/head'

export default function Services() {
    const servicesData = [
        {
            category: "1. Comprehensive Business Automation",
            services: [
                {
                    title: "Automate Your Business Marketing",
                    tagline: "Save Hours Every Week",
                    whyMatters: "We help businesses automate social media posting, lead capture, CRM updates, ad reporting, and content workflows.",
                    cta: "Book a Demo"
                }
            ]
        },
        // Add other services here
    ];

    return (
        <>
            <Head>
                <title>Our Services | Kondamaal Automations</title>
                <meta name="description" content="Explore our comprehensive automation solutions including marketing automation, CRM integration, and custom workflows." />
            </Head>
            <section className="view active">
                <header className="hero" style={{ minHeight: '60vh', height: 'auto', paddingTop: '8rem' }}>
                    <h1>Our Services</h1>
                    <p className="subtitle">Comprehensive Automation Solutions</p>
                </header>
                <section className="services-section" style={{ paddingTop: 0 }}>
                    <div className="services-grid">
                        {servicesData.map((category, idx) => (
                            category.services.map((service, sIdx) => (
                                <div key={`${idx}-${sIdx}`} className="service-card">
                                    <div>
                                        <h3 style={{ marginTop: '0.5rem' }}>{service.title}</h3>
                                        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{service.tagline}</p>
                                    </div>
                                    <span className="card-arrow">→</span>
                                </div>
                            ))
                        ))}
                    </div>
                </section>
            </section>
        </>
    )
}
