import { RoadmapItem } from './roadmap-data';

// 3-Month Detailed Timeline (Now to Jan 2026)
export const threeMonthTimeline: RoadmapItem[] = [
  {
    id: '3m-1',
    title: 'Wearable Integration Sprint',
    date: '2025-11',
    quarter: 'November 2025',
    description: 'Focus on single wearable integration (Oura Ring) with robust data pipeline',
    milestones: [
      'Oura Ring API integration complete',
      'Real-time data synchronization',
      'Sleep metrics harmonization',
      'Data validation and error handling',
      'Initial dashboard prototype'
    ],
    status: 'planned',
    category: 'engineering'
  },
  {
    id: '3m-2',
    title: 'Sleep 360 Protocol Development',
    date: '2025-12',
    quarter: 'December 2025',
    description: 'Digitize and automate validated sleep questionnaires',
    milestones: [
      'ESS, ISI, PSQI questionnaires digitized',
      'Circadian chronotype assessment tool',
      'Metabolic & environment questionnaires',
      'Automated scoring algorithms',
      'Report generation system'
    ],
    status: 'planned',
    category: 'product'
  },
  {
    id: '3m-3',
    title: 'MVP Chatbot & UI Polish',
    date: '2026-01',
    quarter: 'January 2026',
    description: 'Develop empathetic AI chatbot and polished user experience',
    milestones: [
      'Vectorized sleep knowledgebase creation',
      'Chatbot personality and tone development',
      'FAQ and onboarding flows',
      'Beautiful, minimal UI implementation',
      'User testing and refinement',
      'Half Moon Bay demo preparation'
    ],
    status: 'planned',
    category: 'product'
  }
];

// 6-Month Timeline (Now to March 2026)
export const sixMonthTimeline: RoadmapItem[] = [
  {
    id: '6m-1',
    title: 'Foundation & Team Building',
    date: '2025-10',
    quarter: 'Oct-Nov 2025',
    description: 'Recruit key team members and establish infrastructure',
    milestones: [
      'Onboard Christoph for design',
      'Recruit behavioral design/psychology lead',
      'AI engineering lead recruitment',
      'Set up development infrastructure',
      'Establish Poland testing facility'
    ],
    status: 'planned',
    category: 'operations'
  },
  {
    id: '6m-2',
    title: 'Prototype & Testing',
    date: '2025-12',
    quarter: 'Dec 2025',
    description: 'Manual prototype services and pricing validation',
    milestones: [
      'Simple upload/review portal',
      'Manual Sleep 360 Report generation',
      'Private consultation testing',
      'Pricing model validation',
      'Early user feedback collection'
    ],
    status: 'planned',
    category: 'product'
  },
  {
    id: '6m-3',
    title: 'Half Moon Bay MVP',
    date: '2026-01',
    quarter: 'Jan 16-18, 2026',
    description: 'First public demonstration of Zoe platform',
    milestones: [
      'Live wearable data integration demo',
      'Sleep 360 Dashboard presentation',
      'AI chatbot demonstration',
      'Community features preview',
      'Investor and partner meetings'
    ],
    status: 'planned',
    category: 'marketing'
  },
  {
    id: '6m-4',
    title: 'Post-HMB Iteration',
    date: '2026-02',
    quarter: 'February 2026',
    description: 'Rapid improvements based on Half Moon Bay feedback',
    milestones: [
      'Feedback analysis and prioritization',
      'Critical bug fixes',
      'UI/UX improvements',
      'Additional wearable integrations',
      'Basel preparation begins'
    ],
    status: 'planned',
    category: 'product'
  },
  {
    id: '6m-5',
    title: 'Basel Showcase',
    date: '2026-03',
    quarter: 'Mar 19, 2026',
    description: 'Demonstrate evolution and speed of iteration',
    milestones: [
      'Three wearables fully integrated',
      'JiTAI interventions live',
      'Community features launched',
      'First SleepOS update cycle',
      'Partnership announcements'
    ],
    status: 'planned',
    category: 'marketing'
  }
];

// 3-Year Strategic Timeline
export const threeYearTimeline: RoadmapItem[] = [
  {
    id: '3y-1',
    title: 'Year 1: Foundation',
    date: '2026',
    quarter: '2026',
    description: 'Establish credibility, build core product, secure initial customers',
    milestones: [
      'Launch concierge tier ($20K/year)',
      'Secure 10-20 premium clients',
      'Complete Series A funding',
      'Establish clinic partnerships',
      'Build core team to 15 people'
    ],
    status: 'planned',
    category: 'operations'
  },
  {
    id: '3y-2',
    title: 'Year 2: Expansion',
    date: '2027',
    quarter: '2027',
    description: 'Scale operations, launch clinic tier, expand internationally',
    milestones: [
      'Launch clinic tier ($1K/month)',
      'Partner with 50+ clinics',
      'Expand to 3 countries',
      'Integrate all major wearables',
      'Launch at-home metabolic testing',
      'Team grows to 50 people'
    ],
    status: 'planned',
    category: 'operations'
  },
  {
    id: '3y-3',
    title: 'Year 3: Mass Market',
    date: '2028',
    quarter: '2028',
    description: 'Launch consumer platform, achieve global scale',
    milestones: [
      'Launch Strava-scale tier ($10/month)',
      'Reach 100,000+ users',
      'Global availability (25+ countries)',
      'Lumos robot pilot launch',
      'IPO preparation or acquisition',
      'Become category leader'
    ],
    status: 'planned',
    category: 'marketing'
  }
];
