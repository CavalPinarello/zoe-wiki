'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Users, Code, Rocket } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'hackathon' | 'meeting' | 'milestone' | 'launch' | 'development';
  participants?: string[];
  description: string;
  deliverables?: string[];
}

interface ArrowTimelineProps {
  events: TimelineEvent[];
}

export default function ArrowTimeline({ events }: ArrowTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'hackathon': return <Code className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'milestone': return <Rocket className="w-4 h-4" />;
      case 'launch': return <Rocket className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'hackathon': return 'bg-orange-500 border-orange-600';
      case 'meeting': return 'bg-amber-500 border-amber-600';
      case 'milestone': return 'bg-yellow-500 border-yellow-600';
      case 'launch': return 'bg-orange-600 border-orange-700';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <div className="relative w-full overflow-x-auto pb-8">
      {/* Arrow line */}
      <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-400">
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ChevronRight className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      {/* Events */}
      <div className="relative flex gap-8 pt-4 min-w-max px-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            {/* Event dot */}
            <motion.button
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all ${getEventColor(event.type)}`}
            >
              {getEventIcon(event.type)}
            </motion.button>

            {/* Date label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-xs font-semibold text-gray-600">{event.date}</p>
            </div>

            {/* Event details popup */}
            <AnimatePresence>
              {selectedEvent === event.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -80, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 z-20 w-64"
                >
                  <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2">{event.title}</h3>
                    
                    {event.participants && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">Participants:</p>
                        <p className="text-sm text-gray-700">{event.participants.join(', ')}</p>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    
                    {event.deliverables && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Deliverables:</p>
                        <ul className="text-xs text-gray-600">
                          {event.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-orange-500">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
