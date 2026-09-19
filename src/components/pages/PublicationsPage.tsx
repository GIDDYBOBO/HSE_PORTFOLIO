import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PUBLICATIONS } from '../../data/profileData';
import { ThermalCalculator } from '../tools/ThermalCalculator';
import { 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Filter, 
  Globe, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Tag 
} from 'lucide-react';

export const PublicationsPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPubId, setExpandedPubId] = useState<string | null>('pub-thermal-hazards');

  const themes = [
    { id: 'all', label: 'All Publications' },
    { id: 'thermal', label: 'Thermal Hazards & WBGT' },
    { id: 'landfill', label: 'Landfill & Sustainability' },
    { id: 'sme', label: 'Construction SMEs' },
    { id: 'guidance', label: 'National Standards' }
  ];

  const filteredPublications = PUBLICATIONS.filter((pub) => {
    if (activeTheme === 'all') return true;
    if (activeTheme === 'thermal') return pub.keyThemes.some(t => t.toLowerCase().includes('thermal') || t.toLowerCase().includes('heat'));
    if (activeTheme === 'landfill') return pub.keyThemes.some(t => t.toLowerCase().includes('landfill') || t.toLowerCase().includes('waste') || t.toLowerCase().includes('methane'));
    if (activeTheme === 'sme') return pub.keyThemes.some(t => t.toLowerCase().includes('sme') || t.toLowerCase().includes('small'));
    if (activeTheme === 'guidance') return pub.type === 'national_guidance';
    return true;
  });

  const handleCopyCitation = (id: string, citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleExpand = (id: string) => {
    setExpandedPubId(expandedPubId === id ? null : id);
  };

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* Header Section with Research Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-sky-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Peer-Reviewed Science &amp; Technical Contributions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Research Papers &amp; Technical Publications
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Engr. Iyenoma ThankGod Osazee approaches health, safety, and environmental protection not merely as corporate compliance, but as an empirical discipline. His research spans landfill gas kinetics, leachate mitigation, bioclimatic thermal hazards (WBGT), and safety frameworks for developing-world construction SMEs.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-neutral-300">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">11+ Scholarly Papers</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Landfill Kinetic Modeling</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">World Congress Proceedings</span>
          </div>
        </div>

        {/* Environmental Scientific Laboratory Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"
                alt="Environmental Chemistry and Empirical Laboratory Research Instrumentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono self-start">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Empirical Environmental Analytics</span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold">
                  M.Sc. Environmental Science Research
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow">
                  Thermodynamic &amp; Biohazard Modeling
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  Quantitative groundwater contaminant migration simulation and municipal landfill gas emissions analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Embedded Live Tool: Thermal Stress & WBGT Field Calculator */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="wbgt-calculator-section" 
        className="space-y-4"
      >
        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <span>Applied Research Implementation</span>
        </div>
        <ThermalCalculator />
      </motion.section>

      {/* Publications Repository */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Published Works & International Monograms
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Articles in European Journal of Environment and Earth Sciences, ResearchGate, and World Congress
            </p>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-sky-400 mr-1" />
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => setActiveTheme(th.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTheme === th.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => {
            const isExpanded = expandedPubId === pub.id;
            return (
              <article
                key={pub.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#08080d] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
              >
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20 font-semibold uppercase text-[10px]">
                      {pub.type === 'journal' ? 'Peer-Reviewed Journal' : pub.type === 'world_congress' ? 'World Congress Abstract' : pub.type === 'national_guidance' ? 'National Standard' : 'Technical Monograph'}
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      {pub.publishedDate}
                    </span>
                    {pub.doi && (
                      <span className="text-neutral-300 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-neutral-400" />
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyCitation(pub.id, pub.citation)}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono transition-colors border border-white/10"
                      title="Copy standard citation"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-sky-300" />
                          <span className="text-sky-300 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>

                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                      >
                        <span>Access Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Authors */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-sky-300 font-mono">
                    {pub.authors.join(' • ')}
                  </p>
                  <p className="text-xs text-neutral-400 italic">
                    {pub.journal} {pub.volume && `• ${pub.volume}`} {pub.issue && `• ${pub.issue}`} {pub.pages && `• ${pub.pages}`}
                  </p>
                </div>

                {/* Abstract Preview */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {pub.abstract}
                </p>

                {/* Expandable Key Findings */}
                {isExpanded ? (
                  <div className="space-y-3 pt-3 border-t border-white/10 animate-fadeIn">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-200 font-semibold block">
                      Core Empirical Findings & Strategic Takeaways:
                    </span>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {pub.keyFindings.map((finding, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <span className="text-sky-400 font-mono font-bold">•</span>
                          <span className="leading-relaxed">{finding}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <span className="text-xs font-mono text-neutral-400 block mb-1">Standard Academic Citation:</span>
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-neutral-300 select-all">
                        {pub.citation}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Bottom Bar: Themes & Toggle Details */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag className="w-3 h-3 text-neutral-400 mr-0.5" />
                    {pub.keyThemes.map((th, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10"
                      >
                        {th}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleExpand(pub.id)}
                    className="flex items-center space-x-1 text-xs text-sky-400 hover:text-white font-medium cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Key Findings' : 'View Key Findings & Citation'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>

      {/* Research Theme Summary Matrix */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-10 rounded-3xl bg-[#08080d] border border-white/10 space-y-6"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
            Synthesis of Research Agenda
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Overarching Research Themes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <h3 className="text-white font-display font-bold text-base flex items-center gap-2">
              <span className="text-sky-400 font-mono">01.</span>
              Occupational Hygiene & Thermal Extremes
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Traced back to his 2007 BOHS bursary award, Engr. Osazee studies the physiological impact of working under severe heat and cold stress, championing calibrated WBGT monitoring and metabolic work-rest cycles across outdoor industrial worksites.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <h3 className="text-white font-display font-bold text-base flex items-center gap-2">
              <span className="text-sky-400 font-mono">02.</span>
              Environmental Sustainability & Landfill Bioreactors
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Published in the European Journal of Environment and Earth Sciences, his papers on landfill management analyze methane and CO2 greenhouse emissions, toxic leachate contamination, and the transition toward waste-to-energy containment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <h3 className="text-white font-display font-bold text-base flex items-center gap-2">
              <span className="text-sky-400 font-mono">03.</span>
              Construction SMEs & Subcontractor Safety
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Recognized at the 23rd World Congress on Safety and Health at Work in Sydney, Australia (selected from 1,100+ candidates), his work establishes non-punitive safety coaching that elevates informal construction subcontractors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <h3 className="text-white font-display font-bold text-base flex items-center gap-2">
              <span className="text-sky-400 font-mono">04.</span>
              ISO 45001 & Management Systems Governance
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              As an ISO 45001 Certified Lead Auditor and CMIOSH Chartered member, he translates systemic OHS standards into resilient, human-centered operational processes that eliminate single-point safety failures.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

