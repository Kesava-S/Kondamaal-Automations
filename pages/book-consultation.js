import Head from 'next/head'
import { useState } from 'react'

export default function BookConsultation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        companyName: '',
        industry: '',
        companySize: '',
        goal: '',
        preferredDate: '',
        website: ''
    })
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const response = await fetch('/api/book-consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    whatsapp: '',
                    companyName: '',
                    industry: '',
                    companySize: '',
                    goal: '',
                    preferredDate: '',
                    website: ''
                })
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <>
            <Head>
                <title>Book a Free Consulting | Kondamaal Automations</title>
                <meta name="description" content="Schedule a free consultation with our experts to discuss your business automation needs." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px', background: '#fbfbfd' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Book a Free Consulting</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Let's discuss how we can automate your business growth.</p>
                    </div>

                    <div style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Request Sent!</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you shortly to confirm your appointment.</p>
                                <button
                                    onClick={() => setStatus('')}
                                    style={{ marginTop: '1.5rem', color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                                >
                                    Send another request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Name <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Email <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>WhatsApp <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                        placeholder="Acme Inc."
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Industry</label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}
                                        >
                                            <option value="">Select...</option>
                                            <option value="Education">Education</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Hospitality">Hospitality</option>
                                            <option value="Marketing / Advertising">Marketing / Advertising</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Manufacturing / Industrial">Manufacturing / Industrial</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Company Size</label>
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1-10 employees">1-10 employees</option>
                                            <option value="11-50 employees">11-50 employees</option>
                                            <option value="51-200 employees">51-200 employees</option>
                                            <option value="201-500 employees">201-500 employees</option>
                                            <option value="500+ employees">500+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Goal for Consultation</label>
                                    <select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem', background: 'white' }}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Reduce Costs">Reduce Costs</option>
                                        <option value="Automate Marketing">Automate Marketing</option>
                                        <option value="Automate Operations">Automate Operations</option>
                                        <option value="Improve Customer Support">Improve Customer Support</option>
                                        <option value="Increase Sales">Increase Sales</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Preferred Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Website</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #d2d2d7', fontSize: '1rem' }}
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="cta-button"
                                    style={{ width: '100%', marginTop: '1rem', border: 'none', cursor: 'pointer', opacity: status === 'submitting' ? 0.7 : 1 }}
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Book Consultation'}
                                </button>

                                {status === 'error' && (
                                    <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
