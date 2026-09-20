import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROBLEMS, MOCK_ROLES, STAKEHOLDER_GROUPS, LEADERBOARD_DATA, PLATFORM_STATS, INSTANT_AI_KNOWLEDGE_BASE } from '../data/mockData';
import { TRANSLATIONS } from '../translations/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language selection: 'en' | 'hi' | 'bn' | 'mr'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('echelon_lang') || 'en';
  });

  // Authentication gate state: starts false so visitors MUST see Login/Register first
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('echelon_auth') === 'true';
  });

  // Current active user profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('echelon_user');
    return saved ? JSON.parse(saved) : MOCK_ROLES[0].defaultUser;
  });

  // Problems database
  const [problems, setProblems] = useState(() => {
    const saved = localStorage.getItem('echelon_problems');
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  // Emergency SOS Modal
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [activeSOSAlert, setActiveSOSAlert] = useState(null);

  // AI Chatbot Modal
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: "msg-0",
      sender: "ai",
      text: "Namaste! I am ECHELON's AI Civic Triage Assistant. Need quick help with government schemes, certificates, or local helplines? Ask me right away! If you have a real ground challenge requiring engineering R&D, I'll guide you to our Problem Submission portal.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Government deployed JalRakshak Solar Unit in Purulia Block-IV!", time: "10m ago", read: false, type: "success" },
    { id: 2, text: "Tata Water Solutions adopted IIT Kharagpur's Defluoridation Prototype.", time: "1h ago", read: false, type: "info" },
    { id: 3, text: "COEP Pune proposed a solar cold-storage prototype for Nashik farmers.", time: "3h ago", read: false, type: "update" },
  ]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('echelon_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('echelon_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('echelon_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('echelon_problems', JSON.stringify(problems));
  }, [problems]);

  // Translation helper
  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  // Helper: Is this user a Problem Submitter (Demand Side)?
  // Individual, Community Group (NGO), Panchayati Raj Institutions, Urban Local Bodies, Government Departments
  const isProblemSubmitter = (role = currentUser?.role) => {
    return [
      'citizen',
      'community_group',
      'panchayati_raj',
      'urban_local_body',
      'asha_worker',
      'anganwadi_worker',
      'rozgar_sevak',
      'pragya_kendra',
      'govt_department',
      'govt_field'
    ].includes(role);
  };

  // Helper: Is this user a Solution Provider / Scaling Stakeholder (Supply Side)?
  // Students, Universities, Industry, Government Implementation
  const isSolutionProvider = (role = currentUser?.role) => {
    return ['student', 'university', 'industry', 'government'].includes(role);
  };

  // Switch role quickly (for previewing perspectives)
  const switchRole = (roleId) => {
    const roleConfig = MOCK_ROLES.find(r => r.id === roleId);
    if (roleConfig) {
      setCurrentUser(roleConfig.defaultUser);
      addNotification(`Switched active perspective to ${roleConfig.label}`);
    }
  };

  // Login (Name, Phone Number, Role or Matched Profile, OTP)
  const loginUser = (loginData) => {
    const existing = MOCK_ROLES.find(r => r.defaultUser.phone === loginData.phone || r.id === loginData.role);
    const roleConfig = existing || MOCK_ROLES[0];

    const profile = {
      name: loginData.name || roleConfig.defaultUser.name,
      role: loginData.role || (existing ? roleConfig.id : "citizen"),
      roleLabel: roleConfig.label,
      group: roleConfig.group,
      phone: loginData.phone,
      email: roleConfig.defaultUser.email || `${loginData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      location: roleConfig.defaultUser.location || "Ranchi Rural District, Jharkhand",
      officialId: roleConfig.defaultUser.officialId,
      subRole: loginData.subRole || roleConfig.defaultUser.subRole,
      university: roleConfig.defaultUser.university,
      company: roleConfig.defaultUser.company,
      department: roleConfig.defaultUser.department,
      credits: roleConfig.defaultUser.credits || 250,
      tier: roleConfig.defaultUser.tier || "Bronze",
      avatar: roleConfig.defaultUser.avatar
    };

    setCurrentUser(profile);
    setIsAuthenticated(true);
    addNotification(`Welcome ${profile.name}! Signed in as ${profile.roleLabel}.`, "success");
  };

  // Tailored Register (Captures specific details per role)
  const registerUser = (regData) => {
    const roleConfig = MOCK_ROLES.find(r => r.id === regData.role) || MOCK_ROLES[0];

    const newProfile = {
      name: regData.name,
      role: regData.role,
      roleLabel: roleConfig.label,
      group: roleConfig.group,
      subRole: regData.subRole,
      phone: regData.phone,
      email: regData.email || `${regData.name.toLowerCase().replace(/\s+/g, '')}@echelon.gov.in`,
      location: regData.jurisdiction || regData.location || "District Headquarters, Jharkhand",
      officialId: regData.officialId || `ID-${Math.floor(10000 + Math.random() * 90000)}`,
      
      // Academic fields
      university: regData.university || regData.organization,
      department: regData.department,
      degreeYear: regData.degreeYear,
      
      // Corporate fields
      company: regData.company || regData.organization,
      gstin: regData.gstin,
      
      // Institutional / PRI / ULB / Govt fields
      panchayatName: regData.panchayatName,
      municipalityName: regData.municipalityName,
      wardNo: regData.wardNo,
      govtDepartment: regData.govtDepartment,
      designation: regData.designation,
      jurisdiction: regData.jurisdiction,
      communityName: regData.communityName,
      communityType: regData.communityType,
      communityArea: regData.communityArea,
      
      credits: 250,
      tier: "Bronze",
      avatar: roleConfig.defaultUser.avatar
    };

    setCurrentUser(newProfile);
    setIsAuthenticated(true);
    addNotification(`Account created! Welcome to ECHELON as ${newProfile.roleLabel}.`, "success");
  };

  // Logout
  const logoutUser = () => {
    setIsAuthenticated(false);
    addNotification("Logged out from ECHELON.", "info");
  };

  // Add Notification
  const addNotification = (text, type = "info") => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just now",
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 15)]);
  };

  // AI Autonomous Categorization Engine
  const detectCategoryAndDomain = (text) => {
    const lower = (text || "").toLowerCase();
    
    if (lower.includes("fluoride") || lower.includes("water") || lower.includes("paani") || lower.includes("jal") || lower.includes("handpump") || lower.includes("filter") || lower.includes("drainage") || lower.includes("well") || lower.includes("drinking") || lower.includes("sewage")) {
      return {
        category: "Water & Sanitation",
        domain: "Chemical & Membrane Hydrology",
        keyTechnologies: ["Activated Alumina Nano-Membrane", "Solar DC Pumping", "IoT Water Quality Sensor (pH/Fluoride)", "Low-cost Adsorbent Cartridges"],
        skillsRequired: ["Membrane Chemistry", "IoT Telemetry", "Rural Water Supply Protocols"],
        matchedUniversities: [
          { name: "IIT Kharagpur (Dept. of Water Resources)", matchScore: 98, status: "Matching" },
          { name: "NIT Durgapur (Env Engineering Lab)", matchScore: 92, status: "Matching" },
          { name: "Jadavpur University", matchScore: 86, status: "Matching" }
        ]
      };
    } else if (lower.includes("cold storage") || lower.includes("kanda") || lower.includes("onion") || lower.includes("tomato") || lower.includes("tamatar") || lower.includes("crop") || lower.includes("khet") || lower.includes("farmer") || lower.includes("storage") || lower.includes("spoilage") || lower.includes("mandi") || lower.includes("grain")) {
      return {
        category: "Agriculture & Storage",
        domain: "Thermodynamics & AgTech Robotics",
        keyTechnologies: ["Phase Change Material (PCM) Thermal Storage", "Solar Peltier & Inverter Hybrid", "Micro-climate Humidity Regulator", "GSM Stock Monitoring"],
        skillsRequired: ["Refrigeration Design", "Solar PV Engineering", "Agricultural Produce Preservation"],
        matchedUniversities: [
          { name: "COEP Technological University Pune", matchScore: 97, status: "Matching" },
          { name: "IIT Bombay (Rural Tech Action Group)", matchScore: 95, status: "Matching" },
          { name: "VNIT Nagpur", matchScore: 88, status: "Matching" }
        ]
      };
    } else if (lower.includes("road") || lower.includes("pothole") || lower.includes("gaddha") || lower.includes("sadak") || lower.includes("highway") || lower.includes("bridge") || lower.includes("accident") || lower.includes("traffic") || lower.includes("culvert")) {
      return {
        category: "Roads & Public Infrastructure",
        domain: "Civil Infrastructure & Materials Engineering",
        keyTechnologies: ["Cold-Mix Geopolymer Recycled Plastic Asphalt", "Rapid In-situ Compaction Tooling", "Drone LiDAR Pothole Scanner", "Self-Glow Road Studs"],
        skillsRequired: ["Pavement Materials Engineering", "Geopolymer Chemistry", "Computer Vision / OpenCV"],
        matchedUniversities: [
          { name: "IIT BHU Varanasi (Civil Engg Dept)", matchScore: 99, status: "Matching" },
          { name: "NIT Allahabad (MNNIT)", matchScore: 91, status: "Matching" },
          { name: "HBTU Kanpur", matchScore: 84, status: "Matching" }
        ]
      };
    } else if (lower.includes("anemia") || lower.includes("hospital") || lower.includes("doctor") || lower.includes("maternal") || lower.includes("pregnant") || lower.includes("health") || lower.includes("phc") || lower.includes("asha") || lower.includes("anganwadi") || lower.includes("medicine") || lower.includes("clinic")) {
      return {
        category: "Healthcare & Anganwadi",
        domain: "Biomedical Instrumentation & Telemedicine",
        keyTechnologies: ["Non-Invasive Multispectral Optical Hb Sensor", "Offline-first Mobile Tele-triage", "Bluetooth Low Energy BLE Pulse Oximeter", "Local Dialect Voice Synthesis"],
        skillsRequired: ["Biophotonics", "Embedded C++", "Mobile Telehealth", "Clinical Validation"],
        matchedUniversities: [
          { name: "BIT Mesra (Biomedical Eng. Dept)", matchScore: 96, status: "Matching" },
          { name: "AIIMS Patna & IIT Patna MedTech Incubator", matchScore: 94, status: "Matching" },
          { name: "NIT Jamshedpur", matchScore: 87, status: "Matching" }
        ]
      };
    } else if (lower.includes("electricity") || lower.includes("power") || lower.includes("bijli") || lower.includes("solar") || lower.includes("battery") || lower.includes("school") || lower.includes("light") || lower.includes("smart class") || lower.includes("transformer")) {
      return {
        category: "Clean Energy & Education",
        domain: "Renewable Energy & Battery Storage",
        keyTechnologies: ["Lithium Titanate (LTO) Cold-Resistant Battery (-30°C)", "Bifacial High-Efficiency Snow-Shedding Solar Panels", "Off-grid Energy Management System"],
        skillsRequired: ["Power Electronics", "Renewable Energy Systems", "Thermal Insulation Enclosures"],
        matchedUniversities: [
          { name: "IIT Roorkee (Hydro & Renewable Energy Dept)", matchScore: 99, status: "Matching" },
          { name: "GB Pant University", matchScore: 89, status: "Matching" }
        ]
      };
    } else if (lower.includes("elephant") || lower.includes("hathi") || lower.includes("wildlife") || lower.includes("animal") || lower.includes("forest") || lower.includes("janwar") || lower.includes("tiger") || lower.includes("boar")) {
      return {
        category: "Smart Agriculture & Wildlife Safety",
        domain: "Edge AI & Acoustic Bio-Sensors",
        keyTechnologies: ["Sub-surface Geophone Seismic Footstep Classifier", "High-Intensity Bee Buzz Acoustic Repellent", "Solar LoRa Mesh Boundary Beacons"],
        skillsRequired: ["Signal Processing", "Bio-acoustics", "LoRaWAN Networking", "Edge Impulse TinyML"],
        matchedUniversities: [
          { name: "IIT Guwahati (Bio-Engineering & Signal Lab)", matchScore: 98, status: "Matching" },
          { name: "Tezpur University", matchScore: 91, status: "Matching" }
        ]
      };
    }

    return {
      category: "Rural & Urban Smart Infrastructure",
      domain: "Applied Engineering & Smart Systems",
      keyTechnologies: ["IoT Multi-Sensor Unit", "Solar Power Management", "Modular Local Manufacturing"],
      skillsRequired: ["Embedded Systems", "CAD Industrial Design", "Rapid Prototyping"],
      matchedUniversities: [
        { name: "IIT Kharagpur (Innovation Lab)", matchScore: 97, status: "Matching" },
        { name: "COEP Technological University", matchScore: 92, status: "Matching" }
      ]
    };
  };

  // Submit a new Problem
  const addProblem = (newProblemData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `ECH-2026-${randomNum}`;
    
    const combinedContent = `${newProblemData.title || ''} ${newProblemData.description || ''} ${newProblemData.audioTranscript || ''}`;
    const aiSpecs = detectCategoryAndDomain(combinedContent);

    const finalProblem = {
      id: newId,
      title: newProblemData.title || "Community Ground Challenge",
      category: aiSpecs.category,
      urgency: newProblemData.urgency || "High",
      status: "AI Analyzed",
      stageIndex: 1,
      location: newProblemData.location || "Ranchi Rural District, Jharkhand",
      coordinates: newProblemData.coordinates || { lat: 23.3441, lng: 85.3096 },
      
      reportedFor: newProblemData.reportedFor || "Self",
      beneficiaryDetails: newProblemData.beneficiaryDetails || null,
      selectedDomain: newProblemData.selectedDomain || null,
      uploadedDocuments: newProblemData.uploadedDocuments || [],
      
      submittedBy: `${currentUser.name} (${currentUser.roleLabel})`,
      submitterRole: currentUser.roleLabel,
      submitterGroup: currentUser.group,
      submitterPhone: currentUser.phone || "+91 98765 00000",
      submissionDate: new Date().toISOString().split('T')[0],
      duplicateCount: newProblemData.duplicateCount || 1,
      affectedPeople: newProblemData.affectedPeople || 500,
      description: newProblemData.description,
      audioTranscript: newProblemData.audioTranscript || null,
      imageUrl: newProblemData.imageUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      implementedImageUrl: null,
      aiAnalysis: {
        domain: newProblemData.selectedDomain || aiSpecs.domain,
        keyTechnologies: aiSpecs.keyTechnologies,
        skillsRequired: aiSpecs.skillsRequired,
        severityScore: Math.floor(85 + Math.random() * 14),
        matchedUniversities: aiSpecs.matchedUniversities,
        estimatedCost: "₹30,000 - ₹55,000 / unit",
        deploymentTimeWeeks: 4
      },
      solution: null,
      industryProduct: null,
      governmentDeployment: null,
      citizenFeedback: []
    };

    setProblems(prev => [finalProblem, ...prev]);
    
    setCurrentUser(prev => ({
      ...prev,
      credits: (prev.credits || 0) + 150
    }));

    addNotification(`New problem #${newId} automatically categorized as "${aiSpecs.category}" & AI triaged! +150 XP`, "success");
    return finalProblem;
  };

  // Upvote / Report Duplicate
  const reportDuplicate = (problemId) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          duplicateCount: p.duplicateCount + 1,
          affectedPeople: p.affectedPeople + Math.floor(100 + Math.random() * 300)
        };
      }
      return p;
    }));
    addNotification(`Problem #${problemId} merged with duplicate report (+1 count)`, "info");
  };

  // Student / University Submits a Solution
  const submitSolution = (problemId, solutionData) => {
    const solId = `SOL-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newSolution = {
      id: solId,
      title: solutionData.title,
      studentName: currentUser.name,
      studentRole: currentUser.roleLabel,
      university: currentUser.university || solutionData.university || "IIT Kharagpur",
      prototypeUrl: solutionData.prototypeUrl || "https://github.com/echelon-innovators/prototype",
      prototypeType: solutionData.prototypeType || "Hardware + Firmware POC",
      prototypePhoto: solutionData.prototypePhoto || "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
      description: solutionData.description,
      trlLevel: solutionData.trlLevel || 6,
      feasibilityScore: Math.floor(90 + Math.random() * 9),
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        return {
          ...p,
          status: "Prototyping",
          stageIndex: 2,
          solution: newSolution
        };
      }
      return p;
    }));

    setCurrentUser(prev => ({
      ...prev,
      credits: (prev.credits || 0) + 500
    }));

    addNotification(`Prototype submitted for #${problemId} by ${currentUser.name}! +500 XP`, "success");
  };

  // Industry Adopts Solution
  const adoptSolutionByIndustry = (problemId, projectData) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        const studentMember = p.solution?.studentName ? `${p.solution.studentName} (Student Intern)` : "Aarav Sen (Student Intern)";
        const productObj = {
          companyName: currentUser.company || projectData.companyName || "Tata Innovations & L&T Labs",
          leadEngineer: currentUser.name,
          internAssigned: studentMember,
          projectTeamMembers: [
            studentMember,
            `${currentUser.name} (${currentUser.company || "Industry Lead"})`,
            "Priya Nair (Industrial Quality Engineer)",
            "Sunil Mehta (Supply Chain Specialist)"
          ],
          productName: projectData.productName || `${projectData.companyName || "Commercial"} Scaled Unit`,
          manufacturingCost: projectData.manufacturingCost || "₹32,000 / unit",
          productionDate: new Date().toISOString().split('T')[0],
          certifications: ["BIS Standard Certified", "ISO 9001 Compliance"]
        };

        return {
          ...p,
          status: "Industry Scaling",
          stageIndex: 3,
          industryProduct: productObj
        };
      }
      return p;
    }));

    setCurrentUser(prev => ({
      ...prev,
      credits: (prev.credits || 0) + 1200
    }));

    addNotification(`Industry Project Team initialized for #${problemId}! Student enrolled on internship.`, "success");
  };

  // Government Deploys
  const deployProductByGovt = (problemId, govtData) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        const govtObj = {
          department: currentUser.department || govtData.department || "Ministry of Rural Development & Jal Shakti",
          officerInCharge: currentUser.name,
          sanctionBudget: govtData.sanctionBudget || "₹8,50,000 Sanctioned",
          installedSites: govtData.installedSites || [p.location, "Panchayat Core Zone", "Community Sub-Center"],
          completionDate: new Date().toISOString().split('T')[0],
          gisVerified: true
        };

        return {
          ...p,
          status: "Implemented",
          stageIndex: 4,
          governmentDeployment: govtObj,
          implementedImageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80"
        };
      }
      return p;
    }));

    addNotification(`Government deployed solution at ${govtData.location || "target site"}! Awaiting citizen feedback.`, "success");
  };

  // Citizen Feedback
  const submitCitizenFeedback = (problemId, feedbackData) => {
    setProblems(prev => prev.map(p => {
      if (p.id === problemId) {
        const newFeedback = {
          id: `FB-${Date.now()}`,
          citizenName: currentUser.name,
          rating: feedbackData.rating,
          comment: feedbackData.comment,
          date: new Date().toISOString().split('T')[0],
          status: feedbackData.rating >= 4 ? "Closed & Resolved" : "Feedback Requiring Revision"
        };

        const updatedFeedbacks = [...(p.citizenFeedback || []), newFeedback];
        const isResolved = feedbackData.rating >= 4;

        return {
          ...p,
          status: isResolved ? "Implemented" : "Prototyping",
          stageIndex: isResolved ? 5 : 2,
          citizenFeedback: updatedFeedbacks
        };
      }
      return p;
    }));

    if (feedbackData.rating >= 4) {
      addNotification(`Citizen rating 5★ recorded for #${problemId}. Cycle completed successfully!`, "success");
    } else {
      addNotification(`Citizen highlighted further requirements for #${problemId}. Cycle loop restarted for revision.`, "warning");
    }
  };

  // Emergency SOS
  const triggerEmergencySOS = (service) => {
    const sosId = `SOS-${Date.now().toString().slice(-6)}`;
    const alertData = {
      id: sosId,
      serviceName: service.name,
      number: service.number,
      timestamp: new Date().toLocaleTimeString(),
      userLocation: "Latitude: 23.3441° N, Longitude: 85.3096° E (Ranchi Urban/Rural Border)",
      dispatchedUnit: `Unit #${Math.floor(10 + Math.random() * 90)} (Distance: 1.8 km, ETA: 6 mins)`,
      contactName: currentUser.name,
      contactPhone: currentUser.phone
    };
    setActiveSOSAlert(alertData);
    addNotification(`EMERGENCY SOS broadcasted to ${service.name} (${service.number})!`, "error");
  };

  // AI Chatbot
  const sendChatMessage = (userQuery) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const lower = userQuery.toLowerCase();
      let matchedAns = null;

      for (const item of INSTANT_AI_KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => lower.includes(kw))) {
          matchedAns = item.answer;
          break;
        }
      }

      let aiText = matchedAns;
      if (!aiText) {
        if (lower.includes("role") || lower.includes("who can") || lower.includes("citizen") || lower.includes("asha") || lower.includes("anganwadi") || lower.includes("ngo") || lower.includes("panchayat")) {
          aiText = `Problem reports can be submitted by individual citizens, PRIs, ULBs, ASHA workers, Anganwadi workers, Rozgar Sevaks, Pragya Kendras/CSCs, government departments, and community groups or NGOs. The registration form asks for details relevant to the selected role.`;
        } else if (lower.includes("document") || lower.includes("domain") || lower.includes("offline") || lower.includes("internet")) {
          aiText = `On Submit Ground Problem, you can choose a broad domain, attach optional supporting documents, and let AI confirm the domain from your title. If the internet disconnects, the report is saved securely on your device and syncs when you reconnect.`;
        } else if (lower.includes("how") && lower.includes("work")) {
          aiText = `ECHELON works in simple steps: report a local problem, AI understands and matches it, students build a solution, companies scale it, government deploys it, and citizens give feedback.`;
        } else if (lower.includes("solution") || lower.includes("student") || lower.includes("university") || lower.includes("industry")) {
          aiText = `Solution givers keep their workspace: students and universities explore problems and submit prototypes, industry partners scale them, and government implementation teams deploy them.`;
        } else if (lower.includes("problem") || lower.includes("submit") || lower.includes("water") || lower.includes("road") || lower.includes("electricity") || lower.includes("health")) {
          aiText = `This sounds like a critical community infrastructure challenge! You can log this directly via our 'Submit Problem' page using Voice or Typing. Our AI model will automatically analyze and categorize it, and route it to matched universities like IITs & NITs for prototype development.`;
        } else if (lower.includes("emergency") || lower.includes("help") || lower.includes("police") || lower.includes("hospital")) {
          aiText = `🚨 If this is an emergency, please click the Red Emergency 🦺 SOS Button on the top bar immediately to dispatch nearby Police (112) or Ambulance (108).`;
        } else {
          aiText = `Thank you for reaching out! ECHELON's AI engine is continuously monitoring community issues. For instant administrative forms (Aadhaar, Ration, Certificates), visit your nearest CSC Pragya Kendra. For grassroot engineering challenges, head to 'Submit Problem' to trigger the innovation pipeline!`;
        }
      }

      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiReply]);
    }, 600);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAuthenticated,
        setIsAuthenticated,
        isProblemSubmitter,
        isSolutionProvider,
        loginUser,
        registerUser,
        logoutUser,
        currentUser,
        setCurrentUser,
        switchRole,
        problems,
        addProblem,
        reportDuplicate,
        submitSolution,
        adoptSolutionByIndustry,
        deployProductByGovt,
        submitCitizenFeedback,
        isEmergencyOpen,
        setIsEmergencyOpen,
        activeSOSAlert,
        setActiveSOSAlert,
        triggerEmergencySOS,
        isChatbotOpen,
        setIsChatbotOpen,
        chatMessages,
        sendChatMessage,
        notifications,
        addNotification,
        stats: PLATFORM_STATS,
        leaderboardData: LEADERBOARD_DATA
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
