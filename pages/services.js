import Head from 'next/head'

export default function Services() {
    const services = [
        {
            title: "Marketing Automation",
            description: "Automate social media posting, lead capture, and ad reporting to save hours every week."
        },
        {
            title: "CRM Integration",
            description: "Seamlessly sync data between your sales tools and customer databases."
        },
        {
            title: "Custom Workflows",
            description: "Tailored automation solutions designed specifically for your unique business processes."
        },
        {
            title: "Data Analytics",
            description: "Real-time insights and reporting dashboards to help you make data-driven decisions."
        }
    ]

    return (
        <>
            <Head>
                <title>Services | Kondamaal Automations</title>
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Our Services</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--gray-500)', maxWidth: '600px', margin: '0 auto' }}>
                        Comprehensive solutions to power your business growth.
                    </p>
                </div>
            </div>

            <section className="services-section" style={{ background: 'white' }}>
                <div className="container">
                    <div className="grid">
                        {services.map((service, index) => (
                            <div key={index} className="card" style={{ background: 'var(--gray-50)' }}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
