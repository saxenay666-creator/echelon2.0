import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ROLES, STAKEHOLDER_GROUPS } from '../data/mockData';
import { SUPPORTED_LANGUAGES } from '../translations/translations';
import { 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  X, 
  Search,
  CheckCircle,
  Zap,
  LogOut,
  Globe,
  Home,
  PlusCircle,
  Activity,
  HelpCircle,
  LayoutDashboard,
  Layers,
  Award,
  BookOpen,
  Rocket
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage }) => {
  const { 
    currentUser, 
    switchRole, 
    logoutUser,
    language,
    setLanguage,
    t,
    isProblemSubmitter,
    isSolutionProvider,
    setIsEmergencyOpen, 
    setIsChatbotOpen, 
    notifications
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSubmitter = isProblemSubmitter(currentUser.role);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Problem Submission Links (Demand side: Citizen, PRI, ULB, ASHA, Anganwadi, Rozgar, CSC, Govt Field)
  const submitterNavLinks = [
    { id: 'home', label: t('welcomeTitle') || 'Home', icon: Home },
    { id: 'submit-problem', label: t('submitProblem'), icon: PlusCircle, highlight: true },
    { id: 'track-problem', label: t('trackProblem'), icon: Activity },
    { id: 'how-it-works', label: t('howItWorks'), icon: BookOpen },
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
  ];

  // Solution & Implementation Links (Supply side: Student, University, Industry, Govt Directorate)
  // NO submit-problem link for solution providers!
  const solutionNavLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore-problems', label: 'Explore Problems', icon: Search, highlight: true },
    { id: 'explore-solutions', label: 'Explore Solutions & TRL', icon: Rocket },
    { id: 'how-it-works', label: 'How ECHELON Works', icon: Layers },
    { id: 'track-problem', label: 'Track Lifecycle', icon: Activity },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const activeNavLinks = isSubmitter ? submitterNavLinks : solutionNavLinks;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs transition-all border-b border-orange-100">
      
      {/* Top Banner Alert (For Solution Stakeholders) */}
      {!isSubmitter && (
        <div className="bg-gradient-to-r from-orange-50 via-rose-50 to-cyan-50 text-slate-800 text-xs py-1 px-4 hidden md:flex items-center justify-between border-b border-orange-200/60">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-bold text-orange-900">ECHELON NATIONAL R&D GRID:</span>
            <span className="text-slate-700">14,820+ Ground Challenges Triaged • AI Academic Matching</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-700">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-500" /> Velocity: <strong>4.2 mins</strong></span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Resolution: <strong>94.8%</strong></span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Logo */}
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-cyan-400 p-0.5 shadow-md shadow-orange-100 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-rose-600 text-lg tracking-tighter">
                E
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl md:text-2xl tracking-tight text-slate-900 font-sans">
                  ECHELON
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                  isSubmitter 
                    ? 'bg-orange-50 text-orange-800 border-orange-200' 
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  {isSubmitter ? "Civic Portal" : "R&D & Industry"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                {isSubmitter ? "Problem Submission & Demands" : "Prototype → Product → Ground Deployment"}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {activeNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 relative ${
                    isActive
                      ? isSubmitter
                        ? 'text-orange-950 bg-orange-100/90 font-extrabold shadow-xs border border-orange-200'
                        : 'text-cyan-950 bg-cyan-100/90 font-extrabold shadow-xs border border-cyan-200'
                      : item.highlight
                      ? 'text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 ml-0.5"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsRoleMenuOpen(false); setIsNotifOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
                title="Change Platform Language"
              >
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span className="hidden sm:inline font-bold">
                  {SUPPORTED_LANGUAGES.find(l => l.code === language)?.native || 'EN'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="p-1 grid grid-cols-1 gap-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                          language === lang.code 
                            ? 'bg-rose-50 font-bold text-rose-700' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{lang.native}</span>
                          <span className="text-[10px] text-slate-400">{lang.label}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          lang.badge === 'Jharkhand' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {lang.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency SOS Button (ALWAYS BRIGHT RED/AMBER AS REQUIRED) */}
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-xs shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 active:scale-95 transition-all duration-150 animate-pulse border border-red-400"
              title="Emergency Life-Safety SOS"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span className="tracking-wide">SOS 112/108</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200 text-slate-800 hover:bg-orange-100 text-xs font-bold shadow-xs transition"
              title="24/7 AI Civic Assistant"
            >
              <Bot className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">AI Helper</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsRoleMenuOpen(false); setIsLangMenuOpen(false); }}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-sm font-extrabold text-slate-900">Notifications</span>
                    <span className="text-xs bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                      {unreadNotifs} New
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition text-xs space-y-1">
                        <p className="text-slate-800 font-medium">{n.text}</p>
                        <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Switch Role Menu */}
            <div className="relative">
              <button
                onClick={() => { setIsRoleMenuOpen(!isRoleMenuOpen); setIsNotifOpen(false); setIsLangMenuOpen(false); }}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-xs transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-orange-300"
                />
                <div className="hidden md:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-slate-900 leading-none">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 leading-tight">
                    {currentUser.subRole || currentUser.roleLabel}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Role Perspective Dropdown */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 text-[10px] font-bold">
                      <span>{currentUser.roleLabel}</span>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Perspective (Preview)
                  </div>

                  <div className="p-1 space-y-0.5 max-h-60 overflow-y-auto">
                    {MOCK_ROLES.filter((role) => !role.hiddenFromStakeholderSelector).map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          switchRole(role.id);
                          setIsRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                          currentUser.role === role.id
                            ? 'bg-orange-50 text-orange-950 font-bold border border-orange-200'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{role.label}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          role.group === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-cyan-100 text-cyan-800'
                        }`}>
                          {role.group === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION ? 'Demand' : 'Supply'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-2">
                    <button
                      onClick={() => {
                        setIsRoleMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn shadow-lg">
          {activeNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-orange-100/90 text-orange-950 font-bold'
                    : item.highlight
                    ? 'bg-rose-50 text-rose-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
};
