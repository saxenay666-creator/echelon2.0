# ECHELON Website Improvements Implementation Guide

## Summary of Changes Required

### 1. ✅ Back Navigation for Every Page
- Created BackButton component
- Will be added to all pages (SubmitProblem, ExploreProblems, ExploreSolutions, TrackProblem, Dashboard, HowItWorks, Leaderboard)

### 2. Update Problem Submitter Categories
**KEEP ONLY:**
- Individual (Citizen)
- Community Group (NGO) - NEW
- Panchayati Raj Institutions
- Urban Local Bodies
- Government Departments

**REMOVE:**
- ASHA Worker
- Anganwadi Worker
- Rozgar Sevak
- Pragya Kendra / CSC

### 3. Add Optional Document Upload to Problem Submission
- Add file upload field in SubmitProblem.jsx
- Support multiple document formats (PDF, DOC, images)
- Make it optional

### 4. Add Problem Domain Selection with AI Confirmation
**Major Domains to Add:**
- Water & Sanitation
- Agriculture & Storage
- Roads & Public Infrastructure
- Healthcare & Medical
- Clean Energy & Power
- Wildlife & Forest Safety
- Education & Digital Infrastructure
- Waste Management
- Transport & Connectivity

### 5. Offline Report Saving
- Implement IndexedDB for offline storage
- Detect internet connectivity
- Save forms locally when offline
- Auto-sync when online

### 6. Make Aadhaar Optional on Registration
- Update AuthModal.jsx to make Aadhaar field optional
- Remove 'required' attribute

### 7. Simplify "How It Works" Page
- Use simple, easy-to-understand language
- Add visual flowchart
- Remove technical jargon
- Make it more accessible

### 8. Reorder Languages
**New Order:**
1. English
2. Hindi
3. **Santali (Jharkhand)**
4. **Mundari (Jharkhand)**
5. **Ho (Jharkhand)**
6. **Kurukh (Jharkhand)**
7. Bengali
8. Marathi

### 9. Add AI Chatbot to Welcome Page
- Show chatbot on AuthGate (welcome page)
- Make it immediately visible and accessible

### 10. Feed AI Chatbot with Comprehensive Website Information
- Expand websiteKnowledge.js
- Add FAQ about all features
- Include platform workflow
- Add help for each user type

### 11. Keep Solution Givers As-Is
- No changes to solution provider categories
- Keep: Students, Universities, Industry, Government

## Implementation Status
- [ ] Task 1: Back Navigation
- [ ] Task 2: Update Problem Submitter Categories
- [ ] Task 3: Document Upload
- [ ] Task 4: Domain Selection
- [ ] Task 5: Offline Storage
- [ ] Task 6: Aadhaar Optional
- [ ] Task 7: Simplify How It Works
- [ ] Task 8: Language Reordering
- [ ] Task 9: Chatbot on Welcome
- [ ] Task 10: Enhanced AI Knowledge
