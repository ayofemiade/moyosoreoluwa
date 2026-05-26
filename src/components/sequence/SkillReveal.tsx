"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillRevealProps {
    scrollYProgress: MotionValue<number>;
}

const skills = [
    { name: "React", top: "15%", left: "10%", depth: 0.5 },
    { name: "Next.js", top: "25%", left: "75%", depth: 0.8 },
    { name: "TypeScript", top: "60%", left: "15%", depth: 0.6 },
    { name: "Tailwind CSS", top: "75%", left: "80%", depth: 0.4 },
    { name: "Framer Motion", top: "40%", left: "85%", depth: 0.7 },
    { name: "GSAP", top: "80%", left: "30%", depth: 0.9 },
    { name: "Three.js", top: "10%", left: "60%", depth: 0.5 },
    { name: "Node.js", top: "45%", left: "5%", depth: 0.3 },
    { name: "Python", top: "85%", left: "60%", depth: 0.8 },
    { name: "LiveKit", top: "20%", left: "40%", depth: 0.6 },
    { name: "OpenAI API", top: "65%", left: "45%", depth: 0.5 },
    { name: "Cartesia", top: "35%", left: "30%", depth: 0.7 },
    { name: "Cerebras", top: "55%", left: "65%", depth: 0.4 },
    { name: "Supabase", top: "90%", left: "10%", depth: 0.6 },
    { name: "Git", top: "5%", left: "85%", depth: 0.3 },
    { name: "Figma", top: "95%", left: "85%", depth: 0.5 },
    { name: "Docker", top: "30%", left: "55%", depth: 0.8 }
];

export default function SkillReveal({ scrollYProgress }: SkillRevealProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Skills appear beautifully during the entire vortex scene (0.35 to 0.70)
    const containerOpacity = useTransform(scrollYProgress, [0.30, 0.35, 0.68, 0.72], [0, 1, 1, 0]);

    return (
        <motion.div 
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        >
            <div className="absolute inset-0" style={{ perspective: "1000px" }}>
                {skills.map((skill, index) => {
                    // Distributed continuously across the vortex scroll (0.35 to 0.65)
                    const start = 0.35 + (index * 0.015);
                    const peak = start + 0.04;
                    const fade = 0.66;
                    const end = 0.70;

                    // Opacity peaks higher (1.0) so it's clearly visible against the blurred hero background
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [start, peak, fade, end], [0, 1, 1, 0]);
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const translateZ = useTransform(scrollYProgress, [start, end], [-500 * skill.depth, 600 * skill.depth]);
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateX = useTransform(scrollYProgress, [start, end], [-10 * skill.depth, 10 * skill.depth]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = useTransform(scrollYProgress, [start, end], [10 * skill.depth, -10 * skill.depth]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const blur = useTransform(
                        scrollYProgress, 
                        [start, peak, fade, end], 
                        ["blur(15px)", `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, "blur(20px)"]
                    );

                    const leftVal = parseInt(skill.left);
                    const isRightAligned = leftVal > 50;

                    const positionStyle = isRightAligned 
                        ? { right: `${100 - leftVal}%` } 
                        : { left: skill.left };

                    return (
                        <motion.div
                            key={skill.name}
                            style={{ 
                                opacity, 
                                rotateX,
                                rotateY,
                                z: translateZ,
                                filter: blur,
                                top: skill.top,
                                ...positionStyle,
                                transformStyle: "preserve-3d"
                            }}
                            className={`absolute flex items-center gap-2 md:gap-4 text-white ${isRightAligned ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Glowing Node */}
                            <div className="relative flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                                <div className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-white/40 animate-ping" style={{ animationDuration: '3s' }} />
                            </div>
                            
                            {/* Technical Readout Typography */}
                            <div className={`flex flex-col ${isRightAligned ? 'items-end text-right' : 'items-start text-left'}`}>
                                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/70">SYS.NODE</span>
                                <span className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.1em] font-medium text-white drop-shadow-[0_2px_20px_rgba(255,255,255,1)] whitespace-nowrap">
                                    {skill.name}
                                </span>
                            </div>
                            
                            {/* Decorative Line to simulate connections */}
                            <div className={`hidden sm:block w-16 md:w-32 h-[1px] ${isRightAligned ? 'bg-gradient-to-l mr-2 md:mr-4' : 'bg-gradient-to-r ml-2 md:ml-4'} from-white/40 to-transparent flex-shrink-0`} />
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
