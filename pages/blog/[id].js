import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { blogs } from '../../data/blogs'

export default function BlogPost({ blog }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Head>
                <title>{blog.title} | Automaitee Blog</title>
                <meta name="description" content={blog.excerpt} />
            </Head>

            <article style={{ paddingTop: '120px', paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <Link href="/blog" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        fontSize: '0.9rem'
                    }}>
                        ← Back to Blog
                    </Link>

                    <h1 style={{
                        fontSize: '2.5rem',
                        lineHeight: '1.2',
                        marginBottom: '1rem',
                        fontWeight: '700'
                    }}>
                        {blog.title}
                    </h1>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '2rem'
                    }}>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.author}</span>
                    </div>

                    <div style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        marginBottom: '3rem'
                    }}>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: 'var(--foreground)'
                        }}
                    />

                    <style jsx global>{`
                        .blog-content h2 {
                            font-size: 1.8rem;
                            margin-top: 3rem;
                            margin-bottom: 1rem;
                            font-weight: 600;
                        }
                        .blog-content p {
                            margin-bottom: 1.5rem;
                            color: #4a4a4a;
                        }
                        .blog-content ul {
                            margin-bottom: 2rem;
                            padding-left: 1.5rem;
                            color: #4a4a4a;
                        }
                        .blog-content li {
                            margin-bottom: 0.75rem;
                        }
                        .blog-content strong {
                            font-weight: 600;
                            color: var(--foreground);
                        }
                        .blog-content a {
                            color: #0071e3;
                            text-decoration: underline;
                        }
                    `}</style>
                </div>
            </article>
        </>
    )
}

export async function getStaticPaths() {
    const paths = blogs.map((blog) => ({
        params: { id: blog.id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const blog = blogs.find((b) => b.id === params.id)
    return {
        props: {
            blog,
        },
    }
}
