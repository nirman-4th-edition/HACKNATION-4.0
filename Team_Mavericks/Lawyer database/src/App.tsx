import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { Tabs } from './components/Tabs';
import { NotificationList } from './components/NotificationList';
import { UserList } from './components/UserList';
import { CaseDetails } from './components/CaseDetails';
import type { Notification, User, CaseDetail } from './types';

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    message: 'Requested document review for case #123',
    timestamp: '2024-03-10 14:30',
    isRead: false,
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    message: 'Updated case documents for review',
    timestamp: '2024-03-10 13:15',
    isRead: true,
  },
];

const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Rajesh Kumar',
    caseNumber: 'CASE-2024-001',
    caseType: 'Civil Litigation',
    status: 'Active',
    lastUpdated: '2024-03-10',
  },
  {
    id: 'user2',
    name: 'Lalit Sahoo',
    caseNumber: 'CASE-2024-002',
    caseType: 'Family Law',
    status: 'Active',
    lastUpdated: '2024-03-09',
  },
];

const mockCaseDetail: CaseDetail = {
  notices: [
    'Court hearing scheduled for March 15, 2024',
    'Document submission deadline: March 20, 2024',
  ],
  progress: 'Case documents under review. Preparing for upcoming court hearing.',
  documents: [
    {
      name: 'Court Summons.pdf',
      url: '#',
      uploadedAt: '2024-03-08',
    },
    {
      name: 'Evidence Document.pdf',
      url: '#',
      uploadedAt: '2024-03-09',
    },
  ],
  reminders: [
    {
      id: '1',
      title: 'Prepare Court Documents',
      date: '2024-03-14',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Client Meeting',
      date: '2024-03-13',
      isCompleted: true,
    },
  ],
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'users'>('notifications');
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const handleApprove = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, status: 'approved' as const } : n
      )
    );
  };

  const handleDeny = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, status: 'denied' as const } : n
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Lawyer's Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'notifications' ? (
            <NotificationList
              notifications={notifications}
              onNotificationRead={handleNotificationRead}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          ) : (
            <UserList users={mockUsers} />
          )}
        </div>
      </main>
    </div>
  );
}

function CaseDetailsPage() {
  const [caseDetails, setCaseDetails] = useState(mockCaseDetail);

  const handleUpdateProgress = (progress: string) => {
    setCaseDetails((prev) => ({ ...prev, progress }));
  };

  const handleAddReminder = (reminder: { title: string; date: string }) => {
    setCaseDetails((prev) => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        {
          id: String(prev.reminders.length + 1),
          ...reminder,
          isCompleted: false,
        },
      ],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Case Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CaseDetails
          caseDetails={caseDetails}
          onUpdateProgress={handleUpdateProgress}
          onAddReminder={handleAddReminder}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/case/:id" element={<CaseDetailsPage />} />
      </Routes>
    </Router>
  );
}