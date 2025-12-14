import Head from 'next/head'
import { useState } from 'react'
import BookingModal from '../components/BookingModal'

export default function BookConsultation() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Head>
                <title>Book a Free Consulting | Kondamaal Automations</title>
                <meta name="description" content="Schedule a free consultation with our experts to discuss your business automation needs." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: '#fbfbfd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Ready to scale your business?
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.5' }}>
                        Book a free consultation to discover how AI automation can save you time and increase revenue.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cta-button"
                        style={{ fontSize: '1.2rem', padding: '16px 40px', border: 'none', cursor: 'pointer' }}
                    >
                        Schedule a Call
                    </button>
                </div>
            </div>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
