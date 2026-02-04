"use client";

import { ReactNode } from 'react';
import { useTextAnimation } from '../../hooks/useTextAnimation';

interface AnimatedTextProps {
  children: ReactNode;
  type?: 'letter' | 'word' | 'line';
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, type = 'word', className = '', delay = 0.8 }: AnimatedTextProps) {
  const containerRef = useTextAnimation({ delay });

  if (typeof children !== 'string') {
    return <span ref={containerRef} className={`${type} ${className}`}>{children}</span>;
  }

  const text = children as string;

  if (type === 'letter') {
    return (
      <span ref={containerRef} className={className}>
        {text.split('').map((char, index) => (
          <span key={`letter-${index}`} className="letter">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'word') {
    return (
      <span ref={containerRef} className={className}>
        {text.split(' ').map((word, index) => (
          <span key={`word-${index}`} className="word">
            {word}
            {index < text.split(' ').length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'line') {
    return (
      <span ref={containerRef} className={`line ${className}`}>
        {text}
      </span>
    );
  }

  return <span ref={containerRef} className={className}>{children}</span>;
}

// Convenience components with customizable delays
export function AnimatedLetters({ children, className, delay = 0.8 }: { children: string; className?: string; delay?: number }) {
  return <AnimatedText type="letter" className={className} delay={delay}>{children}</AnimatedText>;
}

export function AnimatedWords({ children, className, delay = 0.8 }: { children: string; className?: string; delay?: number }) {
  return <AnimatedText type="word" className={className} delay={delay}>{children}</AnimatedText>;
}

export function AnimatedLines({ children, className, delay = 0.8 }: { children: string; className?: string; delay?: number }) {
  return <AnimatedText type="line" className={className} delay={delay}>{children}</AnimatedText>;
}