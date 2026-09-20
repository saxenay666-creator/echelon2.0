import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_ROLES, STAKEHOLDER_GROUPS, STAKEHOLDER_CATEGORIES } from '../data/mockData';
import { X, CheckCircle, ShieldCheck, KeyRound, Phone, User, Mail, Building, GraduationCap, MapPin, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, setCurrentUser, addNotification } = useApp();
  
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [otpStep, setOtpStep] = useState(false);
  const [mockOtp, setMockOtp] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    officialId: '',
    organization: '',
    location: '',
  });

  if (!isAuthOpen) return null;

  const isCitizen = selectedRole === 'citizen';
  const problemRoles = MOCK_ROLES.filter(role =>
    role.group === STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION && !role.hiddenFromStakeholderSelector
  );
  const solutionRoles = MOCK_ROLES.filter(role => role.group === STAKEHOLDER_GROUPS.SOLUTION_PROVIDER);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpStep(true);
    setMockOtp('7482'); // Preset mock OTP for effortless testing
  };

  const handleVerifyAndSubmit = () => {
    const roleConfig = MOCK_ROLES.find(r => r.id === selectedRole) || MOCK_ROLES[0];
    
    const newUser = {
      name: formData.name || roleConfig.defaultUser.name,
      role: selectedRole,
      roleLabel: roleConfig.label,
      phone: formData.phone || roleConfig.defaultUser.phone,
      email: formData.email || roleConfig.defaultUser.email,
      location: formData.location || "Ranchi Rural District, Jharkhand",
      officialId: formData.officialId || roleConfig.defaultUser.officialId || "ID-GEN-2026",
      university: formData.organization || roleConfig.defaultUser.university,
      company: formData.organization || roleConfig.defaultUser.company,
      department: formData.organization || roleConfig.defaultUser.department,
      credits: 250,
      tier: "Bronze",
      avatar: roleConfig.defaultUser.avatar
    };

    setCurrentUser(newUser);
    addNotification(`Welcome ${newUser.name}! Logged in as ${newUser.roleLabel}`, "success");
    setIsAuthOpen(false);
    setOtpStep(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">
                {authMode === 'register' ? 'Register on ECHELON' : 'Login with Mobile'}
              </h3>
              <p className="text-xs text-indigo-100">National Innovation & Civic Governance Network</p>
            </div>
          </div>
          <button 
            onClick={() => { setIsAuthOpen(false); setOtpStep(false); }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setAuthMode('register'); setOtpStep(false); }}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all ${
              authMode === 'register'
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>
          <button
            onClick={() => { setAuthMode('login'); setOtpStep(false); }}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all ${
              authMode === 'login'
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In with OTP
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Your Stakeholder Role:
                </label>
                <div className="space-y-3">
                  {STAKEHOLDER_CATEGORIES.map(category => {
                    const roles = problemRoles.filter(role => role.category === category.id);
                    if (!roles.length) return null;
                    return (
                      <div key={category.id}>
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">{category.label}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {roles.map(role => (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                        selectedRole === role.id
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-1 ring-indigo-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <p className="truncate">{role.subcategory || role.label}</p>
                    </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Solution & Scaling Stakeholders</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {solutionRoles.map(role => (
                        <button
                          type="button"
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                            selectedRole === role.id
                              ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-1 ring-indigo-600'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <p className="truncate">{role.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 italic">
                  {MOCK_ROLES.find(r => r.id === selectedRole)?.description}
                </p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number (for OTP)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Additional fields for institutional / field / industry / govt roles */}
                {!isCitizen && (
                  <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[11px] font-bold text-indigo-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      Institutional Verification Credentials Required:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Official ID / Code</label>
                        <input
                          type="text"
                          placeholder="e.g. ASHA-WB-4109 / EMP-2026"
                          value={formData.officialId}
                          onChange={(e) => setFormData({ ...formData, officialId: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Official Email</label>
                        <input
                          type="email"
                          placeholder="e.g. officer@gov.in / name@iitkgp.ac.in"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Institution / Department / Ward</label>
                      <input
                        type="text"
                        placeholder="e.g. IIT Kharagpur / Tata Water / Purulia Block-IV"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Send OTP to Mobile</span>
                <KeyRound className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4 py-2 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900">Enter Verification Code</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 4-digit code to <strong>{formData.phone || "+91 98765 43210"}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-2 max-w-[200px] mx-auto my-4">
                <input
                  type="text"
                  maxLength="4"
                  value={mockOtp}
                  onChange={(e) => setMockOtp(e.target.value)}
                  className="w-full text-center tracking-[0.5em] font-mono text-xl font-extrabold py-2.5 border-2 border-indigo-500 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Test OTP auto-filled: <strong className="text-indigo-600 font-mono">7482</strong>
              </p>

              <button
                type="button"
                onClick={handleVerifyAndSubmit}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Verify OTP & Complete Sign In</span>
              </button>
            </div>
          )}

          {/* Quick Demo Switcher Section */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Or 1-Click Login with Demo Profiles:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setCurrentUser(MOCK_ROLES[0].defaultUser);
                  setIsAuthOpen(false);
                  addNotification("Switched to Citizen Profile", "info");
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium truncate"
              >
                👤 Citizen
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentUser(MOCK_ROLES[4].defaultUser); // ASHA
                  setIsAuthOpen(false);
                  addNotification("Switched to ASHA Worker Profile", "info");
                }}
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-medium truncate"
              >
                🩺 ASHA Worker
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentUser(MOCK_ROLES[6].defaultUser); // Student
                  setIsAuthOpen(false);
                  addNotification("Switched to Student Innovator Profile", "info");
                }}
                className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-medium truncate"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentUser(MOCK_ROLES[8].defaultUser); // Industry
                  setIsAuthOpen(false);
                  addNotification("Switched to Industry Partner Profile", "info");
                }}
                className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-medium truncate"
              >
                🏭 Industry
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
