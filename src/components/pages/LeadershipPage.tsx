import React, { useState } from 'react';
import { LEADERSHIP_ROLES, AWARDS_AND_HONORS } from '../../data/profileData';
import { 
  Award, 
  Landmark, 
  Mic2, 
  CheckCircle2, 
  Info
} from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'governance' | 'institutional' | 'speaking'>('all');

  const filteredRoles = LEADERSHIP_ROLES.filter((role) => {
    if (roleFilter === 'all') return true;
    return role.category === roleFilter;
  });

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* Header Section */}
      <section className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-[#aaa3ff] text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-white" />
          <span>Statutory Governance & International Presence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Institutional Leadership, Governance & Speaking
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          Beyond his corporate executive duties at Julius Berger Nigeria PLC, Engr. Osazee plays a central role in shaping national safety legislation, superintending international professional elections, mentoring chartered safety aspirants, and addressing global symposiums.
        </p>
      </section>

      {/* Feature Spotlight: National Assembly & ISPON Legislative Reform */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#08080d] border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-neutral-300 text-xs font-mono uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-[#aaa3ff]" />
              <span>National Legislative Assignment (May 2023 – Dec 2025)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Mandate Completed • Historic Democratic Resolution
              </span>
              <span className="hidden sm:inline px-3 py-1 rounded-full bg-white/5 text-neutral-300 text-xs font-mono border border-white/10">
                ISPON Act 2014 Framework
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              House of Representatives Committee on Safety Standards & Regulation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono">
              Statutory Mediation & Institutional Governance Reform for the Institute of Safety Professionals of Nigeria (ISPON)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            Appointed by the National Assembly sub-committee to resolve long-standing institutional friction within ISPON. Over a multi-year assignment, Engr. Osazee conducted formal sittings, evaluated stakeholder dossiers, formulated binding financial and electoral codes, and successfully superintended the historic October 2024 national elections that unified the profession under statutory law.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#aaa3ff] font-bold block">1. Dossier Evaluation</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Audited dispute records and institutional documentation spanning past regulatory friction.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold block">2. Statutory Framework</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Formulated transparent financial frameworks and electoral guidelines under the ISPON Act 2014.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-white font-bold block">3. Democratic Resolution</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Delivered unified national leadership elections in October 2024, restoring statutory stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Roles & Service */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-2xl font-serif-display font-semibold text-white">
              Institutional Governance & Professional Service
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Service across the Institution of Occupational Safety and Health (IOSH), ISPON, and NISafetyE
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1.5 p-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'governance', label: 'Governance & Panels' },
              { id: 'institutional', label: 'Institutional' },
              { id: 'speaking', label: 'Keynote & Speeches' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  roleFilter === tab.id
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-300 px-2.5 py-0.5 rounded bg-neutral-800 border border-neutral-700">
                    {role.period}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {role.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif-display font-semibold text-white">
                    {role.role}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    {role.organization}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-200 leading-relaxed font-medium">
                  {role.impactSummary}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {role.details}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span>Verified Public Record</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Honors, Awards & Distinctions */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Accolades & Professional Distinctions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-semibold text-white mt-1">
            Honors, Prizes & Recognized Distinctions
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Carefully curated to distinguish between individual scholarship, institutional listings, and corporate team milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS_AND_HONORS.map((award, idx) => {
            const isIndividual = award.category === 'individual';
            const isInstitutional = award.category === 'institutional_recognition';
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">{award.year}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      isIndividual
                        ? 'bg-neutral-800 text-white border-neutral-600'
                        : isInstitutional
                        ? 'bg-neutral-900 text-neutral-300 border-neutral-700'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                    }`}>
                      {isIndividual ? 'Individual Honor' : isInstitutional ? 'Corporate Recognition' : 'Site / Team Award'}
                    </span>
                  </div>

                  <h3 className="text-base font-serif-display font-semibold text-white leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    {award.awardingBody}
                  </p>

                  <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                    {award.description}
                  </p>
                </div>

                {award.notes && (
                  <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-start space-x-1.5 italic">
                    <Info className="w-3.5 h-3.5 text-neutral-300 mt-0.5 shrink-0" />
                    <span>{award.notes}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Speaking & Keynote Topics */}
      <section className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Thought Leadership Topics
          </span>
          <h2 className="text-2xl font-serif-display font-semibold text-white mt-1">
            Signature Keynote & Executive Workshop Themes
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Available for international conferences, corporate boardrooms, and engineering symposiums
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <Mic2 className="w-5 h-5 text-white" />
            <h3 className="text-white font-serif-display font-semibold text-base">
              Human-Centered Safety in Mega-Infrastructure
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Moving beyond bureaucratic compliance. How civil engineering leadership at Julius Berger integrates psychological safety, just reporting, and zero-blame learning.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <Mic2 className="w-5 h-5 text-white" />
            <h3 className="text-white font-serif-display font-semibold text-base">
              Thermal Hazards & Tropical Bioclimatic Safety
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Managing extreme heat, WBGT limits, and hydration in outdoor construction, farming, and extractive industries across Sub-Saharan Africa and arid zones.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <Mic2 className="w-5 h-5 text-white" />
            <h3 className="text-white font-serif-display font-semibold text-base">
              Construction SME Safety & Subcontractor Resilience
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Selected at the 23rd World Congress in Sydney: Practical, cost-effective frameworks for bringing informal subcontractors into tier-1 safety standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
