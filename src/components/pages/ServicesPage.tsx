import React, { useState } from 'react';
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
    serviceType: 'mega_infrastructure',
    timeframe: 'immediate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');

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
      serviceType: 'mega_infrastructure',
      timeframe: 'immediate',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* 1. Page Header */}
      <section className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[#aaa3ff] text-xs font-mono">
          <Briefcase className="w-3.5 h-3.5 text-white" />
          <span>Executive Services • Engineering & Safety Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Safety & Advisory Services Powerhouse
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          Uniting twenty-two years of high-consequence site command at Julius Berger PLC with peer-reviewed environmental science and international statutory credentials. Bespoke advisory for boards, mega-infrastructure ventures, and institutional authorities.
        </p>
      </section>

      {/* 2. Interactive Tabbed Service Powerhouse */}
      <section className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Select Core Domain
          </span>
          <span className="text-xs font-mono text-neutral-400">
            4 Enterprise Advisory Capabilities
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((srv, idx) => (
            <button
              key={srv.number}
              onClick={() => setActiveServiceTab(idx)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-4 cursor-pointer ${
                activeServiceTab === idx
                  ? 'bg-white/10 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)]'
                  : 'bg-[#08080d] border-white/10 hover:border-white/20 text-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-mono font-bold text-[#aaa3ff]">
                  {srv.number}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  {srv.tag}
                </span>
              </div>
              <h3 className={`text-sm font-display font-bold leading-snug ${activeServiceTab === idx ? 'text-white' : 'text-neutral-200'}`}>
                {srv.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Active Tab Showcase Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#08080d] border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#aaa3ff]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{services[activeServiceTab].tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {services[activeServiceTab].title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                  {services[activeServiceTab].desc}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Mandatory Key Deliverables & Scopes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[activeServiceTab].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-md"
                >
                  <span>Book Advisory Session</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <a
                  href="#inquiry-form-section"
                  className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium text-xs border border-white/10 transition-colors"
                >
                  Submit Written Project Brief
                </a>
              </div>
            </div>

            {/* Strategic Value Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase text-[#aaa3ff] font-semibold block">
                Standard of Rigor
              </span>
              <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
                <p>
                  Engr. Osazee holds chartered status with the Institution of Occupational Safety and Health (CMIOSH #100175) and certified Lead Auditor status under IRCA (#423290).
                </p>
                <p>
                  Engagements are backed by documented field methodologies proven across 50,000,000+ incident-free man-hours on Julius Berger mega-infrastructure projects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">
                  Liaison Channel
                </div>
                <div className="text-xs font-mono text-white font-semibold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>contact@iyenomaosazee.com</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Abuja, Federal Capital Territory, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Formal Inquiry & Project Dossier Submission Form */}
      <section id="inquiry-form-section" className="space-y-8 scroll-mt-28">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Direct Briefing Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Submit a Formal Project Inquiry
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Provide the parameters of your planned infrastructure venture, audit mandate, or conference keynote. You will receive an immediate reference receipt and direct follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-[#08080d] border border-white/10 shadow-xl">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Your project dossier has been registered with reference ID:
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-sm text-emerald-400 font-bold inline-block">
                  {inquiryId}
                </div>
                <p className="text-xs text-neutral-400">
                  Engr. Osazee&apos;s executive liaison team will review your requirements and respond via email within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Dr. Chidi Okafor"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#aaa3ff] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300 block">
                      Organization / Agency *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g., Federal Ministry of Works"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#aaa3ff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300 block">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.gov.ng"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#aaa3ff] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300 block">
                      Advisory Domain *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white text-xs focus:outline-none focus:border-[#aaa3ff] transition-colors"
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
                  <label className="text-xs font-mono uppercase text-neutral-300 block">
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
                        className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                          formData.timeframe === t.id
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/5 text-neutral-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300 block">
                    Project Parameters & Specific Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on site location, project scale, contractor arrangements, and specific safety advisory objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#aaa3ff] transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Official dispatches handled under strict confidentiality protocols.
                  </p>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md cursor-pointer"
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
            <div className="p-6 rounded-3xl bg-[#08080d] border border-white/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#aaa3ff] font-semibold">
                Direct Executive Channels
              </span>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    Primary Office
                  </span>
                  <div className="text-xs text-white font-medium">
                    HSE Directorate, Julius Berger Nigeria PLC
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Abuja, Federal Capital Territory, Nigeria
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    Direct Email Liaison
                  </span>
                  <a
                    href="mailto:contact@iyenomaosazee.com"
                    className="text-xs text-emerald-400 font-mono block hover:underline"
                  >
                    contact@iyenomaosazee.com
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">
                    Statutory Registry
                  </span>
                  <div className="text-xs text-neutral-200">
                    Institution of Occupational Safety & Health (UK)
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    Chartered Fellow (CMIOSH #100175)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Book Consultation Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
