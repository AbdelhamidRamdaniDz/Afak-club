
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import VisionMission from './components/VisionMission';
import WhyAfak from './components/WhyAfak';
import MemberTimeline from './components/MemberTimeline';
import ActivitiesSection from './components/ActivitiesSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import UpcomingEvent from './components/UpcomingEvent';
import NewsSection from './components/NewsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import NewsArchive from './NewsArchive';
import JoinClub from './JoinClub';

// ─── App ──────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'news-archive' | 'join'>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-primary">
      {currentPage === 'home' ? (
        <>
          <Navbar onNavigate={navigate} />
          <Hero onJoin={() => navigate('join')} />
          <AboutSection />
          <VisionMission />
          <WhyAfak />
          <MemberTimeline />
          <ActivitiesSection />
          <GallerySection />
          <TestimonialsSection />
          <UpcomingEvent />
          <NewsSection onArchiveClick={() => navigate('news-archive')} />
          <CTASection onJoin={() => navigate('join')} />
        </>
      ) : currentPage === 'news-archive' ? (
        <NewsArchive onBack={() => navigate('home')} />
      ) : (
        <JoinClub onBack={() => navigate('home')} />
      )}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
