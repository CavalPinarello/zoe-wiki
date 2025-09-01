import EditableContent from '@/components/EditableContent';
import { Palette } from 'lucide-react';

const visualsContent = `# Visual Design System

## 🎨 Brand Identity

### Color Palette

#### Primary Colors
- **Sunset Orange**: #F97316 - Energy, vitality, awakening
- **Warm Amber**: #FBBf24 - Comfort, rest, restoration  
- **Golden Yellow**: #FDE047 - Light, circadian rhythm, morning

#### Secondary Colors
- **Deep Black**: #000000 - Night, depth, premium feel
- **Pure White**: #FFFFFF - Clarity, cleanliness, medical precision
- **Neutral Grays**: #6B7280 - Balance, professionalism

### Typography

#### Headlines
- **Font**: Inter or SF Pro Display
- **Weight**: Bold (700) for primary, Semibold (600) for secondary
- **Style**: Clean, modern, approachable yet professional

#### Body Text
- **Font**: Inter or System UI
- **Weight**: Regular (400) for body, Medium (500) for emphasis
- **Line Height**: 1.6 for optimal readability

## 🖼️ Visual Elements

### Logo Concepts
- **Primary Mark**: Abstract representation of sleep cycles with sun/moon duality
- **Wordmark**: Clean, modern typography with subtle gradient
- **Icon**: Simplified version for app and favicon use

### Iconography Style
- **Style**: Outlined, minimal, consistent stroke width
- **Metaphors**: Natural elements (sun, moon, stars), human comfort, technology harmony
- **Usage**: Functional clarity over decoration

### Imagery Direction
- **Photography**: Warm, human, authentic - real people in restful environments
- **Illustrations**: Soft, organic shapes with gradient overlays
- **Data Visualizations**: Clean, informative, with subtle animations

## 📱 Interface Patterns

### Dashboard Design
- **Layout**: Card-based with clear hierarchy
- **Metrics**: Large, readable numbers with contextual colors
- **Graphs**: Smooth curves representing sleep patterns
- **Interactions**: Subtle hover states, smooth transitions

### Mobile Experience
- **Navigation**: Bottom tab bar for thumb-friendly access
- **Gestures**: Swipe between time periods, pull to refresh
- **Notifications**: Gentle, non-intrusive, time-appropriate

### Animation Principles
- **Timing**: Smooth, natural easing (ease-in-out)
- **Duration**: 200-400ms for micro-interactions
- **Purpose**: Guide attention, provide feedback, create delight

## 🌅 Environmental Design

### Light Themes
- **Morning**: Warm oranges and yellows, high contrast
- **Day**: Balanced neutrals, optimal readability
- **Evening**: Softer ambers, reduced blue light

### Dark Mode
- **Background**: True black (#000) for OLED efficiency
- **Accents**: Muted oranges and ambers
- **Text**: High contrast white with careful hierarchy

## 📊 Data Visualization

### Sleep Graphs
- **Timeline**: Horizontal flow matching natural time progression
- **Stages**: Color-coded layers (Deep, REM, Light, Awake)
- **Annotations**: Contextual insights at key moments

### Progress Indicators
- **Rings**: Circular progress for daily goals
- **Streaks**: Fire-inspired imagery for consistency
- **Trends**: Smooth area charts with gradient fills

### Comparative Views
- **Before/After**: Split screen comparisons
- **Peer Benchmarks**: Anonymous, respectful comparisons
- **Historical**: Zoomable timeline with multiple granularities

## 🎭 Emotional Design

### Personality Traits
- **Warm**: Never cold or clinical
- **Encouraging**: Positive reinforcement over criticism
- **Scientific**: Data-backed but human-friendly
- **Trustworthy**: Consistent, reliable, transparent

### Micro-Delights
- **Success Moments**: Celebratory but not childish animations
- **Progress Milestones**: Subtle confetti or glow effects
- **Easter Eggs**: Hidden features for engaged users

## 🏗️ Component Library

### Buttons
- **Primary**: Orange gradient with white text
- **Secondary**: White with orange border
- **Ghost**: Transparent with hover state
- **Disabled**: Reduced opacity, no interaction

### Cards
- **Elevation**: Subtle shadows for depth
- **Borders**: Light gray in light mode, dark gray in dark mode
- **Padding**: Consistent spacing system (8px base unit)

### Forms
- **Inputs**: Rounded corners, clear focus states
- **Labels**: Above fields, clear hierarchy
- **Validation**: Inline, friendly error messages

## 🖥️ Platform-Specific

### Web Application
- **Responsive**: Mobile-first, scaling to desktop
- **Performance**: Lazy loading, optimized images
- **Accessibility**: WCAG 2.1 AA compliant

### Native Mobile
- **iOS**: Follow Human Interface Guidelines with Zoe personality
- **Android**: Material Design 3 with brand customization
- **Wearables**: Glanceable, minimal, essential information

## 🚀 Future Explorations

### AR/VR Interfaces
- **Sleep Environment**: Virtual bedroom optimization
- **Meditation Spaces**: Immersive relaxation experiences
- **Data Exploration**: 3D sleep pattern visualization

### Ambient Computing
- **Smart Home**: Seamless integration visuals
- **Lumos Robot**: Physical design language
- **Environmental Displays**: E-ink dashboards, smart mirrors

This visual system creates a cohesive, recognizable, and emotionally resonant experience across all Zoe touchpoints.`;

export default function VisualsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-800">Visual Design</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={visualsContent} 
            contentKey="visuals"
            title="Visual Design System"
          />
        </div>
      </div>
    </div>
  );
}
