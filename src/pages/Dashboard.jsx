import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ArrowRight, 
  FileText, 
  Users, 
  CreditCard,
  Briefcase,
  Zap,
  Activity,
  PlusCircle,
  RotateCcw,
  Building
} from 'lucide-react';

export const Dashboard = ({ setActivePage, setSelectedProblemId }) => {
  const { currentUser, problems, isProblemSubmitter, isSolutionProvider } = useApp();

  const isSubmitter = isProblemSubmitter(currentUser.role);
  const isStudent = currentUser.role === 'student';
  const isUniversity = currentUser.role === 'university';
  const isIndustry = currentUser.role === 'industry';
  const isGovt = currentUser.role === 'government';

  // Gamification Tier Progress calculation
  const credits = currentUser.credits || 450;
  let nextTier = 'Silver';
  let nextThreshold = 500;
  let currentTier = 'Bronze';
  let progressPercent = (credits / nextThreshold) * 100;

  if (credits >= 5000) {
    currentTier = 'Diamond 👑';
    nextTier = 'National Laureate';
    nextThreshold = 10000;
    progressPercent = 100;
  } else if (credits >= 3000) {
    currentTier = 'Platinum 💎';
    nextTier = 'Diamond';
    nextThreshold = 5000;
    progressPercent = ((credits - 3000) / 2000) * 100;
  } else if (credits >= 1500) {
    currentTier = 'Gold 🥇';
    nextTier = 'Platinum';
    nextThreshold = 3000;
    progressPercent = ((credits - 1500) / 1500) * 100;
  } else if (credits >= 500) {
    currentTier = 'Silver 🥈';
    nextTier = 'Gold';
    nextThreshold = 1500;
    progressPercent = ((credits - 500) / 1000) * 100;
  } else {
    currentTier = 'Bronze 🥉';
    nextTier = 'Silver';
    nextThreshold = 500;
    progressPercent = (credits / 500) * 100;
  }

  // Filter problems relevant to this user
  const myProblems = problems.filter(p => 
    p.submittedBy?.toLowerCase().includes(currentUser.name.toLowerCase()) ||
    p.submitterRole?.toLowerCase() === currentUser.roleLabel.toLowerCase()
  );

  const activePrototypes = problems.filter(p => p.solution !== null);
  const adoptedProjects = problems.filter(p => p.industryProduct !== null);
  const deployedProjects = problems.filter(p => p.governmentDeployment !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 pt-4 animate-fadeIn">
      
      {/* Profile & Gamification Milestone Header in Pastel Peach Gradient */}
      <div className="bg-gradient-to-r from-[#FFF5ED] via-[#FFF0E6] to-[#FFEBE0] rounded-3xl p-6 sm:p-8 text-slate-900 shadow-md relative overflow-hidden border border-orange-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* User Profile Info */}
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-orange-300 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-orange-900 border border-orange-200 shadow-xs">
                  {currentUser.roleLabel}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {currentUser.officialId || currentUser.phone}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                {currentUser.name}
              </h1>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{currentUser.location || currentUser.university || currentUser.company || "National Civic Grid"}</span>
              </p>
            </div>
          </div>

          {/* Milestone Tier Progress Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-orange-200 max-w-md w-full space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block">Milestone Badge Tier</span>
                <span className="text-lg font-black text-orange-600">{currentTier}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block">Earned XP Credits</span>
                <span className="text-xl font-mono font-black text-slate-900">{credits} XP</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
                <span>Progress to {nextTier}</span>
                <span>{Math.min(100, Math.round(progressPercent))}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, progressPercent)}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* DYNAMIC ROLE METRIC TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isSubmitter ? (
          <>
            <div className="p-5 bg-white rounded-3xl border border-orange-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Reported Issues</span>
              <p className="text-2xl sm:text-3xl font-black text-orange-600 font-sans mt-1">
                {myProblems.length || 4}
              </p>
              <span className="text-[10px] text-slate-500 mt-1 block">Geo-tagged via Voice/Form</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-rose-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Merged Duplicates</span>
              <p className="text-2xl sm:text-3xl font-black text-rose-600 font-sans mt-1">12</p>
              <span className="text-[10px] text-slate-500 mt-1 block">+1 Priority aggregation</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Under Prototyping</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">3</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Assigned to IIT/NIT Labs</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Field Deployed</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans mt-1">2</p>
              <span className="text-[10px] text-slate-500 mt-1 block">5★ Citizen Feedback Closed</span>
            </div>
          </>
        ) : isStudent ? (
          <>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Prototypes Delivered</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">6</p>
              <span className="text-[10px] text-slate-500 mt-1 block">TRL 5-7 Hardware Models</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Industry Adoptions</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">4</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Adopted by Tata, Mahindra</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Internship Stipends</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans mt-1">₹1,40,000</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Active monthly stipend</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">National Ranking</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">Rank #1</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Top Student Innovator</span>
            </div>
          </>
        ) : isIndustry ? (
          <>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Adopted Projects</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">34</p>
              <span className="text-[10px] text-slate-500 mt-1 block">From IIT/NIT Academic Labs</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Student Interns Hired</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">48</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Co-Innovation Team Roster</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">CSR Capital Deployed</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans mt-1">₹4.8 Cr</p>
              <span className="text-[10px] text-slate-500 mt-1 block">100% Tax Deductible R&D</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Govt Procurements</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">28</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Direct Municipal Sanctions</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Jurisdiction Requisitions</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">54</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Across 50 Gram Panchayats</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Field Installations</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans mt-1">28</p>
              <span className="text-[10px] text-slate-500 mt-1 block">GIS Verified Deployments</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Sanctioned Budget</span>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-sans mt-1">₹35.8 Lakh</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Clean Water & Cold Storage</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-soft">
              <span className="text-xs font-bold text-slate-500 block">Citizen Approval</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans mt-1">96.4%</p>
              <span className="text-[10px] text-slate-500 mt-1 block">Verified Post-Audit</span>
            </div>
          </>
        )}
      </div>

      {/* DYNAMIC WORKSPACE SECTIONS */}

      {/* 1. PROBLEM SUBMITTER VIEW (Citizens, PRI, ULBs, Govt Demand) */}
      {isSubmitter && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                My Community Problem Reports
              </h3>
              <p className="text-xs text-slate-500">
                Track real-time engineering and government progress for issues submitted by you.
              </p>
            </div>
            <button
              onClick={() => setActivePage('submit-problem')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report New Issue</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProblemId(p.id);
                  setActivePage('track-problem');
                }}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft hover:border-indigo-500 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-indigo-600">{p.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    p.status === 'Implemented' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    p.status === 'Industry Scaling' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <span>Location: {p.location.split(',')[0]}</span>
                  <span className="font-bold text-indigo-600 flex items-center gap-1">
                    Track <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STUDENT & UNIVERSITY VIEW */}
      {(isStudent || isUniversity) && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Active Academic Prototypes & Corporate Scaling
              </h3>
              <p className="text-xs text-slate-500">
                Prototypes submitted by your lab being converted into commercial products.
              </p>
            </div>
            <button
              onClick={() => setActivePage('explore-problems')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Browse Matched Problems</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePrototypes.map((p) => (
              <div
                key={p.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Target #{p.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-[10px]">
                    TRL Level {p.solution?.trlLevel}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{p.solution?.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{p.solution?.description}</p>
                
                {p.industryProduct ? (
                  <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Adopted by {p.industryProduct.companyName}</span>
                      <span className="text-[11px] text-slate-600">Internship: {p.industryProduct.internAssigned}</span>
                    </div>
                    <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded">Active Team</span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                    Awaiting industry adoption
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. INDUSTRY WORKSPACE VIEW */}
      {isIndustry && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Corporate Co-Innovation Workspace & Project Teams
              </h3>
              <p className="text-xs text-slate-500">
                Active productization pipelines with enrolled university student interns.
              </p>
            </div>
            <button
              onClick={() => setActivePage('explore-solutions')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Adopt More Prototypes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adoptedProjects.map((p) => (
              <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {p.industryProduct?.productName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">#{p.id}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-500">Target Area: {p.location}</p>
                </div>

                {/* Team Roster */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-700 block text-[11px] uppercase">
                    Co-Innovation Project Team Roster:
                  </span>
                  <div className="space-y-1">
                    {p.industryProduct?.projectTeamMembers?.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-700">Cost: {p.industryProduct?.manufacturingCost}</span>
                  <button
                    onClick={() => {
                      setSelectedProblemId(p.id);
                      setActivePage('track-problem');
                    }}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Sprint Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. GOVERNMENT FIELD SANCTION VIEW */}
      {isGovt && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Government Procurement & Field Implementations
              </h3>
              <p className="text-xs text-slate-500">
                Pre-vetted industrial products implemented at ground sites with GIS telemetry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deployedProjects.map((p) => (
              <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Deployed & Verified
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">#{p.id}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-600">Product: {p.industryProduct?.productName}</p>
                </div>

                <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sanctioned Officer:</span>
                    <span className="font-bold text-slate-900">{p.governmentDeployment?.officerInCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Allocated Budget:</span>
                    <span className="font-bold text-emerald-800">{p.governmentDeployment?.sanctionBudget}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-emerald-700">GIS Status: Online</span>
                  <button
                    onClick={() => {
                      setSelectedProblemId(p.id);
                      setActivePage('track-problem');
                    }}
                    className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Feedback Loop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
