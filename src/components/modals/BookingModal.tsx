import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { PROFILE_SUMMARY } from '../../data/profileData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    scope: 'executive_consultation',
    customScope: '',
    datePreference: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const generated = `DW-CALL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generated);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#09090e] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-neutral-900 via-black to-[#0d0d14] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-400/10 text-xs font-mono text-sky-400 border border-sky-400/20 mb-2">
              <Clock className="w-3 h-3" />
              <span>Direct Liaison Session</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              Book an Executive Advisory Call
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Direct consultation with Engr. Iyenoma ThankGod Osazee (CMIOSH, MNSE)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-display font-bold text-white">
                  Appointment Request Logged
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your consultation coordinates have been reserved.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-white/15 font-mono text-xs text-neutral-300 max-w-sm mx-auto">
                Session Code: <span className="font-bold text-white text-sm">{refCode}</span>
              </div>

              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Our executive coordinator will confirm calendar availability and transmit secure meeting coordinates to <span className="text-white font-mono">{formData.email}</span> within 24 hours.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300 block">
                    Your Name & Salutation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300 block">
                    Professional Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300 block">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Construction Firm / Agency"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300 block">
                    Advisory Focus
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="executive_consultation">Mega-Infrastructure HSE Advisory</option>
                    <option value="iso_diagnostic">ISO 45001 / 14001 Audit Diagnostic</option>
                    <option value="wbgt_heat">Thermal Stress & WBGT Protocols</option>
                    <option value="sme_framework">Construction SME Safety Framework</option>
                    <option value="keynote">Keynote / Conference Speaking</option>
                    <option value="cmiosh_mentorship">CMIOSH Peer Review Mentorship</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {formData.scope === 'others' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="font-medium text-neutral-300 block">
                    Specify Advisory Focus *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bespoke safety audit, environmental remediation, expert witness testimony..."
                    value={formData.customScope}
                    onChange={(e) => setFormData({ ...formData, customScope: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-300 block">
                  Preferred Time Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next Tuesday morning (GMT+1) or any weekday afternoon"
                  value={formData.datePreference}
                  onChange={(e) => setFormData({ ...formData, datePreference: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-300 block">
                  Brief Context or Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize project scale, immediate challenges, or conference theme..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <span>Confirm Advisory Request</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
