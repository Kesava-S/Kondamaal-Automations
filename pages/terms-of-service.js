import Head from 'next/head'
import Link from 'next/link'

export default function TermsOfService() {
    return (
        <>
            <Head>
                <title>Terms of Service | Kondamaal Automations</title>
            </Head>

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Terms of Service</h1>

                <div style={{ maxWidth: '800px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1.5rem' }}><strong>Last Updated:</strong> 13/12/2025</p>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                        <p>By using our website or services, you agree to these Terms and applicable laws. If you do not agree, do not use our services.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>2. Services</h2>
                        <p>Kondamaal Automations provides digital automation services, including marketing and workflow automation tools.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>3. User Responsibilities</h2>
                        <p>You agree to use our services lawfully and provide accurate information. You may not misuse, copy, or reverse-engineer any content or tools.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>4. Intellectual Property</h2>
                        <p>All content, software, and branding on our website are owned by Kondamaal Automations and protected by law.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>5. Liability</h2>
                        <p>Our services are provided “as is.” We are not liable for damages, loss of data, or interruptions, even if we are notified of possible issues.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>6. Termination</h2>
                        <p>We may suspend or terminate access if you violate these Terms.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>7. Privacy</h2>
                        <p>Your use of our services is also governed by our <Link href="/privacy-policy" style={{ color: '#0071e3' }}>Privacy Policy</Link>.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>8. Governing Law</h2>
                        <p>These Terms are governed by the laws of India. EU/UK users agree to the same, subject to applicable local consumer protections.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>9. Contact</h2>
                        <p>Questions or concerns? Email us at <a href="mailto:support@kondamaal.com" style={{ color: '#0071e3' }}>support@kondamaal.com</a>.</p>
                    </section>
                </div>
            </div>
        </>
    )
}
