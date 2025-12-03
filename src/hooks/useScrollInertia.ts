import { useEffect, useRef } from "react";

export function useScrollInertia(
    intensity: number = 0.25, // how much it moves when scrolling fast
    damping: number = 0.1     // how quickly it settles back
) {
    const ref = useRef<HTMLDivElement>(null);
    const yOffsetRef = useRef(0);
    const lastScrollRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const tickingRef = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.style.willChange = "transform";

        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(update);
            }
        };

        const update = () => {
            const currentScroll = window.scrollY;
            const scrollSpeed = currentScroll - lastScrollRef.current;

            // Apply momentum
            yOffsetRef.current += scrollSpeed * intensity;

            // Ease back toward 0
            yOffsetRef.current *= (1 - damping);

            // Apply transform
            element.style.transform = `translateY(${yOffsetRef.current}px)`;

            lastScrollRef.current = currentScroll;
            tickingRef.current = false;

            // Keep animating slightly after scroll ends
            if (Math.abs(yOffsetRef.current) > 0.3) {
                requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [intensity, damping]);

    return ref;
}
