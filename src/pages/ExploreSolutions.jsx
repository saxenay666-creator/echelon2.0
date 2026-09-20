import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  Users, 
  ExternalLink, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  X, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  FileCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const ExploreSolutions = ({ setActivePage, setSelectedProblemId }) => {
  const { problems, currentUser, adoptSolutionByIndustry } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Adopting Solution Modal
  const [adoptingProblem, setAdoptingProblem] = useState(null);
  const [adoptForm, setAdoptForm] = useState({
    productName: '',
    companyName: currentUser.company || 'Tata Innovations & Danfoss India',
    manufacturingCost: '₹32,000 / unit',
    internshipStipend: '₹35,000 / month',
    sprintDurationWeeks: 6,
    csrFundSanction: '₹12,00,000'
  });

  // Solutions List (problems that have a solution submitted)
  const solutionsList = problems.filter((p) => p.solution !== null);

  const categories = [
    'All',
    'Water & Sanitation',
    'Agriculture & Storage',
    'Roads & Public Infrastructure',
    'Healthcare & Anganwadi',
    'Clean Energy & Education',
    'Smart Agriculture & Wildlife Safety'
  ];

  const filteredSolutions = solutionsList.filter((p) => {
    const matchSearch = p.solution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solution.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solution.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    if (!adoptingProblem) return;

    adoptSolutionByIndustry(adoptingProblem.id, {
      productName: adoptForm.productName || `${adoptingProblem.solution.title} Commercial Unit`,
      companyName: adoptForm.companyName,
      manufacturingCost: adoptForm.manufacturingCost
    });

    setAdoptingProblem(null);
    setSelectedProblemId(adoptingProblem.id);
    setActivePage('track-problem');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-3 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold mb-2">
              <Building2 className="w-4 h-4 text-cyan-700" />
              <span>Corporate R&D & Product Scaling Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Academic Prototypes & Solutions
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Industry leaders evaluate basic prototypes on feasibility, unit economics, and impact. Adopt solutions to create co-innovation project teams and sponsor student internships.
            </p>
          </div>

          <button
            onClick={() => setActivePage('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-cyan-800 hover:bg-cyan-900 text-white font-bold text-xs shadow-sm transition-all self-start md:self-auto flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>My Active Project Teams</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search prototype by name, student, university, or problem domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-cyan-700 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>Showing {filteredSolutions.length} Validated University Prototypes</span>
          <span>Benchmarked with Technology Readiness Level (TRL) 4–8</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSolutions.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Banner in Soft Gradient */}
                <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/30">
                      TRL Level {p.solution.trlLevel}
                    </span>
                    <span className="font-mono text-slate-300">Problem #{p.id}</span>
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {p.solution.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>Developed by <strong>{p.solution.studentName}</strong> • {p.solution.university}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 text-xs">
                  {/* Linked Problem Context */}
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
                    <span className="font-extrabold text-amber-800 text-[10px] uppercase tracking-wide">Original Ground Problem</span>
                    <p className="font-extrabold text-slate-950 leading-snug">{p.title}</p>
                    <p className="text-slate-700 text-[11px]">{p.location} • {p.affectedPeople} Citizens Impacted</p>
                  </div>

                  {/* Prototype Photo & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={p.solution.prototypePhoto}
                        alt="Prototype Hardware"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <span className="font-bold text-slate-700 block">Technical Concept:</span>
                      <p className="text-slate-600 leading-relaxed line-clamp-4">
                        {p.solution.description}
                      </p>
                    </div>
                  </div>

                  {/* Feasibility & Economics Matrix */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100">
                      <span className="text-[10px] text-teal-800 font-medium block">Feasibility Index</span>
                      <span className="text-base font-extrabold text-teal-700">{p.solution.feasibilityScore}%</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
                      <span className="text-[10px] text-indigo-800 font-medium block">Prototype Type</span>
                      <span className="text-xs font-extrabold text-indigo-700 block mt-1 truncate">{p.solution.prototypeType}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                      <span className="text-[10px] text-amber-800 font-medium block">Est. Unit Cost</span>
                      <span className="text-xs font-extrabold text-amber-700 block mt-1">{p.aiAnalysis?.estimatedCost || "₹30,000"}</span>
                    </div>
                  </div>

                  {/* Industry Scaling Status if already adopted */}
                  {p.industryProduct ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <div>
                        <span className="font-bold block">Adopted by {p.industryProduct.companyName}</span>
                        <span className="text-[11px] text-emerald-700">Project Team active • Product: {p.industryProduct.productName}</span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-md font-bold">Scaling Active</span>
                    </div>
                  ) : null}

                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProblemId(p.id);
                    setActivePage('track-problem');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Track Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {!p.industryProduct ? (
                  <button
                    onClick={() => {
                      setAdoptingProblem(p);
                      setAdoptForm(prev => ({
                        ...prev,
                        productName: `${p.solution.title} Commercial Unit`
                      }));
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Adopt & Form Project Team</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedProblemId(p.id);
                      setActivePage('track-problem');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>View Product Details</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* INDUSTRY ADOPTION & PROJECT TEAM CREATION MODAL */}
      {adoptingProblem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-teal-200 overflow-hidden">
            
            <div className="bg-gradient-to-r from-teal-700 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-6 h-6 text-teal-300" />
                <div>
                  <h3 className="font-extrabold text-base">Adopt Solution & Form Co-Innovation Team</h3>
                  <p className="text-[11px] text-teal-200">Converting {adoptingProblem.solution.title} into Deployable Product</p>
                </div>
              </div>
              <button
                onClick={() => setAdoptingProblem(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdoptSubmit} className="p-6 space-y-4 text-xs">
              
              {/* Student Intern Contract Notice */}
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-950 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    Student Innovator Internship Placement Agreement
                  </span>
                  <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-md font-bold">Auto-Enrolled</span>
                </div>
                <p className="text-teal-900 leading-relaxed">
                  Student <strong>{adoptingProblem.solution.studentName}</strong> ({adoptingProblem.solution.university}) will join your engineering team as a <strong>Research Intern</strong> with a sponsored stipend to co-develop the final mass-manufacturable unit.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Commercial Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={adoptForm.productName}
                  onChange={(e) => setAdoptForm({ ...adoptForm, productName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Industry / Corporate R&D Name
                  </label>
                  <input
                    type="text"
                    required
                    value={adoptForm.companyName}
                    onChange={(e) => setAdoptForm({ ...adoptForm, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Manufacturing Cost
                  </label>
                  <input
                    type="text"
                    value={adoptForm.manufacturingCost}
                    onChange={(e) => setAdoptForm({ ...adoptForm, manufacturingCost: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Monthly Stipend
                  </label>
                  <input
                    type="text"
                    value={adoptForm.internshipStipend}
                    onChange={(e) => setAdoptForm({ ...adoptForm, internshipStipend: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CSR / R&D Fund Sanctioned
                  </label>
                  <input
                    type="text"
                    value={adoptForm.csrFundSanction}
                    onChange={(e) => setAdoptForm({ ...adoptForm, csrFundSanction: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdoptingProblem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Initiate Project Team & Start Scaling</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
