import Head from 'next/head'
import { team } from '../data/team'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Make sure you have framer-motion installed
import { Reveal } from '../components/Reveal'
import { Linkedin } from 'lucide-react'

export default function Team() {
    const [hoveredMember, setHoveredMember] = useState(null)

    return (
        <>
            <Head>
                <title>Our Team | Automaitee AI Digital Automation</title>
                <meta name="description" content="Meet the experts behind Automaitee who are transforming businesses with AI." />
            </Head>

            <div style={{ paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div className="container">
                    <Reveal width="100%">
                        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(180deg, #1d1d1f 0%, #434344 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Meet the Young Energies
                        </h1>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Passionate enthusiasts dedicated to your digital transformation.
                        </p>
                    </Reveal>
                </div>
            </div>

            <section className="services-section">
                <div className="container">
                    <div
                        className="grid"
                        onMouseLeave={() => setHoveredMember(null)}
                    >
                        {team.map((member, index) => {
                            const isHovered = hoveredMember === member.id
                            const isDimmed = hoveredMember && hoveredMember !== member.id

                            return (
                                <motion.div
                                    key={member.id}
                                    className="card team-card"
                                    onMouseEnter={() => setHoveredMember(member.id)}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    animate={{
                                        scale: isHovered ? 1.05 : isDimmed ? 0.95 : 1,
                                        opacity: isDimmed ? 0.5 : 1,
                                        zIndex: isHovered ? 10 : 1,
                                        filter: isDimmed ? 'blur(2px)' : 'none'
                                    }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: '2rem',
                                        position: 'relative',
                                        background: 'white', // Ensure background isn't transparent
                                        transition: 'box-shadow 0.3s ease' // Smooth shadow transition
                                    }}
                                >
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginBottom: '1.5rem',
                                        border: '4px solid #f5f5f7',
                                        position: 'relative' // For overlay if needed
                                    }}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.objectPosition || 'center' }}
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--foreground)' }}>
                                        {member.name}
                                    </h3>
                                    <div style={{ fontSize: '0.9rem', color: '#0071e3', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {member.role}
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                        {member.bio}
                                    </p>

                                    {/* LinkedIn Button - Only visible on hover */}
                                    <AnimatePresence>
                                        {isHovered && member.linkedin && (
                                            <motion.a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    background: '#0a66c2', // LinkedIn blue
                                                    color: 'white',
                                                    padding: '8px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Linkedin size={20} />
                                            </motion.a>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
