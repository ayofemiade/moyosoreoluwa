import React, { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { SOCIALS } from "@/content/socials";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicContact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const textOverOrbRef = useRef<HTMLDivElement>(null);
    const whiteBlockRef = useRef<HTMLDivElement>(null);
    const finalContentRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    const [copied, setCopied] = useState(false);
    const email = "oreayofemi@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        if (!containerRef.current || !stickyRef.current || !orbRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", 
                // Reduced from 4000px to 2500px to require less scrolling
                end: "+=2500",
                scrub: 1,      
                pin: stickyRef.current,
                refreshPriority: -1, 
            }
        });

        // Phase 1: Morph the orb to full screen
        tl.to(orbRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            duration: 1.0,
            ease: "power2.inOut",
        }, 0);

        // Phase 1.5: The Teaser Dome (Rising Sun)
        // Starts at t=0 so it rises as the dark orb expands
        tl.fromTo(whiteBlockRef.current,
            { clipPath: "circle(0% at 50% 100%)" },
            { clipPath: "circle(15% at 50% 100%)", duration: 1.0, ease: "power2.out" },
            0
        );

        // Phase 2: Reveal Contact info over the expanded dark orb
        const orbTextItems = gsap.utils.toArray(".orb-text-item", textOverOrbRef.current);
        tl.fromTo(orbTextItems, 
            { y: 60, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, stagger: 0.1, ease: "power3.out" },
            0.6 // Starts revealing while the orb is still finishing its expansion
        );

        // Phase 3: Organic White Background Full Emergence
        tl.to(whiteBlockRef.current,
            { clipPath: "circle(150% at 50% 100%)", duration: 1.5, ease: "power2.inOut" },
            1.6 // Starts immediately as Phase 2 finishes settling
        );

        // Fade out the scroll indicator as the white background emerges
        tl.to(scrollIndicatorRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        }, 1.6);

        // Subtly parallax the text over the orb away as the white mask overtakes it
        tl.to(textOverOrbRef.current, {
            y: "-30%",
            opacity: 0,
            duration: 1.0,
            ease: "power3.inOut"
        }, 1.6);

        // Phase 4: Reveal final typography inside the white block
        const finalContactItems = gsap.utils.toArray(".final-contact-item", finalContentRef.current);
        tl.fromTo(finalContactItems,
            { y: 80, opacity: 0, filter: "blur(15px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.1, ease: "power3.out" },
            2.0 // Starts while the white background is still expanding outward
        );

    }, { scope: containerRef });

    return (
        // z-50 ensures this section strictly overlaps the Timeline
        // Reduced container height to 250vh to match the tighter 2500px scroll duration
        <section ref={containerRef} id="contact" className="relative h-[250vh] bg-background z-50">
            <div ref={stickyRef} className="h-screen w-full flex items-center justify-center overflow-hidden relative bg-background">
                
                {/* Layer 1: Morphing Dark Orb */}
                <div 
                    ref={orbRef}
                    className="absolute z-0 flex items-center justify-center overflow-hidden bg-[#080808] will-change-transform shadow-[0_0_100px_rgba(0,0,0,0.3)]"
                    style={{ 
                        width: "120px", 
                        height: "120px", 
                        borderRadius: "50%",
                    }}
                >
                    {/* Subtle noise/gradient inside the orb to make it feel premium */}
                    <div 
                        className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
                        }}
                    />
                </div>

                {/* Layer 2: Contact Info over the dark orb */}
                <div 
                    ref={textOverOrbRef} 
                    className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 pointer-events-none"
                >
                    <div className="orb-text-item opacity-0 pointer-events-auto flex flex-col items-center">
                        <h3 className="text-4xl md:text-7xl font-display font-medium text-white mb-10 tracking-tight">
                            Have a project in mind?
                        </h3>
                        
                        {/* Email Copy Button (White background) */}
                        <button
                            onClick={handleCopy}
                            className="relative group inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black shadow-xl hover:scale-105 transition-all duration-300 mb-8 will-change-transform"
                        >
                            <span className="text-base sm:text-xl md:text-2xl font-mono font-medium">{email}</span>
                            <div className="p-2 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors">
                                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-black" />}
                            </div>
                            {copied && (
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-green-600 bg-white shadow-lg backdrop-blur px-3 py-1.5 rounded-full font-bold">
                                    Copied!
                                </span>
                            )}
                        </button>

                        {/* Socials over dark background */}
                        <div className="flex justify-center gap-6 w-full">
                            {SOCIALS.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white hover:text-white transition-all hover:scale-110 will-change-transform"
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Layer 3: Solid White Block (Organic clip-path reveal) */}
                <div 
                    ref={whiteBlockRef}
                    className="absolute inset-0 z-20 bg-background flex flex-col justify-center items-center px-6 pb-32 md:pb-24 will-change-transform"
                    style={{ clipPath: "circle(0% at 50% 100%)" }}
                >
                    <div ref={finalContentRef} className="w-full max-w-5xl flex flex-col items-center text-center relative z-10">
                        <div className="final-contact-item opacity-0">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4 md:mb-6">What&apos;s Next?</h2>
                        </div>
                        
                        {/* Optimized Giant Typography with Red Hover */}
                        <div className="final-contact-item opacity-0 group">
                            <h3 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6rem] font-display font-semibold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.95] transition-colors duration-500 group-hover:text-red-600 cursor-default">
                                LET&apos;S BUILD<br />
                                SOMETHING<br />
                                <span className="text-accent group-hover:text-red-500 italic font-serif tracking-normal lowercase transition-colors duration-500">impossible</span>.
                            </h3>
                        </div>

                        <div className="final-contact-item opacity-0">
                            <p className="text-lg md:text-xl lg:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-light px-4 md:px-0">
                                I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                            </p>
                        </div>
                    </div>

                    {/* ── THE RISING SUN UX: SCROLL INDICATOR ── */}
                    {/* Positioned higher (bottom-28 to bottom-32) so it clears the global navigation dock, but still fits inside the initial 15% dome */}
                    <div ref={scrollIndicatorRef} className="absolute bottom-32 md:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 z-0 cursor-default pointer-events-none">
                        <div className="w-16 h-16 relative flex items-center justify-center">
                            {/* Rotating text */}
                            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 animate-[spin_8s_linear_infinite]">
                                <path id="textPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                                <text className="text-[11.5px] font-mono tracking-[0.25em] uppercase fill-foreground font-bold">
                                    <textPath href="#textPath" startOffset="0">Keep Scrolling • Keep Scrolling • </textPath>
                                </text>
                            </svg>
                            {/* Bouncing Arrow */}
                            <svg 
                                className="w-5 h-5 text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" 
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
}
