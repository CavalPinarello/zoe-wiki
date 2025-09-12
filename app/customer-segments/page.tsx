'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, TrendingUp, DollarSign, BarChart3, Layers, Heart,
  AlertCircle, Lightbulb, Monitor, CreditCard, Activity,
  Edit2, Save, X, Plus, Trash2, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  segmentOverviews as initialOverviews,
  painPoints as initialPainPoints,
  solutions as initialSolutions,
  dashboards as initialDashboards,
  valuePricing as initialValuePricing,
  metrics as initialMetrics,
  implementationPhases as initialPhases,
  type SegmentOverview, type PainPoint, type Solution, 
  type Dashboard, type ValuePricing, type Metrics, type ImplementationPhase
} from '@/lib/customer-segments-complete-data';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

type TabType = 'overview' | 'pain-points' | 'solutions' | 'dashboards' | 'pricing' | 'metrics' | 'implementation';

export default function CustomerSegmentsPage() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // State for all data
  const [overviews, setOverviews] = useState<SegmentOverview[]>(initialOverviews);
  const [painPoints, setPainPoints] = useState<PainPoint[]>(initialPainPoints);
  const [solutions, setSolutions] = useState<Solution[]>(initialSolutions);
  const [dashboards, setDashboards] = useState<Dashboard[]>(initialDashboards);
  const [valuePricing, setValuePricing] = useState<ValuePricing[]>(initialValuePricing);
  const [metrics, setMetrics] = useState<Metrics[]>(initialMetrics);
  const [phases, setPhases] = useState<ImplementationPhase[]>(initialPhases);

  // Temporary edit states
  const [editedItem, setEditedItem] = useState<any>(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('customer-segments-all-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.overviews) setOverviews(parsed.overviews);
        if (parsed.painPoints) setPainPoints(parsed.painPoints);
        if (parsed.solutions) setSolutions(parsed.solutions);
        if (parsed.dashboards) setDashboards(parsed.dashboards);
        if (parsed.valuePricing) setValuePricing(parsed.valuePricing);
        if (parsed.metrics) setMetrics(parsed.metrics);
        if (parsed.phases) setPhases(parsed.phases);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // Save all data to localStorage
  const saveAllData = () => {
    const allData = {
      overviews, painPoints, solutions, dashboards, 
      valuePricing, metrics, phases
    };
    localStorage.setItem('customer-segments-all-data', JSON.stringify(allData));
  };

  const handleEdit = (item: any) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to edit');
      return;
    }
    setEditingId(item.id);
    setEditedItem(JSON.parse(JSON.stringify(item))); // Deep clone
  };

  const handleSave = () => {
    if (!editedItem) return;
    
    // Update the appropriate data array based on activeTab
    switch (activeTab) {
      case 'overview':
        setOverviews(overviews.map(o => o.id === editedItem.id ? editedItem : o));
        break;
      case 'pain-points':
        setPainPoints(painPoints.map(p => p.id === editedItem.id ? editedItem : p));
        break;
      case 'solutions':
        setSolutions(solutions.map(s => s.id === editedItem.id ? editedItem : s));
        break;
      case 'dashboards':
        setDashboards(dashboards.map(d => d.id === editedItem.id ? editedItem : d));
        break;
      case 'pricing':
        setValuePricing(valuePricing.map(v => v.id === editedItem.id ? editedItem : v));
        break;
      case 'metrics':
        setMetrics(metrics.map(m => m.id === editedItem.id ? editedItem : m));
        break;
      case 'implementation':
        setPhases(phases.map(p => p.id === editedItem.id ? editedItem : p));
        break;
    }
    
    setEditingId(null);
    setEditedItem(null);
    saveAllData();
    toast.success('Changes saved successfully');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedItem(null);
  };

  const handleArrayItemEdit = (field: string, index: number, value: string) => {
    if (!editedItem) return;
    const updatedArray = [...(editedItem[field] || [])];
    updatedArray[index] = value;
    setEditedItem({ ...editedItem, [field]: updatedArray });
  };

  const handleArrayItemAdd = (field: string) => {
    if (!editedItem) return;
    setEditedItem({ 
      ...editedItem, 
      [field]: [...(editedItem[field] || []), 'New item'] 
    });
  };

  const handleArrayItemRemove = (field: string, index: number) => {
    if (!editedItem) return;
    const updatedArray = (editedItem[field] || []).filter((_: any, i: number) => i !== index);
    setEditedItem({ ...editedItem, [field]: updatedArray });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'pain-points', label: 'Pain Points', icon: AlertCircle },
    { id: 'solutions', label: 'Solutions', icon: Lightbulb },
    { id: 'dashboards', label: 'Dashboards', icon: Monitor },
    { id: 'pricing', label: 'Value & Pricing', icon: CreditCard },
    { id: 'metrics', label: 'Success Metrics', icon: Activity },
    { id: 'implementation', label: 'Implementation', icon: Layers }
  ];

  const segmentColors = {
    'Longevity Seekers': 'from-purple-500 to-indigo-500',
    'Optimizers': 'from-blue-500 to-cyan-500',
    'Biohackers': 'from-green-500 to-emerald-500',
    'Sleep Sufferers': 'from-orange-500 to-red-500'
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
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Complete Customer Segment Analysis
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive editable data on our four key customer segments
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 p-2 bg-white rounded-xl shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab - Editable */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {overviews.map((segment, index) => {
                const isEditing = editingId === segment.id;
                const currentItem = isEditing ? editedItem : segment;
                
                return (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${segmentColors[segment.segment as keyof typeof segmentColors]}`}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentItem.nickname}
                            onChange={(e) => setEditedItem({ ...currentItem, nickname: e.target.value })}
                            className="bg-transparent text-white placeholder-white/70 outline-none"
                          />
                        ) : (
                          segment.nickname
                        )}
                      </div>
                      {isAuthenticated && (
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <Save className="w-4 h-4" />
                              </button>
                              <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button onClick={() => handleEdit(segment)} className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={currentItem.segment}
                          onChange={(e) => setEditedItem({ ...currentItem, segment: e.target.value })}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        segment.segment
                      )}
                    </h3>
                    
                    <div className="space-y-3">
                      {['ageRange', 'incomeNetWorth', 'currentHealthSpend', 'marketSize'].map((field) => (
                        <div key={field} className="flex items-start">
                          <span className="text-gray-500 font-medium min-w-[140px]">
                            {field === 'ageRange' && 'Age Range:'}
                            {field === 'incomeNetWorth' && 'Income/Worth:'}
                            {field === 'currentHealthSpend' && 'Health Spend:'}
                            {field === 'marketSize' && 'Market Size:'}
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentItem[field]}
                              onChange={(e) => setEditedItem({ ...currentItem, [field]: e.target.value })}
                              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          ) : (
                            <span className="text-gray-700">{segment[field as keyof SegmentOverview]}</span>
                          )}
                        </div>
                      ))}
                      <div className="pt-3 border-t">
                        <p className="text-sm text-gray-500 mb-1">Primary Motivation</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentItem.primaryMotivation}
                            onChange={(e) => setEditedItem({ ...currentItem, primaryMotivation: e.target.value })}
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800">{segment.primaryMotivation}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Pain Points Tab - Editable */}
          {activeTab === 'pain-points' && (
            <div className="space-y-6">
              {painPoints.map((segment, index) => {
                const isEditing = editingId === segment.id;
                const currentItem = isEditing ? editedItem : segment;
                
                return (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">{segment.segment}</h3>
                      {isAuthenticated && (
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Save className="w-5 h-5" />
                              </button>
                              <button onClick={handleCancel} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <X className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <button onClick={() => handleEdit(segment)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                              <Edit2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary Pain Points */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          Primary Pain Points
                        </h4>
                        <ul className="space-y-2">
                          {isEditing ? (
                            <>
                              {currentItem.primaryPainPoints.map((point: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="text-red-500">•</span>
                                  <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleArrayItemEdit('primaryPainPoints', i, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                  />
                                  <button
                                    onClick={() => handleArrayItemRemove('primaryPainPoints', i)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </li>
                              ))}
                              <button
                                onClick={() => handleArrayItemAdd('primaryPainPoints')}
                                className="text-sm text-orange-600 hover:text-orange-700"
                              >
                                + Add pain point
                              </button>
                            </>
                          ) : (
                            segment.primaryPainPoints.map((point, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                <span className="text-gray-600">{point}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      
                      {/* Secondary Pain Points */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Secondary Pain Points</h4>
                        <ul className="space-y-2">
                          {isEditing ? (
                            <>
                              {currentItem.secondaryPainPoints.map((point: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="text-orange-500">•</span>
                                  <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleArrayItemEdit('secondaryPainPoints', i, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                  />
                                  <button
                                    onClick={() => handleArrayItemRemove('secondaryPainPoints', i)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </li>
                              ))}
                              <button
                                onClick={() => handleArrayItemAdd('secondaryPainPoints')}
                                className="text-sm text-orange-600 hover:text-orange-700"
                              >
                                + Add pain point
                              </button>
                            </>
                          ) : (
                            segment.secondaryPainPoints.map((point, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                <span className="text-gray-600">{point}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Current Solutions and Why They Fail */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Current Solutions</h4>
                          <ul className="space-y-2">
                            {isEditing ? (
                              <>
                                {currentItem.currentSolutions.map((solution: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <span className="text-blue-500">→</span>
                                    <input
                                      type="text"
                                      value={solution}
                                      onChange={(e) => handleArrayItemEdit('currentSolutions', i, e.target.value)}
                                      className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                      onClick={() => handleArrayItemRemove('currentSolutions', i)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </li>
                                ))}
                                <button
                                  onClick={() => handleArrayItemAdd('currentSolutions')}
                                  className="text-sm text-orange-600 hover:text-orange-700"
                                >
                                  + Add solution
                                </button>
                              </>
                            ) : (
                              segment.currentSolutions.map((solution, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-blue-500 mr-2">→</span>
                                  <span className="text-gray-600 text-sm">{solution}</span>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Why Solutions Fail</h4>
                          <ul className="space-y-2">
                            {isEditing ? (
                              <>
                                {currentItem.whySolutionsFail.map((reason: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <input
                                      type="text"
                                      value={reason}
                                      onChange={(e) => handleArrayItemEdit('whySolutionsFail', i, e.target.value)}
                                      className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                      onClick={() => handleArrayItemRemove('whySolutionsFail', i)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </li>
                                ))}
                                <button
                                  onClick={() => handleArrayItemAdd('whySolutionsFail')}
                                  className="text-sm text-orange-600 hover:text-orange-700"
                                >
                                  + Add reason
                                </button>
                              </>
                            ) : (
                              segment.whySolutionsFail.map((reason, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-gray-400 mr-2">✗</span>
                                  <span className="text-gray-600 text-sm">{reason}</span>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Success Metrics Tab - Editable Table */}
          {activeTab === 'metrics' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Segment</th>
                      <th className="px-6 py-4 text-left">CAC</th>
                      <th className="px-6 py-4 text-left">Conversion</th>
                      <th className="px-6 py-4 text-left">Channel</th>
                      <th className="px-6 py-4 text-left">Daily Active</th>
                      <th className="px-6 py-4 text-left">Churn</th>
                      <th className="px-6 py-4 text-left">NPS</th>
                      <th className="px-6 py-4 text-left">Key Outcome</th>
                      {isAuthenticated && <th className="px-6 py-4 text-center">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {metrics.map((segment, index) => {
                      const isEditing = editingId === segment.id;
                      const currentItem = isEditing ? editedItem : segment;
                      
                      return (
                        <motion.tr
                          key={segment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium text-gray-800">{segment.segment}</td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.cac}
                                onChange={(e) => setEditedItem({ ...currentItem, cac: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.cac}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.conversionRate}
                                onChange={(e) => setEditedItem({ ...currentItem, conversionRate: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.conversionRate}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.acquisitionChannel}
                                onChange={(e) => setEditedItem({ ...currentItem, acquisitionChannel: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.acquisitionChannel}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.dailyActivePercent}
                                onChange={(e) => setEditedItem({ ...currentItem, dailyActivePercent: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.dailyActivePercent}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.monthlyChurn}
                                onChange={(e) => setEditedItem({ ...currentItem, monthlyChurn: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.monthlyChurn}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.npsTarget}
                                onChange={(e) => setEditedItem({ ...currentItem, npsTarget: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.npsTarget}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentItem.keyOutcomeMetric}
                                onChange={(e) => setEditedItem({ ...currentItem, keyOutcomeMetric: e.target.value })}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                              />
                            ) : (
                              <span className="text-gray-600">{segment.keyOutcomeMetric}</span>
                            )}
                          </td>
                          {isAuthenticated && (
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                {isEditing ? (
                                  <>
                                    <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                      <Save className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                      <X className="w-4 h-4" />
                                    </button>
                                  </>
                                ) : (
                                  <button onClick={() => handleEdit(segment)} className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          )}
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add similar editable implementations for other tabs... */}
          
          {!isAuthenticated && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Sign in to edit customer segment data
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}