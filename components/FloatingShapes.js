import { useEffect, useState } from 'react';

const shapes = [
    { type: 'circle', color: '#0071e3', size: 20, top: '10%', left: '15%', delay: 0 },
    { type: 'triangle', color: '#ff3b30', size: 30, top: '20%', left: '80%', delay: 1 },
    { type: 'square', color: '#34c759', size: 25, top: '70%', left: '10%', delay: 2 },
    { type: 'circle', color: '#ff9f0a', size: 15, top: '80%', left: '85%', delay: 0.5 },
    { type: 'triangle', color: '#af52de', size: 35, top: '15%', left: '5%', delay: 1.5 },
    { type: 'square', color: '#5856d6', size: 20, top: '60%', left: '90%', delay: 2.5 },
    { type: 'circle', color: '#ff2d55', size: 25, top: '40%', left: '20%', delay: 1.2 },
    { type: 'triangle', color: '#00c7be', size: 15, top: '30%', left: '95%', delay: 0.8 },
];

export default function FloatingShapes() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
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
                        backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent',
                        borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '4px' : '0',
                        borderBottom: shape.type === 'triangle' ? `${shape.size}px solid ${shape.color}` : 'none',
                        borderLeft: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        borderRight: shape.type === 'triangle' ? `${shape.size / 2}px solid transparent` : 'none',
                        opacity: 0.6,
                        animation: `float ${6 + i}s ease-in-out infinite`,
                        animationDelay: `${shape.delay}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    100% { transform: translateY(0px) rotate(360deg); }
                }
                .shape-triangle {
                    width: 0 !important;
                    height: 0 !important;
                    background-color: transparent !important;
                }
            `}</style>
        </div>
    );
}
