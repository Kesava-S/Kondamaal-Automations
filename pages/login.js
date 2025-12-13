import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', content: '' })

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({})

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage({ type: 'error', content: error.message })
        } else {
            setMessage({ type: 'success', content: 'Logged in successfully!' })
            router.push('/')
        }
        setLoading(false)
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1>Login</h1>
            {message.content && (
                <div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem' }}>
                    {message.content}
                </div>
            )}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.5rem' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.5rem' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '0.5rem' }}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
