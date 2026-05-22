"use client";

import { useSpring, MotionValue } from "framer-motion";

/**
 * Applies a smooth spring physics interpolation to a raw scroll progress value.
 * This makes the scroll scrubbing feel cinematic and fluid instead of rigid.
 */
export function useSmoothScrub(rawProgress: MotionValue<number>) {
    return useSpring(rawProgress, {
        stiffness: 50,
        damping: 15,
        mass: 0.1,
        restDelta: 0.001
    });
}
