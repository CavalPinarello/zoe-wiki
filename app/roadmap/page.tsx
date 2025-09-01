'use client';

import { useState } from 'react';
import ArrowTimeline from '@/components/ArrowTimeline';
import CalendarView from '@/components/CalendarView';
import HorizontalTimeline from '@/components/HorizontalTimeline';
import { detailedTimeline } from '@/lib/detailed-timeline';
import { threeMonthTimeline, sixMonthTimeline, threeYearTimeline } from '@/lib/timeline-data';
import { Rocket, Calendar, Target, LayoutGrid, ArrowRight } from 'lucide-react';

export default function RoadmapPage() {
  const [view, setView] = useState<'arrow' | 'calendar' | 'timelines'>('arrow');

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="w-8 h-8 text-orange-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Product Roadmap
          </h1>
        </div>
        <p className="text-gray-600 text-lg mb-6">
          Navigate through our strategic timeline - click on dots to explore details
        </p>
        
        {/* View Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('arrow')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              view === 'arrow' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            Detailed Timeline
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              view === 'calendar' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Calendar View
          </button>
          <button
            onClick={() => setView('timelines')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              view === 'timelines' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Time Horizons
          </button>
        </div>
      </div>

      {/* Views */}
      {view === 'arrow' && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Event Timeline</h2>
          <p className="text-gray-600 mb-8">Starting with September 4 hackathon with Yoichiro, Christoph, Martin & Baher</p>
          <ArrowTimeline events={detailedTimeline} />
        </div>
      )}

      {view === 'calendar' && (
        <CalendarView events={detailedTimeline} />
      )}

      {view === 'timelines' && (
        <>
          {/* 3-Month Timeline */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Next 3 Months</h2>
              <span className="text-sm text-gray-500 ml-2">Detailed sprint planning</span>
            </div>
            <HorizontalTimeline items={threeMonthTimeline} title="" />
          </div>

          {/* 6-Month Timeline */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-800">6-Month Horizon</h2>
              <span className="text-sm text-gray-500 ml-2">Major milestones to Basel</span>
            </div>
            <HorizontalTimeline items={sixMonthTimeline} title="" />
          </div>

          {/* 3-Year Vision */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">3-Year Vision</h2>
              <span className="text-sm text-gray-500 ml-2">Strategic growth trajectory</span>
            </div>
            <HorizontalTimeline items={threeYearTimeline} title="" />
          </div>
        </>
      )}
    </div>
  );
}
