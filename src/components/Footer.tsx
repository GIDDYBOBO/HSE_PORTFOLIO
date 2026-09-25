import React from 'react';
import { PageId } from '../types';
import { useTheme } from '../context/ThemeContext';
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
  const { theme } = useTheme();

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
    <footer className="border-t border-white/10 bg-[#131314]/75 backdrop-blur-2xl text-[#c4c7c5] text-xs transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10">
        
        {/* Top Row: 6 Credential Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {CREDENTIAL_TILES.map((tile, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 flex flex-col items-center justify-center text-center space-y-1 transition-all"
            >
              <span className="font-mono font-bold text-xs tracking-tight text-white">
                {tile.title}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#a8c7fa]">
                {tile.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="border-t border-white/10 w-full" />

        {/* 3-Column Core Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Column 1: Brand & Profile */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none bg-white text-[#131314]">
                TG
              </div>
              <span className="text-lg font-display font-bold tracking-tight text-white">
                Engr. Iyenoma ThankGod Osazee
              </span>
            </div>

            <p className="text-xs sm:text-[12.5px] leading-relaxed max-w-md text-[#c4c7c5]">
              Official executive portfolio and technical repository. Blending two decades of frontline civil construction safety directorship at Julius Berger Nigeria PLC with peer-reviewed research in occupational hygiene, landfill sustainability, thermal WBGT ergonomics, and statutory safety reform.
            </p>

            <div className="flex items-center space-x-2 pt-0.5 font-mono text-xs text-[#8e918f]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#8e918f]" />
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
                className="w-9 h-9 rounded-xl dialed-glass-pill hover:border-[#a8c7fa]/40 text-[#c4c7c5] hover:text-white flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                id="footer-icon-researchgate"
                href="https://www.researchgate.net/search/publication?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate Publications"
                title="ResearchGate Scientific Papers"
                className="w-9 h-9 rounded-xl dialed-glass-pill hover:border-[#a8c7fa]/40 text-[#c4c7c5] hover:text-white flex items-center justify-center transition-all"
              >
                <Bookmark className="w-4 h-4" />
              </a>

              <a
                id="footer-icon-scholar"
                href="https://scholar.google.com/scholar?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar Citation Index"
                title="Google Scholar Citations"
                className="w-9 h-9 rounded-xl dialed-glass-pill hover:border-[#a8c7fa]/40 text-[#c4c7c5] hover:text-white flex items-center justify-center transition-all"
              >
                <BookOpen className="w-4 h-4" />
              </a>

              <a
                id="footer-icon-iosh"
                href="https://iosh.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Institution of Occupational Safety and Health UK"
                title="Chartered Fellow (CMIOSH #100175)"
                className="w-9 h-9 rounded-xl dialed-glass-pill hover:border-[#a8c7fa]/40 text-[#c4c7c5] hover:text-white flex items-center justify-center transition-all"
              >
                <GraduationCap className="w-4 h-4" />
              </a>

              <a
                id="footer-icon-email"
                href="mailto:contact@iyenomaosazee.com"
                aria-label="Direct Liaison Email"
                title="Executive Email Liaison"
                className="w-9 h-9 rounded-xl dialed-glass-pill hover:border-[#a8c7fa]/40 text-[#c4c7c5] hover:text-white flex items-center justify-center transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-overview"
                  onClick={() => handleNav('overview')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Executive Overview
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  About & Background
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-books"
                  onClick={() => handleNav('books')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Published Books & Papers
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-works"
                  onClick={() => handleNav('works')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Signature Megaprojects
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => handleNav('services')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Safety & Advisory Services
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-publications"
                  onClick={() => handleNav('publications')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Thermal Research & WBGT Tool
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-leadership"
                  onClick={() => handleNav('leadership')}
                  className="transition-colors text-left cursor-pointer text-[#c4c7c5] hover:text-white"
                >
                  Leadership & Honors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Executive Engagement */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-white">
              EXECUTIVE ENGAGEMENT
            </h4>
            <p className="text-xs leading-relaxed text-[#c4c7c5]">
              Available for high-consequence project safety governance, ISO 45001 auditing diagnostics, and international keynote addresses.
            </p>

            <div className="pt-2 space-y-2.5">
              <button
                id="footer-btn-book-consultation"
                onClick={handleConsultationClick}
                className="w-full py-3 px-5 rounded-full font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer min-h-[44px] bg-white text-[#131314] hover:bg-[#f0f4f9]"
              >
                <span>Book a Consultation Call</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="footer-btn-written-inquiry"
                onClick={handleInquiryClick}
                className="w-full py-3 px-5 rounded-full font-medium text-xs dialed-glass-pill hover:bg-white/10 text-white transition-colors text-center cursor-pointer min-h-[44px] flex items-center justify-center shadow-xs"
              >
                <span>Submit Formal Written Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 border-t border-[#333538] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8e918f]">
          <p>© {new Date().getFullYear()} Engr. Iyenoma ThankGod Osazee. All rights reserved.</p>
          <p className="text-[#a8abb0]">
            Website designed &amp; developed by <span className="text-white font-medium">Gideon Ogunyemi</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 transition-colors cursor-pointer text-[#8e918f] hover:text-white"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

