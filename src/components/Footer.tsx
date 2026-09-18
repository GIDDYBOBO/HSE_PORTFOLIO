import React from 'react';
import { PageId } from '../types';
import { 
  ArrowUp, 
  ArrowUpRight, 
  MapPin, 
  Linkedin, 
  Bookmark,
  BookOpen, 
  GraduationCap, 
  Mail 
} from 'lucide-react';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

const CREDENTIAL_TILES = [
  {
    title: 'CMIOSH #100175',
    subtitle: 'Chartered UK Safety'
  },
  {
    title: 'Julius Berger PLC',
    subtitle: 'HSE Manager (Abuja)'
  },
  {
    title: 'ISO 45001 Lead',
    subtitle: 'IRCA Cert #423290'
  },
  {
    title: 'Fellow ISPON',
    subtitle: 'Safety Professionals Nig.'
  },
  {
    title: 'MNSE & Safety Eng',
    subtitle: 'Civil Engineering Div'
  },
  {
    title: 'Top 50 Africa',
    subtitle: 'NatureNews Sustainability'
  }
];

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenBookingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: PageId) => {
    onSelectPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      handleNav('services');
    }
  };

  const handleInquiryClick = () => {
    handleNav('services');
    setTimeout(() => {
      const formEl = document.getElementById('inquiry-form-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="border-t border-white/10 bg-[#050508] text-neutral-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10">
        
        {/* Top Row: 6 Credential Badges matching image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {CREDENTIAL_TILES.map((tile, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#090910] border border-white/10 flex flex-col items-center justify-center text-center space-y-1 hover:border-white/20 transition-colors"
            >
              <span className="text-white font-mono font-bold text-xs tracking-tight">
                {tile.title}
              </span>
              <span className="text-neutral-400 font-mono text-[10px] sm:text-[11px]">
                {tile.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle Horizontal Divider matching image */}
        <div className="border-t border-white/10 w-full" />

        {/* 3-Column Core Layout matching image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Column 1: Brand & Profile */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs shrink-0 select-none">
                TG
              </div>
              <span className="text-lg font-display font-bold text-white tracking-tight">
                Engr. Iyenoma ThankGod Osazee
              </span>
            </div>

            <p className="text-xs sm:text-[12.5px] text-neutral-300 leading-relaxed max-w-md">
              Official executive portfolio and technical repository. Blending two decades of frontline civil construction safety directorship at Julius Berger Nigeria PLC with peer-reviewed research in occupational hygiene, landfill sustainability, thermal WBGT ergonomics, and statutory safety reform.
            </p>

            <div className="flex items-center space-x-2 pt-0.5 font-mono text-xs text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>Abuja, Federal Capital Territory, Nigeria</span>
            </div>

            {/* Social & Academic Profile Icons Row */}
            <div className="pt-2 flex items-center space-x-2">
              <a
                id="footer-icon-linkedin"
                href="https://www.linkedin.com/in/iyenoma-osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Professional Network"
                title="LinkedIn Profile: Engr. Iyenoma Osazee"
                className="w-9 h-9 rounded-xl bg-[#0f0f18] hover:bg-[#181826] border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4 text-neutral-300 group-hover:text-white" />
              </a>

              <a
                id="footer-icon-researchgate"
                href="https://www.researchgate.net/search/publication?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate Publications"
                title="ResearchGate Scientific Papers"
                className="w-9 h-9 rounded-xl bg-[#0f0f18] hover:bg-[#181826] border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              >
                <Bookmark className="w-4 h-4 text-neutral-300 group-hover:text-white" />
              </a>

              <a
                id="footer-icon-scholar"
                href="https://scholar.google.com/scholar?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar Citation Index"
                title="Google Scholar Citations"
                className="w-9 h-9 rounded-xl bg-[#0f0f18] hover:bg-[#181826] border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                id="footer-icon-iosh"
                href="https://iosh.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Institution of Occupational Safety and Health UK"
                title="Chartered Fellow (CMIOSH #100175)"
                className="w-9 h-9 rounded-xl bg-[#0f0f18] hover:bg-[#181826] border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              >
                <GraduationCap className="w-4 h-4 text-sky-400" />
              </a>

              <a
                id="footer-icon-email"
                href="mailto:contact@iyenomaosazee.com"
                aria-label="Direct Liaison Email"
                title="Executive Email Liaison"
                className="w-9 h-9 rounded-xl bg-[#0f0f18] hover:bg-[#181826] border border-white/10 hover:border-white/25 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
              >
                <Mail className="w-4 h-4 text-rose-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-nav-overview"
                  onClick={() => handleNav('overview')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  Executive Overview
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-works"
                  onClick={() => handleNav('works')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  Signature Megaprojects (Works)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => handleNav('services')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  Safety & Advisory Services
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-publications"
                  onClick={() => handleNav('publications')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  Research Papers & WBGT Tool
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-leadership"
                  onClick={() => handleNav('leadership')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  Institutional Leadership & Honors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Executive Engagement */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              EXECUTIVE ENGAGEMENT
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Available for high-consequence project safety governance, ISO 45001 auditing diagnostics, and international keynote addresses.
            </p>

            <div className="pt-2 space-y-2.5">
              <button
                id="footer-btn-book-consultation"
                onClick={handleConsultationClick}
                className="w-full py-3 px-5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
              >
                <span>Book a Consultation Call</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="footer-btn-written-inquiry"
                onClick={handleInquiryClick}
                className="w-full py-3 px-5 rounded-full bg-[#181820] hover:bg-[#20202c] text-white font-medium text-xs border border-white/10 transition-colors text-center cursor-pointer"
              >
                Submit Formal Written Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400">
          <p>© {new Date().getFullYear()} Engr. Iyenoma ThankGod Osazee. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

