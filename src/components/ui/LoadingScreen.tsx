"use client";

import { useState, useEffect } from 'react';
import CountUp from './CountUp';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showCountUp, setShowCountUp] = useState(false);

  useEffect(() => {
    // Start the count up animation after a brief delay
    const countUpTimer = setTimeout(() => {
      setShowCountUp(true);
    }, 500);

    // Complete the loading after the specified duration
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      // Give a small delay for fade out animation
      setTimeout(() => {
        onComplete();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(countUpTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[10000] bg-bg-primary flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center">

        {/* Loading Counter */}
        <div className="flex items-center justify-center space-x-2">
          <div className="text-2xl font-bold text-#fffff0">
            {showCountUp && (
              <CountUp
                from={0}
                to={100}
                separator=","
                duration={1}
                className="count-up-text"
                onEnd={() => {
                  // Counter finished
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}