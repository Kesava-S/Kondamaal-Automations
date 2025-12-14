import Head from 'next/head'
import Link from 'next/link'
import { services } from '../../data/services'

export async function getStaticPaths() {
    const paths = services.map((service) => ({
        params: { slug: service.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const service = services.find((s) => s.slug === params.slug)
    return { props: { service } }
}

export default function ServicePage({ service }) {
    return (
        <>
            <Head>
                <title>{service.title} | Kondamaal Automations</title>
                <meta name="description" content={service.description} />

                <meta property="og:title" content={`${service.title} | Kondamaal Automations`} />
                <meta property="og:description" content={service.description} />
                <meta property="og:url" content={`https://kondamaal.com/services/${service.slug}`} />

                <meta name="twitter:title" content={`${service.title} | Kondamaal Automations`} />
                <meta name="twitter:description" content={service.description} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": service.title,
                            "description": service.description,
                            "provider": {
                                "@type": "Organization",
                                "name": "Kondamaal Automations",
                                "url": "https://kondamaal.com"
                            },
                            "areaServed": "Global",
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "Business Automation Services",
                                "itemListElement": [
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": service.title
                                        }
                                    }
                                ]
                            }
                        })
                    }}
                />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/services" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Services
                    </Link>

                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        {service.title}
                    </h1>

                    {service.animatedSubtext && (
                        <p className="animated-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                            {service.animatedSubtext}
                        </p>
                    )}

                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.5', marginBottom: '4rem' }}>
                        {service.fullDescription}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>{service.featuresTitle || 'Key Features'}</h2>
                            <ul style={{ listStyle: 'none' }}>
                                {service.features.map((feature, index) => (
                                    <li key={index} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ color: '#0071e3', fontSize: '1.2rem' }}>•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Benefits</h2>
                            <ul style={{ listStyle: 'none' }}>
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ color: '#34c759', fontSize: '1.2rem' }}>✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '6rem', padding: '3rem', background: 'var(--gray-50)', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to get started?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Transform your business with our {service.title.toLowerCase()} solutions.</p>
                        <Link href="/book-consultation" className="cta-button">
                            Book a Free Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
