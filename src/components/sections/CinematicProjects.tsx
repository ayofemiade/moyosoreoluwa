"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/content/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function ProjectTower({ project, index }: { project: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the image inside the structure
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div 
            ref={ref}
            style={{ opacity, scale }}
            className="relative h-[80vh] md:h-[90vh] w-full max-w-7xl mx-auto flex items-center justify-center mb-32 sticky top-10"
        >
            <Link href={`/projects/${project.slug}`} className="group block w-full h-full relative">
                {/* Structure / Panel */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-black/50 border border-white/5 backdrop-blur-3xl shadow-2xl">
                    <motion.div 
                        style={{ y }} 
                        className={cn("absolute inset-0 w-full h-[140%] -top-[20%]", project.image)} 
                    />
                    
                    {/* Atmospheric gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 flex flex-col md:flex-row justify-between items-end w-full">
                        <div className="max-w-2xl">
                            <div className="flex flex-wrap gap-3 mb-6">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1.5 text-xs uppercase font-medium tracking-widest bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-4xl md:text-7xl font-display font-medium text-white mb-4 drop-shadow-xl tracking-tight">{project.title}</h3>
                            <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed">{project.tagline}</p>
                        </div>

                        <div className="hidden md:flex h-20 w-20 rounded-full bg-white text-black items-center justify-center hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            <ArrowUpRight className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CinematicProjects() {
    return (
        <section id="projects" className="relative bg-[#121212] pt-32 pb-48 px-6 overflow-hidden">
            {/* Ambient Background Glow mapping back to the city reflection */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto mb-32 relative z-10">
                <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-white/20"></span>
                    Built Realities
                </h2>
                <p className="text-3xl md:text-6xl font-display font-medium text-white tracking-tight">
                    Execution meets <br className="hidden md:block" />
                    <span className="text-white/50">cinematic vision.</span>
                </p>
            </div>

            <div className="relative z-10 space-y-48">
                {PROJECTS.map((project, i) => (
                    <ProjectTower key={project.slug} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}
