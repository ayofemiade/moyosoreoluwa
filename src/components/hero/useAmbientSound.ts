"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Ambient Sound System using Web Audio API
 *
 * Creates a subtle, warm ambient pad using layered detuned oscillators.
 * Designed to be audible on laptop speakers.
 *
 * To use a real audio file instead:
 *   useAmbientSound({ audioSrc: "/sounds/ambient.mp3" })
 */

interface AmbientSoundOptions {
    /** Path to an audio file. If provided, uses the file instead of synthesis. */
    audioSrc?: string;
    /** Master volume (0-1). Default: 0.12 */
    volume?: number;
    /** Fade-in duration in seconds. Default: 3 */
    fadeInDuration?: number;
    /** Fade-out duration in seconds. Default: 1.5 */
    fadeOutDuration?: number;
}

export function useAmbientSound(options: AmbientSoundOptions = {}) {
    const {
        audioSrc,
        volume = 0.12,
        fadeInDuration = 3,
        fadeOutDuration = 1.5,
    } = options;

    const audioContextRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const sourceNodesRef = useRef<OscillatorNode[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const isInitialized = useRef(false);
    const pendingPlay = useRef(false);

    const createSynthesizedAmbient = useCallback((ctx: AudioContext, masterGain: GainNode) => {
        // Frequencies audible on laptop speakers (higher range)
        // Creates a warm ambient chord: C4 + E4 + G4 + C5 with detuning for shimmer
        const layers = [
            { freq: 261.63, detune: -4, type: "sine" as OscillatorType, gain: 0.3 },     // C4
            { freq: 261.63, detune: 6, type: "sine" as OscillatorType, gain: 0.15 },      // C4 detuned (chorus)
            { freq: 329.63, detune: -3, type: "sine" as OscillatorType, gain: 0.2 },      // E4
            { freq: 392.00, detune: 5, type: "sine" as OscillatorType, gain: 0.18 },      // G4
            { freq: 523.25, detune: -2, type: "triangle" as OscillatorType, gain: 0.08 }, // C5 (soft shimmer)
        ];

        // Lowpass filter — warm but audible
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;
        filter.Q.value = 0.5;
        filter.connect(masterGain);

        // Subtle reverb-like effect using delay
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.3;
        const delayGain = ctx.createGain();
        delayGain.gain.value = 0.15;
        const delayFilter = ctx.createBiquadFilter();
        delayFilter.type = "lowpass";
        delayFilter.frequency.value = 600;

        filter.connect(delay);
        delay.connect(delayFilter);
        delayFilter.connect(delayGain);
        delayGain.connect(masterGain);

        const oscillators: OscillatorNode[] = [];

        layers.forEach(({ freq, detune, type, gain }) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc.type = type;
            osc.frequency.value = freq;
            osc.detune.value = detune;
            oscGain.gain.value = gain;

            osc.connect(oscGain);
            oscGain.connect(filter);
            osc.start();

            oscillators.push(osc);
        });

        return oscillators;
    }, []);

    const initAndPlay = useCallback(() => {
        if (isInitialized.current) {
            // Already initialized — just resume if suspended
            if (audioContextRef.current?.state === "suspended") {
                audioContextRef.current.resume().then(() => {
                    if (masterGainRef.current && audioContextRef.current) {
                        masterGainRef.current.gain.cancelScheduledValues(audioContextRef.current.currentTime);
                        masterGainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                        masterGainRef.current.gain.linearRampToValueAtTime(
                            volume,
                            audioContextRef.current.currentTime + fadeInDuration
                        );
                    }
                    setIsPlaying(true);
                    setIsMuted(false);
                });
            }
            return;
        }

        try {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new AudioCtx();
            audioContextRef.current = ctx;

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0, ctx.currentTime);
            masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + fadeInDuration);
            masterGain.connect(ctx.destination);
            masterGainRef.current = masterGain;

            if (audioSrc) {
                const audio = new Audio(audioSrc);
                audio.loop = true;
                audio.crossOrigin = "anonymous";
                const source = ctx.createMediaElementSource(audio);
                source.connect(masterGain);
                audio.play().catch(console.warn);
                audioElementRef.current = audio;
            } else {
                const oscillators = createSynthesizedAmbient(ctx, masterGain);
                sourceNodesRef.current = oscillators;
            }

            isInitialized.current = true;
            pendingPlay.current = false;
            setIsPlaying(true);
            setIsMuted(false);
        } catch (e) {
            console.warn("Ambient sound failed to initialize:", e);
        }
    }, [audioSrc, volume, fadeInDuration, createSynthesizedAmbient]);

    // Request play — may be deferred until user interaction
    const play = useCallback(() => {
        if (isInitialized.current) {
            initAndPlay();
            return;
        }
        // Try to create AudioContext — if browser blocks, set pending
        try {
            initAndPlay();
        } catch {
            pendingPlay.current = true;
        }
    }, [initAndPlay]);

    // Listen for first user interaction to unlock audio if pending
    useEffect(() => {
        const unlockAudio = () => {
            if (pendingPlay.current && !isInitialized.current) {
                initAndPlay();
            }
            // Also resume suspended context
            if (audioContextRef.current?.state === "suspended") {
                audioContextRef.current.resume();
            }
        };

        document.addEventListener("click", unlockAudio, { once: false });
        document.addEventListener("touchstart", unlockAudio, { once: false });
        document.addEventListener("keydown", unlockAudio, { once: false });

        return () => {
            document.removeEventListener("click", unlockAudio);
            document.removeEventListener("touchstart", unlockAudio);
            document.removeEventListener("keydown", unlockAudio);
        };
    }, [initAndPlay]);

    const toggleMute = useCallback(() => {
        if (!isInitialized.current) {
            // First interaction — initialize and play
            initAndPlay();
            return;
        }

        if (!audioContextRef.current || !masterGainRef.current) return;

        const ctx = audioContextRef.current;
        const gain = masterGainRef.current;

        if (ctx.state === "suspended") {
            ctx.resume();
        }

        if (isMuted) {
            gain.gain.cancelScheduledValues(ctx.currentTime);
            gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
            setIsMuted(false);
        } else {
            gain.gain.cancelScheduledValues(ctx.currentTime);
            gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
            setIsMuted(true);
        }
    }, [isMuted, volume, initAndPlay]);

    const stop = useCallback(() => {
        if (!audioContextRef.current || !masterGainRef.current) return;

        const ctx = audioContextRef.current;
        const gain = masterGainRef.current;

        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutDuration);

        setTimeout(() => {
            ctx.suspend();
            setIsPlaying(false);
        }, fadeOutDuration * 1000);
    }, [fadeOutDuration]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            sourceNodesRef.current.forEach(osc => {
                try { osc.stop(); } catch { /* already stopped */ }
            });
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
            }
        };
    }, []);

    return { play, stop, toggleMute, isPlaying, isMuted };
}
