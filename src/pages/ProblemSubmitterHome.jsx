import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mic, 
  Search, 
  HelpCircle, 
  RotateCcw, 
  ShieldAlert, 
  Bot, 
  Award, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  Bell,
  Building,
  Users,
  PlusCircle,
  Activity,
  BookOpen,
  LayoutDashboard,
  FileCheck,
  Flame,
  PhoneCall,
  Zap,
  Clock
} from 'lucide-react';

export const ProblemSubmitterHome = ({ setActivePage, setSelectedProblemId }) => {
  const { currentUser, t, language, setIsEmergencyOpen, setIsChatbotOpen, problems } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [quickTrackId, setQuickTrackId] = useState('');

  // Audio guide reading
  const handleToggleAudioGuide = () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      if ('speechSynthesis' in window) {
        const text = `${t('welcomeTitle')} ${currentUser.name}. ${t('welcomeSubtitle')}. ${t('welcomeDesc')}. ${t('submitProblem')}, ${t('trackProblem')}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingAudio(false), 4000);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    }
  };

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      setSelectedProblemId(quickTrackId.trim());
      setActivePage('track-problem');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fadeIn">
      
      {/* Friendly Welcoming Hero Banner in Pastel Peach & Rose */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF5ED] via-[#FFF0E6] to-[#FFEBE0] text-slate-900 p-6 sm:p-10 shadow-lg shadow-orange-100/60 border border-orange-200/80">
        
        {/* Soft Ambient decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-200/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 shadow-xs text-orange-950 text-xs font-extrabold border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              {currentUser.roleLabel} • Problem Submission Portal
            </span>

            {/* Audio Voice Guide Button */}
            <button
              onClick={handleToggleAudioGuide}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                isPlayingAudio
                  ? 'bg-amber-400 text-amber-950 animate-pulse ring-4 ring-amber-300/40'
                  : 'bg-white hover:bg-orange-50 text-orange-900 border border-orange-200'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 text-amber-950" /> : <Volume2 className="w-4 h-4 text-orange-600" />}
              <span>{isPlayingAudio ? "Speaking..." : t('listenAudio')}</span>
            </button>
          </div>

          {/* Big Greeting */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-sans uppercase">
              {t('welcomeTitle')} {currentUser.name}!
            </h1>
            <p className="text-lg sm:text-2xl font-extrabold text-orange-800 tracking-tight">
              {t('welcomeSubtitle')}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed font-medium">
            {t('welcomeDesc')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 border border-orange-200 text-xs font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{currentUser.location}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 border border-orange-200 text-xs font-bold text-slate-800">
              <Users className="w-3.5 h-3.5 text-cyan-600" />
              <span>Verified Submitter ID: {currentUser.officialId || "ID-40291"}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Primary Big Action Cards: Voice / Camera Problem Submission & Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: SUBMIT PROBLEM (Large Pastel Peach & Pink Card) */}
        <div 
          onClick={() => setActivePage('submit-problem')}
          className="group cursor-pointer rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FFF5ED] via-[#FFF0E6] to-[#FFEBE0] border-2 border-orange-200 hover:border-orange-400 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 relative flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-orange-200 group-hover:scale-105 transition-transform">
              <Mic className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Voice & Photo Assistant</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('submitProblem')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {t('submitProblemDesc')}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-orange-900 font-bold bg-white/80 p-3 rounded-xl border border-orange-200/80">
              <Camera className="w-4 h-4 text-orange-600 shrink-0" />
              <span>Click Photo / Record Voice. AI categorizes automatically without manual forms.</span>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between text-orange-700 font-extrabold text-sm group-hover:text-orange-800">
            <span>Open Problem Form →</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition">
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>

        {/* CARD 2: TRACK PROBLEM (Pastel Cyan & Green Card) */}
        <div 
          onClick={() => setActivePage('track-problem')}
          className="group cursor-pointer rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#EBFBFA] via-[#E2F7F6] to-[#D5F3F1] border-2 border-cyan-200 hover:border-cyan-400 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 relative flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-cyan-200 group-hover:scale-105 transition-transform">
              <Activity className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold">
                <Search className="w-3.5 h-3.5" />
                <span>Live 6-Stage Telemetry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('trackProblem')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {t('trackProblemDesc')}
              </p>
            </div>

            {/* Quick Track Input Bar inside card */}
            <form onSubmit={handleQuickTrack} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                placeholder="Enter Ticket ID (e.g. ECH-2026-8821)"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-cyan-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-200"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-xs transition"
              >
                Track
              </button>
            </form>
          </div>

          <div className="pt-6 flex items-center justify-between text-cyan-800 font-extrabold text-sm group-hover:text-cyan-900">
            <span>View Full Live Status →</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition">
              <ArrowRight className="w-4 h-4 text-cyan-700" />
            </div>
          </div>
        </div>

      </div>

      {/* Supporting Civic Features in Light Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card A: How ECHELON Works */}
        <div 
          onClick={() => setActivePage('how-it-works')}
          className="cursor-pointer p-5 rounded-2xl bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">{t('howItWorks')}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('howItWorksDesc')}</p>
          </div>
          <div className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
            <span>See 6-Stage Loop</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card B: My Dashboard */}
        <div 
          onClick={() => setActivePage('dashboard')}
          className="cursor-pointer p-5 rounded-2xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">{t('dashboard')}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('dashboardDesc')}</p>
          </div>
          <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
            <span>View Karma & Stats</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card C: Emergency SOS (Life Safety) */}
        <div 
          onClick={() => setIsEmergencyOpen(true)}
          className="cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/70 hover:from-red-100 hover:to-rose-200 border-2 border-red-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-red-950">{t('emergencySOS')}</h3>
            <p className="text-xs text-red-800 mt-1 leading-relaxed">{t('emergencySOSDesc')}</p>
          </div>
          <div className="text-[11px] font-black text-red-700 flex items-center gap-1">
            <span>Police 112 • Ambulance 108</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card D: 24/7 AI Civic Assistant */}
        <div 
          onClick={() => setIsChatbotOpen(true)}
          className="cursor-pointer p-5 rounded-2xl bg-white hover:bg-cyan-50/50 border border-slate-200 hover:border-cyan-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">{t('aiHelper')}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t('aiHelperDesc')}</p>
          </div>
          <div className="text-[11px] font-bold text-cyan-800 flex items-center gap-1">
            <span>Chat in Your Language</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* Recent Activity Mini-Feed */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Ground Solutions Live Status</h3>
          </div>
          <button 
            onClick={() => setActivePage('track-problem')}
            className="text-xs font-bold text-orange-700 hover:text-orange-800"
          >
            View All Issues ({problems.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {problems.slice(0, 2).map((prob) => (
            <div 
              key={prob.id}
              onClick={() => {
                setSelectedProblemId(prob.id);
                setActivePage('track-problem');
              }}
              className="cursor-pointer p-4 rounded-2xl bg-slate-50 hover:bg-orange-50/40 border border-slate-200 hover:border-orange-200 transition space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900">{prob.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {prob.status}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{prob.title}</p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{prob.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
