export interface CustomerSegment {
  id: string;
  segment: string;
  demographics: string[];
  psychographics: string[];
  incomeRange: string;
  currentSpend: string;
  marketSize: string;
}

export const initialCustomerSegments: CustomerSegment[] = [
  {
    id: '1',
    segment: 'Longevity Seekers ("Old and Rich")',
    demographics: [
      'Age: 55-75',
      'Net Worth: $5M-$500M+',
      'Location: Silicon Valley, NYC, London, Singapore',
      'Background: Tech executives, VCs, entrepreneurs'
    ],
    psychographics: [
      'Mortality anxiety',
      'Data-driven',
      'Premium seekers',
      'Trust issues with health industry',
      'Legacy focused'
    ],
    incomeRange: '$1M-$10M+/year',
    currentSpend: '$85K-$300K/year on health',
    marketSize: '~500K individuals globally'
  },
  {
    id: '2',
    segment: 'Optimizers ("Young and Curious")',
    demographics: [
      'Age: 35-55',
      'Education: Masters/PhD',
      'Location: Urban centers',
      'Family: Often with children'
    ],
    psychographics: [
      'Performance obsessed',
      'Time-poor',
      'Evidence-based',
      'Work-life balance seekers',
      'Parental guilt'
    ],
    incomeRange: '€150K-€500K/year',
    currentSpend: '$2K-$5K/year on wellness',
    marketSize: '~10M individuals globally'
  },
  {
    id: '3',
    segment: 'Biohackers ("Experimenters")',
    demographics: [
      'Age: 25-45',
      'Background: Tech, startups, fitness',
      'Community: Reddit, Discord, Twitter',
      'Personality: High openness'
    ],
    psychographics: [
      'Optimization obsessed',
      'Data addicted',
      'Early adopters',
      'Community-driven',
      'Risk tolerant'
    ],
    incomeRange: '$30K-$1M+/year',
    currentSpend: '$6K-$24K/year on experiments',
    marketSize: '~2M individuals globally'
  },
  {
    id: '4',
    segment: 'Sleep Sufferers ("Problems")',
    demographics: [
      'Age: 30-65',
      'Background: Diverse',
      'Health: Often comorbidities',
      'Status: Desperate for solution'
    ],
    psychographics: [
      'Chronically exhausted',
      'Medically frustrated',
      'Hope-seeking',
      'Identity crisis',
      'Relationship strain'
    ],
    incomeRange: '$40K-$150K/year',
    currentSpend: '$5K-$20K already spent',
    marketSize: '~100M individuals globally'
  }
];