'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';

export default function AuthPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect with password as query parameter
    // The middleware will handle validation and set cookie
    router.push(`/?password=${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">ZOE Wiki Access</h1>
        <p className="text-gray-600 text-center mb-6">
          This is a private wiki. Please enter the password to continue.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all font-semibold"
          >
            Access Wiki
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Contact your administrator if you need access
        </div>
      </div>
    </div>
  );
}
