import React from 'react';
import { Users, Scale, FileText } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            icon={<Users className="h-8 w-8 text-indigo-600" />}
            title="Users"
            count={152}
            description="Total registered users"
          />
          <DashboardCard
            icon={<Scale className="h-8 w-8 text-indigo-600" />}
            title="Lawyers"
            count={48}
            description="Registered lawyers"
          />
          <DashboardCard
            icon={<FileText className="h-8 w-8 text-indigo-600" />}
            title="Cases"
            count={96}
            description="Active cases"
          />
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  description: string;
}

function DashboardCard({ icon, title, count, description }: DashboardCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{count}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;