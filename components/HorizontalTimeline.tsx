'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Calendar, Target, ChevronDown } from 'lucide-react';
import { RoadmapItem } from '@/lib/roadmap-data';

interface HorizontalTimelineProps {
  items: RoadmapItem[];
  title: string;
}

export default function HorizontalTimeline({ items, title }: HorizontalTimelineProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-orange-500';
      case 'engineering': return 'bg-amber-500';
      case 'marketing': return 'bg-yellow-500';
      case 'operations': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress': return <Clock className="w-6 h-6 text-amber-500" />;
      case 'planned': return <Calendar className="w-6 h-6 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Timeline container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 px-12 min-w-max">
            {items.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline line */}
                {index < items.length - 1 && (
                  <div className="absolute top-8 left-full w-6 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                )}
                
                {/* Timeline node and card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-80"
                >
                  {/* Node */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white border-4 border-orange-500 rounded-full flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full ${getCategoryColor(item.category)}`}></div>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="text-center mb-2">
                    <span className="text-sm font-semibold text-gray-500">{item.quarter}</span>
                  </div>
                  
                  {/* Card */}
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(item.category)}`}>
                          {item.category.toUpperCase()}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItem === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    
                    <AnimatePresence>
                      {expandedItem === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Key Milestones
                            </h4>
                            <ul className="space-y-1">
                              {item.milestones.slice(0, 3).map((milestone, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <span className="text-orange-500 mt-0.5">•</span>
                                  <span className="text-gray-600">{milestone}</span>
                                </li>
                              ))}
                              {item.milestones.length > 3 && (
                                <li className="text-sm text-orange-600 font-medium">
                                  +{item.milestones.length - 3} more milestones
                                </li>
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
