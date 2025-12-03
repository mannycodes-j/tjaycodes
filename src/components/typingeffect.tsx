import { useEffect, useRef, useState } from "react";
import cursorBlink from "../assets/antigravity-cursor.png";

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  cursorSpeed?: number;
}

export function TypingEffect({
  text,
  speed = 50,
  className,
  cursorSpeed = 300,
}: TypingEffectProps) {
  const [visibleText, setVisibleText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setVisibleText((prev) => {
        const nextChar = text[prev.length];
        if (nextChar === undefined) {
          clearInterval(interval);
          return prev;
        }
        return prev + nextChar;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, speed, text]);

  return (
    <div ref={elementRef} className={className} style={{ minHeight: "1em" }}>
      {visibleText}
      <img
        src={cursorBlink}
        alt="cursor"
        height={28}
        style={{ animationDuration: `${cursorSpeed}ms` }}
        className="h-7 animate-pulse inline-block ml-1"
      />
    </div>
  );
}
