"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/content/copy";
import FadeIn from "@/components/motion/FadeIn";

export default function About() {
    return (
        <section id="about" className="py-32 px-6 flex justify-center">
            <div className="max-w-4xl w-full">
                <FadeIn
                    className="relative rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Identity</h2>

                            <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed">
                                &quot;{ABOUT_CONTENT.profile.oneLiner}&quot;
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {ABOUT_CONTENT.profile.highlightPills.map((pill, i) => (
                                    <span
                                        key={pill}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-foreground/80 border border-white/5"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
