import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ROLES, STAKEHOLDER_GROUPS, STAKEHOLDER_CATEGORIES } from '../data/mockData';
import { SUPPORTED_LANGUAGES } from '../translations/translations';
import { AIChatbot } from './AIChatbot';
import {
  Sparkles,
  Phone,
  User,
  KeyRound,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Users,
  HeartHandshake,
  Smile,
  Briefcase,
  Monitor,
  Shield,
  School,
  Factory,
  Landmark,
  MapPin,
  FileText,
  HelpCircle,
  Lightbulb,
  Megaphone,
  Layers,
  Award,
  Zap,
  Check
} from 'lucide-react';

export const AuthGate = () => {
  const { language, setLanguage, t, loginUser, registerUser } = useApp();

  // Wizard Step: 1 = Welcome & Language, 2 = Choose Track, 3 = Choose Role, 4 = Login / Register
  const [step, setStep] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION); // problem_submitter | solution_provider
  const [selectedRoleId, setSelectedRoleId] = useState('citizen');
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'

  // Login State
  const [loginForm, setLoginForm] = useState({
    name: '',
    phone: '',
    otp: ''
  });
  const [isLoginOtpSent, setIsLoginOtpSent] = useState(false);

  // Register State
  const [regForm, setRegForm] = useState({
    name: '',
    phone: '',
    otp: '',
    subRole: '',
    jurisdiction: 'District / Block / Ward Area',
    panchayatName: 'Gram Panchayat Chandankyari',
    municipalityName: 'Ranchi Municipal Corporation',
    wardNo: 'Ward #12',
    cscCenterId: 'CSC-VLE-8821',
    anganwadiCode: 'ANG-JHK-104',
    ashaId: 'ASHA-NHM-742',
    officialId: '',
    email: '',
    university: 'IIT Kharagpur',
    department: 'Chemical & Water Engineering',
    degreeYear: 'Final Year B.Tech',
    company: 'Tata Water Solutions & Eureka Forbes',
    gstin: 'GSTIN27AAAAA0000A1Z5',
    govtDepartment: 'Ministry of Jal Shakti / Rural Water',
    designation: 'Executive Engineer / Project Officer',
    communityName: '',
    communityType: 'Community group / NGO',
    communityArea: ''
  });
  const [isRegOtpSent, setIsRegOtpSent] = useState(false);

  // Map icon component helper
  const renderRoleIcon = (iconName, className = "w-6 h-6") => {
    switch (iconName) {
      case 'User': return <User className={className} />;
      case 'Home': return <Building2 className={className} />;
      case 'Building': return <Building2 className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Monitor': return <Monitor className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'School': return <School className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      default: return <User className={className} />;
    }
  };

  // Grouped Roles
  const problemRoles = MOCK_ROLES.filter(r => r.group === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION && !r.hiddenFromStakeholderSelector);
  const solutionRoles = MOCK_ROLES.filter(r => r.group === STAKEHOLDER_GROUPS.SOLUTION_PROVIDER);

  const activeRoleObj = MOCK_ROLES.find(r => r.id === selectedRoleId) || MOCK_ROLES[0];

  // Handle Track Selection
  const handleSelectTrack = (groupKey) => {
    setSelectedGroup(groupKey);
    if (groupKey === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION) {
      setSelectedRoleId('citizen');
    } else {
      setSelectedRoleId('student');
    }
    setStep(3);
  };

  // Handle Role Selection
  const handleSelectRole = (roleId) => {
    setSelectedRoleId(roleId);
    const roleObj = MOCK_ROLES.find(r => r.id === roleId);
    if (roleObj) {
      setLoginForm(prev => ({
        ...prev,
        name: roleObj.defaultUser.name,
        phone: roleObj.defaultUser.phone
      }));
    }
    setStep(4);
  };

  // Quick Demo Auto-fill
  const handleQuickDemo = (roleId) => {
    const roleObj = MOCK_ROLES.find(r => r.id === roleId);
    if (roleObj) {
      loginUser({
        name: roleObj.defaultUser.name,
        phone: roleObj.defaultUser.phone,
        role: roleObj.id,
        subRole: roleObj.defaultUser.subRole,
        otp: '1234'
      });
    }
  };

  // Login Submit
  const handleLoginSendOtp = (e) => {
    e.preventDefault();
    if (!loginForm.name || !loginForm.phone || loginForm.phone.length < 10) {
      alert("Please enter your name and a valid 10-digit mobile number.");
      return;
    }
    setIsLoginOtpSent(true);
    setLoginForm(prev => ({ ...prev, otp: '1234' }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser({
      name: loginForm.name,
      phone: loginForm.phone,
      role: selectedRoleId,
      otp: loginForm.otp || '1234'
    });
  };

  // Register Submit
  const handleRegSendOtp = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone || regForm.phone.length < 10) {
      alert("Please enter your name and a valid mobile number.");
      return;
    }
    setIsRegOtpSent(true);
    setRegForm(prev => ({ ...prev, otp: '1234' }));
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    registerUser({
      name: regForm.name,
      phone: regForm.phone,
      role: selectedRoleId,
      subRole: regForm.subRole || activeRoleObj.defaultUser.subRole,
      jurisdiction: regForm.jurisdiction,
      panchayatName: regForm.panchayatName,
      municipalityName: regForm.municipalityName,
      wardNo: regForm.wardNo,
      cscCenterId: regForm.cscCenterId,
      anganwadiCode: regForm.anganwadiCode,
      ashaId: regForm.ashaId,
      officialId: regForm.officialId || `ID-${Math.floor(10000 + Math.random() * 90000)}`,
      email: regForm.email,
      university: regForm.university,
      department: regForm.department,
      degreeYear: regForm.degreeYear,
      company: regForm.company,
      gstin: regForm.gstin,
      govtDepartment: regForm.govtDepartment,
      designation: regForm.designation,
      communityName: regForm.communityName,
      communityType: regForm.communityType,
      communityArea: regForm.communityArea
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF0F5] to-[#F0FDFC] text-slate-900 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Top Brand & Emergency Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 pb-4 border-b border-orange-100/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-cyan-400 p-0.5 shadow-md shadow-orange-100 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-rose-600 text-xl tracking-tighter">
              E
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">ECHELON</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200">
                Civic Innovation
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Closed-Loop Problem Resolution & Product Scaling
            </p>
          </div>
        </div>

        {/* Top Language & Help Status */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200/80 text-xs font-semibold text-rose-700 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>{SUPPORTED_LANGUAGES.find(l => l.code === language)?.native || 'Language'}</span>
          </div>
          {step > 1 && (
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-medium transition"
            >
              Change Language
            </button>
          )}
        </div>
      </div>

      {/* Main Wizard Container */}
      <div className="max-w-5xl w-full mx-auto my-6 flex-1 flex flex-col justify-center">
        
        {/* ================= STEP 1: WELCOME & LANGUAGE SELECTION ================= */}
        {step === 1 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-100/50 border border-orange-100 space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-100 via-rose-100 to-cyan-100 border border-orange-200 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>India's Multi-Stakeholder Civic Engine</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Welcome to <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-cyan-600 bg-clip-text text-transparent">ECHELON</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Connect ground problems directly with engineering students, industrial manufacturing, and government deployment.
              </p>
            </div>

            {/* Language Selection Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Globe className="w-4 h-4 text-orange-500" />
                  <span>Choose Your Preferred Language / अपनी भाषा चुनें</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Supporting 19 Indian & Jharkhand Regional Languages
                </span>
              </div>

              {/* Language Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-72 overflow-y-auto pr-1 p-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`text-left p-3 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-gradient-to-br from-orange-50 to-rose-50 border-rose-300 ring-2 ring-rose-400/40 shadow-sm' 
                          : 'bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-sm font-bold text-slate-900">{lang.native}</span>
                        {isSelected && <Check className="w-4 h-4 text-rose-600 font-bold" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{lang.label}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          lang.badge === 'Jharkhand' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-cyan-100 text-cyan-800'
                        }`}>
                          {lang.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-2 text-center">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold text-base shadow-lg shadow-rose-200 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>{t('nextStep') || 'Continue / आगे बढ़ें'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CHOOSE YOUR TRACK (Problem Submission vs Solution & Product) ================= */}
        {step === 2 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-100/50 border border-orange-100 space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <button 
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('selectLang')}</span>
              </button>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t('trackSelectionTitle')}
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                {t('trackSelectionSubtitle')}
              </p>
            </div>

            {/* 2 Big Track Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Option A: Problem Submission (Demand Side) */}
              <div 
                onClick={() => handleSelectTrack(STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION)}
                className="group cursor-pointer rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FFF5ED] via-[#FFF0E6] to-[#FFEBE0] border-2 border-orange-200 hover:border-orange-400 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 text-white flex items-center justify-center shadow-md shadow-orange-200">
                    <Megaphone className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 uppercase tracking-wider bg-orange-100/90 px-2.5 py-0.5 rounded-full">
                      <Users className="w-3 h-3" />
                      <span>Demand / Ground Side</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {t('trackProblemSubmission')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {t('trackProblemSubmissionDesc')}
                    </p>
                  </div>

                  {/* Badges of included roles */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {['Individual', 'Community Groups / NGOs', 'Local Bodies (PRI / ULB)', 'Frontline Workers (ASHA / Anganwadi / Rozgar Sevak)', 'Government Departments'].map((r, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-white/90 text-orange-950 px-2 py-0.5 rounded-md border border-orange-200/80">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-orange-700 font-extrabold text-sm group-hover:text-orange-800">
                  <span>Enter Problem Portal →</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition">
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Option B: Solutions & Product Innovation (Supply Side) */}
              <div 
                onClick={() => handleSelectTrack(STAKEHOLDER_GROUPS.SOLUTION_PROVIDER)}
                className="group cursor-pointer rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#EBFBFA] via-[#E2F7F6] to-[#D5F3F1] border-2 border-cyan-200 hover:border-cyan-400 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-cyan-200">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-800 uppercase tracking-wider bg-cyan-100/90 px-2.5 py-0.5 rounded-full">
                      <Zap className="w-3 h-3" />
                      <span>Supply / R&D & Industry Side</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {t('trackSolutions')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {t('trackSolutionsDesc')}
                    </p>
                  </div>

                  {/* Badges of included roles */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {['Student Innovator', 'University / R&D Lab', 'Industry & Corporate', 'Govt Implementation'].map((r, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-white/90 text-cyan-950 px-2 py-0.5 rounded-md border border-cyan-200/80">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-cyan-800 font-extrabold text-sm group-hover:text-cyan-900">
                  <span>Enter Solution Workspace →</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:translate-x-1 transition">
                    <ArrowRight className="w-4 h-4 text-cyan-700" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= STEP 3: CHOOSE SPECIFIC ROLE ================= */}
        {step === 3 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-100/50 border border-orange-100 space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <button 
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full mb-1 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('backToTracks')}</span>
                </button>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedGroup === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION
                    ? "Select Your Ground / Civic Role"
                    : "Select Your Innovation & Industry Role"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Choose your exact designation to customize your portal inputs and permissions.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800">
                <span>{selectedGroup === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION ? "Problem Submission Track" : "Solution & Scaling Track"}</span>
              </div>
            </div>

            {/* Role Cards Grid */}
            <div className="space-y-6">
              {(selectedGroup === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION
                ? STAKEHOLDER_CATEGORIES.map(category => ({
                    ...category,
                    roles: problemRoles.filter(role => role.category === category.id)
                  })).filter(category => category.roles.length > 0)
                : [{ id: 'solution_roles', label: 'Solution & Scaling Stakeholders', description: '', roles: solutionRoles }]
              ).map((category) => (
                <section key={category.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {renderRoleIcon(category.iconName, "w-4 h-4 text-orange-600")}
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{category.label}</h3>
                      {category.description && <p className="text-[11px] text-slate-500">{category.description}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {category.roles.map((role) => {
                const isSelected = selectedRoleId === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role.id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 group relative ${
                      isSelected
                        ? selectedGroup === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION
                          ? 'bg-gradient-to-br from-[#FFF5ED] to-[#FFEBE0] border-orange-300 ring-2 ring-orange-400 shadow-md'
                          : 'bg-gradient-to-br from-[#EBFBFA] to-[#D5F3F1] border-cyan-300 ring-2 ring-cyan-400 shadow-md'
                        : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedGroup === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}>
                        {renderRoleIcon(role.iconName, "w-5 h-5")}
                      </div>
                      <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-slate-400">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        {role.subcategory || role.label}
                      </h4>
                      {role.subcategory && <p className="text-[10px] font-bold text-orange-700">{category.label}</p>}
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-rose-600">
                      <span>Login / Register →</span>
                    </div>
                  </button>
                );
                  })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 4: LOGIN OR REGISTER ACCORDING TO ROLE ================= */}
        {step === 4 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-100/50 border border-orange-100 space-y-6 animate-fadeIn">
            
            {/* Top Back and Active Role Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('backToRoles')}</span>
                </button>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Signing in as</span>
                  <span className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    {renderRoleIcon(activeRoleObj.iconName, "w-4 h-4 text-orange-600")}
                    {activeRoleObj.label}
                  </span>
                </div>
              </div>

              {/* Instant 1-Tap Test Drive Button */}
              <button
                onClick={() => handleQuickDemo(selectedRoleId)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-100 via-rose-100 to-cyan-100 hover:from-amber-200 hover:to-cyan-200 text-slate-900 text-xs font-bold border border-orange-200 shadow-sm transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{t('quickDemo')}</span>
              </button>
            </div>

            {/* Auth Tab Switcher (Login vs Register) */}
            <div className="flex p-1 bg-slate-100 rounded-2xl max-w-md mx-auto">
              <button
                onClick={() => { setAuthTab('login'); setIsLoginOtpSent(false); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  authTab === 'login'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In (Login)
              </button>
              <button
                onClick={() => { setAuthTab('register'); setIsRegOtpSent(false); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  authTab === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account (Register)
              </button>
            </div>

            {/* --- TAB 1: LOGIN (Name + Phone + OTP only) --- */}
            {authTab === 'login' && (
              <form onSubmit={isLoginOtpSent ? handleLoginSubmit : handleLoginSendOtp} className="max-w-md mx-auto space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('fullName')}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={loginForm.name}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm font-medium outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('phoneNumber')}</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      value={loginForm.phone}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="98765 43210"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm font-medium outline-none transition"
                    />
                  </div>
                </div>

                {isLoginOtpSent && (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-rose-500" />
                        <span>{t('enterOtp')}</span>
                      </label>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Demo OTP: 1234
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={loginForm.otp}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, otp: e.target.value }))}
                      placeholder="Enter 1234"
                      className="w-full px-4 py-3 text-center tracking-widest text-lg font-black rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  {isLoginOtpSent ? t('verifyLogin') : t('sendOtp')}
                </button>
              </form>
            )}

            {/* --- TAB 2: REGISTER (Role-Specific Tailored Registration Details) --- */}
            {authTab === 'register' && (
              <form onSubmit={isRegOtpSent ? handleRegSubmit : handleRegSendOtp} className="max-w-2xl mx-auto space-y-4 pt-2">
                
                {/* Core Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('fullName')}</label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Dr. Sunita Mahato"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Role Specific Dynamic Fields */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                  <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-orange-600" />
                    <span>Role Specific Verification Details</span>
                  </div>

                  {/* Citizen Fields */}
                  {selectedRoleId === 'citizen' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Village / Locality / Mohalla</label>
                        <input
                          type="text"
                          value={regForm.jurisdiction}
                          onChange={(e) => setRegForm(prev => ({ ...prev, jurisdiction: e.target.value }))}
                          placeholder="e.g. Purulia Block-IV / Morabadi, Ranchi"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Aadhaar (Last 4 digits, optional)</label>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="XXXX"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {selectedRoleId === 'community_group' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Group / NGO Name</label>
                        <input
                          type="text"
                          value={regForm.communityName}
                          onChange={(e) => setRegForm(prev => ({ ...prev, communityName: e.target.value }))}
                          placeholder="e.g. Adivasi Jal Samiti"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Group Type</label>
                        <select
                          value={regForm.communityType}
                          onChange={(e) => setRegForm(prev => ({ ...prev, communityType: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <option>Community group / NGO</option>
                          <option>Resident welfare group</option>
                          <option>Farmer collective</option>
                          <option>Self-help group</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Area / Locality Covered</label>
                        <input
                          type="text"
                          value={regForm.communityArea}
                          onChange={(e) => setRegForm(prev => ({ ...prev, communityArea: e.target.value }))}
                          placeholder="Village, ward or block"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Panchayati Raj Fields */}
                  {selectedRoleId === 'panchayati_raj' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Designation</label>
                        <select
                          value={regForm.subRole}
                          onChange={(e) => setRegForm(prev => ({ ...prev, subRole: e.target.value }))}
                          className="w-full px-2.5 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <option value="Panchayat Secretary">Panchayat Secretary</option>
                          <option value="Mukhiya / Sarpanch">Mukhiya / Sarpanch</option>
                          <option value="Up-Sarpanch">Up-Sarpanch</option>
                          <option value="Gram Panchayat Member">Gram Panchayat Member</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Gram Panchayat Name</label>
                        <input
                          type="text"
                          value={regForm.panchayatName}
                          onChange={(e) => setRegForm(prev => ({ ...prev, panchayatName: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">PRI Staff Code / ID</label>
                        <input
                          type="text"
                          value={regForm.officialId}
                          onChange={(e) => setRegForm(prev => ({ ...prev, officialId: e.target.value }))}
                          placeholder="PRI-JHK-2026"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Urban Local Body Fields */}
                  {selectedRoleId === 'urban_local_body' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Municipality / Zone</label>
                        <input
                          type="text"
                          value={regForm.municipalityName}
                          onChange={(e) => setRegForm(prev => ({ ...prev, municipalityName: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Ward Number</label>
                        <input
                          type="text"
                          value={regForm.wardNo}
                          onChange={(e) => setRegForm(prev => ({ ...prev, wardNo: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Designation</label>
                        <input
                          type="text"
                          placeholder="Ward Councilor / Sanitation Inspector"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* ASHA / Anganwadi Fields */}
                  {(selectedRoleId === 'asha_worker' || selectedRoleId === 'anganwadi_worker') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Center / Subcenter Name</label>
                        <input
                          type="text"
                          placeholder="Subcenter #4 / Anganwadi #14"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">NHM / ICDS Worker ID</label>
                        <input
                          type="text"
                          placeholder="ASHA-7742 / ICDS-88"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Assigned Sector</label>
                        <input
                          type="text"
                          placeholder="Purulia Block-IV"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Rozgar Sevak / Pragya Kendra CSC */}
                  {(selectedRoleId === 'rozgar_sevak' || selectedRoleId === 'pragya_kendra') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">VLE CSC ID / NREGA Code</label>
                        <input
                          type="text"
                          value={regForm.cscCenterId}
                          onChange={(e) => setRegForm(prev => ({ ...prev, cscCenterId: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Center Location / Panchayat</label>
                        <input
                          type="text"
                          placeholder="Ormanjhi, Ranchi"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Student Innovator */}
                  {selectedRoleId === 'student' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">University / College</label>
                        <input
                          type="text"
                          value={regForm.university}
                          onChange={(e) => setRegForm(prev => ({ ...prev, university: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Department</label>
                        <input
                          type="text"
                          value={regForm.department}
                          onChange={(e) => setRegForm(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Roll No / Student ID</label>
                        <input
                          type="text"
                          placeholder="22CH1004"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* University R&D */}
                  {selectedRoleId === 'university' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Institution Name</label>
                        <input
                          type="text"
                          value={regForm.university}
                          onChange={(e) => setRegForm(prev => ({ ...prev, university: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">R&D / Incubation Center</label>
                        <input
                          type="text"
                          placeholder="Sponsored Research & Consultancy"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">NIRF / AISHE Code</label>
                        <input
                          type="text"
                          placeholder="AISHE-U-0582"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Industry Corporate */}
                  {selectedRoleId === 'industry' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Company Name</label>
                        <input
                          type="text"
                          value={regForm.company}
                          onChange={(e) => setRegForm(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">CIN / GSTIN</label>
                        <input
                          type="text"
                          value={regForm.gstin}
                          onChange={(e) => setRegForm(prev => ({ ...prev, gstin: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">CSR / R&D Sector</label>
                        <input
                          type="text"
                          placeholder="Water & Clean Tech"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Government Directorate / Field Officer */}
                  {(selectedRoleId === 'government' || selectedRoleId === 'govt_field') && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Department / Ministry</label>
                        <input
                          type="text"
                          value={regForm.govtDepartment}
                          onChange={(e) => setRegForm(prev => ({ ...prev, govtDepartment: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Designation / Cadre</label>
                        <input
                          type="text"
                          value={regForm.designation}
                          onChange={(e) => setRegForm(prev => ({ ...prev, designation: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Gov.in / NIC Email</label>
                        <input
                          type="email"
                          placeholder="officer@nic.in"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {isRegOtpSent && (
                  <div className="space-y-1 animate-fadeIn max-w-xs mx-auto">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">{t('enterOtp')}</label>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Demo: 1234
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={regForm.otp}
                      onChange={(e) => setRegForm(prev => ({ ...prev, otp: e.target.value }))}
                      placeholder="1234"
                      className="w-full px-3 py-2 text-center tracking-widest text-base font-black rounded-xl bg-slate-50 border border-slate-200 outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  {isRegOtpSent ? t('verifyLogin') : "Send Registration OTP & Enter"}
                </button>
              </form>
            )}

          </div>
        )}

      </div>

      {/* Footer Support Info */}
      <div className="max-w-6xl w-full mx-auto pt-4 border-t border-orange-100/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 ECHELON — National Civic Innovation & Technology Scaling Engine.</p>
        <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-600">
          <span>Toll-Free Helpline: 1800-11-2026</span>
          <span>•</span>
          <span>Emergency SOS: 112 / 108</span>
        </div>
      </div>

      <AIChatbot />
    </div>
  );
};
