import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Credential } from '../../types';
import { CREDENTIALS } from '../../data/profileData';
import { subscribeToCredentials } from '../../lib/portfolioService';
import { 
  X, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  FileCheck,
  Building,
  Calendar,
  Search,
  Filter
} from 'lucide-react';

interface AllCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXTENDED_CREDENTIALS: Credential[] = [
  ...CREDENTIALS,
  {
    id: "hse-directorship",
    title: "Executive Safety Governance Masterclass",
    designation: "Executive Safety Governance",
    issuer: "Julius Berger Nigeria PLC Corporate HSE Academy",
    year: "Ongoing Senior Mandate",
    credentialId: "JBN-HSE-DIR-2006",
    description: "Operational mastery in leading high-consequence civil engineering safety regimes across complex river bridge construction and federal transport corridors.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "iosh-panelist",
    title: "Chartered Membership Peer Review Interview Panelist",
    designation: "Peer Review Interviewer",
    issuer: "Institution of Occupational Safety and Health (IOSH), United Kingdom",
    year: "Appointed 2025",
    credentialId: "IOSH UK Assessment Ref: 100175/PRI",
    description: "Formally designated peer interviewer vetting international senior safety practitioners applying for Chartered Safety and Health Professional (CMIOSH) standing.",
    highlight: true,
    verificationStatus: "Chartered"
  },
  {
    id: "parliamentary-advisory",
    title: "Statutory Reform Expert Advisor",
    designation: "Parliamentary Mediation Panelist",
    issuer: "House of Representatives Committee on Safety Standards, National Assembly of Nigeria",
    year: "2023 – 2025",
    credentialId: "NASS-HR-CSSR-2023",
    description: "Statutory appointment arbitrating the ISPON leadership dispute under the ISPON Act 2014, restoring national regulatory governance and fair elections.",
    highlight: true,
    verificationStatus: "Verified"
  },
  {
    id: "bohs-bursary",
    title: "British Occupational Hygiene Society (BOHS) Bursary",
    designation: "BOHS Bursary Laureate",
    issuer: "British Occupational Hygiene Society, United Kingdom",
    year: "Awarded Jan 2007",
    credentialId: "BOHS-UK-BURSARY-2007",
    description: "Prestigious international bursary awarded in support of postgraduate research in industrial hygiene and environmental health at University of Portsmouth.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "afrisafe-cbn",
    title: "AFRISAFE 2000 Site Safety Award",
    designation: "Site Safety Excellence",
    issuer: "AFRISAFE Awards Committee",
    year: "Dec 2000",
    credentialId: "AFRI-2000-CBN",
    description: "Conferred on the Julius Berger Safety Section at the Central Bank of Nigeria HQ project for exemplary zero-fatality engineering standards.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "law-contract-prize",
    title: "Prof. Itse Sagay Prize in Law of Contract",
    designation: "Contract Law Prize",
    issuer: "Chartered Institute of Arbitrators Nigeria (CIAN)",
    year: "2012",
    credentialId: "CIAN-LAW-2012",
    description: "Academic prize awarded for premier performance in contract law examination, underpinning safety compliance in major civil agreements.",
    highlight: false,
    verificationStatus: "Verified"
  }
];

export const AllCredentialsModal: React.FC<AllCredentialsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [credentialsList, setCredentialsList] = useState<Credential[]>(EXTENDED_CREDENTIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'chartered' | 'auditing' | 'institutional'>('all');

  useEffect(() => {
    const unsub = subscribeToCredentials((liveCreds) => {
      if (liveCreds && liveCreds.length > 0) {
        setCredentialsList(liveCreds);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCredentials = credentialsList.filter((cred) => {
    const matchesSearch = 
      cred.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cred.credentialId && cred.credentialId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'chartered') {
      return cred.designation.includes('CMIOSH') || cred.designation.includes('MNSE') || cred.designation.includes('ISPON');
    }
    if (filterType === 'auditing') {
      return cred.designation.includes('Auditor') || cred.designation.includes('Cert');
    }
    if (filterType === 'institutional') {
      return cred.designation.includes('Panelist') || cred.designation.includes('Governance') || cred.designation.includes('Award');
    }
    return true;
  });

  return (
    <AnimatePresence>
      <div 
        id="all-credentials-modal-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl dialed-glass-card-elevated border border-white/20 text-white shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 bg-white/[0.04] backdrop-blur-xl relative">
            <button
              id="btn-close-credentials-modal"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white flex items-center justify-center transition-all border border-neutral-200 dark:border-[#333538] active:scale-95 cursor-pointer"
              aria-label="Close credentials modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Professional Evidence &amp; Verification Registry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
                All Professional Credentials &amp; Certifications
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                Verifiable institutional certifications, chartered registrations, international auditor credentials, and statutory peer appointments.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by credential title, ID (e.g. 100175), or issuer..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300 shrink-0 mr-1" />
                {[
                  { id: 'all', label: 'All (12)' },
                  { id: 'chartered', label: 'Chartered & NSE' },
                  { id: 'auditing', label: 'ISO & Safety' },
                  { id: 'institutional', label: 'Governance' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterType(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      filterType === f.id
                        ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                        : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/5'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between pb-1">
              <span>Showing {filteredCredentials.length} verifiable credentials</span>
              <span>Evidence Standard: ISO / IOSH UK / NSE / ISPON</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCredentials.map((cred) => (
                <div
                  key={cred.id}
                  className="p-5 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#333538] text-[11px] font-mono font-bold">
                        {cred.designation}
                      </span>
                      {cred.credentialId && (
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 px-2 py-0.5 rounded border border-neutral-200 dark:border-white/5">
                          {cred.credentialId}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-display font-bold text-black dark:text-white transition-colors leading-snug">
                      {cred.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      {cred.issuer}
                    </p>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                      {cred.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-[#333538] flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5 text-black dark:text-white font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: Active / Certified
                    </span>
                    {cred.year && (
                      <span>{cred.year}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200 dark:border-[#333538] bg-neutral-50 dark:bg-[#0e0e11] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Direct verification queries may be dispatched through official corporate liaison channels.
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-colors cursor-pointer"
            >
              Close Registry
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
