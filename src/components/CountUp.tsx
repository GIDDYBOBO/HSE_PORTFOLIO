import React, { useEffect, useState, useRef, useCallback } from 'react';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (val: number) => string;
  className?: string;
  triggerKey?: number | string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatter,
  className = '',
  triggerKey = 0
}) => {
  const [displayCount, setDisplayCount] = useState<number>(start);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setDisplayCount(start);
    setIsAnimating(true);
    startTimeRef.current = null;

    // Smooth cubic-out easing curve
    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current = start + (end - start) * eased;
      setDisplayCount(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayCount(end);
        setIsAnimating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [start, end, duration]);

  // Re-run whenever triggerKey changes
  useEffect(() => {
    startAnimation();
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [triggerKey, startAnimation]);

  // Viewport intersection observer: triggers when entering viewport, resets when leaving
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startAnimation();
            hasTriggered = true;
          } else if (hasTriggered) {
            // Reset to start so scrolling back into view runs the animation again
            setDisplayCount(start);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [startAnimation, start]);

  const formatNumber = (num: number): string => {
    const rounded = Number(num.toFixed(decimals));
    if (formatter) {
      return formatter(rounded);
    }
    if (decimals > 0) {
      return rounded.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return Math.round(num).toLocaleString();
  };

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums transition-colors duration-100 ${className} ${isAnimating ? 'text-white' : ''}`}
    >
      {prefix}
      {formatNumber(displayCount)}
      {suffix}
    </span>
  );
};
