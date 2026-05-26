"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsRail() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Calculate total width of all cards + gaps
            // We are scrolling the 'section' horizontally. No padding to account for in monolithic design.
            const scrollWidth = section.scrollWidth;
            const windowWidth = window.innerWidth;
            const xMove = -(scrollWidth - windowWidth);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: "center center", // Center the section in the viewport before pinning
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            // Hold for a bit so the user can see the "Selected Work" header and first card properly
            tl.to(section, {
                x: 0,
                duration: 1, // Represents "time" or scroll distance to hold
            })
                .to(section, {
                    x: xMove,
                    ease: "none",
                    duration: 4, // 4x longer than the hold, meaningful scroll length
                });
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section id="projects" className="relative bg-[#0a0a0a]">
            <div ref={triggerRef}>
                <div className="h-screen supports-[height:100dvh]:h-[100dvh] flex flex-col justify-center w-full overflow-hidden">
                    <div
                        ref={sectionRef}
                        className="flex flex-col md:flex-row h-full w-full md:w-max"
                    >
                        {/* Architectural Intro Panel */}
                        <div className="w-full md:w-[600px] h-[40vh] md:h-full flex flex-col justify-center md:justify-end p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 mb-6 md:mb-8">Selected Work</h2>
                            <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white max-w-full break-words leading-tight tracking-tight">
                                Built realities. <br />
                                <span className="text-white/40">Not just concepts.</span>
                            </p>
                        </div>

                        {PROJECTS.map((project) => (
                            <ProjectCard key={project.slug} project={project} className="shrink-0" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

