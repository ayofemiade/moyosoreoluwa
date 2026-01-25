"use client";

import { useState, useEffect } from "react";

export function useMobilePerformance() {
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // 1. Check screen width
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // 2. Check reduced motion
        const checkMotion = () => {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            setPrefersReducedMotion(mediaQuery.matches);
        };

        // Initial check
        checkMobile();
        checkMotion();

        // Listeners
        window.addEventListener("resize", checkMobile);
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        motionQuery.addEventListener("change", (e) => setPrefersReducedMotion(e.matches));

        return () => {
            window.removeEventListener("resize", checkMobile);
            motionQuery.removeEventListener("change", (e) => setPrefersReducedMotion(e.matches));
        };
    }, []);

    return { isMobile, prefersReducedMotion };
}
