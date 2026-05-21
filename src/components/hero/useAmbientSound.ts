"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Ambient Sound System using Web Audio API
 * Defer initialization strictly to user interactions to bypass autoplay policy.
 */

interface AmbientSoundOptions {
    audioSrc?: string;
    volume?: number;
    fadeInDuration?: number;
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
    const shouldPlayRef = useRef(false);

    const createSynthesizedAmbient = useCallback((ctx: AudioContext, masterGain: GainNode) => {
        const layers = [
            { freq: 261.63, detune: -4, type: "sine" as OscillatorType, gain: 0.3 },     // C4
            { freq: 261.63, detune: 6, type: "sine" as OscillatorType, gain: 0.15 },      // C4 detuned (chorus)
            { freq: 329.63, detune: -3, type: "sine" as OscillatorType, gain: 0.2 },      // E4
            { freq: 392.00, detune: 5, type: "sine" as OscillatorType, gain: 0.18 },      // G4
            { freq: 523.25, detune: -2, type: "triangle" as OscillatorType, gain: 0.08 }, // C5 (soft shimmer)
        ];

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;
        filter.Q.value = 0.5;
        filter.connect(masterGain);

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

    // Sync isPlaying React state to actual AudioContext state
    const syncPlayingState = useCallback((ctx: AudioContext) => {
        setIsPlaying(ctx.state === "running" && !isMuted);
    }, [isMuted]);

    const initAndPlay = useCallback(() => {
        if (isInitialized.current) {
            // Already initialized — just handle resume if needed
            const ctx = audioContextRef.current;
            const gain = masterGainRef.current;
            if (ctx && gain && ctx.state === "suspended") {
                ctx.resume().then(() => {
                    if (audioElementRef.current && audioElementRef.current.paused) {
                        audioElementRef.current.play().catch(console.warn);
                    }
                    gain.gain.cancelScheduledValues(ctx.currentTime);
                    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
                    syncPlayingState(ctx);
                });
            }
            return;
        }

        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;

            const ctx = new AudioCtx();
            audioContextRef.current = ctx;

            // Handle browser state changes
            ctx.onstatechange = () => {
                syncPlayingState(ctx);
            };

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0, ctx.currentTime);
            // Schedule the fade-in
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
            syncPlayingState(ctx);
        } catch (e) {
            console.warn("Ambient sound failed to initialize:", e);
        }
    }, [audioSrc, volume, fadeInDuration, createSynthesizedAmbient, syncPlayingState]);

    // Request play — called automatically by the page, but deferred until user gesture if blocked
    const play = useCallback(() => {
        shouldPlayRef.current = true;
        initAndPlay();
    }, [initAndPlay]);

    // Listen for first user interaction to unlock audio if it was requested but deferred
    useEffect(() => {
        const handleUserGesture = () => {
            if (shouldPlayRef.current && !isInitialized.current) {
                initAndPlay();
            } else if (isInitialized.current && audioContextRef.current?.state === "suspended") {
                const ctx = audioContextRef.current;
                const gain = masterGainRef.current;
                
                ctx.resume().then(() => {
                    if (audioElementRef.current && audioElementRef.current.paused) {
                        audioElementRef.current.play().catch(console.warn);
                    }
                    if (gain) {
                        gain.gain.cancelScheduledValues(ctx.currentTime);
                        gain.gain.linearRampToValueAtTime(
                            isMuted ? 0 : volume,
                            ctx.currentTime + 0.5
                        );
                    }
                    syncPlayingState(ctx);
                });
            }
        };

        const events = ["click", "touchstart", "keydown", "mousedown", "pointerdown", "wheel"];
        events.forEach(event => document.addEventListener(event, handleUserGesture, { passive: true }));

        return () => {
            events.forEach(event => document.removeEventListener(event, handleUserGesture));
        };
    }, [initAndPlay, volume, isMuted, syncPlayingState]);

    const toggleMute = useCallback(() => {
        // If not initialized, initialize it right now since we are in a click event
        if (!isInitialized.current) {
            shouldPlayRef.current = true;
            initAndPlay();
            return;
        }

        const ctx = audioContextRef.current;
        const gain = masterGainRef.current;
        if (!ctx || !gain) return;

        const newMuteState = !isMuted;
        setIsMuted(newMuteState);

        if (ctx.state === "suspended") {
            ctx.resume().then(() => {
                if (audioElementRef.current && audioElementRef.current.paused) {
                    audioElementRef.current.play().catch(console.warn);
                }
                gain.gain.cancelScheduledValues(ctx.currentTime);
                gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(newMuteState ? 0 : volume, ctx.currentTime + 0.5);
            });
        } else {
            if (audioElementRef.current && audioElementRef.current.paused && !newMuteState) {
                audioElementRef.current.play().catch(console.warn);
            }
            gain.gain.cancelScheduledValues(ctx.currentTime);
            gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(newMuteState ? 0 : volume, ctx.currentTime + 0.5);
        }
    }, [isMuted, volume, initAndPlay]);

    const stop = useCallback(() => {
        shouldPlayRef.current = false;
        if (!audioContextRef.current || !masterGainRef.current) return;

        const ctx = audioContextRef.current;
        const gain = masterGainRef.current;

        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutDuration);

        setTimeout(() => {
            if (ctx.state === "running") {
                ctx.suspend().then(() => {
                    syncPlayingState(ctx);
                });
            }
        }, fadeOutDuration * 1000);
    }, [fadeOutDuration, syncPlayingState]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            sourceNodesRef.current.forEach(osc => {
                try { osc.stop(); } catch {}
            });
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
            }
        };
    }, []);

    return { play, stop, toggleMute, isPlaying, isMuted };
}

