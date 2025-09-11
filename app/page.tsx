'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Heart, Sparkles, FileText, Users, TrendingUp, Cpu, Calendar } from 'lucide-react';

export default function Home() {
  const cards = [
    {
      title: 'Hackathon Sept 12 & 15',
      description: 'Virtual sprint: iOS app, modular dashboard, AI coach',
      icon: Calendar,
      href: '/hackathon',
      color: 'from-purple-600 to-pink-600',
      highlight: true
    },
    {
      title: 'Customer Segments',
      description: 'Four key segments from longevity seekers to sleep sufferers',
      icon: Users,
      href: '/customer-segments',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Roadmap',
      description: 'From MVP to global sleep OS by 2028',
      icon: Rocket,
      href: '/roadmap',
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Business Model',
      description: 'Tiered pricing from concierge to mass market',
      icon: TrendingUp,
      href: '/business-model',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      title: 'Values',
      description: 'Science-first, empathy-driven, community-powered',
      icon: Heart,
      href: '/values',
      color: 'from-orange-400 to-orange-600'
    },
    {
      title: 'Strengths',
      description: 'Stanford heritage, fastest science, hybrid human+AI',
      icon: Sparkles,
      href: '/strengths',
      color: 'from-amber-400 to-orange-500'
    },
    {
      title: 'Architecture',
      description: 'Hardware-agnostic sleep OS with behavioral design',
      icon: Cpu,
      href: '/architecture',
      color: 'from-orange-600 to-amber-600'
    },
    {
      title: 'One Sentence',
      description: 'Our mission to revolutionize sleep health',
      icon: FileText,
      href: '/one-sentence',
      color: 'from-amber-600 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              ZOE Wiki
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A hybrid human + AI sleep clinic, integrating wearables, behavioral design, 
            and medical expertise to deliver hyper-personalized sleep and circadian health at scale.
          </p>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group ${
                      card.highlight ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                    }`}
                  >
                    {card.highlight && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        NEW
                      </div>
                    )}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h2>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="flex items-center text-orange-600 group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold">Explore</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">Quick Actions</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              View Roadmap
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all">
              Team Directory
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
