import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookItem, PageId } from '../../types';
import { BOOKS_AND_PUBLICATIONS } from '../../data/booksData';
import { 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  Mail, 
  Bookmark, 
  Search,
  Filter,
  FileText
} from 'lucide-react';

interface BooksPageProps {
  onSelectBook: (book: BookItem) => void;
  onOpenInquiryForBook: (bookTitle: string) => void;
  onSelectPage: (page: PageId) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({
  onSelectBook,
  onOpenInquiryForBook,
  onSelectPage
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS_AND_PUBLICATIONS.filter((b) => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'monograph') return b.format === 'Technical Monograph';
    if (filter === 'journal') return b.format === 'Peer-Reviewed Paper';
    if (filter === 'congress') return b.format === 'Congress Paper';
    if (filter === 'standards') return b.format === 'Guidance Standard';
    return true;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pt-24 sm:pt-28 pb-20">
      
      {/* Header Banner with Scientific Authorship Visual */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Thought Leadership &amp; Scientific Authorship</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
                Books, Technical Monographs &amp; Research
              </h1>

              <p className="text-base sm:text-xl text-neutral-300 font-medium leading-relaxed">
                Peer-reviewed environmental scientific contributions, empirical thermal ergonomics models, and codified national civil engineering safety guidance.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Unlike purely operational practitioners, Engr. Osazee contributes original scientific knowledge to the global occupational health community. His publications span thermodynamic landfill modeling, bioclimatic heat stress calculations (WBGT), and non-punitive subcontractor coaching frameworks.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-300">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">5 Published Treatises</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">World Congress Research</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Empirical WBGT Indexing</span>
            </div>
          </div>

          {/* Scientific Authorship & Technical Monograph Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
              <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80"
                  alt="Environmental and Industrial Hygiene Scientific Research and Heat Stress Instrumentation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080d] via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono self-start">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Peer-Reviewed Science &amp; Monographs</span>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    Field Ergonomics &amp; Climate Hazard
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow">
                    Codified Occupational &amp; Environmental Treatises
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                    Grounded in empirical civil site data, ACGIH TLV standards, and ISO 7243 compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar with Mobile-Friendly Touch Optimization */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by publication title, topic, or keyword..."
              className="w-full pl-10 pr-4 py-3 sm:py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All Volumes (5)' },
              { id: 'monograph', label: 'Monographs' },
              { id: 'journal', label: 'Journal Papers' },
              { id: 'congress', label: 'World Congress' },
              { id: 'standards', label: 'National Standards' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation min-h-[40px] sm:min-h-[36px] flex items-center ${
                  filter === f.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Books Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-3xl bg-[#090912] border border-white/10 hover:border-white/25 transition-all flex flex-col overflow-hidden shadow-xl group"
            >
              {/* Individual Publication Visual Image Preview Container */}
              {book.imageUrl && (
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-900 border-b border-white/10">
                  <img
                    src={book.imageUrl}
                    alt={book.imageAlt || book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-[0.80] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090912] via-black/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/20">
                      {book.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                    <span className="text-[11px] font-mono text-neutral-200 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {book.publishedYear}
                    </span>
                  </div>
                </div>
              )}

              {/* Visual Book Cover Header Bar (when image not available or as title bar) */}
              <div className={`p-5 sm:p-7 bg-gradient-to-br ${book.coverGradient} relative border-b border-white/10`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                
                <div className="relative z-10 space-y-2.5">
                  {!book.imageUrl && (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/30">
                        {book.badge}
                      </span>
                      <span className="text-xs font-mono text-neutral-200">
                        {book.publishedYear}
                      </span>
                    </div>
                  )}

                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-snug">
                    {book.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                    {book.subtitle}
                  </p>
                </div>
              </div>

              {/* Body Content with Mobile Responsive Padding */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {book.abstract}
                  </p>

                  {/* What You'll Learn Highlights */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                      Key Takeaways & What You&apos;ll Learn
                    </span>
                    <div className="space-y-1.5">
                      {book.whatYoullLearn.slice(0, 2).map((point, pidx) => (
                        <div key={pidx} className="flex items-start space-x-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions with Mobile Stacking for Touch Precision */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-neutral-400">
                    <span>Publisher: </span>
                    <span className="text-white font-medium">{book.publisherOrJournal}</span>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => onSelectBook(book)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 min-h-[42px] touch-manipulation"
                    >
                      <span>View Book Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenInquiryForBook(book.title)}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10 min-w-[42px] min-h-[42px] flex items-center justify-center touch-manipulation"
                      title="Enquire About This Publication"
                      aria-label={`Enquire about ${book.title}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Tool Cross-Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 sm:p-10 rounded-3xl bg-[#090d16] border border-sky-400/25 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
            Applied Engineering Software Model
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            Explore the Interactive WBGT Heat Stress Calculator
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Test the live mathematical implementation of Engr. Osazee&apos;s thermal ergonomics equations directly inside the Research Repository.
          </p>
        </div>

        <button
          onClick={() => onSelectPage('publications')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-all shadow-md whitespace-nowrap min-h-[44px] flex items-center justify-center"
        >
          Launch Interactive WBGT Engine &rarr;
        </button>
      </motion.div>
    </div>
  );
};
