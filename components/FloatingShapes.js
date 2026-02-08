import { useEffect, useState } from 'react';
import { Settings, Zap, Cpu, Share2, Bot, Workflow, Sparkles, Database, Cloud } from 'lucide-react';

// Shapes restricted to top 40% (Title Area)
const shapes = [
    // Top Row
    { type: 'circle', color: '#0071e3', size: 15, top: '10%', left: '10%', delay: 0 },
    { type: 'triangle', color: '#ff3b30', size: 20, top: '15%', left: '85%', delay: 1.5 },
    { type: 'icon', Icon: Sparkles, color: '#ff2d55', size: 20, top: '12%', left: '50%', delay: 4.1 },
    { type: 'icon', Icon: Share2, color: '#0071e3', size: 26, top: '18%', left: '25%', delay: 2.8 },

    // Middle Row (within header area)
    { type: 'icon', Icon: Settings, color: '#86868b', size: 24, top: '25%', left: '75%', delay: 3 },
    { type: 'icon', Icon: Bot, color: '#5856d6', size: 28, top: '30%', left: '5%', delay: 2.0 },
    { type: 'square', color: '#34c759', size: 18, top: '35%', left: '90%', delay: 2.2 },
    { type: 'triangle', color: '#00c7be', size: 15, top: '28%', left: '15%', delay: 0.8 },

    // Bottom of Header Area
    { type: 'icon', Icon: Workflow, color: '#af52de', size: 24, top: '40%', left: '80%', delay: 3.5 },
    { type: 'circle', color: '#ff9f0a', size: 12, top: '45%', left: '10%', delay: 0.8 },
    { type: 'icon', Icon: Database, color: '#0071e3', size: 22, top: '42%', left: '40%', delay: 1.1 },
    { type: 'icon', Icon: Cloud, color: '#42a1ff', size: 26, top: '38%', left: '60%', delay: 4.0 },

    // Tech accents
    { type: 'icon', Icon: Zap, color: '#ffcc00', size: 22, top: '20%', left: '65%', delay: 1.2 },
    { type: 'icon', Icon: Cpu, color: '#34c759', size: 24, top: '32%', left: '35%', delay: 0.5 },
];

export default function FloatingShapes() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{
            position: 'absolute', // Changed back to absolute so it stays at the top
            top: 0,
            left: 0,
            width: '100%',
            height: '600px', // Restricted height to cover only the title/hero area
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
        }}>
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    className={`floating-shape shape-${shape.type}`}
                    style={{
                        position: 'absolute',
                        top: shape.top,
                        left: shape.left,
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        backgroundColor: (shape.type !== 'triangle' && shape.type !== 'icon') ? shape.color : 'transparent',
                        borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '4px' : '0',
                        borderBottom: shape.type === 'triangle' ? `${shape.size}px solid ${shape.color}` : 'none',
                        borderLeft: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        borderRight: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        color: shape.type === 'icon' ? shape.color : undefined,
                        opacity: 0.4,
                        animation: `float ${7 + i}s ease-in-out infinite`,
                        animationDelay: `${shape.delay}s`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {shape.type === 'icon' && shape.Icon && (
                        <shape.Icon size={shape.size} strokeWidth={1.5} />
                    )}
                </div>
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(10deg); }
                    66% { transform: translateY(15px) rotate(-10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .shape-triangle, .shape-square {
                     animation: floatRotate 9s ease-in-out infinite alternate !important;
                }
                 @keyframes floatRotate {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-30px) rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
