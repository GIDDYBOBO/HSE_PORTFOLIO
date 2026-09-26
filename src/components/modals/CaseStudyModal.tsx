import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[86vh] sm:max-h-[88vh] rounded-3xl dialed-glass-card-elevated border border-white/20 shadow-2xl flex flex-col my-auto overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Project Image Hero Banner */}
        {project.imageUrl ? (
          <div className="relative h-40 sm:h-52 w-full overflow-hidden bg-neutral-900 shrink-0 border-b border-white/10">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.78] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/75 backdrop-blur-md hover:bg-black text-white transition-colors border border-white/20 z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 sm:bottom-4 left-5 sm:left-7 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-200 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-white" />
                {project.period}
              </span>
            </div>
          </div>
        ) : null}

        {/* Modal Header */}
        <div className={`relative p-5 sm:p-7 border-b border-white/10 bg-white/[0.04] backdrop-blur-xl shrink-0 ${project.imageUrl ? 'pt-4' : ''}`}>
          {!project.imageUrl && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-medium border border-white/20">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[#c4c7c5] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {project.period}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight mt-1 leading-snug sm:leading-tight">
            {project.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#c4c7c5] mt-2">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Building2 className="w-3.5 h-3.5 text-[#a8c7fa]" />
              {project.client}
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {project.location}
            </span>
          </div>
        </div>

        {/* Modal Body (Scrolls internally within screen range) */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1 text-neutral-200">
          
          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-1"
              >
                <span className="text-[11px] font-mono uppercase text-[#8e918f]">
                  {m.label}
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Project Summary */}
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2 leading-snug">
              <TrendingUp className="w-4 h-4 text-[#a8c7fa]" />
              Operational Scope &amp; Strategic Mandate
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              {project.summary}
            </p>
          </div>

          {/* Two-Column Challenge vs HSE Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#f87171] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                The Engineering &amp; Physical Hazards
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#34d399] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                The Engineered HSE Protocol
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.hseSolution}
              </p>
            </div>
          </div>

          {/* Safety Milestone Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#a8c7fa] font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#a8c7fa]" />
                Verified Safety Achievement
              </span>
              <p className="text-sm sm:text-base font-display font-semibold text-white">
                {project.safetyRecord}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-[#34d399]" />
              <span className="text-xs font-mono text-neutral-300">
                Audited to ISO 45001 &amp; IOSH Code
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

        {/* Modal Footer CTA (Shrink-0) */}
        <div className="p-4 sm:p-5 bg-white/[0.04] backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-neutral-400 font-mono text-center sm:text-left">
            Need an equivalent executive HSE framework deployed on your megaproject?
          </p>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAdvisory();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] text-xs font-bold tracking-tight transition-all shadow-md cursor-pointer"
            >
              Request Project Advisory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
