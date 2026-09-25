import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { 
  CREDENTIALS, 
  ACADEMIC_QUALIFICATIONS, 
  CAREER_HISTORY,
  PROFILE_SUMMARY,
  LEADERSHIP_ROLES,
  AWARDS_AND_HONORS
} from '../../data/profileData';
import { 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight, 
  Building2, 
  Calendar, 
  MapPin, 
  FileText,
  BadgeCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface AboutPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
  onOpenCredentialsModal: () => void;
}

const EXPERTISE_DOMAINS = [
  {
    title: "Civil Infrastructure & Marine Safety",
    desc: "Rigorous safety cases for long-span bridges, marine cofferdams, deep pile driving, and expressway corridors over live traffic.",
    tags: ["Bridge Erection", "Marine Works", "Deep Excavations", "Tandem Heavy Lifting"]
  },
  {
    title: "ISO 45001 & ISO 14001 Auditing Systems",
    desc: "Certified Lead Auditor (#423290) designing integrated HSEQ systems, gap diagnoses, and legal compliance architectures.",
    tags: ["CQI/IRCA Certified", "Statutory Compliance", "Zero-Harm Culture", "Audit Defense"]
  },
  {
    title: "Thermal Hazards & Bioclimatic WBGT",
    desc: "Empirical heat stress assessment for tropical construction, deploying custom WBGT algorithms and metabolic work-rest regimens.",
    tags: ["BOHS Bursary Winner", "Wet Bulb Globe Temp", "Hydration Ergonomics", "Heat Morbidity Cuts"]
  },
  {
    title: "Statutory Reform & Dispute Arbitration",
    desc: "Parliamentary advisory panelist under the ISPON Act 2014, resolving decade-long institutional factional crises through structured governance.",
    tags: ["House of Representatives", "National Assembly", "Statutory Mediation", "ISPON Fellowship"]
  },
  {
    title: "Construction SME Capacity Building",
    desc: "World Congress selected non-punitive safety coaching methodology, closing the critical safety gap in sub-tier contractor supply chains.",
    tags: ["23rd World Congress", "Just Culture", "Subcontractor Alignment", "Micro-Toolbox Training"]
  },
  {
    title: "Chartered Assessment & Mentorship",
    desc: "IOSH UK Chartered Peer Review Interview Panelist, evaluating and mentoring senior global practitioners toward chartered (CMIOSH) standing.",
    tags: ["CMIOSH #100175", "IOSH Peer Panel", "Executive Coaching", "Ethics Governance"]
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectPage,
  onOpenBookingModal,
  onOpenCredentialsModal
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pt-20 sm:pt-28 pb-16 sm:pb-20">
      
      {/* Header Banner with Executive Leadership Image */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#3c4043] text-neutral-800 dark:text-neutral-200 text-xs font-mono shadow-sm">
            <BadgeCheck className="w-3.5 h-3.5 text-black dark:text-white" />
            <span className="whitespace-nowrap">Evidence-Based Executive Profile • Scanning Dossier</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              About Engr. Iyenoma ThankGod Osazee
            </h1>

            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
              Advancing safer workplaces through professional HSE practice, engineering expertise, and scientific knowledge sharing.
            </p>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A distinguished Nigerian HSE executive with 22+ years at the forefront of civil engineering megaprojects with Julius Berger Nigeria PLC. Sitting at the rare intersection of civil engineering rigor and industrial hygiene, he translates statutory codes and international standards (ISO 45001 &amp; ISO 14001) into living, resilient worksite cultures.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">CMIOSH #100175</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">Fellow ISPON (#004)</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">COREN Reg. Civil Engr</span>
          </div>
        </div>

        {/* Executive Portrait / Field Leadership Showcase */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#3c4043] bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
            <div className="relative h-64 sm:h-80 lg:h-[400px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Engr. Osazee Executive HSE Engineering Field Directorship and Civil Works Inspection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono self-start">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Julius Berger PLC Senior HSE Lead</span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                  Field Directorship • 22+ Years
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow leading-snug">
                  Civil Engineering Rigor &amp; Industrial Hygiene
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  Directing zero-harm safety regimes on bridge structures, deep marine pilings, and highway corridors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Visual Chunk 1: Areas of Expertise */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-[#333538] pb-3 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#444746] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Areas of Core Expertise
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">6 Core Disciplines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {EXPERTISE_DOMAINS.map((domain, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <h3 className="text-base font-display font-bold text-black dark:text-white leading-snug">
                  {domain.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {domain.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-white/5">
                {domain.tags.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/5 text-[10px] font-mono text-neutral-700 dark:text-neutral-400 border border-neutral-200 dark:border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Visual Chunk 2: Professional Credentials (Evidence System) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-[#333538] pb-3 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#444746] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Professional Credentials &amp; Certifications
            </h2>
          </div>
          
          <button
            onClick={onOpenCredentialsModal}
            className="text-xs font-mono text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white flex items-center gap-1 transition-colors min-h-[36px] font-semibold cursor-pointer"
          >
            <span>View All Registry (12+)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {CREDENTIALS.slice(0, 3).map((cred) => (
            <div
              key={cred.id}
              className="p-5 sm:p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#3c4043] text-xs font-mono font-bold">
                    {cred.designation}
                  </span>
                  {cred.credentialId && (
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      {cred.credentialId}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-black dark:text-white leading-snug">
                  {cred.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  {cred.issuer}
                </p>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                  {cred.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-black dark:text-white">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white" />
                  Active Standing
                </span>
                <span className="text-neutral-500">{cred.year || 'Corporate'}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Visual Chunk 3: Professional Experience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-[#333538] pb-3 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#444746] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Professional Experience &amp; Directorship
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">22+ Years Senior Tenure</span>
        </div>

        <div className="space-y-4">
          {CAREER_HISTORY.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-7 md:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 space-y-3 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-[#333538] pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-xl font-display font-bold text-black dark:text-white leading-snug">
                    {item.role}
                  </h3>
                  <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-black dark:text-white" />
                    <span>{item.organization}</span>
                    <span className="text-neutral-400">•</span>
                    <MapPin className="w-3.5 h-3.5 text-black dark:text-white" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-300 font-mono text-xs">
                  {item.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {item.scope}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {item.highlights.map((h, hidx) => (
                  <div key={hidx} className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Visual Chunk 4: Education & Academic Rigor */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-[#333538] pb-3 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#444746] flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Education &amp; Academic Rigor
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Dual Master of Science</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {ACADEMIC_QUALIFICATIONS.map((acad, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 space-y-3 flex flex-col justify-between transition-all"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full dialed-glass-pill text-[10px] font-mono uppercase font-semibold text-[#a8c7fa]">
                  {acad.badge}
                </span>

                <h3 className="text-base font-display font-bold text-white leading-snug">
                  {acad.degree}
                </h3>

                <p className="text-xs text-[#c4c7c5] font-mono font-medium">
                  {acad.institution}
                </p>

                <p className="text-xs text-[#8e918f] leading-relaxed pt-1">
                  {acad.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-xs font-mono text-[#8e918f] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#a8c7fa]" />
                <span>{acad.period}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Visual Chunk 5: Professional Memberships & Institutional Governance */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-[#333538] pb-3 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl dialed-glass-pill text-white flex items-center justify-center font-bold text-xs">
              05
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Institutional Governance &amp; Fellowships
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Statutory &amp; International</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {LEADERSHIP_ROLES.slice(0, 4).map((role, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 space-y-2 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{role.period}</span>
                <span className="px-2 py-0.5 rounded dialed-glass-pill text-[#a8c7fa] uppercase text-[10px]">
                  {role.category}
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-white leading-snug">
                {role.role}
              </h3>

              <p className="text-xs text-[#a8c7fa] font-medium">
                {role.organization}
              </p>

              <p className="text-xs text-[#c4c7c5] leading-relaxed pt-1">
                {role.impactSummary}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bottom Action Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 sm:p-10 rounded-3xl dialed-glass-card-elevated border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
            Engage Engr. Osazee for Strategic Governance
          </h3>
          <p className="text-xs sm:text-sm text-[#c4c7c5] leading-relaxed">
            Available for executive safety directorship, high-consequence project advisory, and international keynote presentations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-bold text-xs transition-all shadow-md min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Book Strategic Consultation
          </button>
          <button
            onClick={() => onSelectPage('books')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#282a2c] hover:bg-[#333538] text-white font-medium text-xs transition-colors border border-[#3c4043] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            View Published Books &rarr;
          </button>
        </div>
      </motion.section>
    </div>
  );
};
