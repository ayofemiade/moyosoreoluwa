"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DigitalUniverse() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    
    // World Refs
    const world1Ref = useRef<HTMLDivElement>(null);
    const world2Ref = useRef<HTMLDivElement>(null);
    const world3Ref = useRef<HTMLDivElement>(null);
    const world4Ref = useRef<HTMLDivElement>(null);

    // Specific Elements for Animation
    const w1TextRef = useRef<HTMLHeadingElement>(null);
    const w2TextRef = useRef<HTMLHeadingElement>(null);
    const w3GridRef = useRef<HTMLDivElement>(null);
    const radarLineRef = useRef<HTMLDivElement>(null);
    const radarTextRef = useRef<HTMLDivElement>(null);

    // Tactile Noise Texture
    const NoiseOverlay = () => (
        <svg className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] w-full h-full mix-blend-overlay">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    );

    useGSAP(() => {
        // Initial setup
        gsap.set(world1Ref.current, { clipPath: "polygon(49.5% 0%, 50.5% 0%, 50.5% 100%, 49.5% 100%)", zIndex: 10 }); // Vertical slit
        gsap.set(world2Ref.current, { clipPath: "circle(0% at 100% 100%)", zIndex: 20 }); // Bottom right dot
        gsap.set(world3Ref.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", zIndex: 30 }); // Bottom reveal
        gsap.set(world4Ref.current, { opacity: 0, zIndex: 40 }); // Fade reveal

        // Text setups
        gsap.set(w1TextRef.current, { x: "50%" });
        gsap.set(w2TextRef.current, { y: "20%", opacity: 0 });
        gsap.set(w3GridRef.current, { scale: 1.1, opacity: 0 });
        gsap.set(radarLineRef.current, { top: "0%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=8000", // Massive scroll distance for pacing
                scrub: 1,
                pin: stickyRef.current,
                anticipatePin: 1,
            }
        });

        // ============================================
        // SEQUENCE 1: WORLD 01 (CONVERGSAI)
        // ============================================
        // 1. Open the slit to full screen
        tl.to(world1Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power3.inOut"
        }, 0);
        
        // 2. Scrub the massive text horizontally while scrolling
        tl.to(w1TextRef.current, {
            x: "-50%",
            duration: 2,
            ease: "none"
        }, 0);

        // ============================================
        // SEQUENCE 2: WORLD 02 (DIGITAL EXPERIENCES)
        // ============================================
        // Starts expanding from bottom right over World 1
        tl.to(world2Ref.current, {
            clipPath: "circle(150% at 100% 100%)",
            duration: 1.5,
            ease: "power2.inOut"
        }, 2); // Overlaps the end of W1 text scrub

        // Text rises up as the circle expands
        tl.to(w2TextRef.current, {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, 2.2);

        // Hold and slight parallax
        tl.to(w2TextRef.current, { y: "-5%", duration: 1, ease: "none" }, 3.2);

        // ============================================
        // SEQUENCE 3: WORLD 03 (ENGINEERING)
        // ============================================
        // Brutalist snap up from the bottom
        tl.to(world3Ref.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "expo.inOut"
        }, 4.2);

        // Snap grid into place
        tl.to(w3GridRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, 4.5);

        // Hold
        tl.to(w3GridRef.current, { scale: 0.95, duration: 1, ease: "none" }, 5.5);

        // ============================================
        // SEQUENCE 4: WORLD 04 (FUTURE REALITIES)
        // ============================================
        // Fade to absolute black
        tl.to(world4Ref.current, {
            opacity: 1,
            duration: 1,
            ease: "none"
        }, 6.5);

        // Radar line sweeps down
        tl.to(radarLineRef.current, {
            top: "100%",
            duration: 1.5,
            ease: "power1.inOut"
        }, 7.5);

        // Text glows exactly when radar hits it (around 50% down)
        tl.to(radarTextRef.current, {
            opacity: 1,
            textShadow: "0 0 20px rgba(255,255,255,0.8)",
            duration: 0.2,
        }, 8.2);
        tl.to(radarTextRef.current, {
            opacity: 0.3,
            textShadow: "0 0 0px rgba(255,255,255,0)",
            duration: 1,
        }, 8.5);

    }, { scope: containerRef });

    return (
        <section id="universe" ref={containerRef} className="relative h-[1000vh] bg-black">
            <NoiseOverlay />
            
            <div ref={stickyRef} className="h-screen w-full overflow-hidden relative bg-black">

                {/* ── WORLD 01: CONVERGSAI ── */}
                <div ref={world1Ref} className="absolute inset-0 bg-[#0a0a0a] flex items-center overflow-hidden">
                    {/* Abstract atmospheric background */}
                    <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 50% 50%, #4f46e5 0%, transparent 50%)" }} />
                    
                    {/* Massive Kinetic Typography */}
                    <h1 ref={w1TextRef} className="text-[18vw] font-display font-black text-transparent whitespace-nowrap leading-none tracking-tighter" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                        CONVERGSAI CONVERGSAI
                    </h1>
                    
                    {/* Editorial Overlay */}
                    <div className="absolute bottom-12 left-12 md:bottom-24 md:left-24 max-w-lg z-10 mix-blend-difference text-white">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-white"></span>
                            <span className="font-mono text-xs uppercase tracking-[0.4em]">World 01</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 leading-tight">The Dominant Reality</h2>
                        <p className="text-white/60 font-light mb-8 text-sm md:text-base leading-relaxed">
                            Voice technology and AI systems converging. We are not just building applications; we are architecting living technological ecosystems.
                        </p>
                        <Link href="/projects/convergsai" className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors">
                            Enter Reality <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* ── WORLD 02: DIGITAL EXPERIENCES ── */}
                <div ref={world2Ref} className="absolute inset-0 bg-[#f4f4f5] text-[#09090b] flex items-center justify-center overflow-hidden">
                    {/* Organic gradient mesh background */}
                    <div className="absolute inset-0 opacity-30 blur-[100px]" style={{ background: "radial-gradient(circle at 80% 20%, #d8b4fe 0%, transparent 40%), radial-gradient(circle at 20% 80%, #93c5fd 0%, transparent 40%)" }} />
                    
                    <div ref={w2TextRef} className="w-full h-full flex flex-col md:flex-row items-center justify-between p-12 md:p-24 z-10">
                        {/* Huge Editorial Text */}
                        <div className="flex-1">
                            <h2 className="text-[12vw] md:text-[8vw] font-display font-medium leading-[0.85] tracking-tighter mix-blend-multiply">
                                Ethereal<br/>Craft.
                            </h2>
                        </div>
                        
                        {/* Right aligned description */}
                        <div className="flex-1 md:max-w-md mt-12 md:mt-0 flex flex-col justify-end h-full border-l border-black/10 pl-8">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40 mb-6">World 02</span>
                            <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed mb-8">
                                Transforming organizations through visceral digital experiences. We abandon the template and build bespoke realities for the web.
                            </p>
                            <Link href="/projects/resobridge" className="inline-flex items-center justify-between px-6 py-4 bg-black text-white rounded-full font-mono text-xs uppercase tracking-widest hover:bg-black/80 transition-colors w-max gap-8">
                                Explore Craft <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── WORLD 03: ENGINEERING ── */}
                <div ref={world3Ref} className="absolute inset-0 bg-[#09090b] text-white flex items-center justify-center overflow-hidden">
                    {/* Brutalist Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    
                    <div ref={w3GridRef} className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-px bg-white/10 p-px z-10">
                        <div className="col-span-1 md:col-span-12 bg-[#09090b] p-8 md:p-16 flex justify-between items-start">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500">World 03</span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">SYS.MATTA.01</span>
                        </div>
                        
                        <div className="col-span-1 md:col-span-8 bg-[#09090b] p-8 md:p-16">
                            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-none mb-6">
                                Structural Precision.
                            </h2>
                            <p className="text-white/50 text-lg font-light max-w-xl">
                                Architecting robust, production-grade frontend systems at Matta. Unyielding quality. Absolute technical mastery.
                            </p>
                        </div>
                        
                        <div className="col-span-1 md:col-span-4 bg-[#09090b] p-8 md:p-16 flex flex-col justify-end gap-4">
                            {["Production Architecture", "Unit Testing Protocols", "Quality Assurance"].map(tag => (
                                <div key={tag} className="border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── WORLD 04: FUTURE REALITIES ── */}
                <div ref={world4Ref} className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                    {/* The sweeping radar line */}
                    <div ref={radarLineRef} className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_20px_#fff] z-10 opacity-50" />
                    
                    <div className="relative z-20 text-center mix-blend-screen">
                        <div ref={radarTextRef} className="opacity-0">
                            <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 mb-4">World 04</span>
                            <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight">
                                He is still building.
                            </h2>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
