import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    return (
        <>
            <DefaultSeo
                title="Kondamaal Automations"
                description="Streamline your business processes with intelligent automation."
                canonical="https://kondamaal.com"
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url: 'https://kondamaal.com',
                    siteName: 'Kondamaal Automations',
                    title: 'Kondamaal Automations',
                    description: 'Streamline your business processes with intelligent automation.',
                    images: [
                        {
                            url: 'https://kondamaal.com/logo.png',
                            width: 800,
                            height: 600,
                            alt: 'Kondamaal Logo',
                        },
                    ],
                }}
            />

            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/logo.png" />
                <link rel="apple-touch-icon" href="/logo.png" />
            </Head>

            <nav className="navbar">
                <div className="logo" id="nav-logo" onClick={() => router.push('/')}>
                    <img src="/logo.png" alt="Kondamaal AutoTech Logo" className="logo-img" />
                    <div className="logo-text">
                        <span>Kondamaal Business Automation</span>
                    </div>
                </div>
                <div className="nav-links">
                    <Link href="/" legacyBehavior>
                        <a className={`nav-btn ${router.pathname === '/' ? 'active' : ''}`}>Home</a>
                    </Link>
                    <Link href="/services" legacyBehavior>
                        <a className={`nav-btn ${router.pathname === '/services' ? 'active' : ''}`}>Services</a>
                    </Link>
                </div>
            </nav>

            <main id="app">
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
