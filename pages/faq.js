import Head from 'next/head'
import Link from 'next/link'
import { faqs } from '../data/faqs'

export default function FAQ() {
    return (
        <>
            <Head>
                <title>Frequently Asked Questions | Kondamaal Automations</title>
                <meta name="description" content="Find answers to common questions about our AI automation services, pricing, security, and implementation process." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px', background: '#fbfbfd' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Everything you need to know about our services.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {faqs.map((faq) => (
                            <div key={faq.id} className="feature-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1d1d1f' }}>{faq.question}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Still have questions?</p>
                        <Link href="/book-consultation" className="cta-button">
                            Book a Free Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
