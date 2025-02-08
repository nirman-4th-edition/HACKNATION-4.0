import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ContactButton from '../components/ContactButton';
import Patients from './Patients';
import Analytics from './Analytics';
// import Studies from './Studies';
import Prescriptions from '../Pages/Prescription';
import Settings from '../Pages/Settings';
import '../Styles/global.css';
import Dashboard from './Dashboard';
import GovernmentSchemes from './GovernmentSchemes';
import StaffManagement from './StaffManagement';
import TestsAndReports from './TestsAndReports';
import Appointments from './Appointments';
import Documentation from './Documentation';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('Dashboard'); // Default set to Dashboard

  const renderContent = () => {
    switch (activeSection) {
      case 'Appointments':
        return <Appointments />;
      case 'Patients':
        return <Patients />;
      case 'Records':
        return <Analytics />;
      case 'Tests & Reports':
        return <TestsAndReports />;
      case 'Prescriptions':
        return <Prescriptions />;
      case 'Government Schemes':
        return <GovernmentSchemes />;
      case 'Staff Management':
        return <StaffManagement />;
      case 'Documentation':
        return <Documentation />;
      case 'Settings':
        return <Settings />;
      case 'Dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <div className="flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 m-4 sm:m-8">
          <div className="bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 rounded-3xl p-4 sm:p-6 overflow-auto">
            {renderContent()}
          </div>
        </div>
      </div>
      <ContactButton />
    </div>
  );
};

export default HomePage;
