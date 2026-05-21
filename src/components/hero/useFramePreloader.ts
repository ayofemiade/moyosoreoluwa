"use client";

import { useEffect, useState } from "react";

const FRAME_COUNT = 120;
const FRAME_PREFIX = "/sequence";

let loadedImages: HTMLImageElement[] = [];
let loadPromise: Promise<void> | null = null;
let isFullyLoaded = false;
let globalLoadedCount = 0;

type ProgressSubscriber = (progress: number) => void;
const subscribers = new Set<ProgressSubscriber>();

if (typeof window !== "undefined") {
    loadPromise = new Promise((resolve) => {
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `${FRAME_PREFIX}/frame_${frameIndex}_delay-0.067s.webp`;
            
            const onComplete = () => {
                globalLoadedCount++;
                const progress = Math.round((globalLoadedCount / FRAME_COUNT) * 100);
                subscribers.forEach(sub => sub(progress));

                if (globalLoadedCount === FRAME_COUNT) {
                    isFullyLoaded = true;
                    resolve();
                }
            };
            
            img.onload = onComplete;
            img.onerror = onComplete; // handle error silently to not block

            loadedImages.push(img);
        }
    });
}

export function useFramePreloader() {
    // Initial state must be consistent for SSR hydration (0 progress, false loaded)
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Sync with actual client state after hydration
        setIsLoaded(isFullyLoaded);
        setProgress(isFullyLoaded ? 100 : Math.round((globalLoadedCount / FRAME_COUNT) * 100));

        if (isFullyLoaded) return;

        const handleProgress = (p: number) => setProgress(p);
        subscribers.add(handleProgress);

        if (loadPromise) {
            loadPromise.then(() => {
                setIsLoaded(true);
                setProgress(100);
            });
        }

        return () => {
            subscribers.delete(handleProgress);
        };
    }, []);

    const isFirstFrameLoaded = loadedImages[0]?.complete ?? false;

    return { images: loadedImages, isLoaded, isFirstFrameLoaded, progress };
}
