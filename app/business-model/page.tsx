import EditableContent from '@/components/EditableContent';
import { DollarSign } from 'lucide-react';

const businessModelContent = `# Business Model & Pricing

## 🎯 Tiered Business Model

### Tier 1: Concierge Sleep Clinic (Ultra Premium)
- **Target clients**: Wealthy longevity seekers, elite athletes, UHNW individuals
- **Offering**: Always-available concierge service, hybrid human + AI, integrated wearables, CGM, monthly re-checks, bespoke protocols
- **Pricing**: **$20K/year base**, with athletes potentially at $50–60K/year
- **Positioning**: "Your personal Stanford-grade sleep physician, data scientist, and coach, always on call"

### Tier 2: Hybrid Clinic Model (Premium)
- **Target clients**: Longevity clinics, premium wellness centers
- **Offering**: Licensed physicians + AI dashboard, 1–2 human touchpoints per quarter, full wearable + metabolic integration
- **Pricing**: **~$1K/month per client** (B2B SaaS licensing + concierge hybrid)
- **Positioning**: "Sleep OS for clinics: extend reach of clinicians, elevate service"

### Tier 3: Strava-Scale (Global)
- **Target clients**: Mass-market health-conscious consumers
- **Offering**: Harmonized sleep score across devices, community accountability (leaderboards, streaks, badges), monthly science-updated protocols
- **Pricing**: **$10/month** (or freemium)
- **Positioning**: "The Strava of Sleep: global, open, hardware-agnostic"

## 💡 Pricing Rationale

### Concierge Tier Justification
- Equivalent to having a top-tier sleep physician available on a hotline
- Plus continuous data collection and AI personalization
- Compared to weekly consults at market rates, Zoe delivers exponentially more touchpoints
- Justifies $20K+ annual value

### Athletes Premium
- Sleep as performance-critical
- Value can exceed $50K when framed as comparable to coaching + medical staff integration

### Clinic Tier Economics
- Rationalizes as replacement for costly in-lab studies
- Revenue-multiplier for clinics (license + service hybrid)

### Mass Market Psychology
- $10/month fits consumer psychology
- Mirrors Strava/Headspace pricing
- Enables virality and community adoption

## 📊 Near-Term Prototyping

Before Half Moon Bay, Zoe will test pricing through manual prototype services:

1. **Simple portal** (no AI yet) where clients upload sleep data
2. **Manual review** of last month's data by Martin
3. **Sleep 360 Report** generation
4. **Private consultation** offering
5. **Validation** of perceived value and pricing

### Use Case: Poland
- Fills gaps between clinical studies (where billing limits repeat PSGs)
- Validates Zoe reports and consults value
- Builds pricing justification

## 🔧 Data Strategy & Product Implications

### Short-term (events)
- **Apple Health** as primary integration (widest compatibility, affluent users)

### Medium-term (clinical depth)
- **Garmin** or other devices with continuous oxygen monitoring

### Metabolics
- **Dexcom CGM** or Hello Inside via Apple Health for glucose data

### Validation pathway
- Controlled Garmin/Oura pilots in Poland
- Broad Apple Health in US/EU demos

## 🎨 Design & Experience as Value Driver

Pricing is not just about features — it's about perceived experience.

### Christoph's Critical Role:
- Design entire Zoe experience end-to-end
- Not just UI, but how clients are greeted
- How reports look and feel
- How onboarding feels at Half Moon Bay
- Hospitality integration: accommodations, meals, curated onboarding

## 🚀 Strategic Positioning for Half Moon Bay

By Jan 2026, Zoe's pricing story should feel:

- **Credible**: Concierge tier ($20K) demonstrated as equivalent to weekly Stanford-grade consults
- **Ambitious**: Clinic tier ($1K/month) pitched as ROI-positive for partner clinics
- **Validated**: Prototype consults trialed manually to test willingness to pay
- **Community-driven**: Community/Strava narrative seeded but not yet monetized

Half Moon Bay is not about closing sales — it's about showing ambition, building credibility, and seeding Zoe as the premium standard of sleep medicine.

## 📋 Action Items

### Founder Circle Expansion
- Pursue introductions (Branson, Hamilton, Federer via Allemann, Bode Miller)

### Team Build
- Onboard Christoph
- Recruit behavioral design/psychology lead
- Recruit AI lead

### Prototype Launch
- Martin to build upload/review portal
- Test consult pricing

### Half Moon Bay Demo
- Deliver onboarding flow
- Minimum platform (Apple Health + CGM)
- Polished experience

## 📌 Key Insight

Zoe's business model is tiered by depth and exclusivity:
- **Ultra-premium concierge**
- **Clinic partnerships**
- **Mass-market Strava-scale**

Pricing is rationalized by equivalence to medical care, validated by early prototypes, and elevated by design-driven experience.`;

export default function BusinessModelPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-800">Business Model</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={businessModelContent} 
            contentKey="business-model"
            title="Business Model & Pricing Strategy"
          />
        </div>
      </div>
    </div>
  );
}
