"use client";

import { useState, useEffect, useCallback } from "react";
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
import { useAmbientSound } from "@/components/hero/useAmbientSound";
import SoundToggle from "@/components/hero/SoundToggle";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  // Ambient sound — uses synthesized drone by default.
  // To use a real audio file, add it to /public/sounds/ and pass:
  //   useAmbientSound({ audioSrc: "/sounds/ambient.mp3" })
  const { play: playAmbient, toggleMute, isPlaying, isMuted } = useAmbientSound({
    volume: 0.05,
    fadeInDuration: 3,
  });

  const handleIntroComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  // Trigger ambient sound when hero content becomes visible
  useEffect(() => {
    if (showContent) {
      // Small delay to let the hero fade in before sound starts
      const timer = setTimeout(() => {
        playAmbient();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showContent, playAmbient]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <CinematicIntro onComplete={handleIntroComplete} />

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

      {/* Sound toggle — only visible after hero loads */}
      {showContent && (
        <SoundToggle
          isMuted={isMuted}
          isPlaying={isPlaying}
          onToggle={toggleMute}
        />
      )}
    </main>
  );
}
