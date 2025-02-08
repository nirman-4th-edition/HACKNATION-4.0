import React from 'react';

interface TabsProps {
  activeTab: 'notifications' | 'users';
  setActiveTab: (tab: 'notifications' | 'users') => void;
}

export function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`${
            activeTab === 'notifications'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`${
            activeTab === 'users'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Users
        </button>
      </nav>
    </div>
  );
}