'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Clock, Calendar, Target } from 'lucide-react';
import { RoadmapItem } from '@/lib/roadmap-data';

interface TimelineProps {
  items: RoadmapItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-blue-500';
      case 'engineering': return 'bg-purple-500';
      case 'marketing': return 'bg-green-500';
      case 'operations': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress': return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'planned': return <Calendar className="w-6 h-6 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const isExpanded = expandedItems.includes(item.id);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline node */}
              <div className="absolute left-8 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`}></div>
              </div>
              
              {/* Content card */}
              <div className="ml-20">
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(item.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(item.category)}`}>
                          {item.category.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">{item.quarter}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Key Milestones
                          </h4>
                          <ul className="space-y-2">
                            {item.milestones.map((milestone, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-2"
                              >
                                <span className="text-blue-500 mt-1">•</span>
                                <span className="text-gray-600">{milestone}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
