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
                <title>{service.title} | HubSmort AI</title>
                <meta name="description" content={service.description} />

                <meta property="og:title" content={`${service.title} | HubSmort AI`} />
                <meta property="og:description" content={service.description} />
                <meta property="og:url" content={`https://hubsmort.com/services/${service.slug}`} />

                <meta name="twitter:title" content={`${service.title} | HubSmort AI`} />
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
                                "name": "HubSmort AI",
                                "url": "https://hubsmort.com"
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

                    {service.workflowImage && (
                        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                                Unified Marketing Automation Workflow
                            </h2>
                            <img
                                src={service.workflowImage}
                                alt="Unified Marketing Automation Workflow"
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                            />
                        </div>
                    )}

                    {service.detailedFeatures ? (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                                {service.detailedFeatures.map((section, index) => (
                                    <div key={index} className="feature-card">
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1d1d1f' }}>{section.title}</h3>
                                        <ul style={{ listStyle: 'none' }}>
                                            {section.items.map((item, i) => (
                                                <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                                    <span style={{ color: '#34c759', flexShrink: 0 }}>✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>{service.featuresTitle || 'Key Features'}</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {service.features.map((feature, index) => {
                                        const [title, desc] = feature.includes(' – ') ? feature.split(' – ') : [feature, ''];
                                        return (
                                            <div key={index} className="feature-card" style={{ padding: '1.5rem' }}>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: desc ? '0.5rem' : '0', color: '#1d1d1f' }}>{title}</h3>
                                                {desc && <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{desc}</p>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Benefits</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {service.benefits.map((benefit, index) => (
                                        <div key={index} className="feature-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ color: '#34c759', fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                                            <span style={{ fontWeight: '500', color: '#1d1d1f' }}>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '6rem', padding: '3rem', background: 'var(--gray-50)', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>{service.ctaTitle || 'Ready to get started?'}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{service.ctaDescription || `Transform your business with our ${service.title.toLowerCase()} solutions.`}</p>
                        <Link href="/book-consultation" className="cta-button">
                            {service.ctaButtonText || 'Book a Free Consultation'}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
