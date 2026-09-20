import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  Send, 
  ArrowRight, 
  ExternalLink, 
  AlertCircle,
  Users,
  Cpu,
  Layers,
  Award,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrackProblem = ({ selectedProblemId, setSelectedProblemId }) => {
  const { problems, submitCitizenFeedback, deployProductByGovt, currentUser } = useApp();

  const [inputTrackId, setInputTrackId] = useState(selectedProblemId || 'ECH-2026-8821');
  const [activeProblem, setActiveProblem] = useState(null);

  // Citizen Feedback Form
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Government Field Deploy Form (for govt role testing)
  const isGovtUser = currentUser.role === 'government';
  const [govtBudget, setGovtBudget] = useState('₹12,50,000 Sanctioned');

  useEffect(() => {
    if (selectedProblemId) {
      setInputTrackId(selectedProblemId);
      const found = problems.find(p => p.id === selectedProblemId);
      if (found) setActiveProblem(found);
    } else {
      const defaultProb = problems.find(p => p.id === 'ECH-2026-8821') || problems[0];
      if (defaultProb) {
        setActiveProblem(defaultProb);
        setInputTrackId(defaultProb.id);
      }
    }
  }, [selectedProblemId, problems]);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = inputTrackId.trim().toUpperCase();
    const found = problems.find(p => p.id.toUpperCase() === cleanId);
    if (found) {
      setActiveProblem(found);
      setSelectedProblemId(found.id);
      setFeedbackSuccess(false);
    } else {
      alert(`Problem ID "${inputTrackId}" not found. Please try a valid ID like ECH-2026-8821 or ECH-2026-7490.`);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!activeProblem) return;

    submitCitizenFeedback(activeProblem.id, {
      rating: feedbackRating,
      comment: feedbackComment || (feedbackRating >= 4 ? "Excellent implementation, completely solves our ground issue!" : "Needs further revision in solar battery backup duration.")
    });

    setFeedbackSuccess(true);
    if (feedbackRating >= 4) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      } catch (err) {}
    }
  };

  const handleGovtDeployClick = () => {
    if (!activeProblem) return;
    deployProductByGovt(activeProblem.id, {
      department: currentUser.department || "Ministry of Rural Water & Jal Shakti",
      sanctionBudget: govtBudget,
      location: activeProblem.location
    });
  };

  const timelineStages = [
    {
      stageNumber: 1,
      title: "Problem Submitted & Geo-tagged",
      subtitle: "Citizen / Field Worker Ingestion",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 0,
      icon: <MapPin className="w-4 h-4" />
    },
    {
      stageNumber: 2,
      title: "AI Triaged & University Routed",
      subtitle: "Technical Dossier Dispatched",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 1,
      icon: <Cpu className="w-4 h-4" />
    },
    {
      stageNumber: 3,
      title: "Student Prototype Developed",
      subtitle: "TRL-6 Hardware Benchmark",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 2,
      icon: <GraduationCap className="w-4 h-4" />
    },
    {
      stageNumber: 4,
      title: "Industry Scaled to Product",
      subtitle: "Student Intern & Corporate Team",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 3,
      icon: <Building2 className="w-4 h-4" />
    },
    {
      stageNumber: 5,
      title: "Government Field Deployed",
      subtitle: "District Implementation Sanctioned",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 4,
      icon: <ShieldCheck className="w-4 h-4" />
    },
    {
      stageNumber: 6,
      title: "Citizen Feedback Verified",
      subtitle: "Closed Loop or Iteration Cycle",
      isComplete: (activeProblem?.stageIndex ?? 0) >= 5,
      icon: <RotateCcw className="w-4 h-4" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* Header & Search */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-xs font-bold">
          <Search className="w-4 h-4 text-orange-600" />
          <span>Real-Time Civic Lifecycle Tracker</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Track Ground Problem Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Enter your Tracking ID to inspect the live AI triage, assigned university lab, industry manufacturing progress, and field deployment verification.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            placeholder="e.g. ECH-2026-8821"
            value={inputTrackId}
            onChange={(e) => setInputTrackId(e.target.value)}
            className="flex-1 bg-white border-2 border-orange-200 rounded-2xl px-4 py-3 text-sm text-slate-900 font-mono uppercase font-bold focus:outline-none focus:border-orange-500 shadow-xs"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-200 transition-all flex items-center gap-1.5"
          >
            <span>Track</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample IDs Pill Selector */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-400 font-medium">Quick Test IDs:</span>
          {problems.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setInputTrackId(p.id);
                setActiveProblem(p);
                setSelectedProblemId(p.id);
                setFeedbackSuccess(false);
              }}
              className={`px-2.5 py-1 rounded-xl border font-mono text-[11px] font-bold transition-all ${
                activeProblem?.id === p.id
                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50/50'
              }`}
            >
              {p.id} ({p.status})
            </button>
          ))}
        </div>
      </div>

      {activeProblem ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Problem Banner Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-950 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                    {activeProblem.id}
                  </span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {activeProblem.category}
                  </span>
                  <span className={`text-xs font-bold text-white px-2.5 py-0.5 rounded-full ${
                    activeProblem.urgency === 'Critical' ? 'bg-red-600' : 'bg-amber-600'
                  }`}>
                    {activeProblem.urgency} Urgency
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {activeProblem.title}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Reported by: <strong>{activeProblem.submittedBy}</strong></span>
                  <span>•</span>
                  <span>Location: <strong>{activeProblem.location}</strong></span>
                  <span>•</span>
                  <span>Beneficiaries: <strong>{activeProblem.affectedPeople} Citizens</strong></span>
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black tracking-wide ${
                  activeProblem.status === 'Implemented' ? 'bg-emerald-100 text-emerald-800' :
                  activeProblem.status === 'Industry Scaling' ? 'bg-teal-100 text-teal-800' :
                  activeProblem.status === 'Prototyping' ? 'bg-violet-100 text-violet-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {activeProblem.status.toUpperCase()}
                </span>
                {activeProblem.duplicateCount > 1 && (
                  <p className="text-[10px] text-amber-600 font-bold mt-1">
                    Merged ({activeProblem.duplicateCount} citizen reports)
                  </p>
                )}
              </div>
            </div>

            {/* Visual Stepper Timeline */}
            <div className="pt-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 text-center sm:text-left">
                Progress Stepper ({activeProblem.stageIndex + 1} of 6 Stages Completed)
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {timelineStages.map((stg) => (
                  <div
                    key={stg.stageNumber}
                    className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      stg.isComplete
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold">Step 0{stg.stageNumber}</span>
                      <div className={`p-1.5 rounded-full ${stg.isComplete ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {stg.isComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : stg.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs leading-tight mb-0.5">
                        {stg.title}
                      </h4>
                      <p className="text-[10px] opacity-80 leading-tight">
                        {stg.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Detailed Stage Deep Dives Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Box 1: Ground Problem & AI Triage Specs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  AI Triage & Engineering Specs
                </span>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md">
                  Stage 1 & 2
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeProblem.description}
                </p>
                <div className="space-y-1">
                  <span className="font-bold text-slate-600 block">Key Technologies Identified:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeProblem.aiAnalysis?.keyTechnologies?.map((t, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-1">
                  <span className="font-bold text-slate-600 block">Matched Academic Institutions:</span>
                  <div className="space-y-1 mt-1">
                    {activeProblem.aiAnalysis?.matchedUniversities?.map((u, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-800">{u.name}</span>
                        <span className="font-bold text-indigo-600">{u.matchScore}% Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Student Prototype & Industry Scaling */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-violet-600" />
                  Academic Prototype & Industry Product
                </span>
                <span className="text-[10px] bg-violet-50 text-violet-700 font-bold px-2 py-0.5 rounded-md">
                  Stage 3 & 4
                </span>
              </div>

              {activeProblem.solution ? (
                <div className="space-y-3">
                  <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-200 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-violet-900">
                      <span>PROTOTYPE: {activeProblem.solution.title}</span>
                      <span>TRL {activeProblem.solution.trlLevel}</span>
                    </div>
                    <p className="text-slate-700">{activeProblem.solution.description}</p>
                    <p className="text-[11px] text-violet-800 pt-1">
                      Built by: <strong>{activeProblem.solution.studentName}</strong> ({activeProblem.solution.university})
                    </p>
                  </div>

                  {/* Industry Product Info */}
                  {activeProblem.industryProduct ? (
                    <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-teal-900">
                        <span>COMMERCIAL PRODUCT: {activeProblem.industryProduct.productName}</span>
                        <span className="text-emerald-700">Scaling Active</span>
                      </div>
                      <p className="text-slate-700">
                        Company: <strong>{activeProblem.industryProduct.companyName}</strong> (Lead: {activeProblem.industryProduct.leadEngineer})
                      </p>
                      <p className="text-[11px] text-teal-800">
                        Intern Assigned: <strong>{activeProblem.industryProduct.internAssigned}</strong>
                      </p>
                      <div className="flex gap-2 pt-1 text-[10px] text-teal-900">
                        {activeProblem.industryProduct.certifications?.map((c, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded border border-teal-200 font-semibold">{c}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                      <p>Awaiting industry partner adoption to scale this prototype.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 text-slate-500">
                  <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
                  <p>Students and university research labs are currently reviewing this problem statement to design a working prototype.</p>
                </div>
              )}
            </div>

            {/* Box 3: Government Implementation & Field Sanction */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Government Field Implementation
                </span>
                <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md">
                  Stage 5
                </span>
              </div>

              {activeProblem.governmentDeployment ? (
                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 text-xs">Field Deployment Verified</span>
                      <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold">GIS Active</span>
                    </div>
                    <p className="text-slate-700">
                      Department: <strong>{activeProblem.governmentDeployment.department}</strong>
                    </p>
                    <p className="text-slate-700">
                      Officer in Charge: <strong>{activeProblem.governmentDeployment.officerInCharge}</strong>
                    </p>
                    <p className="text-slate-700">
                      Budget Sanctioned: <strong>{activeProblem.governmentDeployment.sanctionBudget}</strong>
                    </p>
                    <div>
                      <span className="font-bold text-slate-600 block mb-1">Installed Field Locations:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeProblem.governmentDeployment.installedSites?.map((s, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-[10px] text-emerald-900 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                  <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-slate-600">
                    Product under final pre-deployment testing. District government authorities will sanction field installation after compliance checks.
                  </p>
                  
                  {/* Government Role Action Trigger for Demo Testing */}
                  {isGovtUser && activeProblem.industryProduct && (
                    <button
                      onClick={handleGovtDeployClick}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Govt Admin: Sanction Budget & Deploy on Site
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Box 4: Citizen Feedback & Closed Loop Rating */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  Citizen Feedback & Accountability Loop
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                  Stage 6
                </span>
              </div>

              {/* Existing Citizen Reviews */}
              {activeProblem.citizenFeedback && activeProblem.citizenFeedback.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-500 text-[10px] uppercase">Recorded Ground Testimonials</span>
                  {activeProblem.citizenFeedback.map((fb) => (
                    <div key={fb.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">{fb.citizenName}</span>
                        <div className="flex text-amber-400">
                          {[...Array(fb.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="italic text-slate-600">"{fb.comment}"</p>
                      <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                        <span>{fb.date}</span>
                        <span className="text-emerald-600 font-bold">{fb.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feedback Form for User */}
              <form onSubmit={handleFeedbackSubmit} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 text-xs">Submit Your Ground Verification Rating</span>
                  <span className="text-[10px] text-emerald-700 font-medium">As: {currentUser.name}</span>
                </div>

                {/* Star rating selector */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${feedbackRating >= star ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {feedbackRating === 5 ? '5/5 (Completely Solved)' : `${feedbackRating}/5 Stars`}
                  </span>
                </div>

                <textarea
                  rows={2}
                  placeholder="Share how the deployed unit performs in your village..."
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">
                    {feedbackRating < 4 ? "⚠️ Rating < 4 restarts student & industry revision loop" : "✅ 5★ Closes the official issue ticket"}
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
};
