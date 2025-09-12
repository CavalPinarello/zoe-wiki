'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  BarChart3, 
  Target, 
  CheckCircle2, 
  Edit2,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

interface TechCategory {
  id: string;
  title: string;
  icon: 'mobile' | 'backend' | 'dashboard';
  items: string[];
}

interface MetricsCategory {
  id: string;
  title: string;
  items: string[];
}

const initialTechStack: TechCategory[] = [
  {
    id: '1',
    title: 'Mobile Development',
    icon: 'mobile',
    items: ['Swift & SwiftUI for iOS', 'HealthKit Integration', 'Core Data for offline storage']
  },
  {
    id: '2',
    title: 'Backend & Analytics',
    icon: 'backend',
    items: ['Node.js & TypeScript', 'PostgreSQL & TimescaleDB', 'Apache Kafka for streaming']
  },
  {
    id: '3',
    title: 'Dashboard & Visualization',
    icon: 'dashboard',
    items: ['React & Next.js', 'D3.js for data visualization', 'Tailwind CSS for UI']
  }
];

const initialMetrics: MetricsCategory[] = [
  {
    id: '1',
    title: 'Technical Deliverables',
    items: [
      'Working iOS app with Apple Health integration',
      'Functional dashboard with real-time updates',
      'Data pipeline processing 1000+ users',
      'AI coach providing basic recommendations'
    ]
  },
  {
    id: '2',
    title: 'Business Outcomes',
    items: [
      'MVP ready for 100 beta users by Jan 15',
      'Customer segment-specific features defined',
      'Partnership integrations documented',
      'Go-to-market strategy validated'
    ]
  }
];

export function EditableTechStack() {
  const { isAuthenticated } = useAuth();
  const [techStack, setTechStack] = useState<TechCategory[]>(initialTechStack);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedStack, setEditedStack] = useState<TechCategory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hackathon-tech-stack');
    if (saved) {
      try {
        setTechStack(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved tech stack:', e);
      }
    }
  }, []);

  const handleEdit = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to edit');
      return;
    }
    setEditing(true);
    setEditedStack(techStack.map(cat => ({ 
      ...cat, 
      items: [...cat.items] 
    })));
  };

  const handleSave = () => {
    setTechStack(editedStack);
    localStorage.setItem('hackathon-tech-stack', JSON.stringify(editedStack));
    setEditing(false);
    toast.success('Technology stack updated');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedStack([]);
  };

  const updateItem = (categoryId: string, itemIndex: number, value: string) => {
    setEditedStack(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const newItems = [...cat.items];
        newItems[itemIndex] = value;
        return { ...cat, items: newItems };
      }
      return cat;
    }));
  };

  const addItem = (categoryId: string) => {
    setEditedStack(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: [...cat.items, 'New technology'] };
      }
      return cat;
    }));
  };

  const removeItem = (categoryId: string, itemIndex: number) => {
    setEditedStack(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: cat.items.filter((_, i) => i !== itemIndex) };
      }
      return cat;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Technology Stack</h3>
        {isAuthenticated && (
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {(editing ? editedStack : techStack).map((category) => {
          const Icon = category.icon === 'mobile' ? Smartphone : 
                      category.icon === 'backend' ? Code : 
                      BarChart3;
          const color = category.icon === 'backend' ? 'pink' : 'purple';
          
          return (
            <div key={category.id}>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Icon className={`w-5 h-5 text-${color}-600`} />
                {category.title}
              </h4>
              <ul className="space-y-2 text-gray-600">
                {editing ? (
                  <>
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`text-${color}-500 mt-1`}>•</span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateItem(category.id, index, e.target.value)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => removeItem(category.id, index)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                    <button
                      onClick={() => addItem(category.id)}
                      className="text-sm text-purple-600 hover:text-purple-700 ml-6"
                    >
                      + Add item
                    </button>
                  </>
                ) : (
                  category.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`text-${color}-500 mr-2`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function EditableMetrics() {
  const { isAuthenticated } = useAuth();
  const [metrics, setMetrics] = useState<MetricsCategory[]>(initialMetrics);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedMetrics, setEditedMetrics] = useState<MetricsCategory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('hackathon-metrics');
    if (saved) {
      try {
        setMetrics(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved metrics:', e);
      }
    }
  }, []);

  const handleEdit = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to edit');
      return;
    }
    setEditing(true);
    setEditedMetrics(metrics.map(cat => ({ 
      ...cat, 
      items: [...cat.items] 
    })));
  };

  const handleSave = () => {
    setMetrics(editedMetrics);
    localStorage.setItem('hackathon-metrics', JSON.stringify(editedMetrics));
    setEditing(false);
    toast.success('Success metrics updated');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedMetrics([]);
  };

  const updateItem = (categoryId: string, itemIndex: number, value: string) => {
    setEditedMetrics(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        const newItems = [...cat.items];
        newItems[itemIndex] = value;
        return { ...cat, items: newItems };
      }
      return cat;
    }));
  };

  const addItem = (categoryId: string) => {
    setEditedMetrics(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: [...cat.items, 'New metric'] };
      }
      return cat;
    }));
  };

  const removeItem = (categoryId: string, itemIndex: number) => {
    setEditedMetrics(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: cat.items.filter((_, i) => i !== itemIndex) };
      }
      return cat;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-10 bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Success Metrics</h3>
        {isAuthenticated && (
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {(editing ? editedMetrics : metrics).map((category) => {
          const Icon = category.title.includes('Technical') ? CheckCircle2 : Target;
          const iconColor = category.title.includes('Technical') ? 'green' : 'orange';
          
          return (
            <div key={category.id}>
              <h4 className="font-semibold text-gray-700 mb-3">{category.title}</h4>
              <ul className="space-y-2 text-gray-600">
                {editing ? (
                  <>
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon className={`w-5 h-5 text-${iconColor}-500 mt-0.5 flex-shrink-0`} />
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateItem(category.id, index, e.target.value)}
                          className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => removeItem(category.id, index)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                    <button
                      onClick={() => addItem(category.id)}
                      className="text-sm text-purple-600 hover:text-purple-700 ml-7"
                    >
                      + Add metric
                    </button>
                  </>
                ) : (
                  category.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Icon className={`w-5 h-5 text-${iconColor}-500 mr-2 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
