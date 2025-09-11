'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  Brain,
  Zap,
  BarChart3,
  Layers,
  Heart,
  AlertCircle,
  Lightbulb,
  Monitor,
  CreditCard,
  Activity
} from 'lucide-react';
import { 
  segmentOverviews,
  painPoints,
  solutions,
  dashboards,
  valuePricing,
  metrics,
  implementationPhases
} from '@/lib/customer-segments-complete-data';

type TabType = 'overview' | 'pain-points' | 'solutions' | 'dashboards' | 'pricing' | 'metrics' | 'implementation';

export default function CustomerSegmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

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
            Comprehensive data on our four key customer segments with pain points, solutions, and implementation strategy
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {segmentOverviews.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className={`inline-flex px-3 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${segmentColors[segment.segment as keyof typeof segmentColors]}`}>
                    {segment.nickname}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{segment.segment}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[140px]">Age Range:</span>
                      <span className="text-gray-700">{segment.ageRange}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[140px]">Income/Worth:</span>
                      <span className="text-gray-700">{segment.incomeNetWorth}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[140px]">Health Spend:</span>
                      <span className="text-gray-700">{segment.currentHealthSpend}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-500 font-medium min-w-[140px]">Market Size:</span>
                      <span className="text-gray-700 font-semibold">{segment.marketSize}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-500 mb-1">Primary Motivation</p>
                      <p className="text-lg font-medium text-gray-800">{segment.primaryMotivation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pain Points Tab */}
          {activeTab === 'pain-points' && (
            <div className="space-y-6">
              {painPoints.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{segment.segment}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        Primary Pain Points
                      </h4>
                      <ul className="space-y-2">
                        {segment.primaryPainPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span className="text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Secondary Pain Points</h4>
                      <ul className="space-y-2">
                        {segment.secondaryPainPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-500 mr-2">•</span>
                            <span className="text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Current Solutions</h4>
                        <ul className="space-y-2">
                          {segment.currentSolutions.map((solution, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">→</span>
                              <span className="text-gray-600 text-sm">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Why Solutions Fail</h4>
                        <ul className="space-y-2">
                          {segment.whySolutionsFail.map((reason, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-gray-400 mr-2">✗</span>
                              <span className="text-gray-600 text-sm">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Solutions Tab */}
          {activeTab === 'solutions' && (
            <div className="space-y-6">
              {solutions.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{segment.segment}</h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Core Solution</h4>
                    <p className="text-gray-700">{segment.coreSolution}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {segment.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Unique Differentiators</h4>
                      <ul className="space-y-2">
                        {segment.uniqueDifferentiators.map((diff, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-purple-500 mr-2">★</span>
                            <span className="text-gray-600 text-sm">{diff}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-gray-700 mb-2">Support Model</h4>
                    <p className="text-gray-600">{segment.supportModel}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Dashboards Tab */}
          {activeTab === 'dashboards' && (
            <div className="space-y-6">
              {dashboards.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{segment.segment}</h3>
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium">
                      {segment.dashboardName}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Primary Metrics</h4>
                      <div className="space-y-2">
                        {segment.primaryMetrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <BarChart3 className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Key Visualizations</h4>
                      <div className="space-y-2">
                        {segment.keyVisualizations.map((viz, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Monitor className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-600">{viz}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-gray-700 mb-3">Personalization Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {segment.personalizationFeatures.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Value & Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuePricing.map((segment, index) => (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{segment.segment}</h3>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-6">
                    <p className="text-lg font-medium text-gray-800">{segment.primaryValueProp}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Supporting Messages</h4>
                      <ul className="space-y-1">
                        {segment.supportingMessages.map((msg, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-orange-500 mr-2">→</span>
                            <span className="text-gray-600 text-sm">{msg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Monthly:</span>
                        <span className="font-bold text-xl text-gray-800">{segment.pricingTier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Annual:</span>
                        <span className="font-medium text-green-600">{segment.annualDiscount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">LTV Target:</span>
                        <span className="font-medium text-purple-600">{segment.ltvTarget}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Success Metrics Tab */}
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {metrics.map((segment, index) => (
                      <motion.tr
                        key={segment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">{segment.segment}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.cac}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.conversionRate}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.acquisitionChannel}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.dailyActivePercent}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.monthlyChurn}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.npsTarget}</td>
                        <td className="px-6 py-4 text-gray-600">{segment.keyOutcomeMetric}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Implementation Tab */}
          {activeTab === 'implementation' && (
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{phase.phase}</h3>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium">
                      {phase.timeline}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.keyActivities.map((activity, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600 text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Resources Needed</h4>
                      <ul className="space-y-2">
                        {phase.resourcesNeeded.map((resource, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-600 text-sm">{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Success Criteria</h4>
                      <ul className="space-y-2">
                        {phase.successCriteria.map((criteria, i) => (
                          <li key={i} className="flex items-start">
                            <Target className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                            <span className="text-gray-600 text-sm">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Risk Mitigation</h4>
                      <ul className="space-y-2">
                        {phase.riskMitigation.map((risk, i) => (
                          <li key={i} className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                            <span className="text-gray-600 text-sm">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}