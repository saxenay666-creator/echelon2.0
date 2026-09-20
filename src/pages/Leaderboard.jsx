import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Trophy, 
  Medal, 
  GraduationCap, 
  Building2, 
  Users, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Flame,
  CheckCircle2,
  ChevronUp
} from 'lucide-react';

export const Leaderboard = () => {
  const { leaderboardData, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'universities' | 'industry' | 'grassroots'

  const tierColors = {
    Diamond: "bg-cyan-100 text-cyan-800 border-cyan-300",
    Platinum: "bg-purple-100 text-purple-800 border-purple-300",
    Gold: "bg-amber-100 text-amber-800 border-amber-300",
    Silver: "bg-slate-200 text-slate-800 border-slate-300",
    Bronze: "bg-orange-100 text-orange-800 border-orange-300"
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-sm text-xs">🥇 1</span>;
    if (rank === 2) return <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black flex items-center justify-center shadow-sm text-xs">🥈 2</span>;
    if (rank === 3) return <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-black flex items-center justify-center shadow-sm text-xs">🥉 3</span>;
    return <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs">#{rank}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>National Civic Innovation Honors & Gamification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          National Impact Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Recognizing the brightest student innovators, top research universities, active corporate R&D leaders, and dedicated grassroots field champions.
        </p>

        {/* Milestones explanation bar */}
        <div className="pt-2 flex justify-center items-center gap-2 flex-wrap text-[11px] font-semibold">
          <span className="text-slate-400">Milestone Tiers:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">🥉 Bronze (100+ XP)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 border border-slate-300">🥈 Silver (500+ XP)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">🥇 Gold (1,500+ XP)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300">💎 Platinum (3,000+ XP)</span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300">👑 Diamond (5,000+ XP)</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'students'
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student Innovators</span>
        </button>

        <button
          onClick={() => setActiveTab('universities')}
          className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'universities'
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>University Rankings</span>
        </button>

        <button
          onClick={() => setActiveTab('industry')}
          className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'industry'
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Industry Impact</span>
        </button>

        <button
          onClick={() => setActiveTab('grassroots')}
          className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'grassroots'
              ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Grassroots Champions</span>
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        
        {/* STUDENTS VIEW */}
        {activeTab === 'students' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Student Innovator</th>
                  <th className="py-4 px-6">University</th>
                  <th className="py-4 px-6 text-center">Prototypes</th>
                  <th className="py-4 px-6 text-center">Industry Adopted</th>
                  <th className="py-4 px-6">Internship Stipends</th>
                  <th className="py-4 px-6">Milestone Tier</th>
                  <th className="py-4 px-6 text-right">XP Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboardData.students.map((st) => (
                  <tr key={st.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold">{getRankBadge(st.rank)}</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                      {st.name}
                      {st.rank === 1 && <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">National Champ</span>}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">{st.university}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-900">{st.prototypes}</td>
                    <td className="py-4 px-6 text-center font-bold text-teal-600">{st.adopted}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">{st.stipendEarned}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${tierColors[st.tier]}`}>
                        {st.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-black text-indigo-600 text-sm">
                      {st.credits.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* UNIVERSITIES VIEW */}
        {activeTab === 'universities' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Academic Institution</th>
                  <th className="py-4 px-6 text-center">Active Prototypes</th>
                  <th className="py-4 px-6 text-center">Govt Products Deployed</th>
                  <th className="py-4 px-6">AI Match Velocity</th>
                  <th className="py-4 px-6">Milestone Tier</th>
                  <th className="py-4 px-6 text-right">Academic Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboardData.universities.map((un) => (
                  <tr key={un.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold">{getRankBadge(un.rank)}</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">{un.name}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-900">{un.activePrototypes}</td>
                    <td className="py-4 px-6 text-center font-bold text-emerald-600">{un.productsDeployed}</td>
                    <td className="py-4 px-6 font-bold text-indigo-600">{un.aiMatchRate}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${tierColors[un.tier]}`}>
                        {un.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-black text-indigo-600 text-sm">
                      {un.credits.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* INDUSTRY VIEW */}
        {activeTab === 'industry' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Corporate R&D Partner</th>
                  <th className="py-4 px-6 text-center">Projects Scaled</th>
                  <th className="py-4 px-6 text-center">Student Internships</th>
                  <th className="py-4 px-6">CSR Capital Deployed</th>
                  <th className="py-4 px-6">Tier</th>
                  <th className="py-4 px-6 text-right">CSR Impact Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboardData.industry.map((ind) => (
                  <tr key={ind.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold">{getRankBadge(ind.rank)}</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">{ind.name}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-900">{ind.projectsScaled}</td>
                    <td className="py-4 px-6 text-center font-bold text-teal-600">{ind.studentInternships}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">{ind.csrDeployed}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${tierColors[ind.tier]}`}>
                        {ind.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-black text-indigo-600 text-sm">
                      {ind.credits.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* GRASSROOTS VIEW */}
        {activeTab === 'grassroots' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Grassroots Frontline Champion</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6 text-center">Problems Reported</th>
                  <th className="py-4 px-6 text-center">Field Solved</th>
                  <th className="py-4 px-6">Milestone Tier</th>
                  <th className="py-4 px-6 text-right">Karma Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboardData.grassroots.map((gr) => (
                  <tr key={gr.rank} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold">{getRankBadge(gr.rank)}</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">{gr.name}</td>
                    <td className="py-4 px-6 font-medium text-slate-700">{gr.location}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-900">{gr.problemsReported}</td>
                    <td className="py-4 px-6 text-center font-bold text-emerald-600">{gr.resolved}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${tierColors[gr.tier]}`}>
                        {gr.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-black text-indigo-600 text-sm">
                      {gr.credits.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
