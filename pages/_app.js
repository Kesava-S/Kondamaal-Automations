import '../styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user
                setUser(currentUser ?? null)
            }
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Kondamaal Business Automation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <nav className="navbar">
                <div className="logo" id="nav-logo" onClick={() => router.push('/')}>
                    <img src="/logo.png" alt="Kondamaal AutoTech Logo" className="logo-img" />
                    <div className="logo-text">
                        <span>Kondamaal Business Automation</span>
                    </div>
                </div>
                <div className="nav-links">
                    <Link href="/" className={`nav-btn ${router.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link href="/services" className={`nav-btn ${router.pathname === '/services' ? 'active' : ''}`}>Services</Link>
                    <Link href="/careers" className={`nav-btn ${router.pathname === '/careers' ? 'active' : ''}`}>Careers</Link>

                    {!user ? (
                        <Link href="/login" className={`nav-btn ${router.pathname === '/login' ? 'active' : ''}`}>Login</Link>
                    ) : (
                        <button onClick={handleLogout} className="nav-btn">Logout</button>
                    )}
                </div>
            </nav>

            <main id="app">
                <Component {...pageProps} user={user} />
            </main>
        </>
    )
}

export default MyApp
