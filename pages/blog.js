import Head from 'next/head'
import Link from 'next/link'
import { blogs } from '../data/blogs'

export default function Blogs() {
    return (
        <>
            <Head>
                <title>Blog | Automaitee AI Digital Automation</title>
                <meta name="description" content="Latest insights on AI, Automation, and Business Growth." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Latest Insights
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Transforming Business with AI & Automation
                    </p>
                </div>
            </div>

            <section className="services-section">
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>All Articles</h2>
                    <div className="grid">
                        {blogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.id}`} className="card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', height: '100%' }}>
                                <div style={{
                                    height: '200px',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem',
                                    backgroundColor: '#f5f5f7'
                                }}>
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                        loading="lazy"
                                    />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#0071e3', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {blog.date} • {blog.author}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3', color: 'var(--foreground)' }}>
                                        {blog.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                                        {blog.excerpt}
                                    </p>
                                    <div style={{ color: '#0071e3', fontWeight: '500', fontSize: '0.9rem', marginTop: 'auto' }}>
                                        Read Article →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
