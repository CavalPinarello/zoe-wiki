'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Code, 
  Smartphone, 
  BarChart3, 
  Target, 
  Clock, 
  CheckCircle2, 
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Users,
  MapPin,
  Rocket
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

interface HackathonObjective {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed';
  assignee?: string;
}

const initialObjectives: HackathonObjective[] = [
  {
    id: '1',
    title: 'Build Lightweight iOS Mobile App',
    description: 'Develop a native iOS application that seamlessly integrates with Apple Health to aggregate sleep data from various devices including Apple Watch, Oura Ring, and other compatible wearables.',
    priority: 'high',
    status: 'not-started'
  },
  {
    id: '2',
    title: 'Create Modular Dashboard Architecture',
    description: 'Design and implement a scalable, modular dashboard system that adapts to the needs of different customer segments (Longevity Seekers, Optimizers, Biohackers, Sleep Sufferers).',
    priority: 'high',
    status: 'not-started'
  },
  {
    id: '3',
    title: 'Implement Real-time Sleep Analytics',
    description: 'Build a real-time analytics engine that processes sleep data streams and provides instant insights on sleep quality, patterns, and recommendations.',
    priority: 'medium',
    status: 'not-started'
  },
  {
    id: '4',
    title: 'Develop AI Sleep Coach MVP',
    description: 'Create an AI-powered sleep coaching system that provides personalized recommendations based on user data, habits, and goals.',
    priority: 'high',
    status: 'not-started'
  },
  {
    id: '5',
    title: 'Design Wearable-Agnostic Data Pipeline',
    description: 'Build a robust data pipeline that can ingest, normalize, and process data from multiple wearable devices and health platforms.',
    priority: 'medium',
    status: 'not-started'
  },
  {
    id: '6',
    title: 'Create Community Features',
    description: 'Implement social features for the Biohacker segment including forums, challenges, and data sharing capabilities.',
    priority: 'low',
    status: 'not-started'
  }
];

export default function HackathonPage() {
  const { isAuthenticated } = useAuth();
  const [objectives, setObjectives] = useState<HackathonObjective[]>(initialObjectives);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedObjective, setEditedObjective] = useState<HackathonObjective | null>(null);

  useEffect(() => {
    const savedObjectives = localStorage.getItem('hackathon-objectives');
    if (savedObjectives) {
      try {
        setObjectives(JSON.parse(savedObjectives));
      } catch (e) {
        console.error('Failed to load saved objectives:', e);
      }
    }
  }, []);

  const handleEdit = (objective: HackathonObjective) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to edit');
      return;
    }
    setEditingId(objective.id);
    setEditedObjective({ ...objective });
  };

  const handleSave = () => {
    if (editedObjective) {
      const updatedObjectives = objectives.map(o => 
        o.id === editedObjective.id ? editedObjective : o
      );
      setObjectives(updatedObjectives);
      localStorage.setItem('hackathon-objectives', JSON.stringify(updatedObjectives));
      setEditingId(null);
      setEditedObjective(null);
      toast.success('Objective updated successfully');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedObjective(null);
  };

  const handleDelete = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to delete');
      return;
    }
    const updatedObjectives = objectives.filter(o => o.id !== id);
    setObjectives(updatedObjectives);
    localStorage.setItem('hackathon-objectives', JSON.stringify(updatedObjectives));
    toast.success('Objective deleted');
  };

  const handleAddObjective = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add objectives');
      return;
    }
    const newObjective: HackathonObjective = {
      id: Date.now().toString(),
      title: 'New Objective',
      description: 'Add description here',
      priority: 'medium',
      status: 'not-started'
    };
    const updatedObjectives = [...objectives, newObjective];
    setObjectives(updatedObjectives);
    localStorage.setItem('hackathon-objectives', JSON.stringify(updatedObjectives));
    setEditingId(newObjective.id);
    setEditedObjective(newObjective);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ZOE Hackathon 2024
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            September 12-15 • Half Moon Bay, California
          </p>
        </motion.div>

        {/* Event Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-6 mb-10"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
            <Calendar className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Duration</h3>
            <p className="text-2xl font-bold">4 Days</p>
            <p className="text-sm opacity-90">Sept 12-15</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 shadow-lg">
            <MapPin className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-2xl font-bold">Half Moon Bay</p>
            <p className="text-sm opacity-90">California</p>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 shadow-lg">
            <Users className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Participants</h3>
            <p className="text-2xl font-bold">Core Team</p>
            <p className="text-sm opacity-90">Engineering & Product</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 shadow-lg">
            <Rocket className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Goal</h3>
            <p className="text-2xl font-bold">MVP Launch</p>
            <p className="text-sm opacity-90">January 15, 2025</p>
          </div>
        </motion.div>

        {/* Objectives Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Hackathon Objectives</h2>
            {isAuthenticated && (
              <button
                onClick={handleAddObjective}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Objective
              </button>
            )}
          </div>

          <div className="space-y-4">
            {objectives.map((objective, index) => {
              const isEditing = editingId === objective.id;
              const currentObjective = isEditing ? editedObjective! : objective;

              return (
                <motion.div
                  key={objective.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getStatusIcon(currentObjective.status)}
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentObjective.title}
                            onChange={(e) => setEditedObjective({ ...currentObjective, title: e.target.value })}
                            className="flex-1 text-xl font-semibold px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          <h3 className="text-xl font-semibold text-gray-800">{objective.title}</h3>
                        )}
                        {isEditing ? (
                          <select
                            value={currentObjective.priority}
                            onChange={(e) => setEditedObjective({ 
                              ...currentObjective, 
                              priority: e.target.value as 'high' | 'medium' | 'low' 
                            })}
                            className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(objective.priority)}`}>
                            {objective.priority.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {isEditing ? (
                        <textarea
                          value={currentObjective.description}
                          onChange={(e) => setEditedObjective({ ...currentObjective, description: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-600">{objective.description}</p>
                      )}
                      {isEditing && (
                        <div className="mt-3 flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Status:</span>
                            <select
                              value={currentObjective.status}
                              onChange={(e) => setEditedObjective({ 
                                ...currentObjective, 
                                status: e.target.value as 'not-started' | 'in-progress' | 'completed' 
                              })}
                              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="not-started">Not Started</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </label>
                          <label className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Assignee:</span>
                            <input
                              type="text"
                              value={currentObjective.assignee || ''}
                              onChange={(e) => setEditedObjective({ ...currentObjective, assignee: e.target.value })}
                              placeholder="Team member name"
                              className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </label>
                        </div>
                      )}
                      {!isEditing && objective.assignee && (
                        <div className="mt-2 text-sm text-gray-500">
                          Assigned to: <span className="font-medium">{objective.assignee}</span>
                        </div>
                      )}
                    </div>
                    {isAuthenticated && (
                      <div className="flex items-center gap-2 ml-4">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Save"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(objective)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(objective.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Technology Stack</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-600" />
                Mobile Development
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Swift & SwiftUI for iOS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>HealthKit Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Core Data for offline storage</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-pink-600" />
                Backend & Analytics
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Node.js & TypeScript</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>PostgreSQL & TimescaleDB</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>Apache Kafka for streaming</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Dashboard & Visualization
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>React & Next.js</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>D3.js for data visualization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Tailwind CSS for UI</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Success Metrics</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Technical Deliverables</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Working iOS app with Apple Health integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Functional dashboard with real-time updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Data pipeline processing 1000+ users</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>AI coach providing basic recommendations</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Business Outcomes</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Target className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                  <span>MVP ready for 100 beta users by Jan 15</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                  <span>Customer segment-specific features defined</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                  <span>Partnership integrations documented</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-5 h-5 text-orange-500 mr-2 mt-0.5" />
                  <span>Go-to-market strategy validated</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {!isAuthenticated && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Sign in to edit hackathon objectives
          </div>
        )}
      </div>
    </div>
  );
}