'use client';

import React from 'react';
import InteractiveRoadmap from '@/components/InteractiveRoadmap';

export default function RoadmapPage() {
  // Sample initial data with nested hierarchy
  const initialRoadmapData = [
    {
      id: 'node-1',
      title: 'Q1 2025 - Foundation Phase',
      description: 'Build core platform infrastructure and initial market validation',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      status: 'in-progress' as const,
      category: 'Technology',
      children: [
        {
          id: 'node-1-1',
          title: 'MVP Development',
          description: 'Core platform features and architecture',
          startDate: '2025-01-01',
          endDate: '2025-02-15',
          status: 'in-progress' as const,
          category: 'Technology',
          details: [
            'User authentication system',
            'Basic data processing pipeline',
            'Initial UI/UX implementation',
            'API development'
          ]
        },
        {
          id: 'node-1-2',
          title: 'Market Research',
          description: 'Customer discovery and competitive analysis',
          startDate: '2025-01-15',
          endDate: '2025-02-28',
          status: 'in-progress' as const,
          category: 'Market',
          details: [
            'Interview 50 potential customers',
            'Analyze competitor landscape',
            'Define target market segments',
            'Pricing strategy research'
          ]
        },
        {
          id: 'node-1-3',
          title: 'Team Building',
          description: 'Recruit core team members',
          startDate: '2025-02-01',
          endDate: '2025-03-31',
          status: 'planned' as const,
          category: 'Team',
          children: [
            {
              id: 'node-1-3-1',
              title: 'Engineering Hires',
              description: 'Technical team expansion',
              startDate: '2025-02-01',
              endDate: '2025-03-15',
              status: 'planned' as const,
              category: 'Team',
              details: [
                'Senior Backend Engineer',
                'ML/AI Specialist',
                'DevOps Engineer'
              ]
            },
            {
              id: 'node-1-3-2',
              title: 'Business Hires',
              description: 'Business team expansion',
              startDate: '2025-02-15',
              endDate: '2025-03-31',
              status: 'planned' as const,
              category: 'Team',
              details: [
                'Head of Sales',
                'Marketing Manager',
                'Customer Success Lead'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'node-2',
      title: 'Q2 2025 - Growth Phase',
      description: 'Product launch and initial customer acquisition',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      status: 'planned' as const,
      category: 'Product',
      children: [
        {
          id: 'node-2-1',
          title: 'Beta Testing Program',
          description: 'Controlled release to early adopters',
          startDate: '2025-04-01',
          endDate: '2025-04-30',
          status: 'planned' as const,
          category: 'Product',
          details: [
            'Recruit 20 beta testers',
            'Implement feedback system',
            'Weekly iteration cycles',
            'Performance monitoring'
          ]
        },
        {
          id: 'node-2-2',
          title: 'Product Launch',
          description: 'Public release v1.0',
          startDate: '2025-05-01',
          endDate: '2025-05-15',
          status: 'planned' as const,
          category: 'Product',
          details: [
            'Marketing campaign launch',
            'Press release and media outreach',
            'Launch event planning',
            'Customer onboarding automation'
          ]
        },
        {
          id: 'node-2-3',
          title: 'Seed Funding Round',
          description: 'Raise $2M seed funding',
          startDate: '2025-05-01',
          endDate: '2025-06-30',
          status: 'planned' as const,
          category: 'Finance',
          details: [
            'Pitch deck preparation',
            'Investor meetings',
            'Due diligence process',
            'Term sheet negotiation'
          ]
        }
      ]
    },
    {
      id: 'node-3',
      title: 'Q3-Q4 2025 - Scale Phase',
      description: 'Scaling operations and market expansion',
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      status: 'planned' as const,
      category: 'Market',
      children: [
        {
          id: 'node-3-1',
          title: 'Feature Expansion',
          description: 'Advanced platform capabilities',
          startDate: '2025-07-01',
          endDate: '2025-09-30',
          status: 'planned' as const,
          category: 'Technology',
          details: [
            'AI-powered analytics',
            'Third-party integrations',
            'Mobile application',
            'Enterprise features'
          ]
        },
        {
          id: 'node-3-2',
          title: 'Customer Acquisition',
          description: 'Reach 500 paying customers',
          startDate: '2025-07-01',
          endDate: '2025-12-31',
          status: 'planned' as const,
          category: 'Market',
          details: [
            'Content marketing strategy',
            'Partnership development',
            'Sales team scaling',
            'Customer success program'
          ]
        },
        {
          id: 'node-3-3',
          title: 'Series A Preparation',
          description: 'Prepare for next funding round',
          startDate: '2025-10-01',
          endDate: '2025-12-31',
          status: 'planned' as const,
          category: 'Finance',
          details: [
            'Financial modeling',
            'Growth metrics tracking',
            'Advisory board formation',
            'Strategic planning'
          ]
        }
      ]
    },
    {
      id: 'node-4',
      title: '2026 - Expansion Year',
      description: 'Geographic expansion and platform ecosystem',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'planned' as const,
      category: 'Market',
      children: [
        {
          id: 'node-4-1',
          title: 'International Expansion',
          description: 'Enter European and APAC markets',
          startDate: '2026-01-01',
          endDate: '2026-06-30',
          status: 'planned' as const,
          category: 'Market',
          details: [
            'Market research and localization',
            'Regional partnerships',
            'Compliance and regulations',
            'Local team building'
          ]
        },
        {
          id: 'node-4-2',
          title: 'Platform Ecosystem',
          description: 'Build developer marketplace',
          startDate: '2026-03-01',
          endDate: '2026-09-30',
          status: 'planned' as const,
          category: 'Technology',
          details: [
            'Third-party app store',
            'Developer SDK and APIs',
            'Partner certification program',
            'Revenue sharing model'
          ]
        },
        {
          id: 'node-4-3',
          title: 'Enterprise Strategy',
          description: 'Target enterprise customers',
          startDate: '2026-06-01',
          endDate: '2026-12-31',
          status: 'planned' as const,
          category: 'Product',
          details: [
            'Enterprise security features',
            'Compliance certifications (SOC2, ISO)',
            'Dedicated support team',
            'Custom deployment options'
          ]
        }
      ]
    },
    {
      id: 'node-5',
      title: '2027 - Market Leadership',
      description: 'Establish market leadership position',
      startDate: '2027-01-01',
      endDate: '2027-12-31',
      status: 'planned' as const,
      category: 'Market',
      children: [
        {
          id: 'node-5-1',
          title: 'Strategic Acquisitions',
          description: 'Acquire complementary companies',
          startDate: '2027-01-01',
          endDate: '2027-06-30',
          status: 'planned' as const,
          category: 'Finance',
          details: [
            'Identify acquisition targets',
            'Due diligence and valuation',
            'Integration planning',
            'Synergy realization'
          ]
        },
        {
          id: 'node-5-2',
          title: 'IPO Preparation',
          description: 'Prepare for public offering',
          startDate: '2027-06-01',
          endDate: '2027-12-31',
          status: 'planned' as const,
          category: 'Finance',
          details: [
            'Financial audit and compliance',
            'Board composition',
            'Investment banking selection',
            'S-1 filing preparation'
          ]
        }
      ]
    }
  ];

  return <InteractiveRoadmap initialData={initialRoadmapData} />;
}
