import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Shield, Sparkles, Activity, Layers } from 'lucide-react';
import { PageId } from '../../types';

interface LiquidMorphHeroProps {
  onOpenBookingModal?: () => void;
  onSelectPage?: (page: PageId) => void;
}

/**
 * LiquidMorphHero
 * DialedWeb-style signature interactive 3D liquid morphing centerpiece.
 * Combines organic continuous fluid shape morphing, iridescent liquid shader gradients,
 * frosted glass specular lenses, and mouse-reactive 3D tilt.
 */
export const LiquidMorphHero: React.FC<LiquidMorphHeroProps> = ({
  onOpenBookingModal,
  onSelectPage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics using spring interpolation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 150
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 20,
    stiffness: 150
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-3xl mx-auto my-6 sm:my-8 perspective-1000 flex flex-col items-center"
    >
      {/* 3D Motion Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-3xl p-6 sm:p-8 md:p-10 dialed-glass-card border border-white/20 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.35)] overflow-hidden transition-shadow duration-300"
      >
        {/* Specular Edge Top Highlight Sheen */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Ambient Backlight inside Card that highlights the Morph */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#2563eb]/30 via-[#7c3aed]/25 to-[#06b6d4]/30 blur-[40px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left: Interactive Liquid Morphing Orb */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Outer Orbital Translucent Ring */}
            <div 
              className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed border-white/20 animate-liquid-spin pointer-events-none"
            />
            
            {/* Secondary Counter-Rotating Ring */}
            <div 
              className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-sky-400/25 pointer-events-none"
              style={{ animation: 'liquidSpin 35s linear infinite reverse' }}
            />

            {/* The Living Liquid Morphing Body */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Liquid Gradient Core (Morphing Organic Shape) */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-[#1d4ed8] via-[#7c3aed] to-[#00f2fe] animate-morph-liquid-hero opacity-90 shadow-[0_0_50px_rgba(37,99,235,0.6)]"
              />

              {/* Liquid Secondary Color Bloom */}
              <div 
                className="absolute inset-2 bg-gradient-to-bl from-[#ec4899]/60 via-[#4f46e5]/70 to-[#06b6d4]/60 animate-morph-orb-2 opacity-85 blur-[4px]"
              />

              {/* Frosted Glass Specular Shield on Top of the Morph */}
              <div 
                className="absolute inset-0 rounded-[45%_55%_65%_35%] backdrop-blur-[8px] bg-white/[0.12] border border-white/35 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.4)] animate-morph-liquid-hero"
              />

              {/* Center Floating Core Badge */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center p-3">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-1" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Zero-Harm
                </span>
                <span className="text-[9px] font-mono text-sky-200/90 tracking-wide font-medium">
                  50M+ Hours
                </span>
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Value Statement & Dialed Metrics */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dialed-glass-pill text-[11px] font-mono text-neutral-200">
              <Sparkles className="w-3.5 h-3.5 text-[#a8c7fa]" />
              <span className="font-semibold text-white">Dialed Architecture</span>
              <span className="text-white/40">•</span>
              <span className="text-[#a8c7fa]">Frosted Glass &amp; Liquid Morph Engine</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug">
                Chartered Engineering &amp; Strategic Oversight
              </h3>
              <p className="text-xs sm:text-sm text-[#c4c7c5] leading-relaxed">
                Seamlessly uniting high-consequence civil engineering infrastructure with proactive, bioclimatic occupational hygiene.
              </p>
            </div>

            {/* Quick Interactive Glass Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-2xl dialed-glass-pill flex flex-col">
                <span className="text-xs sm:text-sm font-display font-bold text-white">22+ Yrs</span>
                <span className="text-[10px] font-mono text-neutral-400">Civil Direction</span>
              </div>
              <div className="p-2.5 rounded-2xl dialed-glass-pill flex flex-col">
                <span className="text-xs sm:text-sm font-display font-bold text-white">CMIOSH</span>
                <span className="text-[10px] font-mono text-neutral-400">UK Chartered</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-2xl dialed-glass-pill flex flex-col">
                <span className="text-xs sm:text-sm font-display font-bold text-white">ISO 45001</span>
                <span className="text-[10px] font-mono text-neutral-400">Lead Auditor</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              {onOpenBookingModal && (
                <button
                  type="button"
                  onClick={onOpenBookingModal}
                  className="px-4 py-2 rounded-full bg-white hover:bg-neutral-100 text-[#131314] font-semibold text-xs transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  Consult Mandate
                </button>
              )}
              {onSelectPage && (
                <button
                  type="button"
                  onClick={() => onSelectPage('works')}
                  className="px-4 py-2 rounded-full dialed-glass-pill hover:bg-white/15 text-white font-medium text-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-[#a8c7fa]" />
                  <span>Megaprojects</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
