import React, { useEffect, useRef } from 'react';

const BackgroundWave: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let time = 0;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        const drawWave = (
            yOffset: number,
            amplitude: number,
            frequency: number,
            phase: number,
            color: string
        ) => {
            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 10) {
                const y = Math.sin(x * frequency + phase) * amplitude + yOffset;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        };

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            time += 0.005;

            // Draw multiple overlapping waves for a "mesh" effect
            // Soft Purple/Magenta colors with low opacity
            drawWave(
                height * 0.4,
                150,
                0.001,
                time * 0.8,
                'rgba(168, 85, 247, 0.08)' // Purple
            );

            drawWave(
                height * 0.5,
                200,
                0.0015,
                -time,
                'rgba(236, 72, 153, 0.05)' // Pink
            );

            drawWave(
                height * 0.6,
                100,
                0.002,
                time * 1.5,
                'rgba(99, 102, 241, 0.1)' // Indigo
            );

            drawWave(
                height * 0.7,
                120,
                0.0012,
                -time * 1.2,
                'rgba(139, 92, 246, 0.07)' // Violet
            );

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none transform-gpu"
            style={{
                zIndex: 0,
                // Hardware acceleration for the canvas element itself
                transform: 'translateZ(0)'
            }}
            aria-hidden="true"
        />
    );
};

export default BackgroundWave;
