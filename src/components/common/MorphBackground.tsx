import React, { useEffect, useState } from 'react';

/**
 * MorphBackground
 * DialedWeb-style liquid morphing engine & ambient glass canvas.
 * Renders organic, animated gradient orbs and a reactive cursor glow
 * that continuously shine, deform, and refract through frosted glass cards.
 */
export const MorphBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!mousePos) {
        setMousePos({ x: targetX, y: targetY });
      }
    };

    // Smooth lerp animation loop for the cursor-following ambient glow
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0e0f12]"
    >
      {/* Subtle Micro-Grid Dot Matrix for enhanced glass refraction */}
      <div className="absolute inset-0 dialed-grid-pattern opacity-50" />

      {/* =========================================================================
          Layer A: Ambient Deep Glow Meshes (Rich saturated morphs)
         ========================================================================= */}

      {/* Morphing Liquid Orb 1: Hero Top Center (Electric Royal Blue + Purple + Cyan) */}
      <div 
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] bg-gradient-to-tr from-[#1d4ed8]/70 via-[#7c3aed]/65 to-[#06b6d4]/60 blur-[55px] sm:blur-[70px] animate-morph-orb-1 opacity-85" 
      />

      {/* Morphing Liquid Orb 2: Middle Right (Cyber Violet + Indigo + Sky Blue) */}
      <div 
        className="absolute top-[32%] -right-[12%] sm:-right-[8%] w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] bg-gradient-to-bl from-[#9333ea]/70 via-[#4f46e5]/65 to-[#38bdf8]/50 blur-[55px] sm:blur-[75px] animate-morph-orb-2 opacity-80" 
      />

      {/* Morphing Liquid Orb 3: Middle Left (Azure Blue + Cyan + Electric Teal) */}
      <div 
        className="absolute top-[58%] -left-[12%] sm:-left-[8%] w-[520px] sm:w-[750px] h-[520px] sm:h-[750px] bg-gradient-to-br from-[#0284c7]/65 via-[#2563eb]/70 to-[#a855f7]/55 blur-[50px] sm:blur-[70px] animate-morph-orb-3 opacity-80" 
      />

      {/* Morphing Liquid Orb 4: Bottom / CTA (Vibrant Purple + Amber Spark + Blue) */}
      <div 
        className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] bg-gradient-to-t from-[#7c3aed]/75 via-[#f59e0b]/30 to-[#2563eb]/50 blur-[55px] sm:blur-[75px] animate-morph-orb-1 opacity-80" 
      />

      {/* =========================================================================
          Layer B: Crisp Organic Fluid Morph Pods (Distinct liquid silhouettes)
         ========================================================================= */}

      {/* Crisp Morph Pod 1: Floating in Upper Hero */}
      <div 
        className="absolute top-[8%] left-[15%] sm:left-[22%] w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] bg-gradient-to-r from-[#2563eb]/40 via-[#8b5cf6]/35 to-[#00f2fe]/40 blur-[24px] sm:blur-[32px] animate-morph-orb-2 opacity-65"
      />

      {/* Crisp Morph Pod 2: Floating in Right Mid */}
      <div 
        className="absolute top-[45%] right-[10%] sm:right-[18%] w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] bg-gradient-to-l from-[#a855f7]/45 via-[#3b82f6]/40 to-[#06b6d4]/35 blur-[28px] sm:blur-[36px] animate-morph-orb-3 opacity-60"
      />

      {/* Crisp Morph Pod 3: Floating in Lower Section */}
      <div 
        className="absolute top-[75%] left-[12%] sm:left-[20%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#6366f1]/40 via-[#ec4899]/30 to-[#0284c7]/40 blur-[26px] sm:blur-[34px] animate-morph-orb-1 opacity-60"
      />

      {/* =========================================================================
          Layer C: Interactive Cursor Liquid Follower Glow (Desktop only)
         ========================================================================= */}
      {!isTouch && mousePos && (
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[70px] transition-opacity duration-300 pointer-events-none opacity-55"
          style={{
            transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(59, 130, 246, 0.28) 30%, rgba(139, 92, 246, 0.18) 60%, transparent 80%)',
            willChange: 'transform',
          }}
        />
      )}
    </div>
  );
};
