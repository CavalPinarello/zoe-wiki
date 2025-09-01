export interface RoadmapItem {
  id: string;
  title: string;
  date: string;
  quarter: string;
  description: string;
  milestones: string[];
  status: 'completed' | 'in-progress' | 'planned';
  category: 'product' | 'engineering' | 'marketing' | 'operations';
}

export const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Half Moon Bay Retreat MVP',
    date: '2026-01',
    quarter: 'Jan 16-18, 2026',
    description: "Zoe's first stage performance — the debut of an MVP that must not only work, but feel amazing",
    milestones: [
      'Wearable Integration (Garmin OR Oura OR Apple Watch)',
      'Abbott Libre 3 or Dexcom CGM integration pilot',
      'Sleep 360 Dashboard with clean data pipeline',
      'Digitized validated questionnaires (ESS, ISI, PSQI)',
      'Comprehensive sleep baseline report generation',
      'MVP Sleep Chatbot with curated knowledgebase',
      'Polished, beautiful, human-first UI design'
    ],
    status: 'planned',
    category: 'product'
  },
  {
    id: '2',
    title: 'Basel - Future of Health Showcase',
    date: '2026-03',
    quarter: 'Mar 19, 2026',
    description: 'Showcase of Zoe\'s acceleration - breadth, refinement, and proof of speed',
    milestones: [
      'Three wearables integrated (Garmin, Oura, Apple Health)',
      'Live pipeline for CGM data (Abbott or Dexcom)',
      'Environment integration (ambient light sensors, weather APIs)',
      'First monthly SleepOS update cycle deployment',
      'Personalized micro-interventions via enhanced chatbot',
      'Sleep 360 Dashboard 2.0 with harmonized view',
      'Community leaderboards, streaks, and badges launch',
      'Private accountability groups for concierge clients'
    ],
    status: 'planned',
    category: 'product'
  },
  {
    id: '3',
    title: 'Clinic Partnerships (Tier 2)',
    date: '2026-07',
    quarter: '2026-2027',
    description: 'Pilot Zoe in longevity and sleep clinics across key markets',
    milestones: [
      'California clinic partnerships',
      'Switzerland clinic partnerships',
      'Austria clinic partnerships',
      'Clinics license Zoe platform for AI-personalized interventions',
      'Clinician oversight integration',
      'Concierge tier continuation ($10-20K/year)'
    ],
    status: 'planned',
    category: 'operations'
  },
  {
    id: '4',
    title: 'Strava-Scale Launch (Tier 3)',
    date: '2027-01',
    quarter: '2027-2028',
    description: 'Launch global consumer version - The Strava of Sleep',
    milestones: [
      'Low-cost consumer version ($10/month)',
      'Global accessibility launch',
      'All major wearables integration (Garmin, Oura, Apple, Polar, Whoop)',
      'Hardware-agnostic OS layer for sleep health',
      'Largest open sleep accountability network'
    ],
    status: 'planned',
    category: 'marketing'
  },
  {
    id: '5',
    title: 'Metabolics & Environment Expansion',
    date: '2027-07',
    quarter: '2027-2028',
    description: 'Full ecosystem integration with metabolics and environment sensing',
    milestones: [
      'At-home assays for melatonin, vitamin D, cortisol, magnesium',
      'Sleep-environment sensors (light, noise, temperature)',
      'Personalized circadian optimization protocols',
      'Smart home systems integration (Apple Home, Google Nest)',
      'Zoe environment sensor suite development'
    ],
    status: 'planned',
    category: 'engineering'
  },
  {
    id: '6',
    title: 'Lumos - Embodied AI Launch',
    date: '2028-01',
    quarter: '2028',
    description: 'Premium extension with therapeutic companion robot',
    milestones: [
      'Lumos robot assistant pilot phase',
      'Therapeutic companion functionality',
      'Environment optimizer (light control, nudges)',
      'CBT-I guidance integration',
      'High-end extension of Zoe ecosystem'
    ],
    status: 'planned',
    category: 'engineering'
  }
];
