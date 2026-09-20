import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  X, 
  Upload, 
  Link2, 
  Cpu, 
  Layers, 
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ExploreProblems = ({ setActivePage, setSelectedProblemId }) => {
  const { problems, currentUser, submitSolution, reportDuplicate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Active Problem Document Modal
  const [activeDossierProblem, setActiveDossierProblem] = useState(null);

  // Propose Solution Modal
  const [proposingProblem, setProposingProblem] = useState(null);
  const [solutionForm, setSolutionForm] = useState({
    title: '',
    description: '',
    prototypeUrl: '',
    prototypeType: 'Hardware + Firmware POC',
    prototypePhoto: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    trlLevel: 6
  });

  const categories = [
    'All',
    'Water & Sanitation',
    'Agriculture & Storage',
    'Roads & Public Infrastructure',
    'Healthcare & Anganwadi',
    'Clean Energy & Education',
    'Smart Agriculture & Wildlife Safety'
  ];

  const filteredProblems = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchUrg = selectedUrgency === 'All' || p.urgency === selectedUrgency;
    const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchSearch && matchCat && matchUrg && matchStatus;
  });

  const handleProposeSolutionSubmit = (e) => {
    e.preventDefault();
    if (!solutionForm.title || !solutionForm.description) {
      alert("Please fill in the prototype title and detailed technical solution.");
      return;
    }

    submitSolution(proposingProblem.id, solutionForm);
    setProposingProblem(null);
    setActiveDossierProblem(null);
    setSolutionForm({
      title: '',
      description: '',
      prototypeUrl: '',
      prototypeType: 'Hardware + Firmware POC',
      prototypePhoto: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
      trlLevel: 6
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-3 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-xs font-bold mb-2">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>Academic R&D & Innovation Repository</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Ground Problems
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse AI-triaged civic challenges. Students & university labs can adopt problems and submit working prototypes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 font-bold text-xs">
              {filteredProblems.length} Active Challenges
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by keywords, ID (e.g. ECH-2026), location, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          {/* Quick Dropdown Filters */}
          <div className="flex gap-2">
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Urgencies</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Lifecycles</option>
              <option value="Submitted">Submitted</option>
              <option value="AI Analyzed">AI Analyzed (Open)</option>
              <option value="Prototyping">Prototyping</option>
              <option value="Industry Scaling">Industry Scaling</option>
              <option value="Implemented">Implemented</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>Showing {filteredProblems.length} Active Challenges</span>
          <span>Sorted by AI Relevance & Ground Severity</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={problem.implementedImageUrl || problem.imageUrl}
                    alt={problem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-slate-900 shadow-sm backdrop-blur-md">
                      {problem.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm ${
                      problem.urgency === 'Critical' ? 'bg-red-600' :
                      problem.urgency === 'High' ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      {problem.urgency}
                    </span>
                  </div>

                  {problem.duplicateCount > 1 && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                      {problem.duplicateCount} Citizen Reports Merged
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{problem.id}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {problem.location.split(',')[0]}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {problem.description}
                  </p>

                  {/* AI Tags */}
                  <div className="p-3 bg-gradient-to-r from-orange-50/70 to-rose-50/50 rounded-2xl border border-orange-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold text-orange-950 uppercase">
                      <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-orange-600" /> AI Matched Domain</span>
                      <span className="text-emerald-700 font-bold">{problem.aiAnalysis?.severityScore}/100 Severity</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {problem.aiAnalysis?.domain}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {problem.aiAnalysis?.keyTechnologies?.slice(0, 2).map((tech, i) => (
                        <span key={i} className="text-[10px] bg-white text-slate-700 px-2 py-0.5 rounded-md border border-orange-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveDossierProblem(problem)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Document</span>
                  </button>
                  
                  {/* Propose Solution Button */}
                  <button
                    onClick={() => {
                      setProposingProblem(problem);
                      setSolutionForm(prev => ({
                        ...prev,
                        title: `Prototype: ${problem.title.split(' ')[0]} Solution`
                      }));
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Propose Prototype</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL DETAILED PROBLEM DOSSIER MODAL */}
      {activeDossierProblem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-extrabold text-base font-mono">
                    OFFICIAL PROBLEM DOSSIER • {activeDossierProblem.id}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    National Civic Innovation Pipeline • Form 104-A
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDossierProblem(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              
              {/* Top Summary Banner */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px]">
                    {activeDossierProblem.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[11px]">
                    Urgency: {activeDossierProblem.urgency}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    Status: {activeDossierProblem.status}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {activeDossierProblem.title}
                </h2>
                <p className="text-slate-500 font-medium">
                  Reported by: <strong>{activeDossierProblem.submittedBy}</strong> on {activeDossierProblem.submissionDate}
                </p>
              </div>

              {/* Site Image & Audio Memo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-52">
                  <img
                    src={activeDossierProblem.imageUrl}
                    alt="Problem Site"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-bold text-[11px] text-slate-900 block uppercase">
                      Citizen Voice Transcript
                    </span>
                    <p className="italic text-slate-600 leading-relaxed">
                      "{activeDossierProblem.audioTranscript || "Voice memo analyzed: Problem involves severe waterlogging, community pathogen spread, and road blockages during monsoon."}"
                    </p>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                    <span>Location: <strong>{activeDossierProblem.location}</strong></span>
                    <span>Beneficiaries: <strong>{activeDossierProblem.affectedPeople}</strong></span>
                  </div>
                </div>
              </div>

              {/* Detailed Problem Description */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900">Ground Problem Statement</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {activeDossierProblem.description}
                </p>
              </div>

              {/* AI Engineering Analysis */}
              <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-extrabold text-sm text-indigo-950">
                    AI Agent Technical Specification & University Scoring
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="font-bold text-indigo-900 block text-[11px]">Target Engineering Domain:</span>
                    <p className="text-slate-800 font-semibold">{activeDossierProblem.aiAnalysis?.domain}</p>
                    
                    <span className="font-bold text-indigo-900 block text-[11px] pt-2">Recommended Key Technologies:</span>
                    <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                      {activeDossierProblem.aiAnalysis?.keyTechnologies?.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-indigo-900 block text-[11px]">Top Matched Universities:</span>
                    {activeDossierProblem.aiAnalysis?.matchedUniversities?.map((u, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-xl border border-indigo-100 flex items-center justify-between">
                        <span className="font-bold text-slate-800">{u.name}</span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {u.matchScore}% Match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Existing Solution Status if any */}
              {activeDossierProblem.solution && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="font-bold text-emerald-900 text-xs block">Active Prototype Proposed:</span>
                  <p className="font-bold text-slate-900 text-sm">{activeDossierProblem.solution.title}</p>
                  <p className="text-slate-600 text-xs">{activeDossierProblem.solution.description}</p>
                  <div className="flex gap-4 pt-1 text-[11px] text-emerald-800">
                    <span>By: <strong>{activeDossierProblem.solution.studentName} ({activeDossierProblem.solution.university})</strong></span>
                    <span>TRL Level: <strong>{activeDossierProblem.solution.trlLevel}</strong></span>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setActiveDossierProblem(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setProposingProblem(activeDossierProblem);
                  setActiveDossierProblem(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Propose Solution & Build Prototype</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PROPOSE SOLUTION MODAL */}
      {proposingProblem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden">
            
            <div className="bg-gradient-to-r from-indigo-600 to-violet-700 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-6 h-6" />
                <div>
                  <h3 className="font-extrabold text-base">Submit Solution & Prototype Proposal</h3>
                  <p className="text-[11px] text-indigo-100">Solving #{proposingProblem.id} • {proposingProblem.title}</p>
                </div>
              </div>
              <button
                onClick={() => setProposingProblem(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProposeSolutionSubmit} className="p-6 space-y-4 text-xs">
              
              <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-indigo-950 block">Innovator: {currentUser.name}</span>
                  <span className="text-indigo-700">{currentUser.university || "IIT Kharagpur"} • {currentUser.roleLabel}</span>
                </div>
                <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-md font-bold">+500 Academic XP</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Solution / Prototype Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar-powered Bio-nano Filtration Cartridge for Fluoride Removal"
                  value={solutionForm.title}
                  onChange={(e) => setSolutionForm({ ...solutionForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Prototype Type
                  </label>
                  <select
                    value={solutionForm.prototypeType}
                    onChange={(e) => setSolutionForm({ ...solutionForm, prototypeType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Hardware + Firmware POC">Hardware + Firmware POC</option>
                    <option value="Mechanical / CAD Blueprint">Mechanical / CAD Blueprint</option>
                    <option value="Mobile App & IoT Dashboard">Mobile App & IoT Dashboard</option>
                    <option value="Bio-chemical Formulation">Bio-chemical Formulation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Technology Readiness Level (TRL)
                  </label>
                  <select
                    value={solutionForm.trlLevel}
                    onChange={(e) => setSolutionForm({ ...solutionForm, trlLevel: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={4}>TRL 4 - Lab Validated Concept</option>
                    <option value={5}>TRL 5 - Component Validated in Field</option>
                    <option value={6}>TRL 6 - Working Prototype Ready</option>
                    <option value={7}>TRL 7 - Pilot Operational Model</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Technical Concept & Bill of Materials *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain how the prototype works, components used (microcontrollers, filters, solar specs), cost estimation, and testing results..."
                  value={solutionForm.description}
                  onChange={(e) => setSolutionForm({ ...solutionForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  GitHub Repo / CAD Schematics Link
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://github.com/my-lab/civic-prototype-schematics"
                    value={solutionForm.prototypeUrl}
                    onChange={(e) => setSolutionForm({ ...solutionForm, prototypeUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setProposingProblem(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Solution & Publish for Industry Review</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
