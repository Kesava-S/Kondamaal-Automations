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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Kondamaal Automations" />
                <meta property="og:image" content="https://kondamaal.com/logo.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="https://kondamaal.com/logo.png" />
            </Head>

            <nav className="navbar">
                <div className="container nav-content">
                    <Link href="/" replace={router.pathname === '/'} className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/logo.png" alt="Kondamaal Automations Logo" style={{ height: '48px', width: 'auto' }} loading="lazy" />
                        Kondamaal Automations
                    </Link>
                    <div className="nav-links">
                        <Link href="/" replace={router.pathname === '/'} className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <Link href="/services" replace={router.pathname === '/services'} className={`nav-link ${router.pathname === '/services' ? 'active' : ''}`}>
                            Services
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                <Component {...pageProps} />
            </main>

            <footer>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <p>&copy; {new Date().getFullYear()} Kondamaal Automations. All rights reserved.</p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <Link href="/privacy-policy" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                            <Link href="/terms-of-service" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default MyApp
