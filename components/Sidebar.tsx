'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  Heart, 
  Sparkles, 
  FileText,
  Cpu,
  Settings,
  LogIn,
  LogOut,
  User,
  DollarSign,
  Bot,
  Palette,
  FolderOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Business Model', href: '/business-model', icon: DollarSign },
  { name: 'Values', href: '/values', icon: Heart },
  { name: 'Strengths', href: '/strengths', icon: Sparkles },
  { name: 'Architecture', href: '/architecture', icon: Cpu },
  { name: 'Lumos Robot', href: '/lumos', icon: Bot },
  { name: 'Visual Design', href: '/visuals', icon: Palette },
  { name: 'Documents', href: '/documents', icon: FolderOpen },
  { name: 'One Sentence', href: '/one-sentence', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
          ZOE Wiki
        </h1>
        <p className="text-gray-400 text-sm mt-2">Internal Knowledge Base</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
                    : 'hover:bg-gray-900 text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10 border-t border-gray-700">
        <div className="space-y-2">
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Signed in as</span>
                </div>
                <p className="text-sm font-medium text-white truncate">{user?.email}</p>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300 w-full transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300 w-full transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Sign In to Edit</span>
            </button>
          )}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 text-gray-300 w-full transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
