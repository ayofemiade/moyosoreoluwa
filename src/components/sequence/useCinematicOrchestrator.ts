"use client";

import { useSpring, useTransform, MotionValue } from "framer-motion";

interface OrchestratorConfig {
    plateaus: {
        inputStart: number;
        inputEnd: number;
        outputValue: number;
    }[];
}

/**
 * Applies Checkpoint Gravity Mapping and Inertia Springs to raw scroll progress.
 * This guarantees the animation "settles" on key scenes even if the user stops scrolling,
 * and completely eliminates mechanical frame-by-frame scrubbing.
 */
export function useCinematicOrchestrator(
    rawProgress: MotionValue<number>,
    config?: OrchestratorConfig
) {
    // Default config creates massive plateaus for the 3 main cinematic scenes
    const defaultPlateaus = [
        { inputStart: 0.15, inputEnd: 0.35, outputValue: 0.25 }, // Crystal Scene settling
        { inputStart: 0.50, inputEnd: 0.70, outputValue: 0.58 }, // Vortex & Skills settling
        { inputStart: 0.85, inputEnd: 1.00, outputValue: 1.00 }, // City Reveal settling
    ];

    const activePlateaus = config?.plateaus || defaultPlateaus;

    // Build the input and output arrays for useTransform
    const inputs: number[] = [0];
    const outputs: number[] = [0];

    activePlateaus.forEach((plateau) => {
        inputs.push(plateau.inputStart, plateau.inputEnd);
        outputs.push(plateau.outputValue, plateau.outputValue);
    });

    if (inputs[inputs.length - 1] !== 1) {
        inputs.push(1);
        outputs.push(1);
    }

    // 1. Gravity Map: This transforms the raw linear scroll into a staircase
    // of rapid transitions and long, stable plateaus.
    const gravityMappedProgress = useTransform(rawProgress, inputs, outputs);

    // 2. Inertia Spring: This smooths out the "staircase" so the transitions feel
    // like massive cinematic glides rather than harsh snap jumps.
    // Highly damped, low stiffness creates a very elegant, slow-settling momentum.
    return useSpring(gravityMappedProgress, {
        stiffness: 30, // Low stiffness = slow, majestic movement
        damping: 15,   // High damping relative to stiffness = no bouncing, just smooth settling
        mass: 0.2,     // Adds a feeling of heavy momentum
        restDelta: 0.0001
    });
}
