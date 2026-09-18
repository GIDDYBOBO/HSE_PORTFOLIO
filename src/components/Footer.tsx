import React from 'react';
import { PageId } from '../types';
import { 
  ArrowUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Linkedin, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Award,
  Share2
} from 'lucide-react';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

const INSTITUTIONAL_CARDS = [
  {
    id: 'direct-email',
    name: 'Executive Direct Liaison',
    handle: 'contact@iyenomaosazee.com',
    category: 'Corporate Office',
    badge: 'Priority Dispatch',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    icon: Mail,
    url: 'mailto:contact@iyenomaosazee.com',
    description: 'Direct communication desk for high-level board advisories, mega-infrastructure safety retainers, and keynote speaking.'
  },
  {
    id: 'iosh',
    name: 'IOSH UK Chartered Directory',
    handle: 'Chartered Fellow #100175',
    category: 'Statutory Body',
    badge: 'Peer Review Panel',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: Award,
    url: 'https://iosh.com',
    description: 'Institution of Occupational Safety and Health UK chartered status, international peer review panels, and global mentorship.'
  }
];

const PLATFORM_PROFILES = [
  {
    id: 'linkedin',
    name: 'LinkedIn Professional',
    handle: 'in/iyenoma-osazee',
    category: 'Executive Network',
    badge: 'Verified Leader',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/iyenoma-osazee',
    description: 'Executive discourse, construction safety governance, corporate HSE directorship, and CMIOSH peer networking.'
  },
  {
    id: 'researchgate',
    name: 'ResearchGate Scientific',
    handle: 'Iyenoma-ThankGod-Osazee',
    category: 'Academic Publications',
    badge: 'Peer-Reviewed',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: BookOpen,
    url: 'https://www.researchgate.net/search/publication?q=Iyenoma+ThankGod+Osazee',
    description: 'Full-text preprints and citations on WBGT heat stress ergonomics, landfill leachate modeling, and occupational epidemiology.'
  },
  {
    id: 'scholar',
    name: 'Google Scholar Index',
    handle: 'Engr. I.T. Osazee',
    category: 'Citations Index',
    badge: 'Published Papers',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    icon: GraduationCap,
    url: 'https://scholar.google.com/scholar?q=Iyenoma+ThankGod+Osazee',
    description: 'Scholarly citations in international occupational hygiene journals, waste management engineering, and civil risk reduction.'
  },
  {
    id: 'nse',
    name: 'NSE & NISafetyE',
    handle: 'Civil & Safety Divisions',
    category: 'Engineering Council',
    badge: 'Registered MNSE',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: Globe,
    url: 'https://nse.org.ng',
    description: 'Nigerian Society of Engineers and Safety Engineering Division corporate membership, standards review, and code compliance.'
  }
];

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenBookingModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: PageId, anchorId?: string) => {
    onSelectPage(id);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#040407] text-neutral-400 text-xs overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 dialed-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-16">
        
        {/* Verification Credentials Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 border-b border-white/10 text-center font-mono text-[11px]">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">CMIOSH #100175</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">Chartered UK Safety</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">Julius Berger PLC</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">HSE Manager (Abuja)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">ISO 45001 Lead</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">IRCA Cert #423290</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">Fellow ISPON</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">Safety Professionals Nig.</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">MNSE & Safety Eng</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">Civil Engineering Div</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
            <span className="text-white font-bold">Top 50 Africa</span>
            <span className="text-neutral-300 text-[10px] mt-0.5">NatureNews Sustainability</span>
          </div>
        </div>

        {/* Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs">
                TG
              </div>
              <span className="text-lg font-display font-bold text-white tracking-tight">
                Engr. Iyenoma ThankGod Osazee
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
              Official executive portfolio and technical repository. Blending two decades of frontline 
              civil construction safety directorship at Julius Berger Nigeria PLC with peer-reviewed research in 
              occupational hygiene, landfill sustainability, thermal WBGT ergonomics, and statutory safety reform.
            </p>
            
            <div className="flex items-center space-x-4 pt-1 font-mono text-[11px] text-neutral-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                Abuja, Federal Capital Territory, Nigeria
              </span>
            </div>

            {/* Quick-Access Social Media Chips */}
            <div className="pt-2 flex items-center space-x-2">
              <a
                id="footer-quick-linkedin"
                href="https://www.linkedin.com/in/iyenoma-osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all"
                title="LinkedIn Profile: Engr. Iyenoma Osazee"
              >
                <Linkedin className="w-4 h-4 text-[#aaa3ff]" />
              </a>
              <a
                id="footer-quick-iosh"
                href="https://iosh.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IOSH UK Chartered Safety Profile"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all"
                title="IOSH UK Chartered Safety Professional (#100175)"
              >
                <Award className="w-4 h-4 text-emerald-400" />
              </a>
              <a
                id="footer-quick-researchgate"
                href="https://www.researchgate.net/search/publication?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate Publications"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all"
                title="ResearchGate Scientific Papers"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </a>
              <a
                id="footer-quick-scholar"
                href="https://scholar.google.com/scholar?q=Iyenoma+ThankGod+Osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar Citation Index"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all"
                title="Google Scholar Citations"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
              </a>
              <a
                id="footer-quick-email"
                href="mailto:contact@iyenomaosazee.com"
                aria-label="Direct Email Liaison"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all"
                title="Direct Executive Email"
              >
                <Mail className="w-4 h-4 text-rose-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('overview')}
                  className="hover:text-white transition-colors"
                >
                  Executive Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('overview', 'signature-works-section')}
                  className="hover:text-white transition-colors"
                >
                  Signature Megaprojects (Works)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('overview', 'services-powerhouse-section')}
                  className="hover:text-white transition-colors"
                >
                  Safety & Advisory Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('publications')}
                  className="hover:text-white transition-colors"
                >
                  Research Papers & WBGT Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('leadership')}
                  className="hover:text-white transition-colors"
                >
                  Institutional Leadership & Honors
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Engagement & Consultation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Executive Engagement
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Available for high-consequence project safety governance, ISO 45001 auditing diagnostics, and international keynote addresses.
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => {
                  if (onOpenBookingModal) onOpenBookingModal();
                  else handleNav('advisory');
                }}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                <span>Book a Consultation Call</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleNav('advisory')}
                className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium text-xs border border-white/10 transition-colors text-center"
              >
                Submit Formal Written Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* Professional Networks & Verified Social Profiles Section */}
        <div id="footer-social-media-section" className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#aaa3ff] text-[11px] font-mono">
                <Share2 className="w-3.5 h-3.5 text-[#aaa3ff]" />
                <span>Professional Profiles & Verified Networks</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Connect Across Global Safety, Engineering & Research Platforms
              </h3>
              <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                Verified digital profiles across international occupational health registries, scholarly indexes, statutory councils, and executive networking platforms.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">Verified & Active Channels</span>
            </div>
          </div>

          {/* Side-by-Side Boxes: Executive Direct Liaison & IOSH UK Chartered Directory (No "View Profile" link) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {INSTITUTIONAL_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <a
                  key={card.id}
                  id={`footer-card-${card.id}`}
                  href={card.url}
                  target={card.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={card.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                        <IconComponent className="w-4 h-4 text-white group-hover:text-[#aaa3ff] transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#aaa3ff] transition-colors flex items-center gap-1.5">
                          <span>{card.name}</span>
                        </h4>
                        <span className="font-mono text-[10px] text-neutral-400 block truncate max-w-[200px] sm:max-w-xs">
                          {card.handle}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${card.badgeColor} whitespace-nowrap`}>
                      {card.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-mono text-[10px] text-neutral-400">{card.category}</span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Other Professional & Scientific Platform Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {PLATFORM_PROFILES.map((profile) => {
              const IconComponent = profile.icon;
              return (
                <a
                  key={profile.id}
                  id={`footer-social-card-${profile.id}`}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 group-hover:border-white/20 transition-colors">
                        <IconComponent className="w-4 h-4 text-white group-hover:text-[#aaa3ff] transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#aaa3ff] transition-colors flex items-center gap-1.5">
                          <span>{profile.name}</span>
                        </h4>
                        <span className="font-mono text-[10px] text-neutral-400 block truncate max-w-[150px]">
                          {profile.handle}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${profile.badgeColor} whitespace-nowrap`}>
                      {profile.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {profile.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                    <span className="font-mono text-[10px] text-neutral-400">{profile.category}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#aaa3ff] group-hover:translate-x-0.5 transition-transform">
                      <span>View Profile</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* DIALEDWEB GIANT TYPOGRAPHY BANNER */}
        <div className="pt-10 border-t border-white/10 flex flex-col items-center justify-center select-none pointer-events-none">
          <span className="text-[15vw] leading-[0.8] font-display font-black tracking-tighter text-white/[0.04] uppercase text-center block">
            OSAZEE
          </span>
        </div>

        {/* Bottom Legal & Back to Top Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] font-mono text-neutral-300">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Engr. Iyenoma ThankGod Osazee. All rights reserved.</span>
            <span>•</span>
            <span>HSE Manager, Julius Berger Nigeria PLC</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
