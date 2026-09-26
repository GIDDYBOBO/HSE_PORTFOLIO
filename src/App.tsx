import React, { useState, useEffect } from 'react';
import { PageId, BookItem } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
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
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { useScrollRevealContainer } from './hooks';
import { MorphBackground } from './components/common/MorphBackground';

function PortfolioApp() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Stealth Admin Route: Activated ONLY via /#mine or Secret Shortcut (Ctrl+Shift+A / Cmd+Shift+A)
  const [isAdminView, setIsAdminView] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#mine';
  });

  // Listen for hash navigation (e.g. user types /#mine in the browser address bar)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#mine') {
        setIsAdminView(true);
      } else if (isAdminView && window.location.hash !== '#mine') {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminView]);

  // Secret Executive Keystroke: Ctrl + Shift + A (or Cmd + Shift + A on macOS)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminView((prev) => {
          const next = !prev;
          if (next) {
            window.location.hash = 'mine';
          } else {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash.toLowerCase() === '#mine') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manage IntersectionObserver logic for all major page sections as they scroll into view
  const { containerRef } = useScrollRevealContainer<HTMLElement>({
    selector: '.fade-up-section, [data-scroll-reveal]',
    deps: [currentPage, isAdminView],
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

  // If in stealth admin view, render ProtectedRoute and AdminDashboard (zero trace on public site)
  if (isAdminView) {
    return (
      <ProtectedRoute onBackToPortfolio={handleExitAdmin}>
        <AdminDashboard onBackToPortfolio={handleExitAdmin} />
      </ProtectedRoute>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-[#e3e3e3] selection:bg-[#1a73e8]/30 selection:text-white transition-colors duration-200">
      {/* DialedWeb Signature Morphing Liquid Mesh & Glass Canvas */}
      <MorphBackground />

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
      <AuthProvider>
        <PortfolioApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
