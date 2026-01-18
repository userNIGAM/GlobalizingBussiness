import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

export default function Messages() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 rounded-full p-4">
            <Clock size={40} className="text-purple-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coming Soon</h1>
        <p className="text-gray-600 mb-6">
          The Messages feature is currently in development. We're working hard to bring you an amazing experience!
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Check back soon for updates on new features and improvements.
          </p>
        </div>
        <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Notify Me
        </button>
      </div>
    </div>
  );
}
