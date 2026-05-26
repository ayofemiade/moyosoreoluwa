"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project, className }: { project: Project; className?: string }) {
    return (
        <Link href={`/projects/${project.slug}`} className={cn("block group relative overflow-hidden", className)}>
            <div
                className="relative h-[80vh] md:h-screen supports-[height:100dvh]:h-[100dvh] w-full md:w-[800px] border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0a]"
            >
                {/* Monolithic Image Texture */}
                <div className={cn("absolute inset-0 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 opacity-30 group-hover:opacity-70", project.image)} />

                {/* Obsidian Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                    <div className="flex gap-4 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {/* Architectural Typography */}
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white/30 group-hover:text-white transition-colors duration-700 uppercase tracking-tighter mb-4 leading-none">
                        {project.title}
                    </h3>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 transform md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <p className="text-white/60 text-lg md:text-2xl font-light max-w-xl">{project.tagline}</p>
                        
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md shrink-0 group-hover:bg-white group-hover:text-black transition-colors duration-500">
                            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                    </div>

                    {/* Stats integration */}
                    {project.stats && (
                        <div className="grid grid-cols-2 gap-8 mt-8 md:mt-12 pt-8 border-t border-white/10 transform md:translate-y-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                            {project.stats.map(stat => (
                                <div key={stat.label}>
                                    <div className="text-2xl md:text-3xl font-display text-white mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
