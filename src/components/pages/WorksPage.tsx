import React, { useState } from 'react';
import { PageId } from '../../types';
import { SIGNATURE_WORKS, Megaproject } from '../../data/projectsData';
import { CaseStudyModal } from '../modals/CaseStudyModal';
import { 
  Building2, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  Filter,
  Activity
} from 'lucide-react';

interface WorksPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  onSelectPage,
  onOpenBookingModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Megaproject | null>(null);

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

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* 1. Header Section */}
      <section className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[#aaa3ff] text-xs font-mono">
          <Building2 className="w-3.5 h-3.5 text-white" />
          <span>Frontline Portfolio • Mega-Infrastructure Safety</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Signature Works & Landmark Megaprojects
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          Over two decades directing executive HSE frameworks for high-consequence civil engineering schemes across West Africa. From multi-billion naira trans-Niger marine corridors to high-density capital expressways and sovereign institutional towers.
        </p>
      </section>

      {/* 2. Filter Tabs (Dialedweb Pill Style) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#aaa3ff]" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Filter by Engineering Classification:
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Megaprojects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/10 text-[#aaa3ff] border border-white/10">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{project.safetyRecord}</span>
                  </div>
                </div>

                {/* Title & Scope */}
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-neutral-300" />
                      {project.client}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-300" />
                      {project.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-300" />
                      {project.period}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-neutral-400 block truncate">
                        {metric.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-white block mt-0.5">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Technical Challenge & HSE Solution Snapshot */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
                  <div className="font-mono text-[11px] text-[#aaa3ff] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>HSE Engineering Solution:</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-[11px]">
                    {project.hseSolution}
                  </p>
                </div>
              </div>

              {/* Action Button: Trigger Technical Case Study Modal */}
              <button
                onClick={() => setActiveCaseStudy(project)}
                className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-medium text-xs border border-white/10 transition-all flex items-center justify-between group/btn cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#aaa3ff]" />
                  <span>Inspect Technical Case Study</span>
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. High-Consequence Safety Protocol Callout */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#08080d] border border-white/10 space-y-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-[#aaa3ff]">
            <Activity className="w-3.5 h-3.5" />
            <span>Julius Berger Operational Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            The Zero-Harm Execution Philosophy
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Every mega-infrastructure site operates under predictive risk containment. By uniting rigorous ISO 45001 auditing diagnostics, real-time WBGT thermal fatigue pacing, and non-punitive Just Culture reporting, 50M+ cumulative work hours have been delivered with zero fatal incidents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-xs font-mono text-[#aaa3ff] uppercase font-semibold">1. Predictive Hazard Control</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dynamic risk assessment prior to every high-tonnage tandem crane lift or marine barge launch.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">2. Bioclimatic Health</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Scientific WBGT heat index measurements governing work-rest cycles for hot-mix asphalt laydown.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-xs font-mono text-blue-400 uppercase font-semibold">3. Just Culture Reporting</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Psychologically safe frontline near-miss logging, empowering all 1,800+ workers to exercise Stop Work Authority.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom Engagement CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0e0e18] to-black border border-white/15 text-center space-y-6">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#aaa3ff] font-semibold">
            Technical Consultation
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Consult on High-Consequence Project Safety
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Planning major civil works, marine engineering, or high-risk highway expansions? Engage Engr. Osazee for safety case drafting, ISO 45001 auditing, or executive board risk representation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBookingModal}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs tracking-tight transition-all shadow-md"
          >
            <span>Book a Technical Briefing</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onSelectPage('services')}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all"
          >
            Explore All Safety Services
          </button>
        </div>
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
