import Head from 'next/head'
import Link from 'next/link'
import { services } from '../../data/services'

export default function Services() {
    return (
        <>
            <Head>
                <title>Automaitee Services | AI & Business Automation</title>
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Automations</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Fully Customised for your business
                    </p>
                </div>
            </div>

            <section className="services-section">
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Business Automations</h2>
                    <div className="grid">
                        {services.map((service) => (
                            <Link key={service.id} href={`/services/${service.slug}`} className="card" style={{ display: 'block' }}>
                                <h2>{service.title}</h2>
                                <p style={{ marginBottom: service.processSteps ? '1.5rem' : '0' }}>{service.description}</p>

                                {service.processSteps && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                                        {service.processSteps.map((step, index) => (
                                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                <span style={{
                                                    background: 'rgba(0, 113, 227, 0.1)',
                                                    color: '#0071e3',
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {step}
                                                </span>
                                                {index < service.processSteps.length - 1 && (
                                                    <span style={{ margin: '0 4px', color: '#86868b', fontSize: '0.9rem' }}>→</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div style={{ marginTop: '1.5rem', color: '#0071e3', fontWeight: '500', fontSize: '0.9rem' }}>
                                    Learn more →
                                </div>
                            </Link>
                        ))}
                    </div>

                    <h2 style={{ fontSize: '2rem', marginTop: '4rem', marginBottom: '2rem' }}>Personal Automations</h2>
                    <div className="grid">
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Coming Soon</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>We are working on bringing personal automation services to you.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
