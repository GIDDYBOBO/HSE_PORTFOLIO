import React from 'react';
import { Megaproject } from '../../data/projectsData';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Megaproject | null;
  onClose: () => void;
  onBookAdvisory: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onBookAdvisory
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#09090e] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-neutral-900/80 via-black to-[#0d0d14]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-400/10 text-sky-300 text-xs font-mono font-medium border border-sky-400/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {project.period}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-4">
            {project.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300 mt-2">
            <span className="flex items-center gap-1 text-neutral-300">
              <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              {project.client}
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {project.location}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-1"
              >
                <span className="text-[11px] font-mono uppercase text-neutral-400">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Project Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white" />
              Operational Scope & Strategic Mandate
            </h3>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Two-Column Challenge vs HSE Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-red-400/90 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                The Engineering & Physical Hazards
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                The Engineered HSE Protocol
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.hseSolution}
              </p>
            </div>
          </div>

          {/* Safety Milestone Banner */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-sky-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-sky-300 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sky-400" />
                Verified Safety Achievement
              </span>
              <p className="text-sm sm:text-base font-display font-semibold text-white">
                {project.safetyRecord}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-white" />
              <span className="text-xs font-mono text-neutral-300">
                Audited to ISO 45001 & IOSH Code
              </span>
            </div>
          </div>

          {/* Project Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {project.tags.map((t, idx) => (
              <span 
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-black border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 font-mono text-center sm:text-left">
            Need an equivalent executive HSE framework deployed on your megaproject?
          </p>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAdvisory();
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-tight transition-all shadow-md"
            >
              Request Project Advisory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
