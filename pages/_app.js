import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Kondamaal Automations</title>
                <meta name="description" content="Streamline your business processes with intelligent automation." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/logo.png" />
                <link rel="apple-touch-icon" href="/logo.png" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://kondamaal.com" />
                <meta property="og:title" content="Kondamaal Automations" />
                <meta property="og:description" content="Streamline your business processes with intelligent automation." />
                <meta property="og:image" content="https://kondamaal.com/logo.png" />
                <meta property="og:site_name" content="Kondamaal Automations" />
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
