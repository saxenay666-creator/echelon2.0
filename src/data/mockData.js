export const INITIAL_PROBLEMS = [
  {
    id: "ECH-2026-8821",
    title: "Fluoride Contamination in Groundwater & Handpumps",
    category: "Water & Sanitation",
    urgency: "Critical",
    status: "Implemented",
    stageIndex: 5,
    location: "Purulia Block-IV, West Bengal",
    coordinates: { lat: 23.3321, lng: 86.3652 },
    submittedBy: "Sunita Mahato (ASHA Worker - PRI)",
    submitterRole: "Panchayati Raj Institutions",
    submitterGroup: "problem_submitter",
    submitterPhone: "+91 98451 22340",
    submissionDate: "2026-08-10",
    reportedFor: "Community",
    beneficiaryDetails: { name: "Ward #4 Residents & Primary School Students", phone: "+91 98451 22340" },
    duplicateCount: 8,
    affectedPeople: 2400,
    description: "High fluoride levels (>3.5 mg/L) in borewell water causing severe dental and skeletal fluorosis among school children and farm workers. Traditional boiling or chlorine tablets do not remove fluoride. Urgent requirement for decentralized, low-cost bio-adsorbent filtration units powered by solar energy.",
    audioTranscript: "Hamare gaon ke school aur 4 tola mein handpump ka paani peene se bachhon ke daanton mein peelaapan aur jodo mein dard ho raha hai. Jaldi kuch low-cost filter lagaya jaye.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    implementedImageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      domain: "Chemical & Environmental Engineering",
      keyTechnologies: ["Activated Alumina Nano-Membrane", "Solar DC Pump Integration", "IoT Water Quality Sensor (pH/Fluoride)", "Low-cost Regenerative Cartridges"],
      skillsRequired: ["Membrane Chemistry", "Embedded Systems", "CAD Industrial Design", "Rural Water Supply Protocols"],
      severityScore: 94,
      matchedUniversities: [
        { name: "IIT Kharagpur (Dept. of Water Resources)", matchScore: 98, status: "Prototype Submitted" },
        { name: "NIT Durgapur (Env Engineering Lab)", matchScore: 92, status: "Collaborator" },
        { name: "Jadavpur University", matchScore: 86, status: "Reviewed" }
      ],
      estimatedCost: "₹35,000 / unit",
      deploymentTimeWeeks: 6
    },
    solution: {
      id: "SOL-2026-104",
      title: "Bio-Nano Hydroxyapatite Solar Defluoridation System",
      studentName: "Aarav Sen & Team AquaSafe",
      studentRole: "Student Innovator",
      university: "IIT Kharagpur",
      prototypeUrl: "https://github.com/aquasafe-iitkgp/defluoride-iot",
      prototypeType: "Hardware + IoT Firmware",
      prototypePhoto: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80",
      description: "Uses locally synthesized bone-char & activated alumina composite bed capable of removing 99.2% fluoride without electricity requirement. Integrated ESP32 telemetry transmits water quality & cartridge saturation alerts to Gram Panchayat dashboard.",
      trlLevel: 7,
      feasibilityScore: 96,
      submittedDate: "2026-08-20"
    },
    industryProduct: {
      companyName: "Tata Water Solutions & Eureka Forbes Green Tech",
      leadEngineer: "Dr. Vikramaditya Rao (VP R&D)",
      internAssigned: "Aarav Sen (Research Intern, Stipend ₹35,000/mo)",
      projectTeamMembers: ["Aarav Sen (Student)", "Dr. Vikramaditya Rao (Tata)", "Ritu Verma (Industrial Designer)", "K. N. Murthy (Manufacturing Lead)"],
      productName: "Tata JalRakshak Ultra-Fluoride Solar Community Kiosk",
      manufacturingCost: "₹28,500 / kiosk",
      productionDate: "2026-09-02",
      certifications: ["BIS 10500:2012 Certified", "ISO 9001:2026 Quality Approved"]
    },
    governmentDeployment: {
      department: "Ministry of Jal Shakti (West Bengal Rural Water Directorate)",
      officerInCharge: "Shri Debashis Roy, Executive Engineer PWD Water",
      sanctionBudget: "₹14,25,000 for 50 Panchayats",
      installedSites: ["Purulia Block-IV Upper Primary School", "Tola Handpump #3", "Panchayat Bhavan Common Well"],
      completionDate: "2026-09-12",
      gisVerified: true
    },
    citizenFeedback: [
      {
        id: "FB-101",
        citizenName: "Sunita Mahato (ASHA Worker)",
        rating: 5,
        comment: "Paani ka swaad aur rang ekdum saaf ho gaya hai. Bachhon ke daant ab theek hain aur sensor se filter badalne ka message seedha mobile pe aata hai!",
        date: "2026-09-15",
        status: "Closed & Resolved"
      }
    ]
  },
  {
    id: "ECH-2026-7490",
    title: "Post-Harvest Onion & Tomato Spoilage due to Lack of Micro Cold-Storage",
    category: "Agriculture & Storage",
    urgency: "High",
    status: "Industry Scaling",
    stageIndex: 3,
    location: "Lasalgaon Mandi Hub, Nashik, Maharashtra",
    coordinates: { lat: 20.1462, lng: 74.2289 },
    submittedBy: "Balasaheb Patil (Rozgar Sevak - PRI)",
    submitterRole: "Panchayati Raj Institutions",
    submitterGroup: "problem_submitter",
    submitterPhone: "+91 97632 11980",
    submissionDate: "2026-08-18",
    reportedFor: "Community",
    beneficiaryDetails: { name: "Lasalgaon Smallholder Farmers Union", phone: "+91 97632 11980" },
    duplicateCount: 14,
    affectedPeople: 4800,
    description: "Marginal farmers losing 35-40% produce annually because centralized cold storages charge exorbitant rates and require high transport costs. Need small-scale 2-5 MT modular farm-gate cold rooms running on decentralized biomass/solar hybrid power with humidity control.",
    audioTranscript: "Kanda aur tamatar mandi tak pahunchte pahunchte sad jata hai. Humein 2 ton ka khet pe lagne wala solar cold room chahiye jisse hum rate badhne tak maal rok sakein.",
    imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80",
    implementedImageUrl: null,
    aiAnalysis: {
      domain: "Thermodynamics & AgTech Robotics",
      keyTechnologies: ["Phase Change Material (PCM) Thermal Storage", "Solar Peltier & Inverter Compressor Hybrid", "Micro-climate Relative Humidity Regulator", "GSM Stock Monitoring"],
      skillsRequired: ["Refrigeration Design", "Solar PV Engineering", "IoT Firmware", "Agricultural Shelf-Life Optimization"],
      severityScore: 88,
      matchedUniversities: [
        { name: "COEP Technological University Pune", matchScore: 97, status: "Prototype Delivered" },
        { name: "IIT Bombay (Rural Tech Action Group)", matchScore: 95, status: "Advisor" },
        { name: "VNIT Nagpur", matchScore: 88, status: "Benchmarked" }
      ],
      estimatedCost: "₹1,20,000 / 2-MT Unit",
      deploymentTimeWeeks: 8
    },
    solution: {
      id: "SOL-2026-118",
      title: "PCM-Assisted Solar Micro Cold Storage with Smart Spoilage Gas Detection",
      studentName: "Neha Kulkarni & Tanmay Deshmukh",
      studentRole: "Student Innovator",
      university: "COEP Technological University Pune",
      prototypeUrl: "https://github.com/coep-agritech/pcm-cold-unit",
      prototypeType: "Working 500kg Prototype + Ethylene Sensor",
      prototypePhoto: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      description: "Utilizes inorganic Phase Change Material slabs capable of holding 4-8°C cooling for 18 hours without sunlight or battery backup. Includes MQ-137 & Ethylene sensors to alert farmers before rot starts.",
      trlLevel: 6,
      feasibilityScore: 94,
      submittedDate: "2026-08-28"
    },
    industryProduct: {
      companyName: "Mahindra AgTech Solutions & Danfoss India",
      leadEngineer: "Sanjay Shirodkar (Chief Engineer Innovations)",
      internAssigned: "Neha Kulkarni (Agri-Design Intern)",
      projectTeamMembers: ["Neha Kulkarni (COEP)", "Sanjay Shirodkar (Mahindra)", "Anil Joshi (Thermal Engineer)", "Pooja Hegde (Supply Chain)"],
      productName: "Mahindra KrishiKool 3MT Modular Storage Pod",
      manufacturingCost: "₹95,000 / unit (with subsidy readiness)",
      productionDate: "2026-09-14",
      certifications: ["NABARD Subsidizable Model", "MNRE Solar Compliance"]
    },
    governmentDeployment: null,
    citizenFeedback: []
  },
  {
    id: "ECH-2026-6214",
    title: "Accident Prone Unlit Dangerous Potholes on Rural State Highway Corridor",
    category: "Roads & Public Infrastructure",
    urgency: "Critical",
    status: "Prototyping",
    stageIndex: 2,
    location: "Chandauli - Varanasi Rural Corridor, UP",
    coordinates: { lat: 25.2612, lng: 83.2689 },
    submittedBy: "Ramkishore Dubey (Municipal Engineer - ULB)",
    submitterRole: "Urban Local Bodies",
    submitterGroup: "problem_submitter",
    submitterPhone: "+91 94150 88219",
    submissionDate: "2026-09-01",
    reportedFor: "Community",
    beneficiaryDetails: { name: "Highway Commuters & Ambulances", phone: "+91 94150 88219" },
    duplicateCount: 19,
    affectedPeople: 12000,
    description: "Deep waterlogged craters on 14km stretch causing frequent ambulance breakdowns, night two-wheeler skids, and agricultural tractor rollovers. PWD patch repairs wash off every monsoon within 15 days.",
    audioTranscript: "State highway pe 10 se zyada bade gaddhe hain, baarish mein paani bhar jata hai aur raat ko gaadiyan palat rahi hain. Koi durable tarika nikalein jo jaldi theek ho sake.",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    implementedImageUrl: null,
    aiAnalysis: {
      domain: "Civil Infrastructure & Materials Engineering",
      keyTechnologies: ["Cold-Mix Geopolymer Recycled Plastic Asphalt", "Rapid In-situ Compaction Tooling", "Drone LiDAR Pothole Volumetric Scanner", "Photoluminescent Self-Glow Road Studs"],
      skillsRequired: ["Pavement Materials Engineering", "Geopolymer Chemistry", "Computer Vision / OpenCV"],
      severityScore: 91,
      matchedUniversities: [
        { name: "IIT BHU Varanasi (Civil Engg Dept)", matchScore: 99, status: "Building Solution" },
        { name: "NIT Allahabad (MNNIT)", matchScore: 91, status: "Matched" }
      ],
      estimatedCost: "₹450 / sq.meter patch (5x lifespan)",
      deploymentTimeWeeks: 3
    },
    solution: {
      id: "SOL-2026-142",
      title: "Bio-Enzyme & Waste Plastic Reinforced Rapid Geopolymer Cold Patching Compound",
      studentName: "Priyanka Yadav & Shashank Mishra",
      studentRole: "Student Innovator",
      university: "IIT BHU Varanasi",
      prototypeUrl: "https://github.com/iitbhu-civil/geo-plastic-patch",
      prototypeType: "Material Sample Kit + 3D Field Compactor",
      prototypePhoto: "https://images.unsplash.com/photo-1584467746597-2856c8052163?auto=format&fit=crop&w=800&q=80",
      description: "Zero-bitumen cold-mix binder utilizing 15% shredded single-use plastic waste and fly ash activated by organic bio-enzymes. Cures in 20 minutes under standing water and withstands 40-tonne truck axle loads.",
      trlLevel: 5,
      feasibilityScore: 97,
      submittedDate: "2026-09-10"
    },
    industryProduct: null,
    governmentDeployment: null,
    citizenFeedback: []
  },
  {
    id: "ECH-2026-5109",
    title: "High Risk Maternal Anemia & Remote Vitals Monitoring in Tribal Hamlets",
    category: "Healthcare & Anganwadi",
    urgency: "Critical",
    status: "AI Analyzed",
    stageIndex: 1,
    location: "Khunti District Tribal Blocks, Jharkhand",
    coordinates: { lat: 23.0722, lng: 85.2798 },
    submittedBy: "Basanti Hembrom (Anganwadi - PRI)",
    submitterRole: "Panchayati Raj Institutions",
    submitterGroup: "problem_submitter",
    submitterPhone: "+91 98350 44102",
    submissionDate: "2026-09-08",
    reportedFor: "Community",
    beneficiaryDetails: { name: "Tribal Maternal Care Cluster #14", phone: "+91 98350 44102" },
    duplicateCount: 6,
    affectedPeople: 1850,
    description: "Pregnant women living in remote forested settlements cannot travel 25km to PHC for hemoglobin and blood pressure checks. Severe anemia (Hb < 7 g/dL) detected too late during emergency deliveries.",
    audioTranscript: "Pahaadi tola se auratein PHC nahi aa paati hain. Hamare paas needle-less hemoglobin check karne ka koi device hona chahiye jisse hum ghar ghar jaakar check kar sakein aur digital report doctor ko bhej sakein.",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    implementedImageUrl: null,
    aiAnalysis: {
      domain: "Biomedical Instrumentation & Telemedicine",
      keyTechnologies: ["Non-Invasive Multispectral Optical Hb Sensor", "Offline-first Mobile Tele-triage", "Bluetooth Low Energy BLE Pulse Oximeter", "Local Dialect Voice Synthesis"],
      skillsRequired: ["Biophotonics", "Embedded C++", "Mobile App Development", "Clinical Trial Validation"],
      severityScore: 96,
      matchedUniversities: [
        { name: "BIT Mesra (Biomedical Eng. Dept)", matchScore: 96, status: "Assigned" },
        { name: "AIIMS Patna & IIT Patna MedTech Incubator", matchScore: 94, status: "Under Review" }
      ],
      estimatedCost: "₹4,500 / Anganwadi Portable Kit",
      deploymentTimeWeeks: 4
    },
    solution: null,
    industryProduct: null,
    governmentDeployment: null,
    citizenFeedback: []
  },
  {
    id: "ECH-2026-4402",
    title: "Frequent Forest Fringe Elephant Intrusion Damaging Standing Paddy Crops",
    category: "Smart Agriculture & Wildlife Safety",
    urgency: "High",
    status: "Submitted",
    stageIndex: 0,
    location: "Alipurduar Dooars Region, North Bengal",
    coordinates: { lat: 26.4919, lng: 89.5271 },
    submittedBy: "Biren Rabha (Citizen)",
    submitterRole: "Citizen",
    submitterGroup: "problem_submitter",
    submitterPhone: "+91 97330 99412",
    submissionDate: "2026-09-14",
    reportedFor: "Self",
    duplicateCount: 4,
    affectedPeople: 3200,
    description: "Herds of wild elephants entering village farmland at night destroying crops and houses. Traditional electric fences kill animals and firecrackers cause stampedes. Need humane, automated seismic + acoustic early-warning repellent system.",
    audioTranscript: "Hathi har hafte raat ko khet mein ghus ke poora dhan barbad kar dete hain aur logon pe hamla hota hai. Bina janwar ko chot pahunchaye door bhagane ka system chahiye.",
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
    implementedImageUrl: null,
    aiAnalysis: {
      domain: "Edge AI & Acoustic Bio-Sensors",
      keyTechnologies: ["Sub-surface Geophone Seismic Footstep Classifier", "High-Intensity Bee Buzz Acoustic Repellent", "Solar LoRa Mesh Boundary Beacons"],
      skillsRequired: ["Signal Processing", "Bio-acoustics", "LoRaWAN Networking", "Edge Impulse TinyML"],
      severityScore: 85,
      matchedUniversities: [
        { name: "IIT Guwahati (Bio-Engineering & Signal Lab)", matchScore: 98, status: "Matching" },
        { name: "Tezpur University", matchScore: 91, status: "Matching" }
      ],
      estimatedCost: "₹18,000 / 500m perimeter",
      deploymentTimeWeeks: 5
    },
    solution: null,
    industryProduct: null,
    governmentDeployment: null,
    citizenFeedback: []
  }
];

// TWO CLEAR STAKEHOLDER CATEGORIES:
// Group 1: Problem Submission (Demand) -> Sees Simple, Intuitive UI (Submit, Track, Dashboard, SOS, AI Helper)
// Group 2: Solution & Scaling (Supply) -> Sees Full Professional UI (Explore Problems, Explore Solutions, Leaderboard, etc.)

export const STAKEHOLDER_GROUPS = {
  PROBLEM_SUBMISSION: "problem_submitter",
  SOLUTION_PROVIDER: "solution_provider"
};

export const STAKEHOLDER_CATEGORIES = [
  { id: "individual", label: "Individual", description: "Citizens submitting problems for themselves or their locality.", iconName: "User" },
  { id: "community_groups", label: "Community Groups / NGOs", description: "Community organisations and NGOs raising issues for the people they serve.", iconName: "HeartHandshake" },
  { id: "local_bodies", label: "Local Bodies", description: "Panchayati Raj Institutions and Urban Local Bodies.", iconName: "Building" },
  { id: "frontline_workers", label: "Frontline Workers", description: "ASHA, Anganwadi and Rozgar Sevak field workers.", iconName: "Users" },
  { id: "government_departments", label: "Government Departments", description: "Block, district and state government departments.", iconName: "Shield" }
];

export const MOCK_ROLES = [
  // GROUP 1: PROBLEM SUBMISSION STAKEHOLDERS (Demand Side)
  {
    id: "citizen",
    category: "individual",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Individual Citizens",
    shortLabel: "Individual",
    iconName: "User",
    groupLabel: "Problem Submission",
    description: "Individual citizens report everyday problems, such as a broken handpump or a school with no toilets.",
    requiredFields: ["name", "phone", "location"],
    defaultUser: {
      name: "Ramesh Sharma",
      role: "citizen",
      roleLabel: "Individual Citizen",
      subRole: "Individual Citizen",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 98765 43210",
      email: "ramesh.sharma@gmail.com",
      location: "Ranchi, Jharkhand",
      credits: 450,
      tier: "Silver",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "panchayati_raj",
    category: "local_bodies",
    subcategory: "Panchayati Raj Institution (PRI)",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Local Bodies (PRIs)",
    shortLabel: "Panchayat (PRI)",
    iconName: "Home",
    groupLabel: "Problem Submission",
    description: "PRIs report village and city problems like irrigation, drinking water, waste and drainage.",
    requiredFields: ["name", "phone", "panchayatName", "designation", "location"],
    defaultUser: {
      name: "Suresh Chandra Verma",
      role: "panchayati_raj",
      roleLabel: "Panchayati Raj Institution",
      subRole: "Panchayat Secretary / Sarpanch",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 94520 18833",
      email: "suresh.panchayat@gov.in",
      location: "Gram Panchayat Chandankyari, Bokaro",
      panchayatName: "Gram Panchayat Chandankyari",
      designation: "Panchayat Secretary",
      officialId: "PRI-JHK-2026-88",
      credits: 1450,
      tier: "Gold",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "community_group",
    category: "community_groups",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Community Groups & NGOs",
    shortLabel: "Community / NGO",
    iconName: "HeartHandshake",
    groupLabel: "Problem Submission",
    description: "Community groups and NGOs report issues affecting a whole locality and its residents.",
    requiredFields: ["name", "phone", "communityName", "communityArea", "location"],
    defaultUser: {
      name: "Meena Ekka",
      role: "community_group",
      roleLabel: "Community Group / NGO",
      subRole: "Community Coordinator",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 98765 11882",
      email: "meena.community@example.org",
      location: "Khunti, Jharkhand",
      communityName: "Adivasi Jal Samiti",
      communityType: "Community group / NGO",
      communityArea: "Khunti Block villages",
      credits: 900,
      tier: "Silver",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "urban_local_body",
    category: "local_bodies",
    subcategory: "Urban Local Body (ULB)",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Local Bodies (ULBs)",
    shortLabel: "Urban Local Body",
    iconName: "Building",
    groupLabel: "Problem Submission",
    description: "ULBs report village and city problems like irrigation, drinking water, waste and drainage.",
    requiredFields: ["name", "phone", "municipalityName", "wardNo", "designation", "location"],
    defaultUser: {
      name: "Rajeshwar Rao",
      role: "urban_local_body",
      roleLabel: "Urban Local Body (ULB)",
      subRole: "Ward Councilor / Municipal Inspector",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 98220 55410",
      email: "r.rao@nagarnigam.gov.in",
      location: "Ward #12, Ranchi Municipal Zone",
      municipalityName: "Ranchi Municipal Corporation",
      wardNo: "12",
      designation: "Ward Councilor",
      officialId: "ULB-MC-2026-104",
      credits: 1120,
      tier: "Gold",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "asha_worker",
    category: "frontline_workers",
    subcategory: "ASHA Worker",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Frontline Workers - ASHA",
    shortLabel: "ASHA Worker",
    iconName: "HeartHandshake",
    groupLabel: "Problem Submission",
    description: "ASHA workers report ground-level issues: maternal health, drinking water, sanitation.",
    requiredFields: ["name", "phone", "workArea", "officialId"],
    defaultUser: {
      name: "Sunita Mahato",
      role: "asha_worker",
      roleLabel: "ASHA Worker",
      subRole: "Frontline Health Worker",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 98451 22340",
      email: "sunita.asha@nhm.gov.in",
      location: "Primary Health Subcenter, Purulia Block-IV",
      workArea: "Purulia Block-IV Villages",
      officialId: "ASHA-WB-2026-402",
      credits: 2150,
      tier: "Platinum",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "anganwadi_worker",
    category: "frontline_workers",
    subcategory: "Anganwadi Worker",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Frontline Workers - Anganwadi",
    shortLabel: "Anganwadi Worker",
    iconName: "Smile",
    groupLabel: "Problem Submission",
    description: "Anganwadi workers report ground-level issues: child nutrition, clean water, early education.",
    requiredFields: ["name", "phone", "centerName", "officialId"],
    defaultUser: {
      name: "Basanti Hembrom",
      role: "anganwadi_worker",
      roleLabel: "Anganwadi Worker",
      subRole: "Child Development Worker",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 94311 88204",
      email: "basanti.icds@gov.in",
      location: "Anganwadi Center #14, Khunti, Jharkhand",
      centerName: "Anganwadi Center #14",
      officialId: "ICDS-JHK-ANG-77",
      credits: 1920,
      tier: "Platinum",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "rozgar_sevak",
    category: "frontline_workers",
    subcategory: "Rozgar Sevak",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Frontline Workers - Rozgar Sevak",
    shortLabel: "Rozgar Sevak",
    iconName: "Briefcase",
    groupLabel: "Problem Submission",
    description: "Rozgar Sevaks report ground-level issues: MGNREGA works, farm ponds, irrigation gaps.",
    requiredFields: ["name", "phone", "workArea", "officialId"],
    defaultUser: {
      name: "Balasaheb Patil",
      role: "rozgar_sevak",
      roleLabel: "Rozgar Sevak (MGNREGA)",
      subRole: "MGNREGA Coordinator",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 97632 11980",
      email: "b.patil@mgnrega.gov.in",
      location: "Gram Rozgar Kendra, Lasalgaon, Nashik",
      workArea: "Lasalgaon Block Villages",
      officialId: "NREGA-MS-GRS-512",
      credits: 1540,
      tier: "Gold",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "pragya_kendra",
    category: "government_departments",
    hiddenFromStakeholderSelector: true,
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Pragya Kendras / CSCs",
    shortLabel: "Pragya Kendra / CSC",
    iconName: "Monitor",
    groupLabel: "Problem Submission",
    description: "Pragya Kendras / CSCs submit on behalf of illiterate or low-literacy citizens through voice and assisted entry.",
    requiredFields: ["name", "phone", "centerName", "location"],
    defaultUser: {
      name: "Vikram Mahto",
      role: "pragya_kendra",
      roleLabel: "Pragya Kendra / CSC VLE",
      subRole: "Village Level Entrepreneur",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 91234 56789",
      email: "vikram.csc@digitalindia.gov.in",
      location: "Pragya Kendra, Ormanjhi, Ranchi",
      centerName: "Pragya Kendra Ormanjhi",
      officialId: "CSC-VLE-JHK-902",
      credits: 2280,
      tier: "Platinum",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "govt_department",
    category: "government_departments",
    group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
    label: "Government Departments",
    shortLabel: "Govt Department",
    iconName: "Shield",
    groupLabel: "Problem Submission",
    description: "Government departments (BDOs, district engineers, circle officers) submit larger, department-level challenges.",
    requiredFields: ["name", "phone", "department", "designation", "location"],
    description: "Block Development Officers (BDO), District line engineers, and Circle Officers submitting regional challenges.",
    defaultUser: {
      name: "Amitabh Sen, BDO",
      role: "govt_department",
      roleLabel: "Government Department",
      subRole: "Block Development Officer (BDO)",
      group: STAKEHOLDER_GROUPS.PROBLEM_SUBMISSION,
      phone: "+91 94330 11220",
      email: "bdo.block4@nic.in",
      location: "District Development Office, Purulia",
      officialId: "GOV-DEM-BDO-402",
      credits: 1680,
      tier: "Platinum",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    }
  },

  // GROUP 2: SOLUTION & SCALING STAKEHOLDERS (Supply Side)
  {
    id: "student",
    group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
    label: "Student Innovator (छात्र शोधकर्ता)",
    shortLabel: "Student Innovator",
    iconName: "GraduationCap",
    groupLabel: "Solution & Prototyping",
    description: "College and university engineering students building hardware & software prototypes and earning internships.",
    defaultUser: {
      name: "Aarav Sen",
      role: "student",
      roleLabel: "Student Innovator",
      subRole: "B.Tech Final Year (Chemical & IoT)",
      group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
      phone: "+91 99341 00214",
      email: "aarav.sen@iitkgp.ac.in",
      university: "IIT Kharagpur",
      department: "Chemical & Water Engineering",
      officialId: "IITKGP-22CH1004",
      credits: 3450,
      tier: "Diamond",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "university",
    group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
    label: "University / Research Lab (विश्वविद्यालय)",
    shortLabel: "University / R&D Lab",
    iconName: "School",
    groupLabel: "Solution & Prototyping",
    description: "Academic institutions, NIRF faculties, and incubation labs verifying student prototypes with faculty mentors.",
    defaultUser: {
      name: "Prof. S. N. Bhattacharya",
      role: "university",
      roleLabel: "University / Research Lab",
      subRole: "Dean of Sponsored Research",
      group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
      phone: "+91 94340 11984",
      email: "dean.rnd@iitkgp.ac.in",
      university: "IIT Kharagpur",
      department: "Sponsored Research & Industrial Consultancy",
      officialId: "INST-IITKGP-RND",
      credits: 8900,
      tier: "Diamond",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "industry",
    group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
    label: "Industry & Enterprise (उद्योग / कॉर्पोरेट)",
    shortLabel: "Industry Partner",
    iconName: "Factory",
    groupLabel: "Solution & Scaling",
    description: "Corporates and MSMEs adopting prototypes, funding student research, and manufacturing commercial products.",
    defaultUser: {
      name: "Dr. Vikramaditya Rao",
      role: "industry",
      roleLabel: "Industry Partner",
      subRole: "Vice President R&D & CSR Tech",
      group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
      phone: "+91 98200 44551",
      email: "v.rao@tatawater.com",
      company: "Tata Water Solutions & Eureka Forbes Green Tech",
      officialId: "CORP-TATA-RND-81",
      credits: 12500,
      tier: "Diamond",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    }
  },
  {
    id: "government",
    group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
    label: "Government Implementation Directorate (सरकारी विभाग)",
    shortLabel: "Govt Implementation",
    iconName: "Landmark",
    groupLabel: "Evaluation & Implementation",
    description: "State & National administrative authorities testing industrial compliance and deploying products on ground.",
    defaultUser: {
      name: "Shri Debashis Roy, IAS",
      role: "government",
      roleLabel: "Government Implementation Directorate",
      subRole: "Executive Engineer & Project Director",
      group: STAKEHOLDER_GROUPS.SOLUTION_PROVIDER,
      phone: "+91 94330 22100",
      email: "debashis.roy@nic.in",
      department: "Ministry of Jal Shakti & Rural Water Directorate",
      officialId: "GOV-WB-IAS-402",
      credits: 16800,
      tier: "Diamond",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    }
  }
];

export const LEADERBOARD_DATA = {
  students: [
    { rank: 1, name: "Aarav Sen", university: "IIT Kharagpur", prototypes: 6, adopted: 4, credits: 3450, tier: "Diamond", stipendEarned: "₹1,40,000" },
    { rank: 2, name: "Neha Kulkarni", university: "COEP Pune", prototypes: 5, adopted: 3, credits: 2980, tier: "Platinum", stipendEarned: "₹1,05,000" },
    { rank: 3, name: "Priyanka Yadav", university: "IIT BHU Varanasi", prototypes: 4, adopted: 3, credits: 2640, tier: "Platinum", stipendEarned: "₹90,000" },
    { rank: 4, name: "Kavita Joshi", university: "IIT Roorkee", prototypes: 4, adopted: 2, credits: 2310, tier: "Gold", stipendEarned: "₹70,000" },
    { rank: 5, name: "Arjun Radhakrishnan", university: "NIT Trichy", prototypes: 3, adopted: 2, credits: 1980, tier: "Gold", stipendEarned: "₹60,000" }
  ],
  universities: [
    { rank: 1, name: "IIT Kharagpur", activePrototypes: 42, productsDeployed: 28, aiMatchRate: "97.4%", credits: 18900, tier: "Diamond" },
    { rank: 2, name: "IIT Bombay", activePrototypes: 38, productsDeployed: 25, aiMatchRate: "96.1%", credits: 17200, tier: "Diamond" },
    { rank: 3, name: "COEP Tech University Pune", activePrototypes: 31, productsDeployed: 19, aiMatchRate: "94.8%", credits: 14800, tier: "Diamond" },
    { rank: 4, name: "IIT BHU Varanasi", activePrototypes: 29, productsDeployed: 17, aiMatchRate: "93.5%", credits: 13500, tier: "Platinum" }
  ],
  industry: [
    { rank: 1, name: "Tata Steel Innovations & Water Tech", projectsScaled: 34, studentInternships: 48, csrDeployed: "₹4.8 Cr", credits: 24500, tier: "Diamond" },
    { rank: 2, name: "Mahindra AgTech Solutions", projectsScaled: 27, studentInternships: 36, csrDeployed: "₹3.6 Cr", credits: 21200, tier: "Diamond" },
    { rank: 3, name: "L&T Smart Infrastructure", projectsScaled: 22, studentInternships: 30, csrDeployed: "₹3.1 Cr", credits: 18400, tier: "Diamond" }
  ],
  grassroots: [
    { rank: 1, name: "Sunita Mahato (ASHA Worker - PRI)", location: "Purulia, WB", problemsReported: 32, resolved: 28, credits: 2150, tier: "Platinum" },
    { rank: 2, name: "Basanti Hembrom (Anganwadi - PRI)", location: "Khunti, Jharkhand", problemsReported: 27, resolved: 23, credits: 1920, tier: "Platinum" },
    { rank: 3, name: "Rajeshwar Rao (Ward Councilor - ULB)", location: "Ranchi, Jharkhand", problemsReported: 24, resolved: 20, credits: 1240, tier: "Gold" },
    { rank: 4, name: "Ramesh Sharma (Citizen)", location: "Ranchi, Jharkhand", problemsReported: 12, resolved: 9, credits: 450, tier: "Silver" }
  ]
};

export const EMERGENCY_SERVICES = [
  { id: "police", name: "Police Emergency", number: "112 / 100", icon: "ShieldAlert", desc: "Crimes, accidents, law & order distress" },
  { id: "ambulance", name: "Medical & Ambulance", number: "108 / 102", icon: "HeartPulse", desc: "Severe injuries, maternal emergencies, trauma" },
  { id: "fire", name: "Fire & Rescue Service", number: "101", icon: "Flame", desc: "Building fire, forest blaze, chemical gas leak" },
  { id: "women", name: "Women's Safety Helpline", number: "1091 / 181", icon: "UserCheck", desc: "Harassment, domestic crisis, urgent protection" },
  { id: "disaster", name: "NDRF / SDRF Disaster Relief", number: "1078 / 1070", icon: "AlertTriangle", desc: "Flash floods, landslides, bridge collapse" },
  { id: "child", name: "Childline Emergency", number: "1098", icon: "Smile", desc: "Child protection, abuse, lost children" },
];

export const INSTANT_AI_KNOWLEDGE_BASE = [
  {
    keywords: ["ration card", "rashan", "food grains", "pds"],
    answer: "To apply for or update a Ration Card, visit your nearest Pragya Kendra/CSC center with Aadhaar cards of all family members, electricity bill, and income certificate. You do NOT need to submit an engineering problem for this. You can track your RC application online at nfsa.gov.in."
  },
  {
    keywords: ["garbage", "kachra", "dustbin", "waste pickup", "cleaning"],
    answer: "Regular door-to-door municipal garbage pickup can be scheduled via your Nagar Nigam / Panchayat Swachhata app. If your locality has a severe toxic dumping issue or lack of waste processing technology, please lodge it through our 'Submit Problem' portal for student/university bio-recycler solutions."
  },
  {
    keywords: ["electricity bill", "power cut", "bijli helpline", "transformer repair"],
    answer: "For immediate power outages or transformer replacement in rural areas, dial 1912 (National Power Helpline). If your entire village is off-grid and needs a renewable microgrid or solar power cube, submit a problem ticket to trigger university R&D prototyping."
  },
  {
    keywords: ["birth certificate", "death certificate", "janam praman"],
    answer: "Birth and Death certificates can be applied within 21 days on crsorgi.gov.in or through your Gram Panchayat Secretary free of cost. Required docs: Hospital discharge slip and Parents' Aadhaar."
  },
  {
    keywords: ["mgnrega", "job card", "100 days work", "rozgar"],
    answer: "To get a MGNREGA Job Card or demand 100-days rural labor work, submit Form-1 to your Rozgar Sevak or Panchayat Secretary. Payment is directly transferred via DBTE to your Aadhaar-linked bank account within 15 days."
  },
  // NEW: Enhanced AI Knowledge Base (Task 10)
  {
    keywords: ["what is echelon", "about echelon", "echelon kya hai", "platform", "what is this"],
    answer: "ECHELON is a national platform that connects citizens with problems to students who build solutions, companies that make products, and government that deploys them. It's like a bridge between your community needs and innovation! Anyone can report problems and track solutions in real-time."
  },
  {
    keywords: ["submit problem", "report issue", "how to report", "problem kaise dale", "kaise report kare"],
    answer: "You can submit a problem in 3 ways: 1) Use Voice - just speak your problem in your language, 2) Type it out with details and photos, 3) Upload supporting documents. Our AI will automatically analyze and route it to the right universities!"
  },
  {
    keywords: ["who can submit", "kaun problem dal sakta", "eligibility", "who can report"],
    answer: "Anyone can submit problems! Individuals, NGOs/Community Groups, Panchayat members, Municipal corporations, and Government departments can all report community challenges on ECHELON. No special permission needed!"
  },
  {
    keywords: ["what problems", "categories", "types of problems", "kya problem", "problem types"],
    answer: "You can report problems in: Water & Sanitation, Agriculture, Roads, Healthcare, Electricity, Wildlife Safety, Education, Waste Management, and Transport. If unsure about the category, just choose 'Other' and our AI will categorize it automatically!"
  },
  {
    keywords: ["solution", "prototype", "how fixed", "kaise solve", "how solve"],
    answer: "Students from IITs, NITs, and top universities build working prototypes to solve your problem. Then companies like Tata or Mahindra manufacture it at scale. Finally, government deploys it in your area. You provide feedback to complete the cycle!"
  },
  {
    keywords: ["track", "status", "follow up", "kaha pahuncha", "check status"],
    answer: "Click 'Track Problem' from the menu and enter your Problem ID (like ECH-2026-XXXX). You'll see real-time status: AI Analysis → Prototyping → Industry Scaling → Government Deployment → Citizen Feedback. You can also check from your Dashboard!"
  },
  {
    keywords: ["language", "bhasha", "hindi", "regional", "translation"],
    answer: "ECHELON currently supports English and Hindi. Jharkhand languages (Santali, Mundari, Ho, Kurukh) are coming soon! You can also use Voice in your local language and our AI will understand it."
  },
  {
    keywords: ["emergency", "urgent", "sos", "aapatkaal", "help now"],
    answer: "🚨 For life-threatening emergencies, click the RED Emergency SOS button at the top to immediately contact Police (112), Ambulance (108), Fire (101), Women's Helpline (1091), or other emergency services! Your location will be shared automatically."
  },
  {
    keywords: ["reward", "credit", "points", "inaam", "incentive"],
    answer: "You earn Credits (XP) for participating: Reporting problems (+150 XP), Getting solutions deployed (+500 bonus), Providing feedback (+50 XP). Students earn real stipends (₹30,000-70,000) for successful prototypes that get adopted!"
  },
  {
    keywords: ["offline", "no internet", "network", "internet nahi", "connection"],
    answer: "No internet? No problem! ECHELON can save your problem report offline on your device using local storage. It will automatically sync and upload when you get internet connection back. You'll see an offline indicator when disconnected."
  },
  {
    keywords: ["privacy", "data", "safe", "surakshit", "security"],
    answer: "Your data is completely safe with ECHELON. We only share your problem details with verified universities, companies, and government for solution purposes. Your phone number and personal information remain private and are never sold to third parties."
  },
  {
    keywords: ["student", "university", "prototype", "internship", "college"],
    answer: "Students can: Browse real community problems, Build innovative prototypes, Earn stipends (₹30,000-70,000), Get paid internships with top companies like Tata and Mahindra, and Build their resume with real-world projects that make a difference!"
  },
  {
    keywords: ["document", "upload", "photo", "file", "attachment"],
    answer: "Yes! You can upload supporting documents like photos, PDFs, or reports when submitting a problem. This helps students and engineers better understand the issue. Document upload is completely optional but recommended for complex problems."
  },
  {
    keywords: ["how it works", "workflow", "process", "kaise kaam karta", "steps"],
    answer: "Simple 5-step process: 1) You report a problem → 2) AI analyzes and categorizes it → 3) Students build a solution → 4) Companies manufacture it → 5) Government deploys it in your area. You track everything in real-time and provide feedback!"
  },
  {
    keywords: ["domain", "category", "type", "select category"],
    answer: "When submitting a problem, you can select its domain like Water, Roads, Healthcare, etc. Don't worry if you're unsure - our AI will automatically detect and confirm the correct domain based on your description!"
  },
  {
    keywords: ["ngo", "community group", "organization", "samuh"],
    answer: "NGOs and Community Groups can register on ECHELON to report problems affecting multiple communities. You'll need your organization details and registration number. This helps us prioritize problems with larger impact!"
  },
  {
    keywords: ["duplicate", "already reported", "same problem", "pehle se"],
    answer: "If someone already reported the same problem, our AI will detect it and ask if you want to merge your report as a duplicate. This increases the problem's priority and shows how many people are affected!"
  },
  {
    keywords: ["video", "camera", "photo", "picture"],
    answer: "Yes! You can take or upload photos and videos while submitting a problem. Visual evidence helps students understand the issue better and build more accurate solutions. Just click the camera icon!"
  },
  {
    keywords: ["location", "gps", "address", "jagah"],
    answer: "You can share your location in 2 ways: 1) Enable GPS for automatic location, or 2) Manually enter the address/village/ward name. Accurate location helps in proper deployment of solutions!"
  }
];

export const PLATFORM_STATS = {
  totalReported: 14820,
  aiTriaged: 14210,
  prototypesBuilt: 4120,
  industryAdopted: 1290,
  govtDeployed: 860,
  activeInstitutions: 240,
  activeIndustries: 165,
  avgResolutionDays: 34,
  satisfactionRate: "94.8%"
};
