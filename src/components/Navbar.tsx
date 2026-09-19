import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  FileText, 
  PhoneCall,
  Layers,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenBookingModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scrolling and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const mobileNavItems = [
    {
      id: 'overview' as PageId,
      number: '01',
      label: 'Overview',
      tag: 'Executive Portfolio',
      desc: 'HSE Architecture & Corporate Governance',
      icon: <ShieldCheck className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'works' as PageId,
      number: '02',
      label: 'Works',
      tag: 'Megaprojects',
      desc: 'Chronological Timeline & River Marine Schemes',
      icon: <Briefcase className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'services' as PageId,
      number: '03',
      label: 'Services',
      tag: 'Advisory Practice',
      desc: 'Statutory Audits, Risk Mitigation & High-Consequence HSE',
      icon: <Layers className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'publications' as PageId,
      number: '04',
      label: 'Research & WBGT',
      tag: 'Science & Modeling',
      desc: 'Empirical Wet Bulb Heat Stress Modeling & Case Papers',
      icon: <FileText className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'leadership' as PageId,
      number: '05',
      label: 'Leadership',
      tag: 'Honors & Fellowships',
      desc: 'CMIOSH UK Chartered Status & Global Keynotes',
      icon: <Award className="w-5 h-5 text-sky-400" />
    }
  ];

  const handleNavClick = (id: PageId, anchorId?: string) => {
    onSelectPage(id);
    setMobileMenuOpen(false);

    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Pill Capsule Navbar (Dialedweb Style) */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-full bg-[#08080c]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all">
          
          {/* Logo / Monogram */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('overview')}
            className="flex items-center space-x-2.5 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs tracking-tighter group-hover:bg-neutral-200 transition-colors shadow-sm">
              TG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight group-hover:text-neutral-200 transition-colors flex items-center gap-1.5">
                OSAZEE
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase -mt-0.5">
                CMIOSH • Julius Berger
              </span>
            </div>
          </button>

          {/* Desktop Center Pill Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-black/40 p-1 rounded-full border border-white/5">
            <button
              id="nav-link-overview"
              onClick={() => handleNavClick('overview')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'overview'
                  ? 'bg-white/15 text-white font-semibold shadow-inner'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Overview
            </button>

            <button
              id="nav-link-works"
              onClick={() => handleNavClick('works')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'works'
                  ? 'bg-white/15 text-white font-semibold shadow-inner'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Works
            </button>

            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'services' || currentPage === 'advisory'
                  ? 'bg-white/15 text-white font-semibold shadow-inner'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Services
            </button>

            <button
              id="nav-link-publications"
              onClick={() => handleNavClick('publications')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'publications'
                  ? 'bg-white/15 text-white font-semibold shadow-inner'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Research & WBGT
            </button>

            <button
              id="nav-link-leadership"
              onClick={() => handleNavClick('leadership')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentPage === 'leadership'
                  ? 'bg-white/15 text-white font-semibold shadow-inner'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Leadership
            </button>
          </nav>

          {/* Right Action: Dialedweb Style "Book a call" Pill */}
          <div className="flex items-center space-x-2">
            <button
              id="btn-header-book-call"
              onClick={() => {
                if (onOpenBookingModal) {
                  onOpenBookingModal();
                } else {
                  handleNavClick('advisory');
                }
              }}
              className="flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Blurred Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] md:hidden bg-[#060609]/95 backdrop-blur-3xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Ambient Background Gradient Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            {/* Overlay Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 bg-[#08080c]/50 backdrop-blur-xl shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('overview')}
                className="flex items-center space-x-3 text-left focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs tracking-tight shadow-md">
                  TG
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
                    OSAZEE
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">
                    CMIOSH UK • Julius Berger
                  </span>
                </div>
              </button>

              <button
                type="button"
                id="btn-mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/15"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Link Index List */}
            <div className="relative z-10 px-5 sm:px-6 py-6 space-y-2.5 my-auto">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-sky-400/80 mb-2 px-1">
                <span>Executive Navigation</span>
                <span className="text-neutral-500">5 Sections</span>
              </div>

              {mobileNavItems.map((item, idx) => {
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.04 * idx, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between border ${
                      isActive
                        ? 'bg-white/10 border-sky-400/40 shadow-[0_4px_24px_rgba(56,189,248,0.15)]'
                        : 'bg-white/[0.02] hover:bg-white/5 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 pr-2">
                      <span className="font-mono text-xs font-semibold text-neutral-500 w-5">
                        {item.number}
                      </span>
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isActive 
                          ? 'bg-sky-400/20 border-sky-400/30' 
                          : 'bg-white/5 border-white/10'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`font-display font-extrabold text-lg sm:text-xl tracking-tight leading-snug ${
                            isActive ? 'text-sky-300' : 'text-white'
                          }`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pl-2 shrink-0">
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-sky-400 translate-x-0.5' : 'text-neutral-500'
                      }`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Action & Credential Footer */}
            <div className="relative z-10 p-5 sm:p-6 border-t border-white/10 bg-[#08080d]/80 backdrop-blur-xl space-y-3.5 shrink-0">
              <button
                type="button"
                id="btn-mobile-book-call"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBookingModal) {
                    onOpenBookingModal();
                  } else {
                    handleNavClick('advisory');
                  }
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-neutral-200 active:scale-[0.99] text-black font-display font-bold text-sm transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Book Strategic Consultation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400 px-1 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Q3/Q4 Advisory Calendar Open
                </span>
                <span className="text-neutral-500">Abuja • Lagos • London</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Awwwards-style Side Ribbon (Dialedweb Signature) */}
      <div 
        id="distinction-ribbon"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center group cursor-pointer"
        onClick={() => handleNavClick('leadership')}
      >
        <div className="bg-[#0b0b10] hover:bg-neutral-900 border-l border-t border-b border-white/15 px-2 py-4 rounded-l-xl shadow-2xl flex flex-col items-center space-y-3 transition-all duration-300 group-hover:translate-x-0 translate-x-1">
          <div className="w-5 h-5 rounded-full bg-sky-400/15 text-sky-400 border border-sky-400/30 flex items-center justify-center text-[10px] font-bold">
            ★
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 group-hover:text-white uppercase [writing-mode:vertical-rl] rotate-180 font-medium">
            CMIOSH UK • TOP 50 AFRICA
          </span>
        </div>
      </div>
    </>
  );
};
