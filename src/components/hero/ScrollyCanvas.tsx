"use client";

import { useRef, useEffect } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
    scrollYProgress: MotionValue<number>;
    images: HTMLImageElement[];
}

export default function ScrollyCanvas({ scrollYProgress, images }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderContextRef = useRef<CanvasRenderingContext2D | null>(null);
    const requestRef = useRef<number | null>(null);

    // Initial setup for canvas
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        renderContextRef.current = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-render the current frame on resize
            if (images.length > 0) {
                renderFrame(Math.round(scrollYProgress.get() * (images.length - 1)));
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener("resize", resizeCanvas);
    }, [images, scrollYProgress]);

    const renderFrame = (index: number) => {
        if (!images[index] || !canvasRef.current || !renderContextRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = renderContextRef.current;
        const img = images[index];

        // Object-fit: cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (aspect ratio wise)
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (images.length === 0) return;
        const maxIndex = images.length - 1;
        // Map 0 -> 1 progress to 0 -> maxIndex
        const targetIndex = Math.min(maxIndex, Math.max(0, Math.round(latest * maxIndex)));
        
        if (requestRef.current !== null) {
            cancelAnimationFrame(requestRef.current);
        }
        
        requestRef.current = requestAnimationFrame(() => {
            renderFrame(targetIndex);
            requestRef.current = null;
        });
    });

    // Also render initial frame if images are loaded
    useEffect(() => {
        if (images.length > 0) {
            renderFrame(Math.round(scrollYProgress.get() * (images.length - 1)));
        }
    }, [images]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full bg-[#121212]"
            style={{ display: "block" }}
        />
    );
}
