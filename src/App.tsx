import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './components/pages/OverviewPage';
import { WorksPage } from './components/pages/WorksPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PublicationsPage } from './components/pages/PublicationsPage';
import { LeadershipPage } from './components/pages/LeadershipPage';
import { BookingModal } from './components/modals/BookingModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleSelectPage = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030305] text-neutral-100 selection:bg-white/20 selection:text-white">
      {/* Top Main Navigation (Floating Capsule) */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'overview' && (
          <OverviewPage
            onSelectPage={handleSelectPage}
            onOpenBookingModal={() => setBookingModalOpen(true)}
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
    </div>
  );
}
