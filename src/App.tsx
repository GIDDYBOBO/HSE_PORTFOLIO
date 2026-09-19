import React, { useState } from 'react';
import { PageId, BookItem } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BOOKS_AND_PUBLICATIONS } from './data/booksData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './components/pages/OverviewPage';
import { AboutPage } from './components/pages/AboutPage';
import { BooksPage } from './components/pages/BooksPage';
import { WorksPage } from './components/pages/WorksPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PublicationsPage } from './components/pages/PublicationsPage';
import { LeadershipPage } from './components/pages/LeadershipPage';
import { BookingModal } from './components/modals/BookingModal';
import { AllCredentialsModal } from './components/modals/AllCredentialsModal';
import { BookDetailModal } from './components/modals/BookDetailModal';
import { useScrollRevealContainer } from './hooks';

function PortfolioApp() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Manage IntersectionObserver logic for all major page sections as they scroll into view
  const { containerRef } = useScrollRevealContainer<HTMLElement>({
    selector: '.fade-up-section, [data-scroll-reveal]',
    deps: [currentPage],
    threshold: 0.06,
    rootMargin: '0px 0px -40px 0px',
  });

  const handleSelectPage = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookById = (bookId: string) => {
    const found = BOOKS_AND_PUBLICATIONS.find(b => b.id === bookId);
    if (found) {
      setSelectedBook(found);
    } else {
      handleSelectPage('books');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-[#f8fafc] text-slate-900 selection:bg-slate-200 selection:text-slate-900'
        : 'bg-[#030305] text-neutral-100 selection:bg-white/20 selection:text-white'
    }`}>
      {/* Top Main Navigation (Floating Capsule) */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Main Page Area */}
      <main
        ref={containerRef}
        className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        {currentPage === 'overview' && (
          <OverviewPage
            onSelectPage={handleSelectPage}
            onOpenBookingModal={() => setBookingModalOpen(true)}
            onOpenCredentialsModal={() => setCredentialsModalOpen(true)}
            onSelectBook={handleOpenBookById}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onSelectPage={handleSelectPage}
            onOpenBookingModal={() => setBookingModalOpen(true)}
            onOpenCredentialsModal={() => setCredentialsModalOpen(true)}
          />
        )}

        {currentPage === 'books' && (
          <BooksPage
            onSelectBook={(book) => setSelectedBook(book)}
            onOpenInquiryForBook={(_title) => {
              handleSelectPage('services');
            }}
            onSelectPage={handleSelectPage}
          />
        )}

        {currentPage === 'works' && (
          <WorksPage
            onSelectPage={handleSelectPage}
            onOpenBookingModal={() => setBookingModalOpen(true)}
          />
        )}

        {(currentPage === 'services' || currentPage === 'advisory') && (
          <ServicesPage
            onSelectPage={handleSelectPage}
            onOpenBookingModal={() => setBookingModalOpen(true)}
          />
        )}

        {currentPage === 'publications' && (
          <PublicationsPage />
        )}

        {currentPage === 'leadership' && (
          <LeadershipPage />
        )}
      </main>

      {/* Institutional Mega Footer */}
      <Footer
        onSelectPage={handleSelectPage}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Global Booking Consultation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Global Verifiable Credentials Registry Modal */}
      <AllCredentialsModal
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
      />

      {/* Global Book Details & Knowledge Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onOpenInquiryForBook={(_title) => {
          setSelectedBook(null);
          handleSelectPage('services');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
