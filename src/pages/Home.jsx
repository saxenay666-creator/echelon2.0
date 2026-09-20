import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Building2, 
  GraduationCap, 
  Users, 
  Zap, 
  Layers, 
  RotateCcw,
  Cpu,
  Compass,
  FileText,
  Activity,
  HeartPulse,
  Rocket,
  Factory,
  Landmark,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export const Home = ({ setActivePage, setSelectedProblemId }) => {
  const { problems, stats, setIsEmergencyOpen, currentUser } = useApp();

  const [trackSearchId, setTrackSearchId] = React.useState('');

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackSearchId.trim()) {
      setSelectedProblemId(trackSearchId.trim());
      setActivePage('track-problem');
    }
  };

  // Pastel light colors for charts
  const categoryData = [
    { name: 'Water & Sanitation', count: 3420, color: '#06b6d4' }, // cyan
    { name: 'Agriculture & Storage', count: 2980, color: '#f97316' }, // orange
    { name: 'Roads & Public Infra', count: 2650, color: '#fb7185' }, // rose
    { name: 'Healthcare & Anganwadi', count: 2310, color: '#10b981' }, // emerald
    { name: 'Clean Energy & Education', count: 1890, color: '#eab308' }, // amber
    { name: 'Wildlife & Safety', count: 1570, color: '#64748b' }, // slate
  ];

  const workflowSteps = [
    {
      num: "01",
      title: "Problem Submission",
      desc: "Citizens, Panchayati Raj Institutions, ULBs, and Govt field staff log ground challenges with Voice and Photos.",
      icon: <Users className="w-5 h-5 text-orange-600" />,
      bg: "bg-orange-50 border-orange-200"
    },
    {
      num: "02",
      title: "AI Analysis & Triage",
      desc: "NLP models extract engineering specs, assign severity scores, and match top university labs.",
      icon: <Cpu className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50 border-rose-200"
    },
    {
      num: "03",
      title: "Student Prototyping",
      desc: "Students and faculty build working hardware & firmware POCs with incubation lab support.",
      icon: <GraduationCap className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50 border-cyan-200"
    },
    {
      num: "04",
      title: "Industry Scaling",
      desc: "Corporates adopt prototypes, sponsor student interns, and manufacture certified deployable products.",
      icon: <Factory className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-200"
    },
    {
      num: "05",
      title: "Govt. Implementation",
      desc: "District authorities sanction budgets, verify compliance, and implement products at problem sites.",
      icon: <Landmark className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200"
    },
    {
      num: "06",
      title: "Citizen Feedback Loop",
      desc: "Ground beneficiaries rate the solution. If updates are needed, the innovation loop restarts.",
      icon: <RotateCcw className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="space-y-12 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 animate-fadeIn">
      
      {/* Hero Section in Light Pastel Theme */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF5ED] via-[#FFF0E6] to-[#EBFBFA] border border-orange-200/80 p-6 sm:p-12 shadow-md">
        
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-orange-200 text-xs font-extrabold text-orange-900 shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Academic R&D • Industrial Scaling • Government Deployment</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Turn Ground Problems into <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-cyan-600 bg-clip-text text-transparent">Scalable Products</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-2xl">
              ECHELON empowers students, research labs, industry partners, and government directorates to build real engineering prototypes and deploy them at problem sites.
            </p>
          </div>

          {/* Primary Action Buttons for Solution Providers (NO Submit Problem) */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActivePage('explore-problems')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>Explore Ground Challenges ({problems.length})</span>
            </button>

            <button
              onClick={() => setActivePage('explore-solutions')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-cyan-50 text-cyan-900 border-2 border-cyan-200 font-extrabold text-sm shadow-xs transition"
            >
              <Rocket className="w-4 h-4 text-cyan-600" />
              <span>Explore Solutions & TRL Levels</span>
            </button>

            <button
              onClick={() => setActivePage('how-it-works')}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 font-bold text-sm transition"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Quick Problem ID Search */}
          <div className="pt-2">
            <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={trackSearchId}
                  onChange={(e) => setTrackSearchId(e.target.value)}
                  placeholder="Enter Ticket ID (e.g. ECH-2026-8821)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 border border-orange-200 text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs shrink-0"
              >
                Track Live
              </button>
            </form>
          </div>

        </div>

      </section>

      {/* Live Impact Counters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-orange-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Reported Issues</span>
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats?.totalReported?.toLocaleString() || "14,820"}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% AI Triaged</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Student Prototypes</span>
            <GraduationCap className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats?.prototypesBuilt?.toLocaleString() || "4,120"}</p>
          <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded">240+ NIRF Labs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-cyan-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Industry Scaled</span>
            <Factory className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats?.industryAdopted?.toLocaleString() || "1,290"}</p>
          <span className="text-[10px] text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded">165+ Corporates</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Field Deployed</span>
            <Landmark className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats?.govtDeployed?.toLocaleString() || "860"}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">94.8% Verified</span>
        </div>

      </section>

      {/* 6-Stage Closed Loop Architecture */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Closed-Loop Innovation Framework</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The 6-Stage ECHELON Cycle
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            From grassroots problem logging to AI analysis, university R&D, corporate manufacturing, government implementation, and citizen feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((s, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-3xl bg-white border ${s.bg} shadow-xs hover:shadow-md transition-all space-y-3 relative group`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-xs font-black text-slate-400">{s.num}</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Breakdown & AI Triage Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Challenges by Civic Domain</h3>
            <span className="text-xs text-slate-500 font-bold">14,820 Active Demands</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#475569' }} width={130} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Innovation Hub Link */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF5ED] to-[#EBFBFA] border border-orange-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Innovation Rankings</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Check out the top engineering students, NIRF research universities, and corporate CSR partners scaling rural technologies.
            </p>
          </div>

          <button
            onClick={() => setActivePage('leaderboard')}
            className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 transition"
          >
            <span>Open Innovation Leaderboard</span>
            <ArrowRight className="w-4 h-4 text-orange-600" />
          </button>
        </div>

      </section>

    </div>
  );
};
