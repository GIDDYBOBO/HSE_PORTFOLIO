import React from 'react';
import { useScrollReveal } from '../../hooks';

interface FadeUpSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'header';
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
}

/**
 * FadeUpSection
 * Reusable wrapper component backed by useScrollReveal.
 * Implements a subtle 'fade-up' animation using pure CSS transitions and IntersectionObserver.
 * Unobserves immediately upon entering viewport, ensuring the transition triggers strictly ONLY ONCE.
 */
export const FadeUpSection: React.FC<FadeUpSectionProps> = ({
  as: Component = 'section',
  children,
  className = '',
  delayMs = 0,
  threshold = 0.06,
  id,
  style,
  ...props
}) => {
  const { ref, className: revealClass, style: revealStyle } = useScrollReveal<HTMLElement>({
    threshold,
    delayMs,
  });

  return (
    <Component
      ref={ref as any}
      id={id}
      style={{ ...style, ...revealStyle }}
      className={`${revealClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};
