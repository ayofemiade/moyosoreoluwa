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
                end: "+=4000",
                scrub: 1,      
                pin: stickyRef.current,
                refreshPriority: -1, // Ensures this calculates AFTER ProjectsRail adds its 3000px pin spacer
            }
        });

        // Phase 1: Morph the orb to full screen
        tl.to(orbRef.current, {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            duration: 1.5,
            ease: "power2.inOut",
        }, 0);

        // Phase 2: Reveal Contact info over the expanded dark orb
        const orbTextItems = gsap.utils.toArray(".orb-text-item", textOverOrbRef.current);
        tl.fromTo(orbTextItems, 
            { y: 60, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.15, ease: "power3.out" },
            1.0
        );

        // Phase 3: Organic White Background Emergence using clip-path
        tl.fromTo(whiteBlockRef.current,
            { clipPath: "circle(0% at 50% 100%)" },
            { clipPath: "circle(150% at 50% 100%)", duration: 2.5, ease: "power2.inOut" },
            2.5
        );

        // Subtly parallax the text over the orb away as the white mask overtakes it
        tl.to(textOverOrbRef.current, {
            y: "-30%",
            opacity: 0,
            duration: 1.5,
            ease: "power3.inOut"
        }, 2.5);

        // Phase 4: Reveal final typography inside the white block
        const finalContactItems = gsap.utils.toArray(".final-contact-item", finalContentRef.current);
        tl.fromTo(finalContactItems,
            { y: 80, opacity: 0, filter: "blur(15px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.15, ease: "power3.out" },
            3.2
        );

    }, { scope: containerRef });

    return (
        // z-50 ensures this section strictly overlaps the Timeline (which uses z-20 for its nodes)
        <section ref={containerRef} id="contact" className="relative h-[400vh] bg-background z-50">
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
                    <div ref={finalContentRef} className="w-full max-w-5xl flex flex-col items-center text-center">
                        <div className="final-contact-item opacity-0">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4 md:mb-8">What&apos;s Next?</h2>
                        </div>
                        
                        {/* Optimized Giant Typography with Red Hover */}
                        <div className="final-contact-item opacity-0 group">
                            <h3 className="text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] font-display font-semibold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.95] transition-colors duration-500 group-hover:text-red-600 cursor-default">
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
                </div>
                
            </div>
        </section>
    );
}
