"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TIMELINE } from "@/content/timeline";

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="timeline" ref={containerRef} className="py-32 px-6 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16 text-center">Journey</h2>

                <div className="relative border-l border-white/5 md:border-none pl-8 md:pl-0">
                    {/* Center Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2">
                        <motion.div style={{ height }} className="w-full bg-accent relative">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                        </motion.div>
                    </div>

                    <div className="space-y-12 md:space-y-24">
                        {TIMELINE.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row gap-8 md:gap-0 relative ${isEven ? "md:flex-row-reverse" : ""}`}
        >
            {/* Dot on Line */}
            <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 rounded-full border border-white/20 bg-background z-10">
                <div className="w-full h-full rounded-full bg-white/20 scale-50" />
            </div>

            <div className="flex-1 md:w-1/2" />

            <div className={`flex-1 md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                <span className="text-accent font-mono text-sm mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-display font-medium mb-1">{item.title}</h3>
                <div className="text-muted-foreground mb-4">{item.role}</div>
                <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-muted-foreground uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
