import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', content: '' })

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({})

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setMessage({ type: 'error', content: error.message })
        } else {
            setMessage({ type: 'success', content: 'Signup successful! Please check your email for verification.' })
        }
        setLoading(false)
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1>Sign Up</h1>
            {message.content && (
                <div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem' }}>
                    {message.content}
                </div>
            )}
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}
