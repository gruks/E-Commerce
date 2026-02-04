"use client";

import { useRevealer } from '../../hooks/useRevealer';

interface RevealerProps {
  color?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

export default function Revealer({ 
  color = "#fc6902", 
  delay = 0.1, 
  duration = 0.8, 
  ease = "power3.inOut",
  onComplete 
}: RevealerProps) {
  const { revealerColor } = useRevealer({ 
    delay, 
    duration, 
    ease, 
    revealerColor: color,
    onComplete 
  });

  return (
    <div 
      className="revealer" 
      style={{ 
        backgroundColor: color,
        position: "fixed",
        inset: 0,
        transformOrigin: "top",
        transform: "scaleY(1)",
        zIndex: 99999,
        pointerEvents: "none"
      }}
    />
  );
}