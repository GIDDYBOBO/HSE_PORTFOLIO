import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { useTheme } from '../context/ThemeContext';
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
  ChevronRight,
  BookOpen,
  User,
  GraduationCap
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
  const { theme } = useTheme();
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
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 'about' as PageId,
      number: '02',
      label: 'About & Pedigree',
      tag: 'Dual Master’s • FISPON',
      desc: '22+ Years Leadership Dossier & Engineering Background',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      id: 'works' as PageId,
      number: '03',
      label: 'Works',
      tag: 'Megaprojects',
      desc: 'Chronological Timeline & River Marine Schemes',
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 'books' as PageId,
      number: '04',
      label: 'Books & Research',
      tag: 'Scientific Authorship',
      desc: 'Thermal Ergonomics Monographs & Landfill Kinetics',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'services' as PageId,
      number: '05',
      label: 'Services',
      tag: 'Advisory Practice',
      desc: 'Statutory Audits, Risk Mitigation & High-Consequence HSE',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'publications' as PageId,
      number: '06',
      label: 'WBGT Calculator',
      tag: 'Science & Modeling',
      desc: 'Empirical Wet Bulb Heat Stress Modeling & Case Papers',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'leadership' as PageId,
      number: '07',
      label: 'Leadership',
      tag: 'Honors & Fellowships',
      desc: 'CMIOSH UK Chartered Status & Global Keynotes',
      icon: <Award className="w-5 h-5" />
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
      {/* Floating Pill Capsule Navbar */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-full backdrop-blur-2xl border border-white/20 bg-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.35)] text-[#e3e3e3] transition-all">
          
          {/* Logo / Monogram */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('overview')}
            className="flex items-center space-x-2.5 group text-left focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-tighter bg-white text-[#131314] group-hover:bg-[#f0f4f9] transition-colors shadow-sm">
              TG
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-neutral-200 transition-colors flex items-center gap-1.5">
                OSAZEE
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase -mt-0.5 text-[#a8abb0]">
                CMIOSH • Julius Berger
              </span>
            </div>
          </button>

          {/* Desktop Center Pill Links */}
          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full border border-white/10 bg-[#131314]/75 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <button
              id="nav-link-overview"
              onClick={() => handleNavClick('overview')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'overview'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Overview
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'about'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              About
            </button>

            <button
              id="nav-link-works"
              onClick={() => handleNavClick('works')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'works'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Works
            </button>

            <button
              id="nav-link-books"
              onClick={() => handleNavClick('books')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'books'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Books
            </button>

            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'services' || currentPage === 'advisory'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Services
            </button>

            <button
              id="nav-link-publications"
              onClick={() => handleNavClick('publications')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'publications'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Research &amp; WBGT
            </button>

            <button
              id="nav-link-leadership"
              onClick={() => handleNavClick('leadership')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                currentPage === 'leadership'
                  ? 'bg-[#282a2c] text-white font-semibold shadow-xs border border-[#3c4043]'
                  : 'text-[#c4c7c5] hover:text-white hover:bg-[#282a2c]/60'
              }`}
            >
              Leadership
            </button>
          </nav>

          {/* Right Action: "Book a call" Pill */}
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
              className="flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 rounded-full font-semibold text-xs transition-all whitespace-nowrap min-h-[38px] cursor-pointer shadow-sm bg-white hover:bg-[#f0f4f9] text-[#131314]"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center border border-[#3c4043] bg-[#282a2c] hover:bg-[#333538] text-white cursor-pointer"
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
            className="fixed inset-0 z-[100] md:hidden backdrop-blur-3xl flex flex-col justify-between overflow-y-auto bg-[#131314]/98 text-[#e3e3e3]"
          >
            {/* Overlay Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-[#333538] bg-[#1e1f20]/90 backdrop-blur-xl shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('overview')}
                className="flex items-center space-x-3 text-left focus:outline-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-tight shadow-sm bg-white text-[#131314]">
                  TG
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-base tracking-tight flex items-center gap-1.5 text-white">
                    OSAZEE
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#a8abb0]">
                    CMIOSH UK • Julius Berger
                  </span>
                </div>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  id="btn-mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-[#3c4043] bg-[#282a2c] hover:bg-[#333538] text-white cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Link Index List */}
            <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-2.5 my-auto">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest mb-2 px-1 text-[#a8abb0]">
                <span>Executive Navigation</span>
                <span className="text-[#8e918f]">
                  {mobileNavItems.length} Modules
                </span>
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
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? 'bg-[#282a2c] border-[#3c4043] text-white shadow-md'
                        : 'bg-[#1e1f20] hover:bg-[#282a2c] border-[#333538] text-[#c4c7c5]'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 pr-2">
                      <span className={`font-mono text-xs font-semibold w-5 ${
                        isActive ? 'text-white' : 'text-[#8e918f]'
                      }`}>
                        {item.number}
                      </span>
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isActive 
                          ? 'bg-white text-[#131314] border-white'
                          : 'bg-[#282a2c] border-[#3c4043] text-white'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug text-white">
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#a8c7fa]" />
                          )}
                        </div>
                        <p className={`text-[11px] font-mono line-clamp-1 ${
                          isActive ? 'text-[#c4c7c5]' : 'text-[#8e918f]'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pl-2 shrink-0">
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-white translate-x-0.5' : 'text-[#8e918f]'
                      }`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Action & Credential Footer */}
            <div className="relative z-10 p-5 sm:p-6 border-t border-[#333538] bg-[#1e1f20]/90 backdrop-blur-xl space-y-3.5 shrink-0">
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
                className="w-full py-3.5 px-5 rounded-2xl font-display font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm bg-white hover:bg-[#f0f4f9] text-[#131314]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Strategic Consultation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center text-[11px] font-mono px-1 pt-1 text-[#8e918f]">
                <span>Directorship Advisory Calendar Open</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Distinction Ribbon */}
      <div 
        id="distinction-ribbon"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center group cursor-pointer"
        onClick={() => handleNavClick('leadership')}
      >
        <div className="border-l border-t border-b border-[#333538] bg-[#1e1f20] hover:bg-[#282a2c] text-white px-2 py-4 rounded-l-xl shadow-lg flex flex-col items-center space-y-3 transition-all duration-300 group-hover:translate-x-0 translate-x-1">
          <div className="w-5 h-5 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center text-[10px] font-bold">
            ★
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-medium text-[#a8abb0] group-hover:text-white">
            CMIOSH UK • TOP 50 AFRICA
          </span>
        </div>
      </div>
    </>
  );
};
