import Head from 'next/head'
import Link from 'next/link'

export default function CustomPage() {
    const content = {
        title: "UK-Based Marketing Advantage",
        description: "Why managing ads from the UK/Europe creates a premium perception and delivers higher-quality leads for Indian construction projects.",
        fullDescription: "Positioning your marketing from London offers a strategic advantage in targeting NRIs and foreign investors. It builds trust, ensures better ad account stability, and attracts high-value decision-makers rather than just volume leads.",
        detailedFeatures: [
            {
                title: "1. Higher Trust & Perceived Credibility",
                items: [
                    "Ads managed from UK/Europe instantly feel more professional & global",
                    "NRIs and foreign investors trust UK-based marketing more than India-based pages",
                    "UK business location + GBP/USD pricing = premium perception"
                ]
            },
            {
                title: "2. Better NRI & Investor Targeting",
                items: [
                    "You can precisely target: Tamil NRIs in UK, Europe, US, Canada, Middle East",
                    "Target property investors, real-estate interest groups, expat homeowners",
                    "Indian-run ads often mix local low-intent traffic → poor lead quality",
                    "London positioning filters out “just browsing” local leads"
                ]
            },
            {
                title: "3. Stronger Ad Accounts & Fewer Restrictions",
                items: [
                    "UK ad accounts generally have a higher account trust score",
                    "Fewer random disapprovals compared to new India accounts",
                    "Faster scaling without frequent bans or learning-phase resets"
                ]
            },
            {
                title: "4. Higher-Value Leads (Not Just More Leads)",
                items: [
                    "Overseas leads have higher budgets",
                    "They look for turnkey / premium / villa / investment projects",
                    "They are decision-makers, not price-shoppers",
                    "Better ROAS, even if cost per lead is higher"
                ]
            },
            {
                title: "5. Time-Zone Advantage for Follow-ups",
                items: [
                    "UK timing aligns well with Europe daytime and US morning / afternoon",
                    "You can pre-qualify leads",
                    "Batch & route only serious leads to the India team",
                    "Less noise for the construction company"
                ]
            },
            {
                title: "6. Cleaner Funnel Control",
                items: [
                    "From London, you can run lead-qualification ads (budget, NRI status, location)",
                    "Use WhatsApp/CRM automation (n8n fits perfectly here)",
                    "Send only verified leads to the Tamil Nadu builder",
                    "India team focuses on conversion, not chasing junk leads"
                ]
            },
            {
                title: "7. Pricing & Offer Positioning Power",
                items: [
                    "You can market as: “UK-managed construction & project coordination”",
                    "Market as: “International-standard construction for NRIs”",
                    "This allows higher margins",
                    "Better contract sizes",
                    "Fewer negotiations"
                ]
            },
            {
                title: "8. Brand Positioning for the Future",
                items: [
                    "This isn’t just ads — it’s market positioning",
                    "You are not “running ads for a builder”",
                    "You are: International marketing & lead partner",
                    "You are: Gateway between NRIs & Indian construction companies"
                ]
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{content.title} | HubSmort AI</title>
                <meta name="description" content={content.description} />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="container">
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', display: 'inline-block' }}>
                        ← Back to Home
                    </Link>

                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        {content.title}
                    </h1>

                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.5', marginBottom: '4rem' }}>
                        {content.fullDescription}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                        {content.detailedFeatures.map((section, index) => (
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

                    <div style={{ marginTop: '6rem', padding: '3rem', background: 'var(--gray-50)', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>Ready to Elevate Your Marketing?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Leverage the UK advantage for your construction business today.
                        </p>
                        <Link href="/book-consultation" className="cta-button">
                            Book a Strategy Call
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
