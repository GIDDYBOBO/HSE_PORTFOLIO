import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookItem } from '../../types';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  ListOrdered, 
  Quote, 
  Calendar, 
  Building, 
  FileText, 
  Copy, 
  Check, 
  Mail,
  Bookmark
} from 'lucide-react';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
  onOpenInquiryForBook?: (bookTitle: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onOpenInquiryForBook
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (book) {
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
  }, [book, onClose]);

  if (!book) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(book.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div 
        id="book-detail-modal-backdrop"
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
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl dialed-glass-card-elevated border border-white/20 text-white shadow-2xl flex flex-col"
        >
          {/* Publication Imagery Hero Container */}
          {book.imageUrl && (
            <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-[#333538]">
              <img
                src={book.imageUrl}
                alt={book.imageAlt || `Cover and technical documentation for ${book.title}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.75] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Close Button on image */}
              <button
                id="btn-close-book-modal"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all border border-white/20 active:scale-95 shadow-lg cursor-pointer"
                aria-label="Close book details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 sm:left-8 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/30 font-semibold uppercase tracking-wider text-[10px]">
                  {book.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-200 border border-white/15 flex items-center gap-1.5 text-[11px]">
                  <Calendar className="w-3 h-3 text-white" />
                  {book.publishedYear}
                </span>
              </div>
            </div>
          )}

          {/* Header Banner */}
          <div className="p-5 sm:p-8 bg-white/[0.04] backdrop-blur-xl text-white border-b border-white/10 relative overflow-hidden">
            {/* Close Button when no image banner */}
            {!book.imageUrl && (
              <button
                id="btn-close-book-modal"
                onClick={onClose}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#282a2c] hover:bg-[#333538] text-white flex items-center justify-center transition-all border border-[#3c4043] active:scale-95 cursor-pointer"
                aria-label="Close book details"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="relative z-10 space-y-3 max-w-2xl">
              {!book.imageUrl && (
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#282a2c] text-white border border-[#3c4043] font-semibold uppercase tracking-wider text-[10px]">
                    {book.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#282a2c]/60 text-[#c4c7c5] border border-[#333538] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#a8c7fa]" />
                    {book.publishedYear}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#282a2c]/60 text-[#c4c7c5] border border-[#333538]">
                    {book.pagesOrLength}
                  </span>
                </div>
              )}

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                {book.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#c4c7c5] font-medium leading-relaxed">
                {book.subtitle}
              </p>

              <div className="text-xs text-[#8e918f] font-mono flex flex-wrap items-center gap-1 pt-1">
                <span>Authors:</span>
                <span className="text-white font-semibold">{book.authors.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 text-neutral-700 dark:text-neutral-200 text-sm">
            
            {/* Action Bar (Purchase / Enquiry / Copy Citation) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-[#333538]">
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <span>Publication: </span>
                <span className="text-black dark:text-white font-semibold">{book.publisherOrJournal}</span>
                {book.doiOrRef && (
                  <span className="text-neutral-500 dark:text-neutral-400 ml-2 block sm:inline">({book.doiOrRef})</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyCitation}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-xs font-mono border border-neutral-200 dark:border-[#333538] text-black dark:text-white transition-colors min-h-[38px] touch-manipulation cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black dark:text-white" />
                      <span className="font-semibold">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenInquiryForBook) {
                      onOpenInquiryForBook(book.title);
                    }
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-all shadow-sm min-h-[38px] touch-manipulation cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Request Copy / Enquire</span>
                </button>
              </div>
            </div>

            {/* Section 1: Overview / Abstract */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
                <BookOpen className="w-4 h-4 text-black dark:text-white" />
                <span>Executive Overview &amp; Abstract</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-white/[0.01] p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-white/5">
                {book.abstract}
              </p>
            </div>

            {/* Section 2: What You Will Learn */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-black dark:text-white" />
                <span>What You Will Learn (Key Takeaways)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {book.whatYoullLearn.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 flex items-start space-x-2.5 hover:border-neutral-200 dark:hover:border-white/15 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0 mt-2" />
                    <span className="text-xs text-neutral-700 dark:text-neutral-200 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Who This Book Is For */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
                <Users className="w-4 h-4 text-black dark:text-white" />
                <span>Target Audience &amp; Industry Applications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.whoIsThisFor.map((audience, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-[#333538] text-xs text-black dark:text-neutral-200 font-medium"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Key Topics / Chapter Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
                <ListOrdered className="w-4 h-4 text-black dark:text-white" />
                <span>Key Topics &amp; Structural Highlights</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-white/[0.01] p-4 rounded-2xl border border-neutral-200 dark:border-white/5">
                {book.keyTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 py-1 border-b border-neutral-200 dark:border-white/5 last:border-0">
                    <span className="text-black dark:text-white font-bold shrink-0">{idx + 1}.</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Author's Note */}
            <div className="space-y-2.5 p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-[#444746] relative">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-black dark:text-white font-semibold">
                <Quote className="w-4 h-4" />
                <span>Author&apos;s Field Note • Engr. Iyenoma ThankGod Osazee</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 italic leading-relaxed pl-2 border-l-2 border-black dark:border-white">
                &ldquo;{book.authorsNote}&rdquo;
              </p>
            </div>

            {/* Formal Citation Box */}
            <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-[#333538]">
              <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block">
                Standard Academic Citation
              </span>
              <p className="font-mono text-xs text-neutral-700 dark:text-neutral-300 select-all">
                {book.citation}
              </p>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-6 border-t border-neutral-200 dark:border-[#333538] bg-neutral-50 dark:bg-[#0e0e11] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Published in accordance with international academic &amp; technical review standards.
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-white/10 dark:hover:bg-white/15 text-black dark:text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenInquiryForBook) {
                    onOpenInquiryForBook(book.title);
                  }
                }}
                className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                Inquire About This Publication
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
