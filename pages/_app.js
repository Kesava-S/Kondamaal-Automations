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
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="navbar">
                <div className="container nav-content">
                    <Link href="/" className="logo">
                        Kondamaal
                    </Link>
                    <div className="nav-links">
                        <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <Link href="/services" className={`nav-link ${router.pathname === '/services' ? 'active' : ''}`}>
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
                    <p>&copy; {new Date().getFullYear()} Kondamaal Automations. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default MyApp
