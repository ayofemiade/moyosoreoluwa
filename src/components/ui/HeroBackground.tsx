"use client";

import { useEffect, useRef } from "react";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

export default function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMobile, prefersReducedMotion } = useMobilePerformance();

    useEffect(() => {
        if (prefersReducedMotion) return; // Disable entirely if reduced motion

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let animationFrameId: number;

        // Drastically reduce particles on mobile
        const particleCount = isMobile ? 15 : 50;
        const connectionDistance = isMobile ? 100 : 150;

        const particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                // Slower movement on mobile
                const speed = isMobile ? 0.3 : 0.5;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(99, 102, 241, 0.2)"; // Accent color low opacity
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            particles.forEach((p, i) => {
                p.update();
                p.draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 - dist / (connectionDistance * 10)})`; // Fade out line
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile, prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-50"
        />
    );
}
