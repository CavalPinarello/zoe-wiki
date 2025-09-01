import { TimelineEvent } from '@/components/ArrowTimeline';

export const detailedTimeline: TimelineEvent[] = [
  {
    id: 'hack-sep4',
    date: 'Sep 4, 2025',
    title: 'Initial Hackathon',
    type: 'hackathon',
    participants: ['Yoichiro', 'Christoph', 'Martin', 'Baher'],
    description: 'Kickoff hackathon to prototype core Zoe concepts',
    deliverables: [
      'Initial architecture design',
      'MVP feature prioritization',
      'Tech stack decisions',
      'Brand identity concepts'
    ]
  },
  {
    id: 'design-sep15',
    date: 'Sep 15, 2025',
    title: 'Design Sprint',
    type: 'meeting',
    participants: ['Christoph', 'Martin'],
    description: 'Define Zoe visual identity and UX principles',
    deliverables: [
      'Brand guidelines',
      'UI component library',
      'User journey maps'
    ]
  },
  {
    id: 'api-sep25',
    date: 'Sep 25, 2025',
    title: 'Wearable API Integration',
    type: 'development',
    description: 'Begin integration with first wearable device',
    deliverables: [
      'Oura Ring API connection',
      'Data synchronization pipeline',
      'Error handling framework'
    ]
  },
  {
    id: 'team-oct1',
    date: 'Oct 1, 2025',
    title: 'Team Expansion',
    type: 'milestone',
    participants: ['Martin', 'Baher'],
    description: 'Recruit behavioral design and AI engineering leads',
    deliverables: [
      'Job descriptions posted',
      'Interview pipeline setup',
      'Onboarding materials'
    ]
  },
  {
    id: 'proto-oct15',
    date: 'Oct 15, 2025',
    title: 'First Prototype',
    type: 'milestone',
    description: 'Manual sleep report generation system live',
    deliverables: [
      'Upload portal functional',
      'Report template complete',
      'Initial user testing'
    ]
  },
  {
    id: 'poland-oct25',
    date: 'Oct 25, 2025',
    title: 'Poland Testing Facility',
    type: 'meeting',
    participants: ['Martin'],
    description: 'Establish testing partnership in Poland',
    deliverables: [
      'Clinical partnership agreement',
      'Testing protocols defined',
      'Data collection framework'
    ]
  },
  {
    id: 'ai-nov1',
    date: 'Nov 1, 2025',
    title: 'AI Chatbot Development',
    type: 'development',
    participants: ['Yoichiro', 'AI Lead'],
    description: 'Begin development of sleep-focused AI assistant',
    deliverables: [
      'Knowledge base creation',
      'NLP model selection',
      'Conversation flow design'
    ]
  },
  {
    id: 'sleep360-nov15',
    date: 'Nov 15, 2025',
    title: 'Sleep 360 Protocol',
    type: 'development',
    description: 'Digitize validated sleep questionnaires',
    deliverables: [
      'ESS, ISI, PSQI digital forms',
      'Automated scoring system',
      'Report generation engine'
    ]
  },
  {
    id: 'cgm-dec1',
    date: 'Dec 1, 2025',
    title: 'CGM Integration',
    type: 'development',
    description: 'Integrate continuous glucose monitoring',
    deliverables: [
      'Abbott Libre 3 API integration',
      'Glucose-sleep correlation analysis',
      'Real-time alerts system'
    ]
  },
  {
    id: 'ui-dec15',
    date: 'Dec 15, 2025',
    title: 'UI Polish Sprint',
    type: 'development',
    participants: ['Christoph', 'Frontend Team'],
    description: 'Final UI refinement before Half Moon Bay',
    deliverables: [
      'Dashboard finalization',
      'Mobile responsiveness',
      'Animation and transitions'
    ]
  },
  {
    id: 'demo-jan5',
    date: 'Jan 5, 2026',
    title: 'Demo Day Prep',
    type: 'meeting',
    participants: ['All Team'],
    description: 'Final preparations for Half Moon Bay',
    deliverables: [
      'Demo script finalized',
      'Presentation deck complete',
      'Backup systems ready'
    ]
  },
  {
    id: 'hmb-jan16',
    date: 'Jan 16-18, 2026',
    title: 'Half Moon Bay Retreat',
    type: 'launch',
    participants: ['All Team', 'Investors', 'Early Clients'],
    description: 'First public demonstration of Zoe platform',
    deliverables: [
      'Live platform demo',
      'Investor meetings',
      'Client onboarding',
      'Press coverage'
    ]
  },
  {
    id: 'feedback-jan25',
    date: 'Jan 25, 2026',
    title: 'HMB Retrospective',
    type: 'meeting',
    participants: ['Core Team'],
    description: 'Analyze feedback and plan improvements',
    deliverables: [
      'Feedback synthesis',
      'Priority roadmap update',
      'Basel preparation plan'
    ]
  },
  {
    id: 'multi-feb1',
    date: 'Feb 1, 2026',
    title: 'Multi-Wearable Sprint',
    type: 'development',
    description: 'Expand to support multiple devices',
    deliverables: [
      'Garmin integration',
      'Apple Health integration',
      'Data harmonization layer'
    ]
  },
  {
    id: 'jitai-feb15',
    date: 'Feb 15, 2026',
    title: 'JiTAI Development',
    type: 'development',
    participants: ['Yoichiro', 'Behavioral Team'],
    description: 'Just-in-Time Adaptive Interventions',
    deliverables: [
      'Intervention algorithm',
      'Personalization engine',
      'Notification system'
    ]
  },
  {
    id: 'community-mar1',
    date: 'Mar 1, 2026',
    title: 'Community Features',
    type: 'development',
    description: 'Launch social and accountability features',
    deliverables: [
      'Leaderboards',
      'Challenges system',
      'Social sharing'
    ]
  },
  {
    id: 'basel-mar19',
    date: 'Mar 19, 2026',
    title: 'Basel - Future of Health',
    type: 'launch',
    participants: ['All Team', 'Partners', 'Media'],
    description: 'Showcase Zoe evolution and partnerships',
    deliverables: [
      'Enhanced platform demo',
      'Partnership announcements',
      'SleepOS update cycle',
      'International launch'
    ]
  }
];
