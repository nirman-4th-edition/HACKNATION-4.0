import React, { useState } from 'react';
import { UserCircle2, Scale, ShieldCheck } from 'lucide-react';
import UserAuth from './components/UserAuth';
import LawyerAuth from './components/LawyerAuth';
import AdminAuth from './components/AdminAuth';
import UserDashboard from './components/UserDashboard';
import LawyerDashboard from './components/LawyerDashboard';
import AdminDashboard from './components/AdminDashboard';

type UserRole = 'user' | 'lawyer' | 'admin';
type AuthMode = 'login' | 'signup';

function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mode, setMode] = useState<AuthMode>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    switch (selectedRole) {
      case 'user':
        return <UserDashboard />;
      case 'lawyer':
        return <LawyerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">Court Connect</h1>
        
        {!selectedRole ? (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoleCard
              icon={<UserCircle2 size={48} />}
              title="User"
              description="File cases and connect with lawyers"
              onClick={() => setSelectedRole('user')}
            />
            <RoleCard
              icon={<Scale size={48} />}
              title="Lawyer"
              description="Provide legal services"
              onClick={() => setSelectedRole('lawyer')}
            />
            <RoleCard
              icon={<ShieldCheck size={48} />}
              title="Admin"
              description="Manage the platform"
              onClick={() => setSelectedRole('admin')}
            />
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                ← Choose different role
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setMode('login')}
                  className={`px-4 py-2 ${
                    mode === 'login'
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600'
                  } rounded-l-lg`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`px-4 py-2 ${
                    mode === 'signup'
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600'
                  } rounded-r-lg`}
                >
                  Sign Up
                </button>
              </div>
              {selectedRole === 'user' && (
                <UserAuth mode={mode} onAuth={handleAuth} />
              )}
              {selectedRole === 'lawyer' && (
                <LawyerAuth mode={mode} onAuth={handleAuth} />
              )}
              {selectedRole === 'admin' && (
                <AdminAuth mode={mode} onAuth={handleAuth} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function RoleCard({ icon, title, description, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-center mb-4 text-indigo-600">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}

export default App;