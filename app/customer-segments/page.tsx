'use client';

import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, DollarSign } from 'lucide-react';
import EditableTable from '@/components/EditableTable';
import { initialCustomerSegments } from '@/lib/customer-segments-data';

export default function CustomerSegmentsPage() {
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
              Customer Segment Overview
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Understanding our diverse user base to deliver hyper-personalized sleep and circadian health solutions
          </p>
        </motion.div>

        {/* Key Insights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-6 mb-10"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Market</p>
                <p className="text-2xl font-bold text-gray-800">112.5M</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Individuals globally</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Primary Segments</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Distinct customer profiles</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Highest Spend</p>
                <p className="text-2xl font-bold text-gray-800">$300K</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Per year on health</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Largest Segment</p>
                <p className="text-2xl font-bold text-gray-800">100M</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">Sleep Sufferers globally</p>
          </div>
        </motion.div>

        {/* Editable Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EditableTable initialData={initialCustomerSegments} />
        </motion.div>

        {/* Strategy Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Segmentation Strategy</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Key Differentiators</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Income range varies from $30K to $10M+ annually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Health spending ranges from $2K to $300K per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Age demographics span from 25 to 75 years</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Engagement Approach</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Personalized messaging for each segment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Tiered pricing models to match spending capacity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Community-driven features for Biohackers</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}