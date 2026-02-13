import Link from 'next/link'
import Head from 'next/head'
import { faqs } from '../data/faqs'
import { Reveal } from '../components/Reveal'


const AnimatedText = ({ text, delayOffset = 0 }) => {
    return text.split(" ").map((word, i) => (
        <span
            key={i}
            className="animated-word"
            style={{
                animationDelay: `${delayOffset + i * 0.1}s`,
                marginRight: "0.25em"
            }}
        >
            {word}
        </span>
    ));
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Automaitee | Digital AI Automation</title>
                <meta name="description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <meta property="og:title" content="Automaitee | AI & Business Automation" />
                <meta property="og:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />
                <meta property="og:url" content="https://kondamaal.com/" />

                <meta name="twitter:title" content="Automaitee | AI & Business Automation" />
                <meta name="twitter:description" content="Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation and reduce workforce costs." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Automaitee AI Digital Automation",
                            "url": "https://automaitee.com",
                            "logo": "https://automaitee.com/logo.png",
                            "description": "Affordable business automation solutions. Simplify marketing, sales, process, and reporting with AI automation.",
                            "email": "support@automaitee.com",
                            "sameAs": []
                        })
                    }}
                />
            </Head>

            <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Reveal>
                        <h1>
                            <AnimatedText text="Automaitee" />
                            <br />
                            <AnimatedText text="AI Digital Automation" delayOffset={0.3} />
                        </h1>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <p>Empower your Business and Staffs</p>
                    </Reveal>
                    <Reveal delay={0.7} width="100%">
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/book-consultation" className="cta-button">
                                Book Free Consultation
                            </Link>
                            <Link href="/services" className="cta-button" style={{ background: 'transparent', color: '#0071e3', border: '1px solid #0071e3', boxShadow: 'none' }}>
                                View Services
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center' }}>
                            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Why Automaitee</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>AI Automation partner for your business</p>
                        </div>
                    </Reveal>
                    <div className="grid">
                        <Reveal>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>Customised, But Cost Effective</h3>
                                <p>We offer tailored pricing based on service needs, delivering the best quality at the most affordable rates.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>24/7 Operation</h3>
                                <p>Our automated systems work round the clock, ensuring your business never sleeps.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="card" style={{ height: '100%' }}>
                                <h3>Transparent</h3>
                                <p>Workflows are transparent and personalized for your business.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
            <section className="services-section" style={{ background: 'rgba(251, 251, 253, 0.4)' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </Reveal>
                    <div className="grid" style={{ marginBottom: '3rem' }}>
                        {faqs.filter(f => [3, 5, 8].includes(f.id)).map((faq, i) => (
                            <Reveal key={faq.id} delay={i * 0.1}>
                                <div className="card" style={{ height: '100%' }}>
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal width="100%">
                        <div style={{ textAlign: 'center' }}>
                            <Link href="/faq" style={{ color: '#0071e3', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                View all FAQs <span>→</span>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
