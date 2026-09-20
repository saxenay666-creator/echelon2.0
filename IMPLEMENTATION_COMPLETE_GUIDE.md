# ECHELON Website - Complete Implementation Guide

## All 11 Improvements Implementation

### ✅ 1. Back Navigation Component
**Status:** COMPLETED
- Created `BackButton.jsx` component
- Ready to be integrated into all pages

### 2. Update Problem Submitter Categories (IN PROGRESS)

**KEEP ONLY:**
1. **Individual (Citizen)** ✅ Already exists
2. **Community Group (NGO)** ⚠️ NEED TO ADD
3. **Panchayati Raj Institutions** ✅ Already exists  
4. **Urban Local Bodies** ✅ Already exists
5. **Government Departments** ✅ Already exists (govt_field)

**REMOVE:**
- ❌ ASHA Worker (asha_worker)
- ❌ Anganwadi Worker (anganwadi_worker)
- ❌ Rozgar Sevak (rozgar_sevak)
- ❌ Pragya Kendra / CSC (pragya_kendra)

**Files to Update:**
- `/src/data/mockData.js` - MOCK_ROLES array (lines 282-466)
- `/src/context/AppContext.jsx` - isProblemSubmitter function (lines 76-88)

### 3. Add Optional Document Upload

**Location:** `/src/pages/SubmitProblem.jsx`
**Changes:**
- Add document upload state
- Add file input UI with icon
- Store document reference
- Make it optional (no validation required)

### 4. Add Problem Domain Selection with AI Confirmation

**Domains to Add:**
1. Water & Sanitation
2. Agriculture & Storage
3. Roads & Public Infrastructure
4. Healthcare & Medical
5. Clean Energy & Power
6. Wildlife & Forest Safety
7. Education & Digital Infrastructure
8. Waste Management
9. Transport & Connectivity

**Implementation:**
- Add domain dropdown in SubmitProblem.jsx
- AI validates domain matches title/description
- Show confirmation message

### 5. Offline Report Saving

**Implementation:**
- Use IndexedDB for offline storage
- Detect navigator.onLine
- Save form data locally when offline
- Auto-sync when connection restored
- Show offline indicator

### 6. Make Aadhaar Optional

**File:** `/src/components/AuthModal.jsx`
**Change:** Remove `required` attribute from Aadhaar field if it exists
**Note:** Current code doesn't have Aadhaar field - may need to add it as optional

### 7. Simplify "How It Works" Page

**File:** `/src/pages/HowItWorks.jsx`
**Changes:**
- Rewrite in simple language
- Remove technical jargon
- Add visual flowchart using mermaid or SVG
- Make step-by-step easy to understand

### 8. Reorder Languages

**File:** `/src/translations/translations.js`
**New Order:**
1. English (en)
2. Hindi (hi)
3. **Santali (sat)** - Jharkhand
4. **Mundari (unr)** - Jharkhand
5. **Ho (hoc)** - Jharkhand  
6. **Kurukh/Oraon (kru)** - Jharkhand
7. Bengali (bn)
8. Marathi (mr)

### 9. Add AI Chatbot to Welcome Page

**File:** `/src/components/AuthGate.jsx`
**Change:** Make AIChatbot visible on the auth/welcome screen

### 10. Feed AI Chatbot with Website Information

**Files:**
- `/src/data/websiteKnowledge.js` (create if doesn't exist)
- Update `INSTANT_AI_KNOWLEDGE_BASE` in mockData.js
**Content:** Add comprehensive FAQ about platform features, workflow, user types

### 11. Keep Solution Givers As-Is ✅

**No Changes Required** - Solution provider roles remain unchanged:
- Students
- Universities
- Industry
- Government Implementation

---

## Implementation Priority Order:

1. ✅ Back Button (DONE)
2. 🔄 Update Problem Submitter Categories (HIGH PRIORITY)
3. 🔄 Add Document Upload (MEDIUM)
4. 🔄 Add Domain Selection (MEDIUM)
5. 🔄 Make Aadhaar Optional (LOW - field doesn't exist)
6. 🔄 Simplify How It Works (MEDIUM)
7. 🔄 Reorder Languages (EASY)
8. 🔄 Chatbot on Welcome Page (EASY)
9. 🔄 Enhanced AI Knowledge (MEDIUM)
10. 🔄 Offline Saving (COMPLEX)

---

## Next Steps:

I'll now implement these changes file by file, starting with the highest priority items.
