import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { SIGNATURE_WORKS, Megaproject } from '../../data/projectsData';
import { CaseStudyModal } from '../modals/CaseStudyModal';
import { usePerceivedLoading, ProjectsListSkeleton } from '../common/Skeletons';
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
  Activity,
  Calendar,
  AlertTriangle,
  ArrowDownUp,
  LayoutGrid
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
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [timelineOrder, setTimelineOrder] = useState<'desc' | 'asc'>('desc');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Megaproject | null>(null);

  // Instant local rendering without artificial delays
  const isLoading = false;

  const categories = [
    { id: 'all', label: 'All Megaprojects' },
    { id: 'Bridges & Marine', label: 'Bridges & Marine' },
    { id: 'Expressways & Corridors', label: 'Expressways & Corridors' },
    { id: 'Heavy Civil & High-Rise', label: 'Heavy Civil & High-Rise' },
    { id: 'Environmental & Industrial', label: 'Environmental Remediation' },
    { id: 'Statutory Governance', label: 'Statutory Governance' }
  ];

  const filteredProjects = [...SIGNATURE_WORKS]
    .filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    })
    .sort((a, b) => {
      return timelineOrder === 'desc' 
        ? b.startYear - a.startYear 
        : a.startYear - b.startYear;
    });

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* 1. Header Section with Landmark Megaprojects Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Frontline Portfolio • Mega-Infrastructure Safety</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Signature Works &amp; Landmark Megaprojects
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Over two decades directing executive HSE frameworks for high-consequence civil engineering schemes across West Africa. From multi-billion naira trans-Niger marine corridors to high-density capital expressways and sovereign institutional towers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <div className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">
              <span className="text-black dark:text-white font-bold">6</span> Signature Megaprojects
            </div>
            <div className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">
              <span className="text-black dark:text-white font-bold">18M+</span> Man-Hours Governed
            </div>
            <div className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">
              <span className="text-black dark:text-white font-bold">0</span> Overwater LTI Record
            </div>
          </div>
        </div>

        {/* Megaproject Civil Infrastructure Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#3c4043] bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80"
                alt="Second River Niger Bridge Heavy Civil Infrastructure and Marine Foundation Works"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono self-start">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Second River Niger Bridge Corridor</span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                  Trans-Niger Marine Foundation
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow leading-snug">
                  High-Risk Waterborne Civil Safety Regimes
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  Sub-surface drilling, marine vessel traffic management, and zero fatal drowning incidents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Filter & Timeline Controls */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200 dark:border-[#333538] pb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-black dark:text-white" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
              Engineering Classification:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            {/* View Mode & Order Switcher */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'timeline'
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  Grid
                </button>
              </div>

              <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTimelineOrder(timelineOrder === 'desc' ? 'asc' : 'desc')}
                  className="px-2.5 py-1 rounded-full text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Toggle Chronological Direction"
                >
                  <ArrowDownUp className="w-3 h-3 text-black dark:text-white" />
                  <span>{timelineOrder === 'desc' ? '2025 → 2002' : '2002 → 2025'}</span>
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Projects View: Timeline vs Grid with Skeleton Loading */}
        {isLoading ? (
          <ProjectsListSkeleton count={3} />
        ) : viewMode === 'timeline' ? (
          <div className="relative pl-6 sm:pl-10 md:pl-12 lg:pl-14 space-y-10 sm:space-y-12 pt-2 animate-fadeIn">
            {/* Continuous vertical timeline track spine */}
            <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[27px] top-6 bottom-6 w-[2px] bg-neutral-300 dark:bg-neutral-700" />

            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  duration: 0.65, 
                  delay: (index % 3) * 0.08, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative group"
              >
                {/* Timeline Marker Node */}
                <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] lg:-left-[43px] top-6 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full dialed-glass-pill border-2 border-white/30 group-hover:border-[#a8c7fa] group-hover:scale-110 transition-all flex items-center justify-center">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white transition-colors" />
                  </div>
                </div>

                {/* Timeline Card */}
                <article 
                  onClick={() => setActiveCaseStudy(project)}
                  className="p-6 sm:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/50 transition-all duration-300 cursor-pointer space-y-6 overflow-hidden"
                >
                  {/* Project Image Header */}
                  {project.imageUrl && (
                    <div className="relative h-44 sm:h-60 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden group/img">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1200';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span>{project.category}</span>
                      </div>
                      <div className="absolute bottom-3 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 text-[10px] font-mono">
                        <MapPin className="w-3 h-3 text-white" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  )}

                  {/* Timeline Header Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-white/5 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#3c4043] text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5 text-black dark:text-white" />
                        {project.timelineDate}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-neutral-700 dark:text-neutral-300 font-mono text-xs">
                        {project.category}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-black dark:text-white bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] px-3 py-1 rounded-full font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white" />
                      {project.safetyRecord}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors tracking-tight leading-snug">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-black dark:text-white" />
                        {project.client}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-4xl">
                    {project.summary}
                  </p>

                  {/* Dual Risk & Engineering Interventions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-400 font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-black dark:text-white" />
                        Critical Risk Challenge
                      </span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-[#333538] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-white font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                        HSE Engineering Solution
                      </span>
                      <p className="text-xs text-neutral-700 dark:text-neutral-200 leading-relaxed">
                        {project.hseSolution}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Strip & CTA */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-[#333538] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5">
                          <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block truncate">
                            {m.label}
                          </span>
                          <strong className="text-xs sm:text-sm font-display font-bold text-black dark:text-white block truncate">
                            {m.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCaseStudy(project);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white dark:bg-white/5 dark:hover:bg-white dark:hover:text-black border border-neutral-200 dark:border-[#333538] text-xs font-mono font-medium text-neutral-900 dark:text-white transition-all shrink-0 self-end sm:self-center group/btn cursor-pointer"
                    >
                      <span>Inspect Technical Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  duration: 0.55, 
                  delay: (index % 2) * 0.08, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="group p-6 sm:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/50 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                {/* Grid Card Project Image */}
                {project.imageUrl && (
                  <div className="relative h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>{project.category}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-[#3c4043]">
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-2 text-xs font-mono text-black dark:text-white bg-neutral-100 dark:bg-white/10 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-[#3c4043]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{project.safetyRecord}</span>
                    </div>
                  </div>

                  {/* Title & Scope */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors leading-snug sm:leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      <span className="flex items-center gap-1 text-neutral-800 dark:text-neutral-300">
                        <Building2 className="w-3.5 h-3.5 text-black dark:text-white" />
                        {project.client}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        {project.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                        {project.timelineDate}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 dark:border-white/5">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5">
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block truncate">
                          {metric.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-black dark:text-white block mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Challenge & HSE Solution Snapshot */}
                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5 space-y-2 text-xs">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-black dark:text-white font-semibold block">
                        Critical Risk Challenge:
                      </span>
                      <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-[11px]">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="space-y-0.5 pt-1.5 border-t border-neutral-200 dark:border-white/5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-black dark:text-white font-semibold block">
                        HSE Engineering Solution:
                      </span>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-[11px]">
                        {project.hseSolution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button: Trigger Technical Case Study Modal */}
                <button
                  onClick={() => setActiveCaseStudy(project)}
                  className="w-full py-3 px-4 rounded-2xl bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-900 dark:text-neutral-200 hover:text-black dark:hover:text-white font-medium text-xs border border-neutral-200 dark:border-[#333538] transition-all flex items-center justify-between group/btn cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-black dark:text-white" />
                    <span>Inspect Technical Case Study</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* 4. High-Consequence Safety Protocol Callout */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-10 rounded-3xl dialed-glass-card-elevated border border-white/20 text-white space-y-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full dialed-glass-pill text-xs font-mono text-[#a8c7fa]">
            <Activity className="w-3.5 h-3.5 text-[#a8c7fa]" />
            <span>Julius Berger Operational Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight">
            The Zero-Harm Execution Philosophy
          </h2>
          <p className="text-sm text-[#c4c7c5] leading-relaxed">
            Every mega-infrastructure site operates under predictive risk containment. By uniting rigorous ISO 45001 auditing diagnostics, real-time WBGT thermal fatigue pacing, and non-punitive Just Culture reporting, 50M+ cumulative work hours have been delivered with zero fatal incidents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl dialed-glass-pill space-y-1">
            <span className="text-xs font-mono text-white uppercase font-semibold">1. Predictive Hazard Control</span>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Dynamic risk assessment prior to every high-tonnage tandem crane lift or marine barge launch.
            </p>
          </div>
          <div className="p-4 rounded-2xl dialed-glass-pill space-y-1">
            <span className="text-xs font-mono text-white uppercase font-semibold">2. Bioclimatic Health</span>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Scientific WBGT heat index measurements governing work-rest cycles for hot-mix asphalt laydown.
            </p>
          </div>
          <div className="p-4 rounded-2xl dialed-glass-pill space-y-1">
            <span className="text-xs font-mono text-white uppercase font-semibold">3. Just Culture Reporting</span>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Psychologically safe frontline near-miss logging, empowering all 1,800+ workers to exercise Stop Work Authority.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. Bottom Engagement CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-12 rounded-3xl dialed-glass-card-elevated border border-white/20 text-white text-center space-y-6"
      >
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a8c7fa] font-semibold">
            Technical Consultation
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight">
            Consult on High-Consequence Project Safety
          </h2>
          <p className="text-xs sm:text-sm text-[#c4c7c5] leading-relaxed">
            Planning major civil works, marine engineering, or high-risk highway expansions? Engage Engr. Osazee for safety case drafting, ISO 45001 auditing, or executive board risk representation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBookingModal}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-bold text-xs tracking-tight transition-all shadow-md cursor-pointer"
          >
            <span>Book a Technical Briefing</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onSelectPage('services')}
            className="px-6 py-3.5 rounded-full bg-[#282a2c] hover:bg-[#333538] text-white font-semibold text-xs border border-[#3c4043] transition-all cursor-pointer"
          >
            Explore All Safety Services
          </button>
        </div>
      </motion.section>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onBookAdvisory={onOpenBookingModal}
      />
    </div>
  );
};
