import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Keyboard,
  Camera,
  Upload,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Copy,
  ShieldCheck,
  Layers,
  Users,
  Volume2,
  Compass,
  FileCheck,
  Video,
  X,
  UserCheck,
  User,
  Building,
  FileText,
  File
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveOffline, syncOfflineReports } from '../utils/offlineStorage';

// Problem Domains for Selection
const PROBLEM_DOMAINS = [
  "Water & Sanitation",
  "Agriculture & Storage",
  "Roads & Public Infrastructure",
  "Healthcare & Medical",
  "Clean Energy & Power",
  "Wildlife & Forest Safety",
  "Education & Digital Infrastructure",
  "Waste Management",
  "Transport & Connectivity",
  "Other (AI will analyze)"
];

export const SubmitProblem = ({ setActivePage, setSelectedProblemId }) => {
  const { currentUser, addProblem, problems, reportDuplicate, t } = useApp();

  // Mode: 'voice' | 'typing'
  const [submissionMode, setSubmissionMode] = useState('voice');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [hasRecordedVoice, setHasRecordedVoice] = useState(false);

  // Who is facing the problem: 'Self' | 'Other'
  const [reportedFor, setReportedFor] = useState('Self');
  const [otherPersonName, setOtherPersonName] = useState('');
  const [otherPersonPhone, setOtherPersonPhone] = useState('');

  // Form Fields (NO MANUAL CATEGORY - AI AUTO-CATEGORIZES!)
  const [title, setTitle] = useState('');
  const [urgency, setUrgency] = useState('High');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Purulia Block-IV, West Bengal');
  const [coordinates, setCoordinates] = useState({ lat: 23.3321, lng: 86.3652 });
  const [affectedPeople, setAffectedPeople] = useState(500);
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80');
  const [videoUrl, setVideoUrl] = useState('');
  const [locationError, setLocationError] = useState('');

  // NEW: Document Upload (Task 3)
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  // NEW: Problem Domain Selection (Task 4)
  const [selectedDomain, setSelectedDomain] = useState('');
  const [aiDomainConfirmation, setAiDomainConfirmation] = useState(null);

  // AI Analysis Step
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [showConfirmationStep, setShowConfirmationStep] = useState(false);
  const [extractedMetadata, setExtractedMetadata] = useState(null);

  // Duplicate Alert
  const [duplicateMatch, setDuplicateMatch] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  // Location Selector
  const [locationMode, setLocationMode] = useState('gps');
  const [hasLiveLocation, setHasLiveLocation] = useState(false);

  // NEW: Offline Status (Task 5)
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      const synced = await syncOfflineReports(addProblem);
      if (synced.length) {
        alert(`${synced.length} offline report${synced.length > 1 ? 's' : ''} synced successfully.`);
      }
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addProblem]);

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedDocuments(prev => [...prev, {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result
        }]);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const readPhotoFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const requestLiveLocation = () => {
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationMode('manual');
      setLocationError('Live location is not available on this device. Please enter the problem location below.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setHasLiveLocation(true);
        setCoordinates({ lat: coords.latitude, lng: coords.longitude });
        setLocationName(`Live GPS: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
      },
      () => {
        setLocationMode('manual');
        setLocationError('Live location was not shared. Please enter the problem location below.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  // Submitted Success State
  const [createdProblem, setCreatedProblem] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const isInstitutionalSubmitter = [
    'community_group',
    'panchayati_raj',
    'urban_local_body',
    'asha_worker',
    'anganwadi_worker',
    'rozgar_sevak',
    'pragya_kendra',
    'govt_department',
    'govt_department_demand'
  ].includes(currentUser.role);

  // Recording Timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle Voice Recording Toggle
  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setVoiceTranscript('');
      setHasRecordedVoice(false);
    } else {
      setIsRecording(false);
      setHasRecordedVoice(true);
      
      const simulatedTranscript = "Hamare gaon ke primary school aur aaspas ke 4 mohalle mein handpump ka paani peene se bachhon ke daant peele ho rahe hain aur jodon mein dard ho raha hai. Paani mein fluoride zyada hai aur filtration ka koi intezam nahi hai. Lagbhag 2500 log prabhavit hain.";
      setVoiceTranscript(simulatedTranscript);
      
      setTitle("Severe Fluoride Contamination & Dental Fluorosis in Community Water Sources");
      setUrgency("Critical");
      setDescription(simulatedTranscript + " Urgent requirement for low-cost solar-powered community defluoridation filter.");
      setAffectedPeople(2400);
    }
  };

  // Run AI Analysis & Auto-Categorization
  const handleAnalyzeAndReview = () => {
    if (!title && !voiceTranscript && !description) {
      alert("Please provide problem details either through voice recording or typing.");
      return;
    }

    if (reportedFor === 'Other' && !otherPersonName.trim()) {
      alert("Please enter the name of the affected person, Gram Panchayat, or ward community you are reporting on behalf of.");
      return;
    }

    setIsAiAnalyzing(true);

    setTimeout(() => {
      // Check for duplicates
      const existingMatch = problems.find(p => 
        p.title.toLowerCase().includes('water') || 
        p.title.toLowerCase().includes('fluoride') || 
        p.title.toLowerCase().includes('road') ||
        p.title.toLowerCase().includes('storage')
      );

      if (existingMatch && !createdProblem) {
        setDuplicateMatch(existingMatch);
        setShowDuplicateModal(true);
      }

      // AI Automatically extracts category based on keywords
      const combined = `${title} ${description} ${voiceTranscript}`.toLowerCase();
      let autoCat = "Water & Sanitation";
      let autoDomain = "Chemical & Membrane Engineering / Rural Hydrology";

      if (combined.includes('road') || combined.includes('pothole') || combined.includes('highway') || combined.includes('gaddha') || combined.includes('bridge')) {
        autoCat = "Roads & Public Infrastructure";
        autoDomain = "Civil Infrastructure & Materials Engineering";
      } else if (combined.includes('cold') || combined.includes('storage') || combined.includes('crop') || combined.includes('onion') || combined.includes('tomato') || combined.includes('farmer')) {
        autoCat = "Agriculture & Storage";
        autoDomain = "Thermodynamics & AgTech Robotics";
      } else if (combined.includes('health') || combined.includes('hospital') || combined.includes('anemia') || combined.includes('maternal') || combined.includes('doctor')) {
        autoCat = "Healthcare & Anganwadi";
        autoDomain = "Biomedical Instrumentation & Telemedicine";
      } else if (combined.includes('electric') || combined.includes('power') || combined.includes('solar') || combined.includes('school') || combined.includes('bijli')) {
        autoCat = "Clean Energy & Education";
        autoDomain = "Renewable Energy & Battery Storage";
      }

      const meta = {
        detectedTitle: title || "High Fluoride & Heavy Metal Contamination in Community Wells",
        autoCategory: autoCat,
        domain: selectedDomain || autoDomain,
        keyTechnologies: ["Activated Alumina Nano-Membrane", "Solar DC Pumping", "IoT Water Quality Sensor"],
        extractedLocation: locationName,
        severityLevel: urgency,
        estimatedBeneficiaries: affectedPeople,
        reportedBeneficiary: reportedFor === 'Self' ? `${currentUser.name} (Self)` : `${otherPersonName} (Community / On Behalf)`,
        matchedInstitutions: [
          { name: "IIT Kharagpur (Water Resources)", score: "98% Match" },
          { name: "NIT Durgapur (Env Engineering)", score: "92% Match" }
        ]
      };

      setExtractedMetadata(meta);
      setIsAiAnalyzing(false);
      setShowConfirmationStep(true);
    }, 1500);
  };

  // Confirm and Final Submit
  const handleFinalSubmit = () => {
    const reportData = {
      title: extractedMetadata?.detectedTitle || title,
      urgency,
      description: description || voiceTranscript,
      audioTranscript: voiceTranscript || null,
      location: locationName,
      coordinates,
      affectedPeople,
      imageUrl: imagePreview,
      duplicateCount: 1,
      reportedFor,
      beneficiaryDetails: reportedFor === 'Other' ? { name: otherPersonName, phone: otherPersonPhone } : null,
      selectedDomain,
      uploadedDocuments,
      videoUrl
    };

    if (!isOnline) {
      saveOffline(reportData)
        .then(() => {
          const offlineProblem = {
            id: `OFFLINE-${Date.now()}`,
            title: reportData.title,
            category: selectedDomain || 'Pending AI categorization',
            reportedFor,
            beneficiaryDetails: reportData.beneficiaryDetails,
            aiAnalysis: { domain: selectedDomain || 'Pending AI confirmation' }
          };
          setCreatedProblem(offlineProblem);
          setShowConfirmationStep(false);
          alert('Internet is unavailable. Your report has been saved securely on this device and will sync when you reconnect.');
        })
        .catch(() => alert('The report could not be saved offline. Please keep this page open and try again.'));
      return;
    }

    const finalProblem = addProblem(reportData);

    setCreatedProblem(finalProblem);
    setShowConfirmationStep(false);

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
  };

  // Merge Duplicate Action
  const handleMergeDuplicate = () => {
    if (duplicateMatch) {
      reportDuplicate(duplicateMatch.id);
      setSelectedProblemId(duplicateMatch.id);
      setShowDuplicateModal(false);
      setActivePage('track-problem');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>Multi-Modal AI Ground Problem Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Report a Community Challenge
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Speak in your language, click live photos, or type details. ECHELON AI will <strong className="text-orange-700">categorize the problem automatically</strong> and dispatch it to student innovators.
        </p>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold ${
          isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          {isOnline ? 'Online: reports sync normally' : 'Offline: this report will be saved on your device'}
        </div>

        {isInstitutionalSubmitter && (
          <div className="mt-2 p-3 bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200 rounded-2xl inline-flex items-center gap-2.5 text-xs text-slate-800 font-semibold shadow-xs">
            <Building className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              Official Mode Active: <strong>{currentUser.roleLabel}</strong> ({currentUser.name})
            </span>
          </div>
        )}
      </div>

      {/* SUCCESS CONFIRMATION SCREEN */}
      {createdProblem ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="font-extrabold text-2xl text-slate-900">
              Problem Registered & Auto-Categorized!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your issue has been assigned an official Tracking ID and routed to matched research labs.
            </p>
          </div>

          {/* Tracking ID Badge */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400">Issue Tracking ID</span>
              <p className="text-lg font-mono font-black text-indigo-600 tracking-wider">
                {createdProblem.id}
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(createdProblem.id);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isCopied ? 'Copied!' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Problem Summary */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 max-w-xl mx-auto text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Problem Title:</span>
              <span className="font-bold text-slate-900">{createdProblem.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">AI Auto-Detected Category:</span>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {createdProblem.category}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Beneficiary / Affected:</span>
              <span className="font-bold text-slate-900">
                {createdProblem.reportedFor === 'Self' ? 'Self / Own Household' : `${createdProblem.beneficiaryDetails?.name} (On Behalf)`}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Top Matched Institution:</span>
              <span className="font-bold text-slate-900">{createdProblem.aiAnalysis?.matchedUniversities[0]?.name}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setSelectedProblemId(createdProblem.id);
                setActivePage('track-problem');
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Track Problem Lifecycle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCreatedProblem(null);
                setShowConfirmationStep(false);
                setTitle('');
                setDescription('');
                setVoiceTranscript('');
                setOtherPersonName('');
              }}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              Submit Another Problem
            </button>
          </div>
        </div>
      ) : !showConfirmationStep ? (
        
        /* MAIN SUBMISSION FORM */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          
          {/* Mode Selector Tabs: Voice vs Typing */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setSubmissionMode('voice')}
              className={`py-4 px-6 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                submissionMode === 'voice'
                  ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Option 1: Speak Your Problem (Voice AI)</span>
            </button>
            <button
              onClick={() => setSubmissionMode('typing')}
              className={`py-4 px-6 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                submissionMode === 'typing'
                  ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Keyboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Option 2: Type Details & Video</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* QUESTION: WHO IS FACING THIS PROBLEM? */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t('reportingFor')} *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setReportedFor('Self')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                    reportedFor === 'Self'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>{t('reportingSelf')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReportedFor('Other')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                    reportedFor === 'Other'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>{t('reportingOther')}</span>
                </button>
              </div>

              {/* Conditional Inputs */}
              {reportedFor === 'Other' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      {t('otherPersonName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rameshwar Murmu / Ward #4 Residents"
                      value={otherPersonName}
                      onChange={(e) => setOtherPersonName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      {t('otherPersonPhone')}
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 98765 00000"
                      value={otherPersonPhone}
                      onChange={(e) => setOtherPersonPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* AI AUTO-CATEGORIZATION BADGE */}
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex items-center gap-2.5 text-xs text-indigo-950">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <strong className="block font-bold">{t('aiAutoCategory')}</strong>
                <span className="text-[11px] text-indigo-800">{t('aiCategoryDesc')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Problem Domain
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a broad domain (AI will confirm from the title)</option>
                    {PROBLEM_DOMAINS.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">The title and description remain the final source for AI confirmation.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Supporting Document (Optional)
                  </label>
                  <input
                    id="problem-document-input"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleDocumentUpload}
                    className="w-full text-xs text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-indigo-700"
                  />
                  {uploadedDocuments.length > 0 && (
                    <div className="mt-1 text-[10px] text-emerald-700 font-semibold">
                      {uploadedDocuments.length} document{uploadedDocuments.length > 1 ? 's' : ''} attached
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VOICE MODE INTERFACE */}
            {submissionMode === 'voice' && (
              <div className="space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/40 border border-indigo-100 text-center space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-indigo-950">
                      Voice Recording Studio
                    </h3>
                    <p className="text-xs text-indigo-800 max-w-md mx-auto">
                      Click the microphone to speak in Hindi, Bengali, Marathi, or English. Describe what is broken, where it is located, and how many people are suffering.
                    </p>
                  </div>

                  {/* Microphone Button with Waveform */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={handleToggleVoice}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                        isRecording
                          ? 'bg-red-600 animate-pulse scale-110 shadow-red-500/40 ring-8 ring-red-100'
                          : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-indigo-500/20'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-8 h-8 sm:w-10 sm:h-10" /> : <Mic className="w-8 h-8 sm:w-10 sm:h-10" />}
                    </button>

                    <div className="mt-3">
                      {isRecording ? (
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-600 font-mono">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                          <span>Recording in progress: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium">
                          {hasRecordedVoice ? "Click again to re-record" : "Tap microphone to start speaking"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Waveform */}
                  {isRecording && (
                    <div className="flex items-center justify-center gap-1.5 h-10 max-w-xs mx-auto">
                      {[40, 70, 90, 30, 80, 100, 60, 40, 90, 75, 50, 85, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-indigo-600 rounded-full animate-waveform"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${(i * 0.1).toFixed(1)}s`
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Transcript Preview */}
                  {voiceTranscript && (
                    <div className="bg-white p-4 rounded-2xl border border-indigo-200 text-left space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Volume2 className="w-3.5 h-3.5" /> AI Speech-to-Text Transcription</span>
                        <span className="text-emerald-600 font-bold">100% Recognized</span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{voiceTranscript}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TYPING MODE INTERFACE */}
            {submissionMode === 'typing' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Problem Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Broken drainage causing seasonal waterlogging and health hazards"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Urgency / Severity Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  >
                    <option value="Critical">Critical (Immediate Hazard)</option>
                    <option value="High">High (Impacting Daily Life)</option>
                    <option value="Medium">Medium (Chronic Inefficiency)</option>
                    <option value="Low">Low (Long-term Improvement)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Detailed Problem Description *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe what happens, when it started, how many households suffer, and what technical solution is needed..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Optional Video Demo Link
                  </label>
                  <div className="relative">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      placeholder="e.g. YouTube / Drive link showing problem site video"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* INSTITUTIONAL SURVEY METRICS (PRI, ULB, GOVT) */}
            {isInstitutionalSubmitter && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>Institutional Field Metrics:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Estimated Citizens / Households Affected
                    </label>
                    <input
                      type="number"
                      value={affectedPeople}
                      onChange={(e) => setAffectedPeople(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Gram Panchayat / Ward / Zone
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ward #4, Tola Purab"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SITE IMAGE UPLOAD (LIVE CAMERA OR GALLERY FILE) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upload Problem Site Photo (Camera / Gallery / Files)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1 h-40 rounded-2xl overflow-hidden border border-orange-200 bg-slate-100 relative group shadow-xs">
                  <img
                    src={imagePreview}
                    alt="Problem Site Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-bold bg-black/60 px-2.5 py-1 rounded-lg">Photo Attached</span>
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col justify-between p-4 rounded-2xl border-2 border-dashed border-orange-300 hover:border-orange-400 bg-orange-50/40 text-center space-y-3">
                  <div className="space-y-1">
                    <Upload className="w-5 h-5 text-orange-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-800">
                      Attach Photo from Gallery, Live Camera, or Device
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Our Vision AI will analyze infrastructure & environmental damage from the photo.
                    </p>
                  </div>
                  
                  {/* Camera input uses the device camera when available. */}
                  <input
                    type="file"
                    id="camera-file-input"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => readPhotoFile(e.target.files?.[0])}
                    className="hidden"
                  />

                  {/* Gallery input lets reporters attach an existing photo. */}
                  <input
                    type="file"
                    id="gallery-file-input"
                    accept="image/*"
                    onChange={(e) => readPhotoFile(e.target.files?.[0])}
                    className="hidden"
                  />

                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('camera-file-input')?.click()}
                      className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Take Live Photo</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => document.getElementById('gallery-file-input')?.click()}
                      className="px-3 py-1.5 rounded-xl bg-white border border-orange-300 text-orange-950 text-xs font-bold flex items-center gap-1.5 hover:bg-orange-50 transition shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-orange-600" />
                      <span>Upload from Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImagePreview("https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80")}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold hover:bg-slate-200 transition"
                    >
                      Sample Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GEOLOCATION: LIVE GPS OR MANUAL INPUT */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Problem Site Location
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLocationMode('gps');
                    requestLiveLocation();
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    locationMode === 'gps'
                      ? 'bg-orange-100 text-orange-950 border-orange-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-4 h-4 text-orange-600" />
                  <span>Use Live GPS Location</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocationMode('manual')}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    locationMode === 'manual'
                      ? 'bg-orange-100 text-orange-950 border-orange-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span>Enter Location Manually</span>
                </button>
              </div>

              {/* MODE 1: LIVE GPS PREVIEW */}
              {locationMode === 'gps' && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">{locationName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Latitude: {coordinates.lat}° N, Longitude: {coordinates.lng}° E</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    hasLiveLocation
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {hasLiveLocation ? 'GPS Location Shared' : 'Share GPS or enter manually'}
                  </span>
                </div>
              )}

              {locationError && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                  {locationError}
                </div>
              )}

              {/* MODE 2: MANUAL LOCATION INPUT FOR THOSE NOT TAKING LIVE LOCATION */}
              {locationMode === 'manual' && (
                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-900">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>Enter Village, Ward & District Details Manually:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">State & District *</label>
                      <input
                        type="text"
                        placeholder="e.g. Jharkhand, Ranchi / West Bengal, Purulia"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">Block / Municipality / Zone *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ormanjhi Block / Ward #12"
                        onChange={(e) => setLocationName(prev => `${prev.split(' • ')[0]} • ${e.target.value}`)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">Village / Gram Panchayat / Street Landmark *</label>
                      <input
                        type="text"
                        placeholder="e.g. Near Upper Primary School Handpump, Tola Purab"
                        onChange={(e) => setLocationName(prev => `${e.target.value}, ${prev.split(' • ')[0]}`)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAnalyzeAndReview}
                disabled={isAiAnalyzing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAiAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>AI Agent Analyzing & Auto-Categorizing Ground Problem...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Triage & Review Problem Metadata</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      ) : (
        
        /* CONFIRMATION DOSSIER */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Step 2 of 2: AI Verification</span>
              <h3 className="font-extrabold text-xl text-slate-900">
                Confirm AI Synthesized Problem Dossier
              </h3>
              <p className="text-xs text-slate-500">
                Please verify if our NLP model extracted your ground requirements and auto-assigned category correctly before publishing.
              </p>
            </div>
            <button
              onClick={() => setShowConfirmationStep(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* AI Metadata Grid */}
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  AI Auto-Detected Category: <strong className="text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">{extractedMetadata?.autoCategory}</strong>
                </span>
                <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  Severity: {extractedMetadata?.severityLevel}
                </span>
              </div>
              <h4 className="font-bold text-base text-slate-900">
                {extractedMetadata?.detectedTitle}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {description || voiceTranscript}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Identified Engineering Domain</span>
                <p className="font-extrabold text-indigo-700 text-sm">{extractedMetadata?.domain}</p>
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">Recommended Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {extractedMetadata?.keyTechnologies?.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Beneficiary & University Match</span>
                <div className="space-y-1.5 pt-1">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 text-[10px] block">Reported Beneficiary:</span>
                    <span className="font-bold text-slate-900">{extractedMetadata?.reportedBeneficiary}</span>
                  </div>
                  {extractedMetadata?.matchedInstitutions?.map((inst, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800">{inst.name}</span>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        {inst.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Problem Location: <strong>{locationName}</strong></span>
              </div>
              <span>Estimated Impact: <strong className="text-slate-900">{affectedPeople} Citizens</strong></span>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setShowConfirmationStep(false)}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Back / Make Corrections
            </button>
            <button
              onClick={handleFinalSubmit}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Generate Issue Tracking ID</span>
            </button>
          </div>

        </div>
      )}

      {/* DUPLICATE DETECTION MODAL */}
      {showDuplicateModal && duplicateMatch && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Similar Nearby Problem Detected!
                </h3>
                <p className="text-xs text-slate-500">
                  ECHELON AI found a matching issue within 500m of your location.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-slate-500">
                <span>Existing ID: {duplicateMatch.id}</span>
                <span>Current Merged Count: {duplicateMatch.duplicateCount}</span>
              </div>
              <h4 className="font-bold text-slate-900">{duplicateMatch.title}</h4>
              <p className="text-slate-600 line-clamp-2">{duplicateMatch.description}</p>
            </div>

            <p className="text-xs text-slate-600">
              Instead of creating a duplicate ticket, you can merge your report to increment this issue's priority count (<strong>+{duplicateMatch.duplicateCount + 1}</strong>) and accelerate government sanction!
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleMergeDuplicate}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Merge & Upvote Priority (+1 Count)
              </button>
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Submit as Separate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
