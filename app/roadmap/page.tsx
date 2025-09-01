
import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';

export default function RoadmapPage() {
  const roadmapContent = `
# ZOE Roadmap 2025-2027

## 🎯 Q1 2025 - Foundation Phase
**Timeline:** January - March 2025  
**Status:** 🟡 In Progress

### Technology
- **MVP Development** (Jan-Feb)
  - ✅ User authentication system
  - 🔄 Basic data processing pipeline
  - 🔄 Initial UI/UX implementation
  - ⏳ API development

### Market Research
- **Customer Discovery** (Jan-Feb)
  - Interview 50 potential customers
  - Analyze competitor landscape
  - Define target market segments
  - Pricing strategy research

### Team Building
- **Core Team Recruitment** (Feb-Mar)
  - Senior Backend Engineer
  - ML/AI Specialist
  - DevOps Engineer
  - Head of Sales
  - Marketing Manager

---

## 🚀 Q2 2025 - Growth Phase
**Timeline:** April - June 2025  
**Status:** ⏳ Planned

### Product Launch
- **Beta Testing Program** (April)
  - Recruit 20 beta testers
  - Implement feedback system
  - Weekly iteration cycles
  - Performance monitoring

- **Public Release v1.0** (May)
  - Marketing campaign launch
  - Press release and media outreach
  - Launch event planning
  - Customer onboarding automation

### Funding
- **Seed Round - $2M** (May-June)
  - Pitch deck preparation
  - Investor meetings
  - Due diligence process
  - Term sheet negotiation

---

## 📈 Q3-Q4 2025 - Scale Phase
**Timeline:** July - December 2025  
**Status:** ⏳ Planned

### Technology Expansion
- **Advanced Features** (Jul-Sep)
  - AI-powered analytics
  - Third-party integrations
  - Mobile application
  - Enterprise features

### Market Expansion
- **Customer Acquisition** (Jul-Dec)
  - Target: 500 paying customers
  - Content marketing strategy
  - Partnership development
  - Sales team scaling
  - Customer success program

### Series A Preparation
- **Next Funding Round** (Oct-Dec)
  - Financial modeling
  - Growth metrics tracking
  - Advisory board formation
  - Strategic planning

---

## 🌍 2026 - Expansion Year
**Timeline:** January - December 2026  
**Status:** ⏳ Planned

### Geographic Expansion
- **Q1-Q2: International Markets**
  - European market entry
  - APAC market research
  - Localization and compliance
  - Regional partnerships
  - Local team building

### Platform Ecosystem
- **Q2-Q3: Developer Marketplace**
  - Third-party app store
  - Developer SDK and APIs
  - Partner certification program
  - Revenue sharing model

### Enterprise Strategy
- **Q3-Q4: Enterprise Customers**
  - Enterprise security features
  - SOC2 and ISO certifications
  - Dedicated support team
  - Custom deployment options

---

## 👑 2027 - Market Leadership
**Timeline:** January - December 2027  
**Status:** ⏳ Planned

### Strategic Growth
- **Q1-Q2: Acquisitions**
  - Identify acquisition targets
  - Due diligence and valuation
  - Integration planning
  - Synergy realization

### IPO Preparation
- **Q3-Q4: Public Offering**
  - Financial audit and compliance
  - Board composition
  - Investment banking selection
  - S-1 filing preparation

---

## Key Milestones Timeline

\`\`\`
2025 Q1: MVP Complete ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2025 Q2: Product Launch     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2025 Q2: Seed Funding ($2M)      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2025 Q3: 100 Customers                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2025 Q4: 500 Customers                       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2026 Q1: International Launch                       ━━━━━━━━━━━━━━━━━━━━━━━━━━━
2026 Q2: Series A ($10M)                                 ━━━━━━━━━━━━━━━━━━━━━
2026 Q3: Developer Platform                                      ━━━━━━━━━━━━━━━
2026 Q4: Enterprise Ready                                               ━━━━━━━━━
2027 Q1: Market Leader                                                       ━━━━
2027 Q4: IPO Ready                                                               ━
\`\`\`

## Status Legend
- ✅ Completed
- 🔄 In Progress
- ⏳ Planned
- 🔴 At Risk
- 🟡 On Track
- 🟢 Ahead of Schedule
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        <MarkdownContent content={roadmapContent} />
      </div>
    </div>
  );
}
