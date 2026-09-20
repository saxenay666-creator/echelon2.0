const normalize = (value = '') => value
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

const tokenize = (value = '') => [...new Set(normalize(value).split(/\s+/).filter(token => token.length > 2))];

const formatProblem = (problem) => {
  const solution = problem.solution
    ? ` A solution called "${problem.solution.title}" was proposed by ${problem.solution.university}.`
    : '';
  const deployment = problem.governmentDeployment
    ? ` Government deployment is recorded for ${problem.governmentDeployment.installedSites.join(', ')}.`
    : '';

  return `${problem.id}: ${problem.title}. Category: ${problem.category}. Status: ${problem.status}. Urgency: ${problem.urgency}. Location: ${problem.location}. ${problem.description}${solution}${deployment}`;
};

export const buildWebsiteKnowledge = ({ problems, stats, currentUser }) => [
  {
    title: 'What is ECHELON?',
    content: 'ECHELON is an AI-driven closed-loop civic innovation platform. It connects citizens and frontline workers with AI triage, university students, industry R&D teams, and government deployment so real community problems can become tested, scalable products.',
    keywords: 'echelon platform citizen innovation civic problem solution'
  },
  {
    title: 'Website navigation',
    content: 'The Home page explains the platform and shows live statistics. How It Works explains the six-stage innovation loop. Submit Problem lets a user report an issue using voice, text, photos, and location. Explore Problems is for reviewing AI-triaged challenges. Explore Solutions is for reviewing prototypes and industry adoption. Track Problem shows a problem timeline. Leaderboard shows participation and impact rankings. Dashboard shows the signed-in user’s activity.',
    keywords: 'home how it works submit problem explore problems explore solutions track leaderboard dashboard pages navigation'
  },
  {
    title: 'How to submit a problem',
    content: 'Open Submit Problem from the navigation or Home page. Describe the real community issue using voice or typed text, add a live or uploaded site photo when useful, confirm the location, identify who is affected, and submit. ECHELON automatically categorizes the report, detects similar reports, estimates severity, and matches relevant universities.',
    keywords: 'submit report complaint voice typing photo camera gps location category duplicate'
  },
  {
    title: 'The six-stage innovation loop',
    content: 'Stage 1 captures a grassroots problem from citizens or frontline workers. Stage 2 uses AI NLP triage and routes a technical dossier to matched universities. Stage 3 students and university labs build a prototype, typically TRL 4–7. Stage 4 industry evaluates feasibility, scales the product, and can offer the student an internship. Stage 5 government evaluates, funds, and deploys the product at the original site. Stage 6 citizens provide feedback; a rating below 4 stars restarts improvement, while a high rating closes the loop.',
    keywords: 'six stages workflow loop triage university student prototype industry internship government deployment feedback rating trl'
  },
  {
    title: 'Supported roles',
    content: 'ECHELON supports citizens, Panchayat Secretaries, Rozgar Sevaks, Pragya Kendra/CSC operators, ASHA Workers, Anganwadi Workers, students, university researchers, industry R&D teams, and government officials. Access and navigation are tailored to the signed-in role.',
    keywords: 'roles citizen panchayat rozgar csc pragya asha anganwadi student university industry government'
  },
  {
    title: 'Tracking a problem',
    content: 'Use Track Problem and enter a problem number such as ECH-2026-8821. The timeline can show submission, AI analysis, prototype development, industry scaling, government implementation, and citizen feedback. The Dashboard also lists problems submitted by the signed-in user.',
    keywords: 'track status problem number timeline dashboard progress'
  },
  {
    title: 'Emergency help',
    content: 'For a life-threatening emergency, call 112. The website emergency SOS panel can connect Police (112/100), Medical and Ambulance (108/102), Fire and Rescue (101), Women’s Safety (1091/181), NDRF/SDRF Disaster Relief (1078/1070), and Childline (1098). Use the Emergency button in the navigation; do not use a normal problem report for an immediate danger.',
    keywords: 'emergency sos police ambulance fire women child disaster helpline 112 108 101 1091 181 1078 1070 1098'
  },
  {
    title: 'Languages and accessibility',
    content: 'The language switcher supports English, Hindi, Santhali, Khortha, Nagpuri, Mundari, Ho, Kurukh, Bengali, Marathi, Tamil, Telugu, Gujarati, Odia, and Punjabi. Citizen users can use voice-oriented reporting and the citizen home page includes a listen-aloud guide.',
    keywords: 'language hindi bengali marathi santhali khortha nagpuri mundari ho kurukh tamil telugu gujarati odia punjabi voice accessibility'
  },
  {
    title: 'Platform statistics',
    content: `The current platform snapshot reports ${stats.totalReported} problems reported, ${stats.aiTriaged} AI triaged, ${stats.prototypesBuilt} prototypes built, ${stats.industryAdopted} industry-adopted solutions, ${stats.govtDeployed} government deployments, ${stats.activeInstitutions} active institutions, ${stats.activeIndustries} active industries, an average resolution time of ${stats.avgResolutionDays} days, and a ${stats.satisfactionRate} satisfaction rate.`,
    keywords: 'statistics stats numbers reported triaged prototypes adopted deployed institutions industries resolution satisfaction'
  },
  {
    title: 'Current user account',
    content: currentUser
      ? `You are signed in as ${currentUser.name} with the ${currentUser.roleLabel} role${currentUser.location ? ` in ${currentUser.location}` : ''}. Your Dashboard contains your activity.`
      : 'No user is currently signed in.',
    keywords: 'account profile signed in role location user dashboard'
  },
  ...problems.map(problem => ({
    title: `Problem ${problem.id}: ${problem.title}`,
    content: formatProblem(problem),
    keywords: `${problem.id} ${problem.title} ${problem.category} ${problem.location} ${problem.status} ${problem.description}`
  }))
];

export const findWebsiteKnowledge = (query, entries) => {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) return [];

  return entries
    .map(entry => {
      const titleTokens = tokenize(entry.title);
      const contentTokens = tokenize(`${entry.content} ${entry.keywords}`);
      const score = queryTokens.reduce((total, token) => {
        if (titleTokens.includes(token)) return total + 5;
        if (contentTokens.includes(token)) return total + 1;
        return total;
      }, 0);
      return { ...entry, score };
    })
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
