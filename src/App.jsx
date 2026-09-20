import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthGate } from './components/AuthGate';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { AIChatbot } from './components/AIChatbot';
import { BackButton } from './components/BackButton';

import { Home } from './pages/Home';
import { ProblemSubmitterHome } from './pages/ProblemSubmitterHome';
import { HowItWorks } from './pages/HowItWorks';
import { SubmitProblem } from './pages/SubmitProblem';
import { ExploreProblems } from './pages/ExploreProblems';
import { ExploreSolutions } from './pages/ExploreSolutions';
import { TrackProblem } from './pages/TrackProblem';
import { Leaderboard } from './pages/Leaderboard';
import { Dashboard } from './pages/Dashboard';

function MainApp() {
  const { isAuthenticated, currentUser, isProblemSubmitter, isSolutionProvider } = useApp();
  const [activePage, setActivePage] = useState('home');
  const [pageHistory, setPageHistory] = useState(['home']);
  const [selectedProblemId, setSelectedProblemId] = useState('ECH-2026-8821');

  // If user is not logged in, show Auth Gate immediately
  if (!isAuthenticated) {
    return <AuthGate />;
  }

  const isSubmitter = isProblemSubmitter(currentUser?.role);

  // Scroll to top on page switch
  const handlePageChange = (pageId) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    setPageHistory(prev => [...prev, pageId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setPageHistory(prev => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setActivePage(next[next.length - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Page Routing Container */}
      <main className="flex-1">
        {pageHistory.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <BackButton onClick={handleBack} label="Back to Previous Page" />
          </div>
        )}
        {/* Conditional Home Page: 
            Problem Submitters (Citizens, PRI, ULB, Govt Demand) -> ProblemSubmitterHome
            Solution Providers (Students, Universities, Industry, Govt Directorate) -> Professional Home 
        */}
        {activePage === 'home' && (
          isSubmitter ? (
            <ProblemSubmitterHome 
              setActivePage={handlePageChange}
              setSelectedProblemId={setSelectedProblemId}
            />
          ) : (
            <Home 
              setActivePage={handlePageChange} 
              setSelectedProblemId={setSelectedProblemId} 
            />
          )
        )}

        {activePage === 'how-it-works' && (
          <HowItWorks 
            setActivePage={handlePageChange} 
          />
        )}

        {activePage === 'submit-problem' && (
          isSubmitter ? (
            <SubmitProblem 
              setActivePage={handlePageChange} 
              setSelectedProblemId={setSelectedProblemId} 
            />
          ) : (
            <ExploreProblems 
              setActivePage={handlePageChange} 
              setSelectedProblemId={setSelectedProblemId} 
            />
          )
        )}

        {/* Enterprise-only pages for Solution Stakeholders */}
        {!isSubmitter && activePage === 'explore-problems' && (
          <ExploreProblems 
            setActivePage={handlePageChange} 
            setSelectedProblemId={setSelectedProblemId} 
          />
        )}

        {!isSubmitter && activePage === 'explore-solutions' && (
          <ExploreSolutions 
            setActivePage={handlePageChange} 
            setSelectedProblemId={setSelectedProblemId} 
          />
        )}

        {!isSubmitter && activePage === 'leaderboard' && (
          <Leaderboard />
        )}

        {activePage === 'track-problem' && (
          <TrackProblem 
            selectedProblemId={selectedProblemId} 
            setSelectedProblemId={setSelectedProblemId} 
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard 
            setActivePage={handlePageChange} 
            setSelectedProblemId={setSelectedProblemId} 
          />
        )}
      </main>

      {/* Global Modals */}
      <EmergencyModal />
      <AIChatbot setActivePage={handlePageChange} />

      {/* Global Footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
