"use client";

import { useState, useCallback } from "react";
import CinematicIntro from "@/components/motion/CinematicIntro";
import Hero from "@/components/sections/Hero";
import SequenceExperience from "@/components/sequence/SequenceExperience";
import ProjectsRail from "@/components/sections/ProjectsRail";
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

  const handleEnter = useCallback(() => {
    playAmbient();
  }, [playAmbient]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <CinematicIntro onComplete={handleIntroComplete} onEnter={handleEnter} />

      {showContent && (
        <div className="animate-fade-in">
          <Hero />
          <SequenceExperience />
          <ProjectsRail />
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
