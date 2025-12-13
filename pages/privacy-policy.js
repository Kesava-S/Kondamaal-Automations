import Head from 'next/head'

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy | Kondamaal Automations</title>
            </Head>

            <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Privacy Policy</h1>

                <div style={{ maxWidth: '800px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '1.5rem' }}><strong>Last Updated:</strong> 13/12/2025</p>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>1. Introduction</h2>
                        <p>Kondamaal Automations (“we,” “our,” “us”) respects your privacy. This policy explains how we collect, use, and protect your personal data when you use our website or services.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>2. Data We Collect</h2>
                        <p>We may collect:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li><strong>Identity & Contact:</strong> name, email, phone, billing details.</li>
                            <li><strong>Technical Data:</strong> IP address, browser info, device data.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
                        <p>We use your data to:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Provide and manage our services.</li>
                            <li>Communicate with you.</li>
                            <li>Comply with legal obligations.</li>
                            <li>Improve our website and services.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>4. Legal Basis</h2>
                        <p>For EU/UK users, we process data based on:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Contract performance.</li>
                            <li>Legitimate interests.</li>
                            <li>Consent (where required).</li>
                            <li>Legal obligations.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>5. International Transfers</h2>
                        <p>Your data may be stored or processed in India. We ensure appropriate protections are in place.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>6. Your Rights</h2>
                        <p>You can:</p>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                            <li>Access, correct, or delete your data.</li>
                            <li>Object to processing or request restriction.</li>
                            <li>Withdraw consent at any time.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>7. Data Security & Retention</h2>
                        <p>We protect your data using appropriate security measures and retain it only as long as necessary.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>8. Cookies & Tracking</h2>
                        <p>We use cookies and similar tools for website functionality and analytics. You can manage preferences via your browser.</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '1rem' }}>9. Contact & Complaints</h2>
                        <p>For questions, data requests, or complaints, contact: <a href="mailto:support@kondamaal.com" style={{ color: '#0071e3' }}>support@kondamaal.com</a></p>
                        <p style={{ marginTop: '0.5rem' }}>EU/UK users can also contact their local data protection authority.</p>
                    </section>
                </div>
            </div>
        </>
    )
}
