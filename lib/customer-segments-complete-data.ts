// Complete Customer Segments Data from Excel
export interface SegmentOverview {
  id: string;
  segment: string;
  nickname: string;
  ageRange: string;
  incomeNetWorth: string;
  currentHealthSpend: string;
  marketSize: string;
  primaryMotivation: string;
}

export interface PainPoint {
  id: string;
  segment: string;
  primaryPainPoints: string[];
  secondaryPainPoints: string[];
  currentSolutions: string[];
  whySolutionsFail: string[];
}

export interface Solution {
  id: string;
  segment: string;
  coreSolution: string;
  keyFeatures: string[];
  uniqueDifferentiators: string[];
  supportModel: string;
}

export interface Dashboard {
  id: string;
  segment: string;
  dashboardName: string;
  primaryMetrics: string[];
  keyVisualizations: string[];
  personalizationFeatures: string[];
}

export interface ValuePricing {
  id: string;
  segment: string;
  primaryValueProp: string;
  supportingMessages: string[];
  pricingTier: string;
  annualDiscount: string;
  ltvTarget: string;
}

export interface Metrics {
  id: string;
  segment: string;
  cac: string;
  conversionRate: string;
  acquisitionChannel: string;
  dailyActivePercent: string;
  monthlyChurn: string;
  npsTarget: string;
  keyOutcomeMetric: string;
}

export interface ImplementationPhase {
  id: string;
  phase: string;
  timeline: string;
  keyActivities: string[];
  resourcesNeeded: string[];
  successCriteria: string[];
  riskMitigation: string[];
}

// Segment Overview Data
export const segmentOverviews: SegmentOverview[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    nickname: 'Old and Rich',
    ageRange: '55-75',
    incomeNetWorth: '$5M-$500M+ net worth',
    currentHealthSpend: '$85K-$300K/year',
    marketSize: '~500K globally',
    primaryMotivation: 'Add 5-10 healthy years to life'
  },
  {
    id: '2',
    segment: 'Optimizers',
    nickname: 'Young and Curious',
    ageRange: '35-55',
    incomeNetWorth: '€150K-€500K/year',
    currentHealthSpend: '$2K-$5K/year',
    marketSize: '~10M globally',
    primaryMotivation: 'Peak performance & energy'
  },
  {
    id: '3',
    segment: 'Biohackers',
    nickname: 'Experimenters',
    ageRange: '25-45',
    incomeNetWorth: '$30K-$1M+/year',
    currentHealthSpend: '$6K-$24K/year',
    marketSize: '~2M globally',
    primaryMotivation: 'Cutting-edge optimization'
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    nickname: 'Problems',
    ageRange: '30-65',
    incomeNetWorth: '$40K-$150K/year',
    currentHealthSpend: '$5K-$20K spent',
    marketSize: '~100M globally',
    primaryMotivation: 'Just want to sleep normally'
  }
];

// Pain Points Data
export const painPoints: PainPoint[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    primaryPainPoints: [
      'Mortality anxiety',
      'Information overload',
      'Lack of data integration',
      'Trust issues',
      'Time scarcity',
      'Social isolation'
    ],
    secondaryPainPoints: [
      'FOMO on breakthroughs',
      'Legacy concerns',
      'Quality vs quantity anxiety',
      'Healthcare frustration'
    ],
    currentSolutions: [
      'Longevity clinics ($50-200K/yr)',
      'Executive health programs',
      'Multiple wearables ($5-15K)',
      'Blood panels ($10-30K/yr)',
      'NAD+/peptides ($20-50K/yr)'
    ],
    whySolutionsFail: [
      'Sleep overlooked',
      'No data synthesis',
      'Lacks personalization',
      'Missing human touch',
      'No peer comparison'
    ]
  },
  {
    id: '2',
    segment: 'Optimizers',
    primaryPainPoints: [
      'Performance anxiety',
      'Work-life imbalance (60+ hrs/week)',
      'Parental guilt',
      'Cognitive decline fears',
      'Decision fatigue',
      'Time poverty'
    ],
    secondaryPainPoints: [
      'Career FOMO',
      'Relationship strain',
      'Impostor syndrome',
      'Poor example for kids'
    ],
    currentSolutions: [
      'Apple Watch/Oura ($500-2000)',
      'Meditation apps ($50-200/mo)',
      'ChatGPT',
      'Gym',
      'Supplements'
    ],
    whySolutionsFail: [
      'Too many unintegrated apps',
      'Generic advice',
      'No clear metrics',
      'Missing social dimension',
      'Lacks credibility'
    ]
  },
  {
    id: '3',
    segment: 'Biohackers',
    primaryPainPoints: [
      'Optimization obsession',
      'Data addiction',
      'Protocol FOMO',
      'Credibility seeking',
      'Integration complexity',
      'Measurement limitations'
    ],
    secondaryPainPoints: [
      'Partner understanding',
      'Information overload',
      'Financial strain',
      'Side effect management'
    ],
    currentSolutions: [
      'Multiple wearables ($2-10K)',
      '15-30 supplements ($500-2000/mo)',
      'Nootropics/peptides',
      'Red light/PEMF/cold plunge',
      'Podcasts/forums'
    ],
    whySolutionsFail: [
      'No experimentation framework',
      'Cannot attribute effects',
      'Missing community validation',
      'Lacks scientific rigor',
      'No early access'
    ]
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    primaryPainPoints: [
      'Chronic exhaustion (years/decades)',
      'Medical gaslighting',
      'Financial burden',
      'Relationship strain',
      'Career impact',
      'Identity crisis'
    ],
    secondaryPainPoints: [
      'Medication dependency fears',
      'Side effects',
      'Insurance battles',
      'Stigma and shame',
      'Lost hope'
    ],
    currentSolutions: [
      'Sleep studies',
      'Multiple specialists ($5-20K)',
      'Prescription meds (Ambien, etc)',
      'CPAP (low compliance)',
      'Alternative treatments ($2-10K)'
    ],
    whySolutionsFail: [
      'Outdated 1990s protocols',
      'Ignores whole person',
      'One-size-fits-none',
      'Long specialist waits',
      'No ongoing support'
    ]
  }
];

// Solutions Data
export const solutions: Solution[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    coreSolution: 'Dedicated sleep-for-healthspan service with high human touch and latest research',
    keyFeatures: [
      'White-glove onboarding (2hr assessment)',
      'AI Sleep Longevity Engine',
      '50+ platform integrations',
      'Dedicated specialist',
      'Monthly video consults',
      '24/7 priority support',
      'Quarterly in-person assessments',
      'Anonymous peer benchmarking'
    ],
    uniqueDifferentiators: [
      'Predictive healthspan modeling',
      'Longevity clinic integration',
      'Board-certified specialists',
      'Biological age tracking',
      'Direct researcher access'
    ],
    supportModel: 'Concierge: Personal sleep historian, Dedicated specialist, Monthly video, 24/7 support'
  },
  {
    id: '2',
    segment: 'Optimizers',
    coreSolution: 'Dedicated sleep service with protocols, supplements, and latest findings',
    keyFeatures: [
      '15-min smart onboarding',
      'Calendar-aware AI coach',
      'Energy forecasting',
      'Family sync mode',
      'Travel sleep shifting',
      'Power nap optimization',
      'Team challenges',
      '2-min daily education'
    ],
    uniqueDifferentiators: [
      'Productivity correlation tracking',
      'Automatic schedule adaptation',
      'Partner/kids integration',
      'ROI calculations',
      'Quick-win protocols (5 min)'
    ],
    supportModel: 'Self-service with AI: Smart coach, Group sessions, Community support, Expert AMAs'
  },
  {
    id: '3',
    segment: 'Biohackers',
    coreSolution: 'World\'s most advanced sleep experimentation platform',
    keyFeatures: [
      'N=1 experiment designer',
      'Statistical significance calculator',
      'A/B testing framework',
      'Full API access',
      'Raw data downloads',
      'Community leaderboards',
      'Protocol wikis',
      'Beta feature access'
    ],
    uniqueDifferentiators: [
      'Placebo period management',
      'Multi-variable experiments',
      'ML pattern detection',
      'Direct database queries',
      'Genetic correlation analysis'
    ],
    supportModel: 'Community-driven: Peer mentorship, Researcher access, Protocol sharing, Group experiments'
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    coreSolution: 'Cutting-edge virtual sleep clinic with latest protocols and continuous care',
    keyFeatures: [
      '360-degree assessment',
      'Full CBT-I program',
      'Weekly check-ins (first month)',
      '24/7 crisis support',
      'Peer support groups',
      'Medication optimization',
      'Mental health screening',
      'Caregiver resources'
    ],
    uniqueDifferentiators: [
      'Hope restoration focus',
      'Small wins celebration',
      'Licensed professionals',
      'Insurance documentation',
      'Provider portal for doctors'
    ],
    supportModel: 'Comprehensive care: Sleep psychologist, Nurse practitioner, Daily coach, Peer groups, Crisis support'
  }
];

// Dashboard Specifications
export const dashboards: Dashboard[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    dashboardName: 'The Longevity Command Center',
    primaryMetrics: [
      'Sleep Longevity Score (0-100)',
      'Projected Healthspan Impact',
      'Biological Age Contribution',
      'Sleep Efficiency %',
      'REM/Deep Sleep %',
      'Peer Percentile'
    ],
    keyVisualizations: [
      'Executive Summary Panel',
      'Biological Age Tracker',
      'Healthspan Projection Graph',
      'Optimization Opportunities',
      'Peer Benchmarking',
      'Research Alerts',
      'Intervention Effectiveness'
    ],
    personalizationFeatures: [
      'Customizable metrics',
      'Research feed filtering',
      'Alert thresholds',
      'Peer group selection'
    ]
  },
  {
    id: '2',
    segment: 'Optimizers',
    dashboardName: 'The Performance Hub',
    primaryMetrics: [
      'Daily Energy Forecast',
      'Productivity Correlation',
      'Sleep Debt',
      'Recovery Rate',
      'Consistency Score',
      'Family Sync Status'
    ],
    keyVisualizations: [
      'Energy Forecast Widget',
      'Calendar Integration View',
      'Power Nap Optimizer',
      'Weekly Analytics',
      'Smart Scheduling',
      'Travel Protocol',
      'Family Dashboard'
    ],
    personalizationFeatures: [
      'Calendar sync priorities',
      'Family member profiles',
      'Work schedule adaptation',
      'Goal setting'
    ]
  },
  {
    id: '3',
    segment: 'Biohackers',
    dashboardName: 'The Sleep Laboratory',
    primaryMetrics: [
      'Active Experiments',
      'P-values & Effect Sizes',
      'Advanced Biomarkers',
      'Community Ranking',
      'Stack Efficiency',
      'Discovery Alerts'
    ],
    keyVisualizations: [
      'Experiment Control Center',
      'A/B Test Manager',
      'Statistical Analysis',
      'Biomarker Heatmap',
      'Stack Optimizer',
      'Community Lab',
      'Data Export Tools'
    ],
    personalizationFeatures: [
      'Custom experiments',
      'Metric creation',
      'API webhooks',
      'Data visualization options'
    ]
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    dashboardName: 'The Recovery Center',
    primaryMetrics: [
      'Sleep Quality Trend',
      'Hours Slept',
      'Medication Reduction',
      'Morning Mood',
      'Progress Milestones',
      'Support Activity'
    ],
    keyVisualizations: [
      'Hope Restoration Panel',
      'Progress Celebrations',
      'Care Team Hub',
      'Crisis Support Button',
      'Treatment Tracker',
      'Peer Stories',
      'Small Wins Feed'
    ],
    personalizationFeatures: [
      'Milestone customization',
      'Support preferences',
      'Crisis protocols',
      'Celebration settings'
    ]
  }
];

// Value & Pricing
export const valuePricing: ValuePricing[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    primaryValueProp: 'Add 5-10 healthy years to your life through optimized sleep',
    supportingMessages: [
      'Join the top 1% of sleep optimizers',
      'Never miss a breakthrough',
      'Personal sleep team 24/7',
      'Bedroom longevity lab',
      'Data-driven confidence'
    ],
    pricingTier: '$499/month',
    annualDiscount: '$4,999/year (17% off)',
    ltvTarget: '$25,000 (4+ years)'
  },
  {
    id: '2',
    segment: 'Optimizers',
    primaryValueProp: 'Gain 2 hours of peak performance daily through optimized sleep',
    supportingMessages: [
      'Be the parent and professional you want',
      'Sleep smarter not longer',
      'Join 10,000+ performers',
      'Evidence-based for real life',
      'Track ROI on sleep'
    ],
    pricingTier: '$99/month',
    annualDiscount: '$999/year (16% off)',
    ltvTarget: '$3,000 (2.5 years)'
  },
  {
    id: '3',
    segment: 'Biohackers',
    primaryValueProp: 'The world\'s most advanced sleep experimentation platform',
    supportingMessages: [
      'Test what works for YOUR biology',
      'Leading edge of sleep science',
      'Share with 10,000+ scientists',
      'Tomorrow\'s breakthroughs today',
      'Your data, your control'
    ],
    pricingTier: '$149/month',
    annualDiscount: '$1,499/year (16% off)',
    ltvTarget: '$4,500 (2.5 years)'
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    primaryValueProp: 'Real help for real sleep problems, finally',
    supportingMessages: [
      'You\'re not broken, the system is',
      'Affordable and effective',
      'Care team that understands',
      'Small steps to big change',
      'Hope backed by science'
    ],
    pricingTier: '$29/month',
    annualDiscount: '$299/year (14% off)',
    ltvTarget: '$1,000 (3 years)'
  }
];

// Success Metrics
export const metrics: Metrics[] = [
  {
    id: '1',
    segment: 'Longevity Seekers',
    cac: '$500-$1000',
    conversionRate: '25%',
    acquisitionChannel: 'Longevity clinics, referrals',
    dailyActivePercent: '85%',
    monthlyChurn: '2%',
    npsTarget: '70+',
    keyOutcomeMetric: 'Healthspan +15%, Bio age -2 years'
  },
  {
    id: '2',
    segment: 'Optimizers',
    cac: '$150-$300',
    conversionRate: '15%',
    acquisitionChannel: 'Content marketing, SEO',
    dailyActivePercent: '70%',
    monthlyChurn: '4%',
    npsTarget: '50+',
    keyOutcomeMetric: 'Productivity +20%, Energy +25%'
  },
  {
    id: '3',
    segment: 'Biohackers',
    cac: '$100-$200',
    conversionRate: '20%',
    acquisitionChannel: 'Communities, influencers',
    dailyActivePercent: '90%',
    monthlyChurn: '3%',
    npsTarget: '60+',
    keyOutcomeMetric: 'Experiments 10+, Stack optimization 30%'
  },
  {
    id: '4',
    segment: 'Sleep Sufferers',
    cac: '$50-$100',
    conversionRate: '10%',
    acquisitionChannel: 'Medical referrals, insurance',
    dailyActivePercent: '95% weekly',
    monthlyChurn: '5%',
    npsTarget: '45+',
    keyOutcomeMetric: 'Sleep +2 hours, Medication -50%'
  }
];

// Implementation Roadmap
export const implementationPhases: ImplementationPhase[] = [
  {
    id: '1',
    phase: 'Hackathon Day 1',
    timeline: '9AM-5PM Sept 12',
    keyActivities: [
      'Validate segments with surveys',
      'Prioritize first segment',
      'Define MVP features',
      'Design dashboards',
      'Create user journeys',
      'Develop pitch'
    ],
    resourcesNeeded: [
      '4-6 team members',
      'Survey tools',
      'Design software',
      'Pitch deck template'
    ],
    successCriteria: [
      '20+ survey responses',
      'Segment consensus',
      'MVP feature list',
      '3 dashboard mockups',
      'Pitch deck v1'
    ],
    riskMitigation: [
      'Have backup segment choice',
      'Pre-prepare survey questions',
      'Use existing templates'
    ]
  },
  {
    id: '2',
    phase: 'Hackathon Day 2',
    timeline: '9AM-5PM Sept 15',
    keyActivities: [
      'Build iOS app prototype',
      'Create modular dashboard architecture',
      'Integrate Apple Health API',
      'Design segment-specific UX',
      'Prepare demo',
      'Finalize pitch'
    ],
    resourcesNeeded: [
      'iOS developer',
      'Frontend developer',
      'UX designer',
      'Demo devices'
    ],
    successCriteria: [
      'Working iOS prototype',
      'Dashboard demo for 2 segments',
      'Apple Health data flowing',
      '5-minute pitch ready',
      'Demo script prepared'
    ],
    riskMitigation: [
      'Use mock data if needed',
      'Focus on one segment deeply',
      'Have backup demo plan'
    ]
  },
  {
    id: '3',
    phase: 'MVP (Months 1-3)',
    timeline: 'Q1 2025',
    keyActivities: [
      'Build multi-tenant architecture',
      'Develop adaptive dashboard',
      'Integrate 5 wearables',
      'Launch Sleep Sufferers segment',
      'Recruit 100 beta users'
    ],
    resourcesNeeded: [
      '3 engineers',
      '1 designer',
      '1 sleep expert',
      '$150K budget'
    ],
    successCriteria: [
      'Platform operational',
      '100 active beta users',
      '70% weekly retention',
      'NPS > 40',
      '3 success stories'
    ],
    riskMitigation: [
      'Start with manual concierge',
      'Use existing APIs',
      'Partner with wearables'
    ]
  },
  {
    id: '4',
    phase: 'Growth (Months 4-9)',
    timeline: 'Q2-Q3 2025',
    keyActivities: [
      'Launch Optimizer segment',
      'Add AI personalization',
      'Build community features',
      'B2B partnerships',
      'Scale to 1,000 users'
    ],
    resourcesNeeded: [
      '5 engineers',
      '2 designers',
      '3 sleep experts',
      'Sales team',
      '$500K budget'
    ],
    successCriteria: [
      '1,000 paying users',
      '$50K MRR',
      '2 segments live',
      '5 B2B partnerships',
      'Series A ready'
    ],
    riskMitigation: [
      'Focus on retention first',
      'Test with small groups',
      'Build waitlist'
    ]
  },
  {
    id: '5',
    phase: 'Scale (Months 10-18)',
    timeline: 'Q4 2025-Q2 2026',
    keyActivities: [
      'Launch all 4 segments',
      'International expansion',
      'Clinical validation',
      'Insurance partnerships',
      'Raise Series A'
    ],
    resourcesNeeded: [
      'Full team of 25',
      'Clinical advisors',
      'Legal team',
      '$2M budget'
    ],
    successCriteria: [
      '10,000 users',
      '$500K MRR',
      'Clinical validation',
      '3 insurance partners',
      '$10M Series A'
    ],
    riskMitigation: [
      'Stay in wellness initially',
      'Partner with providers',
      'HIPAA from day one'
    ]
  }
];

// Derived Hackathon Objectives from Pain Points
export interface HackathonObjective {
  id: string;
  title: string;
  description: string;
  targetSegment: string;
  painPointAddressed: string;
  priority: 'high' | 'medium' | 'low';
  techStack: string[];
  estimatedEffort: string;
  successMetrics: string[];
}

export const derivedHackathonObjectives: HackathonObjective[] = [
  {
    id: 'obj-1',
    title: 'Build iOS Sleep Data Integration Hub',
    description: 'Create a unified iOS app that aggregates sleep data from Apple Health, Oura, Whoop, Eight Sleep, and other wearables to address data fragmentation pain points',
    targetSegment: 'All Segments',
    painPointAddressed: 'Lack of data integration, Multiple unintegrated apps',
    priority: 'high',
    techStack: ['Swift', 'SwiftUI', 'HealthKit', 'CoreData', 'CloudKit'],
    estimatedEffort: 'Day 1: Architecture, Day 2: Implementation',
    successMetrics: ['5+ device integrations', 'Real-time data sync', 'Unified sleep score']
  },
  {
    id: 'obj-2',
    title: 'Develop AI Sleep Longevity Engine',
    description: 'Build predictive healthspan modeling specifically for Longevity Seekers to show sleep impact on biological age',
    targetSegment: 'Longevity Seekers',
    painPointAddressed: 'Mortality anxiety, Quality vs quantity anxiety',
    priority: 'high',
    techStack: ['Python', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
    estimatedEffort: 'Day 1: Model design, Day 2: MVP implementation',
    successMetrics: ['Biological age calculation', 'Healthspan projections', '90% accuracy']
  },
  {
    id: 'obj-3',
    title: 'Create Adaptive Dashboard Framework',
    description: 'Build modular dashboard that adapts UI/UX based on customer segment (Command Center vs Recovery Center)',
    targetSegment: 'All Segments',
    painPointAddressed: 'One-size-fits-none solutions, Lacks personalization',
    priority: 'high',
    techStack: ['React', 'Next.js', 'TypeScript', 'D3.js', 'Tailwind CSS'],
    estimatedEffort: 'Day 1: Framework, Day 2: 2 segment implementations',
    successMetrics: ['4 distinct dashboards', 'Personalization engine', 'Sub-2s load time']
  },
  {
    id: 'obj-4',
    title: 'Implement N=1 Experiment Platform',
    description: 'Create scientific experimentation framework for Biohackers to test sleep interventions with statistical rigor',
    targetSegment: 'Biohackers',
    painPointAddressed: 'No experimentation framework, Cannot attribute effects',
    priority: 'medium',
    techStack: ['R', 'Python', 'Jupyter', 'PostgreSQL', 'GraphQL'],
    estimatedEffort: 'Day 2: Core platform',
    successMetrics: ['A/B testing capability', 'P-value calculations', 'Effect size tracking']
  },
  {
    id: 'obj-5',
    title: 'Build Family Sleep Sync System',
    description: 'Develop family account system for Optimizers to track household sleep patterns and impact on family dynamics',
    targetSegment: 'Optimizers',
    painPointAddressed: 'Parental guilt, Poor example for kids, Work-life imbalance',
    priority: 'medium',
    techStack: ['Firebase', 'React Native', 'Node.js', 'MongoDB'],
    estimatedEffort: 'Day 2: Family features',
    successMetrics: ['Multi-user support', 'Family dashboard', 'Sleep routine sync']
  },
  {
    id: 'obj-6',
    title: 'Create Hope Restoration Interface',
    description: 'Design empathetic UI for Sleep Sufferers with progress celebrations, peer stories, and crisis support',
    targetSegment: 'Sleep Sufferers',
    painPointAddressed: 'Lost hope, Identity crisis, Medical gaslighting',
    priority: 'high',
    techStack: ['React', 'Framer Motion', 'Socket.io', 'Express.js'],
    estimatedEffort: 'Day 1: Design, Day 2: Implementation',
    successMetrics: ['Crisis button response <30s', 'Daily wins tracking', 'Peer connection rate']
  },
  {
    id: 'obj-7',
    title: 'Develop Real-time Energy Forecasting',
    description: 'Build ML model that predicts energy levels based on sleep patterns for Optimizers\' daily planning',
    targetSegment: 'Optimizers',
    painPointAddressed: 'Performance anxiety, Time poverty, Decision fatigue',
    priority: 'medium',
    techStack: ['Python', 'scikit-learn', 'Apache Kafka', 'Redis'],
    estimatedEffort: 'Day 2: ML model and integration',
    successMetrics: ['85% prediction accuracy', 'Calendar integration', 'Energy optimization']
  },
  {
    id: 'obj-8',
    title: 'Implement Peer Benchmarking System',
    description: 'Create anonymous comparison system for Longevity Seekers to benchmark against similar demographics',
    targetSegment: 'Longevity Seekers',
    painPointAddressed: 'Social isolation, No peer comparison, Trust issues',
    priority: 'low',
    techStack: ['PostgreSQL', 'Redis', 'GraphQL', 'Chart.js'],
    estimatedEffort: 'Day 2: Benchmarking engine',
    successMetrics: ['Percentile rankings', 'Cohort matching', 'Privacy preservation']
  }
];