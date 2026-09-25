import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

interface ServicesPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectPage,
  onOpenBookingModal
}) => {
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    inquiryReason: 'hse_consultation',
    serviceType: 'mega_infrastructure',
    timeframe: 'immediate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');

  const INQUIRY_REASONS = [
    { id: 'hse_consultation', label: 'HSE Consultation' },
    { id: 'speaking_training', label: 'Speaking Engagement' },
    { id: 'book_enquiry', label: 'Book & Research Enquiry' },
    { id: 'iso_audit', label: 'ISO 45001 / 14001 Audit' },
    { id: 'professional_opportunity', label: 'Professional Opportunity' },
    { id: 'general_enquiry', label: 'General Enquiry' }
  ];

  const services = [
    {
      number: '01',
      title: 'Mega-Infrastructure Safety Directorship & Executive Governance',
      desc: 'Enterprise-level occupational safety governance for complex civil engineering schemes, bridges, highway corridors, and multi-tier public works.',
      deliverables: [
        'Site-specific safety cases & high-consequence lifting regimes',
        'Zero-harm behavioral frameworks tailored for multicultural workforces',
        'Real-time contractor compliance dashboards and risk registries',
        'Executive board safety advisory and statutory client liaison'
      ],
      tag: 'Strategic Directorship',
      serviceKey: 'mega_infrastructure'
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
      tag: 'Lead Auditor #423290',
      serviceKey: 'iso_audit'
    },
    {
      number: '03',
      title: 'Bioclimatic Thermal Stress & WBGT Field Mitigation',
      desc: 'Applied environmental ergonomics for extreme outdoor heat, asphalt laydown, and heavy manual labour in tropical sub-Saharan climates.',
      deliverables: [
        'Calibrated Wet Bulb Globe Temperature (WBGT) index mapping',
        'Metabolic work-rest cycle schedules preventing heat syncope',
        'On-site electrolyte hydration protocols & biometric monitoring',
        'Statutory compliance guidelines for tropical infrastructure sites'
      ],
      tag: 'Scientific Ergonomics',
      serviceKey: 'thermal_stress'
    },
    {
      number: '04',
      title: 'Construction SME Safety Capacity & Behavioral Frameworks',
      desc: 'Scalable safety coaching grounded in empirical research presented at the 23rd World Congress on Safety and Health in Sydney.',
      deliverables: [
        'Subcontractor capability screening & onboarding systems',
        'Frontline supervisory safety leadership bootcamps',
        'Cost-effective risk management protocols for high-growth contractors',
        'Peer mentoring and CMIOSH progression coaching'
      ],
      tag: 'World Congress Research',
      serviceKey: 'sme_capacity'
    },
    {
      number: '05',
      title: 'Executive Board Masterclasses & CMIOSH Mentorship',
      desc: 'Inspiring international keynote presentations, parliamentary advisory, and tailored executive mentoring for safety professionals preparing for IOSH peer review.',
      deliverables: [
        'Signature keynotes on Just Culture & Civil Engineering Safety',
        'Parliamentary & statutory advisory for regulatory commissions',
        'CMIOSH Peer Review Interview preparation & portfolio review',
        'Executive board masterclasses on psychological safety & zero harm'
      ],
      tag: 'IOSH Peer Panelist',
      serviceKey: 'keynote_speaking'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    const generatedId = `ETO-SRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      inquiryReason: 'advisory',
      serviceType: 'mega_infrastructure',
      timeframe: 'immediate',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* 1. Page Header with Advisory Leadership Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Executive Services • Engineering &amp; Safety Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Safety &amp; Advisory Services Powerhouse
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Uniting twenty-two years of high-consequence site command at Julius Berger PLC with peer-reviewed environmental science and international statutory credentials. Bespoke advisory for boards, mega-infrastructure ventures, and institutional authorities.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">ISO 45001 &amp; 14001 Auditing</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">Major Infrastructure Safety</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">Executive Mentorship</span>
          </div>
        </div>

        {/* Advisory & Systems Governance Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#3c4043] bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Civil Engineering Safety Blueprint Analysis and Regulatory Systems Audit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono self-start">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>COREN Reg. Civil Engineer • IRCA Lead Auditor</span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                  Systems Architecture &amp; Governance
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow leading-snug">
                  Statutory &amp; Institutional Oversight
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  Eliminating catastrophic single-point risk across complex multi-contractor environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Interactive Tabbed Service Powerhouse */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-200 dark:border-[#333538] pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
            Select Core Domain
          </span>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            5 Executive Advisory Capabilities
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {services.map((srv, idx) => (
            <button
              key={srv.number}
              onClick={() => setActiveServiceTab(idx)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-4 cursor-pointer ${
                activeServiceTab === idx
                  ? 'bg-white text-[#131314] border-white shadow-[0_10px_30px_rgba(255,255,255,0.25)] font-bold'
                  : 'dialed-glass-card hover:border-white/30 text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-mono font-bold ${activeServiceTab === idx ? 'text-[#131314]' : 'text-[#a8c7fa]'}`}>
                  {srv.number}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  activeServiceTab === idx
                    ? 'bg-neutral-200 text-black border-transparent'
                    : 'dialed-glass-pill text-[#c4c7c5]'
                }`}>
                  {srv.tag}
                </span>
              </div>
              <h3 className={`text-sm font-display font-bold leading-snug ${activeServiceTab === idx ? 'text-[#131314]' : 'text-white'}`}>
                {srv.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Active Tab Showcase Box */}
        <div className="p-8 sm:p-12 rounded-3xl dialed-glass-card text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full dialed-glass-pill text-[#a8c7fa] text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a8c7fa]" />
                  <span>{services[activeServiceTab].tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight">
                  {services[activeServiceTab].title}
                </h2>
                <p className="text-sm sm:text-base text-[#c4c7c5] leading-relaxed pt-1">
                  {services[activeServiceTab].desc}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a8c7fa] block font-semibold">
                  Mandatory Key Deliverables & Scopes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[activeServiceTab].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#c4c7c5]">
                      <CheckCircle2 className="w-4 h-4 text-[#a8c7fa] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Book Advisory Session</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <a
                  href="#inquiry-form-section"
                  className="px-5 py-3 rounded-full dialed-glass-pill hover:bg-white/10 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Submit Written Project Brief
                </a>
              </div>
            </div>

            {/* Strategic Value Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl dialed-glass-elevated space-y-4">
              <span className="text-xs font-mono uppercase text-white font-semibold block">
                Standard of Rigor
              </span>
              <div className="space-y-3 text-xs text-[#c4c7c5] leading-relaxed">
                <p>
                  Engr. Osazee holds chartered status with the Institution of Occupational Safety and Health (CMIOSH #100175) and certified Lead Auditor status under IRCA (#423290).
                </p>
                <p>
                  Engagements are backed by documented field methodologies proven across 50,000,000+ incident-free man-hours on Julius Berger mega-infrastructure projects.
                </p>
              </div>

              <div className="p-4 rounded-xl dialed-glass-pill space-y-2">
                <div className="text-[11px] font-mono text-[#8e918f] uppercase">
                  Liaison Channel
                </div>
                <div className="text-xs font-mono text-white font-semibold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#a8c7fa]" />
                  <span>contact@iyenomaosazee.com</span>
                </div>
                <div className="text-[11px] text-[#8e918f]">
                  Abuja, Federal Capital Territory, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Formal Inquiry & Project Dossier Submission Form */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="inquiry-form-section" 
        className="space-y-8 scroll-mt-28"
      >
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a8c7fa] font-semibold">
            Direct Briefing Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight">
            Submit a Formal Project Inquiry
          </h2>
          <p className="text-sm text-[#c4c7c5] leading-relaxed">
            Provide the parameters of your planned infrastructure venture, audit mandate, or conference keynote. You will receive an immediate reference receipt and direct follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl dialed-glass-card-elevated border border-white/20">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-[#444746] text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-black dark:text-white leading-snug">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Your project dossier has been registered with reference ID:
                </p>
                <div className="p-3 rounded-xl bg-neutral-100 text-neutral-900 dark:bg-[#282a2c] dark:text-white font-mono text-sm font-bold inline-block border border-neutral-300 dark:border-neutral-700">
                  {inquiryId}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Engr. Osazee&apos;s executive liaison team will review your requirements and respond via email within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 pb-2">
                  <label className="text-xs font-mono uppercase text-black dark:text-white font-semibold block tracking-wider">
                    What are you contacting me about? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INQUIRY_REASONS.map((r) => {
                      const isSelected = formData.inquiryReason === r.id;
                      return (
                        <button
                          type="button"
                          key={r.id}
                          onClick={() => setFormData({ ...formData, inquiryReason: r.id })}
                          className={`p-3 rounded-xl text-xs font-mono text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-black text-white dark:bg-white dark:text-black font-bold border-black dark:border-white shadow-sm'
                              : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-white/5 hover:border-neutral-400 dark:hover:border-white/20'
                          }`}
                        >
                          <span className="block truncate">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Dr. Chidi Okafor"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                      Organization / Agency *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g., Federal Ministry of Works"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.gov.ng"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                      Advisory Domain *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    >
                      <option value="mega_infrastructure">Mega-Infrastructure Safety Governance</option>
                      <option value="iso_audit">ISO 45001 / 14001 Auditing & Diagnostics</option>
                      <option value="thermal_stress">Bioclimatic WBGT Thermal Fatigue Mitigation</option>
                      <option value="sme_capacity">Construction SME Safety Capacity Building</option>
                      <option value="keynote_speaking">Keynote Address & Executive Panels</option>
                      <option value="cmiosh_mentorship">Chartered CMIOSH Mentorship & Guidance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                    Execution Timeframe
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'immediate', label: 'Immediate / Urgent' },
                      { id: 'q1_q2', label: 'Within 30 Days' },
                      { id: 'q3_q4', label: 'Quarterly Planning' },
                      { id: 'retainer', label: 'Annual Retainer' }
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, timeframe: t.id })}
                        className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          formData.timeframe === t.id
                            ? 'bg-black text-white dark:bg-white dark:text-black font-semibold border-black dark:border-white'
                            : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-400 border-neutral-200 dark:border-white/5 hover:border-neutral-400 dark:hover:border-white/20'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-700 dark:text-neutral-300 block">
                    Project Parameters & Specific Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on site location, project scale, contractor arrangements, and specific safety advisory objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                    Official dispatches handled under strict confidentiality protocols.
                  </p>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    <span>Dispatch Project Dossier</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contact Information Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl dialed-glass-card-elevated border border-white/20 text-white space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#a8c7fa] font-semibold">
                Direct Executive Channels
              </span>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#282a2c] border border-[#3c4043] space-y-1">
                  <span className="text-[10px] font-mono text-[#8e918f] uppercase">
                    Primary Office
                  </span>
                  <div className="text-xs text-white font-medium">
                    HSE Directorate, Julius Berger Nigeria PLC
                  </div>
                  <div className="text-[11px] text-[#8e918f] font-mono">
                    Abuja, Federal Capital Territory, Nigeria
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#282a2c] border border-[#3c4043] space-y-1">
                  <span className="text-[10px] font-mono text-[#8e918f] uppercase">
                    Direct Email Liaison
                  </span>
                  <a
                    href="mailto:contact@iyenomaosazee.com"
                    className="text-xs text-[#a8c7fa] font-mono block hover:underline"
                  >
                    contact@iyenomaosazee.com
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#282a2c] border border-[#3c4043] space-y-1">
                  <span className="text-[10px] font-mono text-[#8e918f] uppercase">
                    Statutory Registry
                  </span>
                  <div className="text-xs text-white">
                    Institution of Occupational Safety & Health (UK)
                  </div>
                  <div className="text-[11px] text-[#8e918f] font-mono">
                    Chartered Fellow (CMIOSH #100175)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#333538]">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full py-3 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <span>Book Consultation Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
