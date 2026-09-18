import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  FileText, 
  PhoneCall
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

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'overview', label: 'Works', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'advisory', label: 'Services', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'publications', label: 'Research & WBGT', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'leadership', label: 'Leadership', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'advisory', label: 'Inquiries', icon: <PhoneCall className="w-3.5 h-3.5" /> },
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#aaa3ff] animate-pulse"></span>
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#08080c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-2 animate-fadeIn">
            <button
              onClick={() => handleNavClick('overview')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                currentPage === 'overview' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>Overview</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Home</span>
            </button>

            <button
              onClick={() => handleNavClick('works')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                currentPage === 'works' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>Works</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Megaprojects</span>
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                currentPage === 'services' || currentPage === 'advisory' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>Services</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Advisory</span>
            </button>

            <button
              onClick={() => handleNavClick('publications')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                currentPage === 'publications' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>Research & WBGT</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Science</span>
            </button>

            <button
              onClick={() => handleNavClick('leadership')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between ${
                currentPage === 'leadership' ? 'bg-white text-black font-semibold' : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>Leadership</span>
              <span className="text-[10px] font-mono uppercase text-neutral-400">Honors</span>
            </button>
          </div>
        )}
      </header>

      {/* Floating Awwwards-style Side Ribbon (Dialedweb Signature) */}
      <div 
        id="distinction-ribbon"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center group cursor-pointer"
        onClick={() => handleNavClick('leadership')}
      >
        <div className="bg-[#0b0b10] hover:bg-neutral-900 border-l border-t border-b border-white/15 px-2 py-4 rounded-l-xl shadow-2xl flex flex-col items-center space-y-3 transition-all duration-300 group-hover:translate-x-0 translate-x-1">
          <div className="w-5 h-5 rounded-full bg-[#aaa3ff]/20 text-[#aaa3ff] border border-[#aaa3ff]/40 flex items-center justify-center text-[10px] font-bold">
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
