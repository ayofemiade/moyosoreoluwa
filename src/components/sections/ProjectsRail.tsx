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
            // We are scrolling the 'section' horizontally
            const scrollWidth = section.scrollWidth;
            const windowWidth = window.innerWidth;
            const xMove = -(scrollWidth - windowWidth + 100); // 100px padding

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
        <section id="projects" className="relative bg-background">
            <div ref={triggerRef}>
                <div className="min-h-screen flex flex-col justify-center py-20 w-full overflow-hidden">
                    <div className="container mx-auto px-6 mb-8">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Selected Work</h2>
                        <p className="text-2xl md:text-5xl font-display font-medium max-w-full md:max-w-4xl break-words">
                            Engineering experiences that define brands.
                        </p>
                    </div>

                    <div
                        ref={sectionRef}
                        className="flex flex-col md:flex-row gap-8 px-6 w-full md:w-max"
                    >
                        {PROJECTS.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

