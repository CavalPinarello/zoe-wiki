import EditableContent from '@/components/EditableContent';
import { Bot } from 'lucide-react';

const lumosContent = `# Lumos - Embodied AI Assistant

## 🤖 Vision

Lumos is Zoe's physical embodiment - a therapeutic companion and home assistant that brings our sleep optimization platform into the physical world.

## Core Capabilities

### 🏠 Environment Optimization
- **Light Control**: Manages circadian-appropriate lighting throughout the day
- **Temperature Regulation**: Interfaces with smart thermostats for optimal sleep temperature
- **Sound Management**: White noise, nature sounds, or complete silence based on preferences
- **Air Quality**: Monitors and adjusts humidity, CO2 levels, and air circulation

### 💬 Therapeutic Companion
- **Voice Interaction**: Natural conversation about sleep concerns and daily wellness
- **CBT-I Guidance**: Delivers cognitive behavioral therapy for insomnia protocols
- **Relaxation Techniques**: Guides through breathing exercises, meditation, progressive muscle relaxation
- **Wake-Up Assistance**: Gentle, personalized wake routines aligned with sleep cycles

### 📊 Data Collection
- **Environmental Sensing**: Continuous monitoring of bedroom conditions
- **Movement Detection**: Non-invasive sleep tracking through motion sensors
- **Voice Analysis**: Detect stress, fatigue, or mood changes through voice patterns
- **Integration Hub**: Connects all smart home devices into unified sleep ecosystem

## Design Philosophy

### Physical Form
- **Non-threatening**: Soft, organic shapes rather than traditional robot appearance
- **Ambient Presence**: Blends into bedroom environment, not intrusive
- **Adaptive Lighting**: Built-in light ring for circadian signaling
- **Minimal Footprint**: Compact design suitable for nightstand placement

### Interaction Design
- **Privacy-First**: All processing done locally when possible
- **Consent-Based**: Always asks permission before interventions
- **Personality**: Warm, caring, knowledgeable but not overbearing
- **Multimodal**: Voice, light, gentle sounds, optional touch interface

## Technical Architecture

### Hardware Stack
- **Processor**: Edge AI chip for local processing
- **Sensors**: Array including light, sound, temperature, humidity, air quality
- **Actuators**: Motorized base for subtle movements, LED array
- **Connectivity**: WiFi, Bluetooth, Zigbee for smart home integration
- **Audio**: High-quality speaker and microphone array with beamforming

### Software Integration
- **Zoe Platform**: Seamless integration with Sleep 360 Dashboard
- **Local AI Models**: On-device processing for privacy
- **Cloud Sync**: Optional encrypted backup and advanced processing
- **OTA Updates**: Regular improvements to capabilities

## Development Timeline

### Phase 1: Concept & Prototype (2026)
- Industrial design concepts
- User research and testing
- Technical feasibility studies
- Partner identification (hardware manufacturers)

### Phase 2: Alpha Development (2027)
- First functional prototypes
- Limited pilot program (10-20 units)
- Feedback integration
- Regulatory approval process

### Phase 3: Beta Launch (2028)
- Production-ready design
- Manufacturing partnership
- Beta program (100-500 units)
- Premium tier exclusive access

### Phase 4: Market Release (2028+)
- Full production scale
- Global availability
- Consumer and clinical versions
- Continuous feature updates

## Market Positioning

### Target Segments
1. **Premium Consumers**: Early adopters in Zoe's concierge tier
2. **Sleep Clinics**: Professional version for clinical settings
3. **Elderly Care**: Specialized features for aging population
4. **Hotels**: Luxury hospitality partnerships

### Pricing Strategy
- **Consumer Version**: $2,000-3,000 one-time + Zoe subscription
- **Clinical Version**: $5,000-8,000 with professional features
- **Subscription Enhancement**: Additional $20-50/month for Lumos features

## Differentiators

### vs. Smart Speakers (Alexa, Google Home)
- Purpose-built for sleep and wellness
- Physical presence and environmental control
- Medical-grade insights and interventions
- Privacy-focused design

### vs. Sleep Robots (Somnox, etc.)
- Full ecosystem integration
- AI-powered personalization
- Environmental control capabilities
- Continuous learning and adaptation

## Future Vision

Lumos represents the future of ambient computing for health:
- Invisible yet present when needed
- Proactive yet respectful of boundaries
- Scientific yet approachable
- Powerful yet private

By 2030, Lumos aims to be the trusted sleep guardian in millions of bedrooms worldwide.`;

export default function LumosPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-800">Lumos Robot</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={lumosContent} 
            contentKey="lumos"
            title="Lumos - Embodied AI"
          />
        </div>
      </div>
    </div>
  );
}
