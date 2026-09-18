import React, { useState } from 'react';
import { PageId } from '../../types';
import { 
  CREDENTIALS, 
  ACADEMIC_QUALIFICATIONS, 
  CAREER_HISTORY,
  PROFILE_SUMMARY 
} from '../../data/profileData';
import { SIGNATURE_WORKS, Megaproject } from '../../data/projectsData';
import { ThermalCalculator } from '../tools/ThermalCalculator';
import { CaseStudyModal } from '../modals/CaseStudyModal';
import { CountUp } from '../CountUp';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Sliders, 
  PhoneCall, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Quote,
  Star,
  Activity
} from 'lucide-react';

interface OverviewPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ 
  onSelectPage,
  onOpenBookingModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Megaproject | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  const [card1Key, setCard1Key] = useState<number>(0);
  const [card2Key, setCard2Key] = useState<number>(0);
  const [card3Key, setCard3Key] = useState<number>(0);
  const [card4Key, setCard4Key] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Megaprojects' },
    { id: 'Bridges & Marine', label: 'Bridges & Marine' },
    { id: 'Expressways & Corridors', label: 'Expressways & Corridors' },
    { id: 'Heavy Civil & High-Rise', label: 'Heavy Civil & High-Rise' },
    { id: 'Environmental & Industrial', label: 'Environmental Remediation' },
    { id: 'Statutory Governance', label: 'Statutory Governance' }
  ];

  const filteredProjects = SIGNATURE_WORKS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const services = [
    {
      number: '01',
      title: 'Mega-Infrastructure Safety Directorship & Executive Governance',
      desc: 'Enterprise-level occupational safety governance for complex civil engineering schemes, bridges, highway corridors, and multi-tier public works.',
      deliverables: [
        'Site-specific safety cases & high-consequence lifting regimes',
        'Zero-harm behavioral frameworks tailored for multicultural workforces',
        'Real-time contractor compliance dashboards and risk registries',
        'Executive board safety advisory and client liaison'
      ],
      tag: 'Strategic Directorship'
    },
    {
      number: '02',
      title: 'ISO 45001 & ISO 14001 Integrated Systems & Auditing',
      desc: 'Global benchmark OHSMS and EMS diagnostics as a certified Lead Auditor, eliminating single-point organizational failure modes.',
      deliverables: [
        'ISO 45001:2018 comprehensive systems certification auditing',
        'ISO 14001:2015 environmental impact attenuation audits',
        'Legal compliance verification under Nigerian & British statutory codes',
        'Corrective action architecture and preventative barrier design'
      ],
      tag: 'Lead Auditor #423290'
    },
    {
      number: '03',
      title: 'Bioclimatic Thermal Stress & WBGT Field Mitigation',
      desc: 'Applied environmental ergonomics for extreme outdoor heat, asphalt laydown, and heavy manual labour in tropical sub-Saharan climates.',
      deliverables: [
        'Calibrated Wet Bulb Globe Temperature (WBGT) index mapping',
        'Metabolic work-rest cycle schedules preventing heat syncope',
        'On-site electrolyte hydration protocols & biometric monitoring',
        'Field-validated risk software deployed across frontline gangs'
      ],
      tag: 'BOHS Bursary Pedigree',
      hasCalculatorTrigger: true
    },
    {
      number: '04',
      title: 'Construction SME & Subcontractor Safety Capacity Building',
      desc: 'Empirically tested safety coaching methodology selected from 1,100+ submissions at the 23rd World Congress on Safety and Health in Sydney.',
      deliverables: [
        'Non-punitive safety coaching models for informal contractors',
        'Practical hazard communication avoiding bureaucratic paralysis',
        'Tier-1 supply chain alignment for developing construction markets',
        'Cost-neutral safety interventions delivering verified LTIFR cuts'
      ],
      tag: 'World Congress Selected'
    },
    {
      number: '05',
      title: 'Keynote Addresses, Board Masterclasses & CMIOSH Mentorship',
      desc: 'Inspiring international keynote presentations and executive mentoring for senior safety professionals preparing for IOSH peer review.',
      deliverables: [
        'Signature keynotes on Just Culture & Engineering Safety Integration',
        'Parliamentary & regulatory advisory for statutory commissions',
        'CMIOSH Peer Review Interview preparation and portfolio review',
        'Corporate leadership seminars on psychological safety and zero blame'
      ],
      tag: 'IOSH Peer Panelist'
    }
  ];

  const testimonials = [
    {
      quote: "Engr. Osazee brings a level of engineering rigor and meticulous safety discipline that transforms how complex civil undertakings are delivered. His leadership ensures zero compromise on human life across the country's most demanding infrastructure corridors.",
      author: "Julius Berger Civil Engineering Directorate",
      role: "Executive Operations & Megaproject Leadership",
      entity: "Julius Berger Nigeria PLC",
      badge: "Corporate Leadership"
    },
    {
      quote: "His strategic mediation within the House of Representatives Committee restored statutory stability and integrity to Nigeria's safety regulatory landscape, leading directly to the historic October 2024 national elections.",
      author: "Parliamentary Sub-Committee Delegation",
      role: "House of Representatives Committee on Safety Standards",
      entity: "10th National Assembly of Nigeria",
      badge: "Statutory Governance"
    },
    {
      quote: "Selected out of over 1,100 global submissions for the 23rd World Congress in Sydney, his research on construction SME safety capacity offers a pragmatic, life-saving blueprint for developing world infrastructure.",
      author: "International Peer Review Committee",
      role: "Global Selection Panel",
      entity: "23rd World Congress on Safety and Health at Work (Sydney)",
      badge: "Global Research Peer"
    },
    {
      quote: "Serving on the IOSH Chartered Membership Peer Review Interview Panel, Engr. Osazee upholds the highest standards of professional competence and ethics that define global chartered safety practitioners.",
      author: "Chartered Assessment Body",
      role: "Professional Standards & Peer Review",
      entity: "Institution of Occupational Safety and Health (IOSH UK)",
      badge: "CMIOSH Accreditation"
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pt-24 pb-20">
      
      {/* 1. HERO SECTION (Dialedweb Style: Sleek Glow, Big Typography, Status Pill, Dual CTAs, Interactive Stage) */}
      <section className="relative pt-6 sm:pt-12">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] dialed-glow pointer-events-none -z-10" />

        <div className="space-y-8 max-w-4xl mx-auto text-center">
          {/* Live Status Pill (Dialedweb Signature) */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-neutral-200 text-xs font-mono shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#aaa3ff] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#aaa3ff] -ml-4" />
            <span className="tracking-wide">Available for Strategic Advisory & Global Keynotes</span>
            <span className="text-neutral-500">•</span>
            <span className="text-[#aaa3ff] font-semibold">Julius Berger PLC</span>
          </div>

          {/* Main Hero Headline (Dialedweb Typography: Large, Bold, Tight Tracking) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
            Engineered Safety That Protects <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Megaprojects & Human Lives</span>.
          </h1>

          {/* Hero Subtitle & Strategic Narrative */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Safety isn&apos;t just a hard hat or a compliance checklist—it is the invisible engineering that allows humanity to dare the impossible. When thousands of tonnes of steel hang mid-air and live traffic roars beneath, true safety transforms raw peril into flawless execution. Drawing on over two decades of high-consequence HSEQ leadership across premier civil engineering corridors, partnering with corporate boards, government authorities, and industrial contractors across Africa and international jurisdictions to fortify safety governance, mitigate critical business risks, and embed resilient management systems that generate enduring value.
          </p>

          {/* Hero Action Buttons (Dialedweb Style: White Pill with Arrow + Glass Frosted Capsule) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#signature-works-section"
              className="flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-tight transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
            >
              <span>Explore Signature Works</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('interactive-wbgt-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-[#aaa3ff]" />
              <span>Test WBGT Field Calculator</span>
            </button>

            <button
              onClick={onOpenBookingModal}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-medium text-sm transition-all"
            >
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Institutional Trust Badges Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              CMIOSH Credential #100175
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              ISO 45001 Lead Auditor #423290
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              Fellow of the Institute (ISPON)
            </span>
          </div>
        </div>

        {/* Hero Interactive Showcase Stage: Signature Megaprojects Teaser Cards */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#08080d]/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-neutral-400 border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 text-neutral-200 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Operational Command Snapshot • Live Federal Works
              </span>
              <span className="hidden sm:inline text-neutral-400">
                Julius Berger Nigeria PLC Engineering Infrastructure
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SIGNATURE_WORKS.slice(0, 3).map((work) => (
                <div 
                  key={work.id}
                  onClick={() => setActiveCaseStudy(work)}
                  className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#aaa3ff] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {work.category}
                      </span>
                      <span className="text-neutral-400">{work.metrics[0].value}</span>
                    </div>

                    <h3 className="text-base font-display font-bold text-white group-hover:text-[#aaa3ff] transition-colors line-clamp-1">
                      {work.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {work.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="text-[11px] text-emerald-400 font-medium truncate max-w-[180px]" title={work.safetyRecord}>
                      {work.safetyRecord}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-white shrink-0">
                      Inspect
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY PERFORMANCE INDICATORS ("Numbers That Just Make Sense" - Dialedweb Pattern) */}
      <section id="kpi-metrics-section" className="space-y-8 scroll-mt-24">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#aaa3ff] text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Key Performance Indicators • Dynamic Active Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Numbers That Just Make Sense
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Relentlessly standard-driven, engineering zero-harm environments across West Africa&apos;s largest infrastructure corridors.
          </p>
        </div>

        {/* Big KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Frontline Tenure */}
          <div 
            onMouseEnter={() => setCard1Key(k => k + 1)}
            onClick={() => setCard1Key(k => k + 1)}
            className="group p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-2 flex flex-col justify-between cursor-pointer"
            title="Hover or click to recount"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-[#aaa3ff] transition-colors">Frontline Tenure</span>
              <span className="text-[10px] font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">Live</span>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                <CountUp 
                  end={22} 
                  suffix="+" 
                  duration={1600} 
                  triggerKey={card1Key} 
                /> <span className="text-2xl text-neutral-400">Years</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Executive HSE leadership delivering landmark national infrastructure at Julius Berger PLC.
              </p>
            </div>
          </div>

          {/* Card 2: Operational Exposure */}
          <div 
            onMouseEnter={() => setCard2Key(k => k + 1)}
            onClick={() => setCard2Key(k => k + 1)}
            className="group p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-2 flex flex-col justify-between cursor-pointer"
            title="Hover or click to recount"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-[#aaa3ff] transition-colors">Operational Exposure</span>
              <span className="text-[10px] font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">Live</span>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                <CountUp 
                  end={50} 
                  suffix="M+" 
                  duration={1800} 
                  triggerKey={card2Key} 
                /> <span className="text-2xl text-neutral-400">Hours</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Supervised safe work-hours under zero-fatal incident protocols across live multi-tier civil schemes.
              </p>
            </div>
          </div>

          {/* Card 3: Global Recognition */}
          <div 
            onMouseEnter={() => setCard3Key(k => k + 1)}
            onClick={() => setCard3Key(k => k + 1)}
            className="group p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-2 flex flex-col justify-between cursor-pointer"
            title="Hover or click to recount"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-[#aaa3ff] transition-colors">Global Selection</span>
              <span className="text-[10px] font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">Live</span>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                <CountUp 
                  end={1100} 
                  suffix="+" 
                  duration={2000} 
                  triggerKey={card3Key} 
                /> <span className="text-2xl text-neutral-400">Submissions</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Selected speaker at the 23rd World Congress on Safety and Health at Work in Sydney, Australia.
              </p>
            </div>
          </div>

          {/* Card 4: Chartered Rigor */}
          <div 
            onMouseEnter={() => setCard4Key(k => k + 1)}
            onClick={() => setCard4Key(k => k + 1)}
            className="group p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-2 flex flex-col justify-between cursor-pointer"
            title="Hover or click to recount"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400 group-hover:text-[#aaa3ff] transition-colors">Chartered Rigor</span>
              <span className="text-[10px] font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">Live</span>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                <CountUp 
                  end={2} 
                  duration={1200} 
                  triggerKey={card4Key} 
                /> <span className="text-2xl text-neutral-400">Master Degrees</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Civil Engineering (Heriot-Watt, Edinburgh) & Environmental OSH (Portsmouth, UK).
              </p>
            </div>
          </div>
        </div>

        {/* Verifiable Credentials Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-mono text-neutral-400 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ISO 45001 Lead Auditor (#423290)
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#aaa3ff]" />
            IOSH Chartered Fellow Assessor (#100175)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            Registered Professional Engineer (MNSE)
          </span>
        </div>
      </section>

      {/* 3. SIGNATURE WORKS & MEGAPROJECTS (Dialedweb Style: Filterable Showcase with Interactive Case Study Trigger) */}
      <section id="signature-works-section" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
              Signature Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Featured Infrastructure Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono">
              Operational case studies across mega-bridges, metropolitan expressways, environmental bioreactors, and parliamentary reforms.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((work) => (
            <article
              key={work.id}
              onClick={() => setActiveCaseStudy(work)}
              className="group relative p-6 sm:p-7 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 text-[#aaa3ff] border border-white/10 font-medium">
                    {work.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {work.period}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#aaa3ff] transition-colors leading-snug">
                    {work.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {work.location}
                  </p>
                </div>

                {/* Brief Narrative */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {work.summary}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Safe Hours</span>
                    <strong className="text-xs font-display font-bold text-white">{work.metrics[0].value}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Outcome</span>
                    <strong className="text-xs font-display font-bold text-emerald-400 truncate block">{work.metrics[3].value}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span className="text-neutral-400">{work.client.split('/')[0]}</span>
                <span className="flex items-center gap-1 text-white font-semibold group-hover:translate-x-1 transition-transform">
                  View Full Case Study
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. OUR SERVICES: YOUR SAFETY & ENGINEERING POWERHOUSE (Dialedweb "Our Services: Your Digital Powerhouse") */}
      <section id="services-powerhouse-section" className="space-y-8 scroll-mt-28">
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Your Safety & Engineering Powerhouse
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Providing end-to-end HSE directorship, certified ISO 45001/14001 auditing, bioclimatic heat stress systems, and strategic regulatory liaison for corporations and statutory authorities.
          </p>
        </div>

        {/* Interactive Services Showcase: Master Tabs + Detailed Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Selector Tabs (5 Services) */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((svc, idx) => {
              const isActive = activeServiceTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveServiceTab(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-start space-x-4 border ${
                    isActive 
                      ? 'bg-white text-black border-white shadow-xl scale-[1.01]' 
                      : 'bg-[#08080d] hover:bg-white/[0.04] text-neutral-300 border-white/10'
                  }`}
                >
                  <span className={`text-sm font-mono font-bold ${isActive ? 'text-black' : 'text-[#aaa3ff]'}`}>
                    {svc.number}
                  </span>
                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-display font-bold leading-snug ${isActive ? 'text-black' : 'text-white'}`}>
                      {svc.title}
                    </h4>
                    <span className={`text-[11px] font-mono block ${isActive ? 'text-neutral-700' : 'text-neutral-400'}`}>
                      {svc.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detailed Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#08080d] border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-[#aaa3ff] uppercase tracking-wider font-semibold">
                Practice Area {services[activeServiceTab].number} of 05
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono border border-white/10">
                {services[activeServiceTab].tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {services[activeServiceTab].title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {services[activeServiceTab].desc}
              </p>
            </div>

            {/* Core Deliverables List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                Signature Deliverables & Executive Outcomes:
              </span>
              <ul className="space-y-2.5">
                {services[activeServiceTab].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-200">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Action Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              {services[activeServiceTab].hasCalculatorTrigger ? (
                <button
                  onClick={() => {
                    const el = document.getElementById('interactive-wbgt-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#aaa3ff] text-black font-bold text-xs hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <Activity className="w-4 h-4" />
                  <span>Launch Live WBGT Calculator Below</span>
                </button>
              ) : (
                <div className="text-xs font-mono text-neutral-400">
                  Custom proposals formulated upon formal inquiry
                </div>
              )}

              <button
                onClick={onOpenBookingModal}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Book This Engagement</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE APPLIED SCIENCE: WBGT & THERMAL HAZARDS FIELD CALCULATOR */}
      <section id="interactive-wbgt-section" className="space-y-6 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#aaa3ff] text-xs font-mono mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Applied Research Implementation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Thermal Environment & WBGT Field Calculator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
              Field ergonomics tool based on Engr. Osazee&apos;s BOHS bursary research and Julius Berger tropical site protocols.
            </p>
          </div>

          <button
            onClick={() => onSelectPage('publications')}
            className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1 shrink-0"
          >
            <span>View All Research Papers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Calculator Component */}
        <ThermalCalculator />
      </section>

      {/* 6. TESTIMONIALS & INSTITUTIONAL WORDS (Dialedweb Pattern: What Our Partners Say) */}
      <section className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Institutional Feedback & Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            Independent appraisals from corporate directors, legislative panels, and chartered institutions.
          </p>
        </div>

        {/* Testimonials Cards Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-neutral-600" />
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono">
                    {t.role} • {t.entity}
                  </p>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#aaa3ff]">
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ABOUT / ACADEMIC & INSTITUTIONAL LEADERSHIP (Dialedweb Style: "Our Global Team / About Us") */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#08080d] border border-white/10 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
              Institutional Pedigree
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Dual-Master Engineer, Chartered Fellow & Legislative Mediator
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Engr. Osazee unites structural civil fundamentals with occupational health, environmental microbiology, and parliamentary safety governance.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSelectPage('leadership')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold font-mono border border-white/15 transition-all"
            >
              Explore Full Leadership Dossier
            </button>
          </div>
        </div>

        {/* Qualifications & Career Highlights Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACADEMIC_QUALIFICATIONS.map((acad, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-[#aaa3ff] border border-white/10 font-semibold">
                  {acad.badge}
                </span>
                <h4 className="text-base font-display font-bold text-white leading-snug">
                  {acad.degree}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {acad.institution} • {acad.period}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  {acad.detail}
                </p>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                Verified Academic Record
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. HIGH-IMPACT BOTTOM CTA BANNER (Dialedweb Pattern: "Grow Your Digital Presence / Let's Build Something Extraordinary") */}
      <section className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#0e0e18] to-black border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden text-center space-y-6">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Lead in Your Industry
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Ready to Build an Uncompromising Standard of Safety?
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Available for executive safety directorship, ISO management system audits, high-consequence infrastructure bid advisory, and international keynote presentations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBookingModal}
            className="flex items-center space-x-2 px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-tight transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            <span>Book an Advisory Consultation</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => onSelectPage('services')}
            className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all backdrop-blur-md"
          >
            Submit Detailed Project Dossier
          </button>
        </div>

        <p className="text-xs text-neutral-400 font-mono">
          Direct Liaison: contact@iyenomaosazee.com • Abuja, Federal Capital Territory, Nigeria
        </p>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onBookAdvisory={onOpenBookingModal}
      />
    </div>
  );
};
