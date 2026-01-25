"use client";

import { useState } from "react";
import CinematicIntro from "@/components/motion/CinematicIntro";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Strengths from "@/components/sections/Strengths";
import Metrics from "@/components/sections/Metrics";
import ProjectsRail from "@/components/sections/ProjectsRail";
import SkillsGalaxy from "@/components/sections/SkillsGalaxy";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <CinematicIntro onComplete={() => setShowContent(true)} />

      {showContent && (
        <div className="animate-fade-in">
          <Hero />
          <About />
          <Strengths />
          <Metrics />
          <ProjectsRail />
          <SkillsGalaxy />
          <Timeline />
          <Contact />
          <Footer />
          <div className="h-24 md:h-0" /> {/* Mobile dock spacer */}
        </div>
      )}
    </main>
  );
}
