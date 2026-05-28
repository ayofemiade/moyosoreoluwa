"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 120;
// How many frames must load before we show the "Enter" button.
// 20 frames ≈ first 1.3s of animation — enough to start the experience.
const CRITICAL_FRAME_COUNT = 20;
const DESKTOP_PREFIX = "/sequence";
const MOBILE_PREFIX = "/sequence_mobile";

let loadedImages: HTMLImageElement[] = [];
let loadPromise: Promise<void> | null = null;
let criticalLoadPromise: Promise<void> | null = null;
let isFullyLoaded = false;
let isCriticalLoaded = false;
let globalLoadedCount = 0;

type ProgressSubscriber = (progress: number) => void;
type CriticalSubscriber = () => void;
const progressSubscribers = new Set<ProgressSubscriber>();
const criticalSubscribers = new Set<CriticalSubscriber>();

if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 768;
    const initialPrefix = isMobile ? MOBILE_PREFIX : DESKTOP_PREFIX;

    let criticalResolve: (() => void) | null = null;
    let fullResolve: (() => void) | null = null;

    criticalLoadPromise = new Promise((resolve) => { criticalResolve = resolve; });
    loadPromise = new Promise((resolve) => { fullResolve = resolve; });

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        let hasTriedFallback = false;

        const attemptLoad = (prefix: string) => {
            img.src = `${prefix}/frame_${frameIndex}_delay-0.067s.webp`;
        };

        const onComplete = () => {
            globalLoadedCount++;
            const progress = Math.round((globalLoadedCount / FRAME_COUNT) * 100);
            progressSubscribers.forEach(sub => sub(progress));

            // Fire the critical promise once the first batch is ready
            if (globalLoadedCount === CRITICAL_FRAME_COUNT && !isCriticalLoaded) {
                isCriticalLoaded = true;
                criticalSubscribers.forEach(sub => sub());
                criticalResolve?.();
            }

            if (globalLoadedCount === FRAME_COUNT) {
                isFullyLoaded = true;
                fullResolve?.();
            }
        };

        img.onload = onComplete;
        img.onerror = () => {
            if (isMobile && !hasTriedFallback) {
                hasTriedFallback = true;
                attemptLoad(DESKTOP_PREFIX);
            } else {
                onComplete();
            }
        };

        attemptLoad(initialPrefix);
        loadedImages.push(img);
    }
}

export function useFramePreloader() {
    // Initial state consistent for SSR hydration
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Sync with actual client state after hydration
        setIsLoaded(isCriticalLoaded || isFullyLoaded);
        setProgress(isFullyLoaded ? 100 : Math.round((globalLoadedCount / FRAME_COUNT) * 100));

        if (isCriticalLoaded) return;

        const handleProgress = (p: number) => setProgress(p);
        progressSubscribers.add(handleProgress);

        const handleCritical = () => setIsLoaded(true);
        criticalSubscribers.add(handleCritical);

        if (criticalLoadPromise) {
            criticalLoadPromise.then(() => {
                setIsLoaded(true);
            });
        }

        return () => {
            progressSubscribers.delete(handleProgress);
            criticalSubscribers.delete(handleCritical);
        };
    }, []);

    const isFirstFrameLoaded = loadedImages[0]?.complete ?? false;

    return { images: loadedImages, isLoaded, isFirstFrameLoaded, progress };
}
