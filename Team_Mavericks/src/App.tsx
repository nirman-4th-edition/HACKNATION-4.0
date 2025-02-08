import React, { useState } from 'react';
import { Shield, FileText, UserCheck, X, Check, Search, LogIn } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, any login works
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-[#0A2F5D] text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="text-[#FFD700]" size={32} />
            <div>
              <h1 className="text-2xl font-bold">Court Connect</h1>
              <p className="text-sm text-gray-300">Digital Justice Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>भारत सरकार</span>
            <span>|</span>
            <span>Government of India</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            {/* Card Header */}
            <div className="bg-[#0A2F5D] p-6 text-center">
              <div className="flex justify-center mb-4">
                <LogIn className="text-[#FFD700]" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-gray-300 text-sm mt-2">Secure Government Access Portal</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Official Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#0A2F5D] focus:ring focus:ring-[#0A2F5D] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="Enter your official email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#0A2F5D] focus:ring focus:ring-[#0A2F5D] focus:ring-opacity-20 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#0A2F5D] hover:bg-[#0A2F5D]/90 active:transform active:scale-[0.98]'
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  'Login to Admin Portal'
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>Protected by Government Grade Security</p>
                <div className="flex items-center justify-center mt-4 space-x-2 text-[#0A2F5D]">
                  <Shield size={16} />
                  <span>256-bit SSL Encrypted</span>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Court Connect - Government of India</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;