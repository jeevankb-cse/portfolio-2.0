export type ProjectCategory =
  | 'All Works'
  | 'NLP & Cybersecurity'
  | 'Conversational AI'
  | 'Audio Forensics'
  | 'Computer Vision';

export interface SimulationScenario {
  id: string;
  label: string;
  inputSummary: string;
  pipelineStageMetrics: {
    stage: string;
    metric: string;
  }[];
  verdictLabel: string;
  verdictTone: 'safe' | 'warning' | 'danger';
  explanation: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All Works'>;
  featuredSpan: 'wide' | 'standard';
  year: string;
  recognition?: string;
  githubUrl: string;
  summary: string;
  problemStatement: string;
  architectureOverview: string;
  bullets: string[];
  technologies: string[];
  architectureNodes: {
    step: string;
    title: string;
    detail: string;
  }[];
  scenarios: SimulationScenario[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  scoreLabel: string;
  scoreValue: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  location: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export type SkillDomain =
  | 'All Domains'
  | 'Languages'
  | 'AI & Machine Learning'
  | 'Frameworks & Web'
  | 'Developer Tools & Git'
  | 'Core CS Coursework';

export interface SkillItem {
  name: string;
  domain: Exclude<SkillDomain, 'All Domains'>;
  proficiencyNote: string;
  appliedIn: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
  focusArea: string;
}

export interface HackathonItem {
  id: string;
  title: string;
  status: string;
  projectRef?: string;
  problemStatementCode?: string;
  year: string;
  description: string;
}

export interface RoadJourneyStop {
  id: string;
  stopNumber: string;
  kilometerMark: string;
  city: string;
  fullLocation: string;
  period: string;
  category: 'Education' | 'Industry Experience';
  highwayBadge: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  summary: string;
  highlights: string[];
  toolsOrSubjects: string[];
}

export const PROFILE_DATA = {
  name: 'Jeevan K B',
  role: 'AI & Machine Learning Engineer',
  degreeTagline: 'B.E. in Computer Science & Engineering · City Engineering College',
  location: 'Bull Temple Road, Basavanagudi, Bengaluru, Karnataka - 560004',
  shortLocation: 'Basavanagudi, Bengaluru, India',
  phone: '+91-8317453797',
  phoneHref: 'tel:+918317453797',
  email: 'jeevankenchalli514@gmail.com',
  emailHref: 'mailto:jeevankenchalli514@gmail.com',
  githubUrl: 'https://github.com/jeevankb-cse',
  githubHandle: 'github.com/jeevankb-cse',
  linkedinUrl: 'https://www.linkedin.com/in/jeevankb-cse/',
  linkedinHandle: 'linkedin.com/in/jeevankb-cse',
  portraitPath: '/assets/aistudio/Clean-Shaven_Portrait_with_Mustache_2888df09.png',
  resumePdfPath: '/assets/aistudio/Jeevan_AI_Developer_Resume__beae487a.pdf',
  resumeRenderedImagePath: '/assets/aistudio/Jeevan_Resume_Rendered.png',
  brandedDomainDisplay: 'https://portfolio.jeevankb.com',
  githubPagesUrl: 'https://jeevankb-cse.github.io/Portfolio-2.0',
  portfolioRepoUrl: 'https://github.com/jeevankb-cse/Portfolio-2.0',
  portfolioGitRemote: 'https://github.com/jeevankb-cse/Portfolio-2.0.git',
  publicPortfolioUrl:
    'https://ais-pre-jqseuhul3azqkonyykscxv-976219236024.asia-east1.run.app',
  careerObjective:
    'Computer Science engineering student with a strong foundation in Python and AI/ML, experienced in developing projects involving machine learning, deep learning, NLP, and computer vision. Seeking an opportunity to apply technical skills and build innovative AI-driven solutions.',
  languages: ['English', 'Kannada', 'Hindi'],
  interests: ['Open-Source Software', 'Geopolitics', 'Cricket', 'Volleyball'],
  keyMetrics: [
    {
      value: '8.48',
      unit: 'CGPA',
      label: 'B.E. Computer Science & Engineering',
      context: 'City Engineering College, Bengaluru (2023 – Present)',
    },
    {
      value: '06',
      unit: 'Months',
      label: 'Industry AI Internship Experience',
      context: 'Recursive Coders, Vijayanagar, Bengaluru',
    },
    {
      value: '04',
      unit: 'Systems',
      label: 'End-to-End AI & Vision Architectures',
      context: 'Spanning NLP, OCR, Acoustic Forensics & Biometrics',
    },
    {
      value: 'SIH 26',
      unit: 'Selected',
      label: 'Smart India Hackathon First Round',
      context: 'Selected for WeatherGPT (Problem Statement PS 26068)',
    },
  ],
};

export const PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'scamshield-ai',
    index: '01',
    title: 'ScamShield AI',
    subtitle: 'Multi-Channel Fraud Detection Platform',
    category: 'NLP & Cybersecurity',
    featuredSpan: 'wide',
    year: '2026',
    recognition: 'Multi-Modal OCR + NLP Security Pipeline',
    githubUrl: 'https://github.com/jeevankb-cse/ScamShield-AI',
    summary:
      'A Python-based AI cybersecurity platform engineered to detect financial scams and phishing attacks across SMS, WhatsApp messages, emails, suspicious URLs, screenshots, and PDF invoices.',
    problemStatement:
      'Modern digital fraud spans unstructured text messages, obfuscated links, and doctored payment screenshots or PDF invoices, bypassing single-channel spam filters.',
    architectureOverview:
      'Combines OpenCV image pre-processing and Tesseract OCR for visual documents with a Scikit-learn NLP token classification pipeline served through a Flask API to output calibrated threat scores.',
    bullets: [
      'Developed a Python-based AI cybersecurity platform to detect scams across SMS, WhatsApp, emails, URLs, screenshots, and PDF invoices.',
      'Implemented NLP-based scam classification, OCR text extraction, and risk scoring using Flask, Scikit-learn, OpenCV, and Tesseract OCR.',
    ],
    technologies: ['Python', 'Flask', 'Scikit-learn', 'NLP', 'OpenCV', 'Tesseract OCR'],
    architectureNodes: [
      {
        step: '01',
        title: 'Multi-Modal Ingestion',
        detail: 'Accepts raw SMS/WhatsApp text, URLs, image screenshots, and PDF invoices.',
      },
      {
        step: '02',
        title: 'OpenCV + Tesseract OCR',
        detail: 'Adaptive thresholding, deskewing, and text extraction from visual receipts.',
      },
      {
        step: '03',
        title: 'NLP Feature & Lexical Vectorizer',
        detail: 'TF-IDF n-gram extraction, urgency heuristics, and URL entropy inspection.',
      },
      {
        step: '04',
        title: 'Calibrated Risk Scoring',
        detail: 'Scikit-learn classifier outputs a 0–100 threat index with explainable flags.',
      },
    ],
    scenarios: [
      {
        id: 'scam-sms',
        label: 'Phishing SMS + Masked Link',
        inputSummary:
          '"URGENT: Your SBI account KYC expires today. Update immediately at http://bit.ly/sbi-kyc-verify99 to avoid suspension."',
        pipelineStageMetrics: [
          { stage: 'Ingestion Channel', metric: 'SMS / URL Payload' },
          { stage: 'Lexical Urgency Signal', metric: '0.96 (High Coercion)' },
          { stage: 'URL Domain Reputation', metric: 'Shortened / Unverified Redirect' },
          { stage: 'Composite Threat Score', metric: '94 / 100' },
        ],
        verdictLabel: 'High-Risk Scam Detected (94/100)',
        verdictTone: 'danger',
        explanation:
          'Flagged due to coercive account-suspension phrasing combined with an obfuscated URL shortener impersonating a banking institution.',
      },
      {
        id: 'scam-invoice',
        label: 'Doctored PDF Invoice via OCR',
        inputSummary:
          'Uploaded PDF Invoice #INV-8821 containing altered UPI beneficiary handle and mismatched tax registration block.',
        pipelineStageMetrics: [
          { stage: 'OpenCV Pre-Pass', metric: '300 DPI Adaptive Binary' },
          { stage: 'Tesseract OCR Confidence', metric: '98.2% Character Recall' },
          { stage: 'Invoice Anomaly Index', metric: '0.87 (Payment Handle Mismatch)' },
          { stage: 'Composite Threat Score', metric: '87 / 100' },
        ],
        verdictLabel: 'Fraudulent Invoice Flagged (87/100)',
        verdictTone: 'danger',
        explanation:
          'OCR extracted text reveals urgent wire-transfer override instructions and inconsistent vendor metadata.',
      },
      {
        id: 'safe-dispatch',
        label: 'Verified Transactional Notice',
        inputSummary:
          '"Your electricity bill for consumer ID 4920182 of Rs. 840.00 has been paid via BESCOM official portal."',
        pipelineStageMetrics: [
          { stage: 'Ingestion Channel', metric: 'Transactional SMS' },
          { stage: 'Lexical Urgency Signal', metric: '0.04 (Neutral)' },
          { stage: 'URL / Link Presence', metric: 'None (Informational)' },
          { stage: 'Composite Threat Score', metric: '06 / 100' },
        ],
        verdictLabel: 'Verified Safe Communication (06/100)',
        verdictTone: 'safe',
        explanation:
          'Matches standard utility confirmation patterns with zero phishing links or credential-harvesting prompts.',
      },
    ],
  },
  {
    id: 'weathergpt',
    index: '02',
    title: 'WeatherGPT',
    subtitle: 'Conversational AI Weather Platform',
    category: 'Conversational AI',
    featuredSpan: 'standard',
    year: '2026',
    recognition: 'SIH 2026 First Round Selection (PS 26068)',
    githubUrl: 'https://github.com/jeevankb-cse/WeatherGPT',
    summary:
      'An AI-powered weather intelligence platform built for conversational forecasting, real-time severe weather alerts, and localized climate advisories.',
    problemStatement:
      'Raw meteorological dashboards overwhelm everyday users and field planners with numeric tables rather than actionable, location-aware advisories in natural language.',
    architectureOverview:
      'Parses conversational queries via NLP to extract geospatial coordinates, temporal windows, and activity context, fusing live weather API telemetry into actionable advisories.',
    bullets: [
      'Developed an AI-powered weather platform for conversational forecasting, weather alerts, and climate information.',
      'Integrated live weather APIs, natural language processing, location-based forecasts, and contextual advisories.',
    ],
    technologies: ['Python', 'NLP', 'Live Weather APIs', 'FastAPI', 'React.js', 'Geospatial Forecasting'],
    architectureNodes: [
      {
        step: '01',
        title: 'Natural Language Query Parser',
        detail: 'Extracts location entities, time horizon, and user activity intent.',
      },
      {
        step: '02',
        title: 'Live Telemetry Aggregation',
        detail: 'Queries real-time meteorological APIs for precipitation, wind, UV, and pressure.',
      },
      {
        step: '03',
        title: 'Contextual Advisory Engine',
        detail: 'Synthesizes weather thresholds into human-readable safety and travel guidance.',
      },
    ],
    scenarios: [
      {
        id: 'weather-bengaluru',
        label: 'Bengaluru Commute Rain Alert',
        inputSummary:
          '"Will heavy rain disrupt evening travel around Basavanagudi, Bengaluru between 5 PM and 8 PM?"',
        pipelineStageMetrics: [
          { stage: 'Resolved Coordinates', metric: '12.9406° N, 77.5738° E' },
          { stage: 'Precipitation Probability', metric: '82% (16.4 mm expected)' },
          { stage: 'Wind Gusts', metric: '28 km/h WSW' },
          { stage: 'Alert Level', metric: 'Moderate Thunderstorm Advisory' },
        ],
        verdictLabel: 'Thunderstorm Advisory Issued',
        verdictTone: 'warning',
        explanation:
          'High convective rainfall probability between 17:30–19:15 IST; advises Green Line Metro transit and avoiding low-lying underpasses.',
      },
      {
        id: 'weather-agri',
        label: '72-Hour Regional Climate Window',
        inputSummary:
          '"What is the humidity and temperature outlook for outdoor field work in Shivamogga this weekend?"',
        pipelineStageMetrics: [
          { stage: 'Resolved Coordinates', metric: '13.9299° N, 75.5681° E' },
          { stage: 'Peak Temperature', metric: '31.5°C / 21.0°C' },
          { stage: 'Relative Humidity', metric: '46% Daytime Average' },
          { stage: 'Alert Level', metric: 'Clear Field Window' },
        ],
        verdictLabel: 'Optimal Outdoor Window Confirmed',
        verdictTone: 'safe',
        explanation:
          'Stable dry atmospheric pressure over the next 72 hours with low UV index after 15:30 IST.',
      },
    ],
  },
  {
    id: 'voxveritas',
    index: '03',
    title: 'VoxVeritas',
    subtitle: 'AI Synthetic Voice Detection System',
    category: 'Audio Forensics',
    featuredSpan: 'standard',
    year: '2026',
    recognition: 'Acoustic Forensics + TypeScript Dashboard',
    githubUrl: 'https://github.com/jeevankb-cse/VoxVeritas',
    summary:
      'An AI audio forensics system engineered to distinguish synthetic AI-generated voice clones from authentic human speech using spectral and acoustic analysis.',
    problemStatement:
      'Zero-shot neural voice cloning enables convincing audio impersonation, requiring spectral artifact analysis beyond human auditory perception.',
    architectureOverview:
      'Extracts Mel-Frequency Cepstral Coefficients (MFCCs), spectral flatness, and pitch micro-jitter in a Python audio pipeline and streams forensic diagnostics to a TypeScript web dashboard.',
    bullets: [
      'Developed an AI-powered system to distinguish synthetic AI-generated voices from human speech using acoustic analysis.',
      'Built a Python-based audio detection pipeline with a TypeScript web dashboard.',
    ],
    technologies: ['Python', 'Machine Learning', 'Acoustic Analysis', 'TypeScript', 'React.js', 'NumPy'],
    architectureNodes: [
      {
        step: '01',
        title: 'Audio Frame Normalization',
        detail: 'Resamples input waveform to 16kHz/44.1kHz mono and strips silence segments.',
      },
      {
        step: '02',
        title: 'Spectral & MFCC Extraction',
        detail: 'Computes 40-band MFCCs, spectral roll-off, and harmonic-to-noise ratios.',
      },
      {
        step: '03',
        title: 'TypeScript Forensics Dashboard',
        detail: 'Visualizes authenticity confidence, vocoder artifacts, and segment timelines.',
      },
    ],
    scenarios: [
      {
        id: 'vox-clone',
        label: 'Neural Vocoder Deepfake Sample',
        inputSummary:
          'Audio stream: 12.4s executive wire-authorization voice note (44.1kHz WAV).',
        pipelineStageMetrics: [
          { stage: 'MFCC High-Band Variance', metric: '0.12 (Unnaturally Uniform)' },
          { stage: 'Phase Discontinuity (6.5kHz+)', metric: 'Detected (Vocoder Artifact)' },
          { stage: 'Glottal Micro-Tremor', metric: 'Absent' },
          { stage: 'Synthetic Probability', metric: '96.4% AI-Generated' },
        ],
        verdictLabel: 'Synthetic AI Voice Detected (96.4%)',
        verdictTone: 'danger',
        explanation:
          'High-frequency phase metallic smoothing and uniform pitch transitions indicate neural TTS vocoder synthesis.',
      },
      {
        id: 'vox-human',
        label: 'Authentic Microphone Speech',
        inputSummary:
          'Audio stream: 18.0s live interview recording with natural room acoustics.',
        pipelineStageMetrics: [
          { stage: 'MFCC High-Band Variance', metric: '0.84 (Organic Formant Shift)' },
          { stage: 'Phase Discontinuity (6.5kHz+)', metric: 'None' },
          { stage: 'Glottal Micro-Tremor', metric: 'Natural (0.9% Jitter)' },
          { stage: 'Human Authenticity Score', metric: '98.1% Authentic' },
        ],
        verdictLabel: 'Authentic Human Speech (98.1%)',
        verdictTone: 'safe',
        explanation:
          'Natural sub-glottal breath harmonics and organic pitch micro-variations verified across all voiced frames.',
      },
    ],
  },
  {
    id: 'smart-voting-system',
    index: '04',
    title: 'Smart Voting System',
    subtitle: 'Biometric Face Recognition & Liveness Verification',
    category: 'Computer Vision',
    featuredSpan: 'wide',
    year: '2025',
    recognition: 'KNN Face Biometrics + Blink Liveness + Hashed Ledger',
    githubUrl: 'https://github.com/jeevankb-cse/Smart-voting-system-using-face-recognition',
    summary:
      'A Python-based biometric voting application utilizing OpenCV, Flask, and K-Nearest Neighbors (KNN) for real-time facial authentication, blink-based anti-spoofing liveness checks, and hashed voter verification.',
    problemStatement:
      'Conventional digital voting prototypes are vulnerable to printed photograph spoofing and duplicate ballot submission without biometric liveness and cryptographic deduplication.',
    architectureOverview:
      'Captures real-time video frames via OpenCV, verifies human presence through Eye Aspect Ratio (EAR) blink detection, classifies facial embeddings with KNN, and validates one-way hashed voter IDs in Flask.',
    bullets: [
      'Developed a Python-based voting application using OpenCV, Flask, and K-Nearest Neighbors (KNN) for face recognition.',
      'Implemented blink-based liveness detection and hashed voter verification to help prevent duplicate voting.',
    ],
    technologies: ['Python', 'OpenCV', 'Flask', 'K-Nearest Neighbors (KNN)', 'Scikit-learn', 'HTML/CSS'],
    architectureNodes: [
      {
        step: '01',
        title: 'OpenCV Face Detection',
        detail: 'Locates facial bounding box and 68 facial landmarks in real-time webcam stream.',
      },
      {
        step: '02',
        title: 'Blink-Based Liveness Gate',
        detail: 'Monitors Eye Aspect Ratio (EAR) transitions to block static photo/screen spoofs.',
      },
      {
        step: '03',
        title: 'KNN Facial Classification',
        detail: 'Matches normalized facial feature vectors against registered voter embeddings.',
      },
      {
        step: '04',
        title: 'Hashed Ballot Deduplication',
        detail: 'Verifies cryptographic voter hash before committing an immutable single ballot.',
      },
    ],
    scenarios: [
      {
        id: 'vote-verified',
        label: 'Registered Voter + Active Blink Liveness',
        inputSummary:
          'Live webcam stream: Registered Voter ID #KA-BLR-4092 completes natural blink sequence.',
        pipelineStageMetrics: [
          { stage: 'Eye Aspect Ratio (EAR)', metric: '0.31 → 0.13 → 0.31 (Verified Blink)' },
          { stage: 'KNN Nearest-Neighbor Match', metric: '99.1% Confidence (k=5)' },
          { stage: 'SHA-256 Voter Hash Status', metric: 'Unspent Ballot Token' },
          { stage: 'Authorization Gate', metric: 'Granted' },
        ],
        verdictLabel: 'Biometric & Liveness Verified — Ballot Unlocked',
        verdictTone: 'safe',
        explanation:
          'Active eye-blink liveness confirmed real human presence, KNN matched registered voter embedding, and hash ledger confirmed zero prior votes.',
      },
      {
        id: 'vote-spoof',
        label: 'Static Photo Spoof Attempt',
        inputSummary:
          'High-resolution printed portrait held in front of optical camera sensor.',
        pipelineStageMetrics: [
          { stage: 'Eye Aspect Ratio (EAR)', metric: '0.29 Constant (0 Blinks in 90 Frames)' },
          { stage: 'KNN Nearest-Neighbor Match', metric: 'Halted at Liveness Gate' },
          { stage: 'SHA-256 Voter Hash Status', metric: 'Locked' },
          { stage: 'Authorization Gate', metric: 'Rejected (Anti-Spoofing)' },
        ],
        verdictLabel: 'Spoof Blocked — Liveness Check Failed',
        verdictTone: 'danger',
        explanation:
          'Rejected prior to ballot access because Eye Aspect Ratio exhibited zero dynamic blink variance across the verification window.',
      },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'recursive-coders',
    role: 'AI Intern',
    organization: 'Recursive Coders',
    duration: '6 Months',
    location: 'Vijayanagar, Bengaluru, Karnataka',
    summary:
      'Completed an intensive 6-month Artificial Intelligence and Machine Learning internship focused on practical model implementation, Python data pipelines, and applied problem-solving.',
    bullets: [
      'Gained practical experience in Artificial Intelligence and Machine Learning through hands-on development and technical tasks.',
      'Worked with Python and AI/ML concepts to strengthen problem-solving and implementation skills.',
    ],
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'NumPy', 'Pandas', 'NLP', 'Model Evaluation'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'city-engineering-college',
    institution: 'City Engineering College',
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    scoreLabel: 'CGPA',
    scoreValue: '8.48',
    period: '2023 – Present',
    location: 'Bengaluru, Karnataka',
    highlights: [
      'Core focus on Data Structures and Algorithms, Object-Oriented Programming, DBMS, Operating Systems, and Computer Networks.',
      'Lead developer on Smart India Hackathon (SIH) 2026 selected project WeatherGPT (PS 26068).',
    ],
  },
  {
    id: 'akshara-pu-college',
    institution: 'Akshara PU College',
    degree: 'Pre-University Course (PUC — Science Stream)',
    scoreLabel: 'Percentage',
    scoreValue: '85.85%',
    period: '2022 – 2023',
    location: 'Shivamogga, Karnataka',
    highlights: [
      'Completed Pre-University education with distinction in Mathematics, Physics, Chemistry, and Computer Science.',
    ],
  },
  {
    id: 'shri-jnanakshi-school',
    institution: 'Shri Jnanakshi Vidyaniketan English Medium High School',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    scoreLabel: 'Percentage',
    scoreValue: '83.84%',
    period: '2020 – 2021',
    location: 'Davanagere, Karnataka',
    highlights: [
      'Strong foundational distinction in analytical mathematics and sciences.',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // Languages
  {
    name: 'Python (Core)',
    domain: 'Languages',
    proficiencyNote: 'Primary language for ML pipelines, backend APIs, OCR, and computer vision',
    appliedIn: ['ScamShield AI', 'WeatherGPT', 'VoxVeritas', 'Smart Voting System'],
  },
  {
    name: 'SQL',
    domain: 'Languages',
    proficiencyNote: 'Relational schema design, querying, and persistence via MySQL Workbench',
    appliedIn: ['Smart Voting System', 'DBMS Coursework'],
  },
  {
    name: 'JavaScript (Basics) & TypeScript',
    domain: 'Languages',
    proficiencyNote: 'Interactive frontend dashboards and typed client interfaces',
    appliedIn: ['VoxVeritas', 'WeatherGPT'],
  },
  // AI & Machine Learning
  {
    name: 'Machine Learning',
    domain: 'AI & Machine Learning',
    proficiencyNote: 'Supervised classification, KNN biometrics, risk scoring, and feature engineering',
    appliedIn: ['ScamShield AI', 'VoxVeritas', 'Smart Voting System'],
  },
  {
    name: 'Deep Learning (Basics)',
    domain: 'AI & Machine Learning',
    proficiencyNote: 'Neural network fundamentals and TensorFlow model workflows',
    appliedIn: ['VoxVeritas', 'Recursive Coders Internship'],
  },
  {
    name: 'Natural Language Processing (NLP)',
    domain: 'AI & Machine Learning',
    proficiencyNote: 'Scam text classification, conversational query parsing, and intent detection',
    appliedIn: ['ScamShield AI', 'WeatherGPT'],
  },
  {
    name: 'Scikit-learn',
    domain: 'AI & Machine Learning',
    proficiencyNote: 'Classification pipelines, KNN models, TF-IDF vectorization, and metrics',
    appliedIn: ['ScamShield AI', 'Smart Voting System'],
  },
  {
    name: 'NumPy & Pandas',
    domain: 'AI & Machine Learning',
    proficiencyNote: 'Vectorized numerical computing, tabular feature manipulation, and signal arrays',
    appliedIn: ['ScamShield AI', 'VoxVeritas', 'Smart Voting System'],
  },
  // Frameworks & Web
  {
    name: 'OpenCV',
    domain: 'Frameworks & Web',
    proficiencyNote: 'Real-time face recognition, blink liveness detection, and document pre-processing',
    appliedIn: ['Smart Voting System', 'ScamShield AI'],
  },
  {
    name: 'TensorFlow',
    domain: 'Frameworks & Web',
    proficiencyNote: 'Deep learning model experimentation and acoustic/vision representations',
    appliedIn: ['VoxVeritas'],
  },
  {
    name: 'Flask',
    domain: 'Frameworks & Web',
    proficiencyNote: 'Lightweight Python web servers for ML inference endpoints and biometric workflows',
    appliedIn: ['ScamShield AI', 'Smart Voting System'],
  },
  {
    name: 'FastAPI & Django',
    domain: 'Frameworks & Web',
    proficiencyNote: 'RESTful backend architecture, structured routing, and high-speed API integration',
    appliedIn: ['WeatherGPT'],
  },
  {
    name: 'React.js, HTML & CSS',
    domain: 'Frameworks & Web',
    proficiencyNote: 'Responsive frontend interfaces, forensic dashboards, and interactive views',
    appliedIn: ['VoxVeritas', 'WeatherGPT'],
  },
  // Developer Tools & Git
  {
    name: 'Git & GitHub',
    domain: 'Developer Tools & Git',
    proficiencyNote: 'Version control, open-source repository management, and collaborative workflows',
    appliedIn: ['ScamShield AI', 'WeatherGPT', 'VoxVeritas', 'Smart Voting System'],
  },
  {
    name: 'VS Code, Jupyter Notebook & Google Colab',
    domain: 'Developer Tools & Git',
    proficiencyNote: 'Interactive notebook experimentation, GPU model training, and modular IDE development',
    appliedIn: ['Recursive Coders Internship', 'ScamShield AI', 'VoxVeritas'],
  },
  {
    name: 'Postman & MySQL Workbench',
    domain: 'Developer Tools & Git',
    proficiencyNote: 'REST API endpoint validation, payload testing, and database administration',
    appliedIn: ['WeatherGPT', 'ScamShield AI'],
  },
  // Core CS Coursework
  {
    name: 'Data Structures & Algorithms (DSA)',
    domain: 'Core CS Coursework',
    proficiencyNote: 'Algorithmic complexity, graph/tree traversal, searching, and optimization',
    appliedIn: ['City Engineering College B.E. CSE'],
  },
  {
    name: 'Object-Oriented Programming (OOP)',
    domain: 'Core CS Coursework',
    proficiencyNote: 'Modular class hierarchies, encapsulation, and maintainable system design',
    appliedIn: ['City Engineering College B.E. CSE'],
  },
  {
    name: 'DBMS, Operating Systems & Computer Networks',
    domain: 'Core CS Coursework',
    proficiencyNote: 'ACID transactions, process scheduling, concurrency, and TCP/IP HTTP protocols',
    appliedIn: ['City Engineering College B.E. CSE'],
  },
];

export const HACKATHONS_DATA: HackathonItem[] = [
  {
    id: 'sih-2026',
    title: 'Smart India Hackathon (SIH) 2026',
    status: 'First Round Selection',
    projectRef: 'WeatherGPT',
    problemStatementCode: 'PS 26068',
    year: '2026',
    description:
      'Selected in the First Round of Smart India Hackathon 2026 for engineering WeatherGPT (Problem Statement PS 26068), an AI-driven conversational weather forecasting and climate advisory platform.',
  },
  {
    id: 'elite-hack-1',
    title: 'Elite Hack 1.0',
    status: 'National Hackathon Participant & Certified',
    year: '2025 – 2026',
    description:
      'Competed in rapid AI prototype engineering, building practical machine learning solutions under tight evaluation constraints.',
  },
  {
    id: '3svk-cloud-ai',
    title: '3SVK National Cloud & AI Innovation Challenge',
    status: 'National Finalist / Participant',
    year: '2025 – 2026',
    description:
      'Developed cloud-integrated artificial intelligence architectures as part of the national innovation challenge.',
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-cloud-ai',
    title: 'National Cloud & AI Innovation Challenge',
    issuer: '3SVK National Innovation Council',
    year: '2026',
    credentialUrl: 'https://drive.google.com/file/d/1SXcYTSGCHiby-jFoRTlIzksPGh71-epI/view',
    focusArea: 'Cloud Architecture & Applied Artificial Intelligence',
  },
  {
    id: 'cert-elite-hack',
    title: 'Elite Hack 1.0',
    issuer: 'Elite Hack National Organizing Committee',
    year: '2026',
    credentialUrl: 'https://drive.google.com/file/d/1GrhXIpFD-YCqTlqgn3iHyGTKn24WgA6m/view',
    focusArea: 'Competitive Hackathon & Rapid Prototyping',
  },
  {
    id: 'cert-iitm-gpai',
    title: 'IIT Madras – GPAi Certification',
    issuer: 'Indian Institute of Technology (IIT) Madras',
    year: '2026',
    credentialUrl: 'https://drive.google.com/file/d/1C9TsWYOz3uZvzpRezKN8_mp6paPg4F6d/view',
    focusArea: 'Artificial Intelligence & Problem Solving',
  },
  {
    id: 'cert-devcation-delhi',
    title: 'Devcation Delhi 2026',
    issuer: 'Devcation Delhi Technical Conclave',
    year: '2026',
    credentialUrl: 'https://drive.google.com/file/d/1sC2AQBwUJOdwjucYQnirw8QTW28Ljl0v/view',
    focusArea: 'Software Engineering & AI Systems Innovation',
  },
];

export const ROAD_JOURNEY_STOPS: RoadJourneyStop[] = [
  {
    id: 'stop-01-davanagere',
    stopNumber: '01',
    kilometerMark: 'KM 000 · Origin',
    city: 'Davanagere',
    fullLocation: 'Davanagere, Karnataka',
    period: '2020 – 2021',
    category: 'Education',
    highwayBadge: 'Checkpoint 01 · SSLC Foundation',
    title: 'Shri Jnanakshi Vidyaniketan English Medium High School',
    subtitle: 'Secondary School Leaving Certificate (SSLC)',
    metricLabel: 'Percentage',
    metricValue: '83.84%',
    summary:
      'Started the academic journey in Davanagere with strong foundational distinction in analytical mathematics, science, and structured problem solving.',
    highlights: [
      'Completed SSLC board examinations with 83.84% aggregate distinction.',
      'Built early analytical rigor in algebra, geometry, and scientific principles.',
    ],
    toolsOrSubjects: ['Mathematics', 'General Science', 'Analytical Reasoning'],
  },
  {
    id: 'stop-02-shivamogga',
    stopNumber: '02',
    kilometerMark: 'KM 098 · North-West Route',
    city: 'Shivamogga',
    fullLocation: 'Shivamogga, Karnataka',
    period: '2022 – 2023',
    category: 'Education',
    highwayBadge: 'Checkpoint 02 · Pre-University Science',
    title: 'Akshara PU College',
    subtitle: 'Pre-University Course (PUC — Science Stream)',
    metricLabel: 'Percentage',
    metricValue: '85.85%',
    summary:
      'Traveled to Shivamogga for Pre-University specialization in the Science stream, accelerating in Computer Science and quantitative sciences.',
    highlights: [
      'Graduated with 85.85% distinction across Physics, Chemistry, Mathematics, and Computer Science.',
      'Transitioned from mathematical theory to programming fundamentals and algorithmic logic.',
    ],
    toolsOrSubjects: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
  },
  {
    id: 'stop-03-bengaluru-cec',
    stopNumber: '03',
    kilometerMark: 'KM 380 · Tech Capital',
    city: 'Bengaluru',
    fullLocation: 'Bengaluru, Karnataka',
    period: '2023 – Present',
    category: 'Education',
    highwayBadge: 'Checkpoint 03 · B.E. CSE Headquarters',
    title: 'City Engineering College',
    subtitle: 'Bachelor of Engineering in Computer Science and Engineering',
    metricLabel: 'CGPA',
    metricValue: '8.48',
    summary:
      'Arrived in Bengaluru to pursue B.E. in Computer Science & Engineering, architecting end-to-end AI, NLP, and Computer Vision systems.',
    highlights: [
      'Maintaining an 8.48 CGPA while mastering Data Structures & Algorithms, OOP, DBMS, Operating Systems, and Computer Networks.',
      'Selected in Smart India Hackathon (SIH) 2026 First Round for WeatherGPT (Problem Statement PS 26068).',
    ],
    toolsOrSubjects: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'AI & ML'],
  },
  {
    id: 'stop-04-recursive-coders',
    stopNumber: '04',
    kilometerMark: 'KM 392 · Vijayanagar Hub',
    city: 'Vijayanagar, Bengaluru',
    fullLocation: 'Vijayanagar, Bengaluru, Karnataka',
    period: '6 Months',
    category: 'Industry Experience',
    highwayBadge: 'Checkpoint 04 · Industry AI Expedition',
    title: 'AI Intern — Recursive Coders',
    subtitle: 'Applied Artificial Intelligence & Machine Learning Internship',
    metricLabel: 'Duration',
    metricValue: '6 Months',
    summary:
      'Completed an intensive 6-month hands-on AI & Machine Learning internship in Vijayanagar, Bengaluru, translating research concepts into working Python systems.',
    highlights: [
      'Gained practical experience in Artificial Intelligence and Machine Learning through hands-on development and technical tasks.',
      'Worked with Python and AI/ML concepts to strengthen problem-solving and implementation skills.',
    ],
    toolsOrSubjects: ['Python', 'Machine Learning', 'Scikit-learn', 'NumPy', 'Pandas', 'NLP', 'Model Evaluation'],
  },
];

