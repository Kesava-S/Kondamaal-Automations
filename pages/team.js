import Head from 'next/head'
import { team } from '../data/team'

export default function Team() {
    return (
        <>
            <Head>
                <title>Our Team | Automaitee AI Digital Automation</title>
                <meta name="description" content="Meet the experts behind Automaitee who are transforming businesses with AI." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Meet the Team
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Passionate experts dedicated to your digital transformation.
                    </p>
                </div>
            </div>

            <section className="services-section">
                <div className="container">
                    <div className="grid">
                        {team.map((member) => (
                            <div key={member.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: '1.5rem',
                                    border: '4px solid #f5f5f7'
                                }}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--foreground)' }}>
                                    {member.name}
                                </h3>
                                <div style={{ fontSize: '0.9rem', color: '#0071e3', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {member.role}
                                </div>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
