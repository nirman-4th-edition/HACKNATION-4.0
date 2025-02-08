import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ContactButton from '../components/ContactButton';
import Dashboard from './Dashboard';
import ClinicSearchAppointment from './ClinicSearchAppointment';
import HealthDashboard from './HealthDashboard';
import Profile from './Profile';
import TestBookReports from './TestBookReports';
import PharmacyMed from './PharmacyMed';
import ThreeDHealthReport from './threedreport';  // Import the 3D Health Report page
import PrescriptionScan from './PrescriptionScan';  // Import the new Prescription Scan page
import '../Styles/global.css';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'Clinic Search Appointment':
        return <ClinicSearchAppointment />;
      case 'Health Dashboard':
        return <HealthDashboard />;
      case 'Profile':
        return <Profile />;
      case 'Testbook Reports':
        return <TestBookReports />;
      case 'Pharmacy Med':
        return <PharmacyMed />;
      case 'Experimental 3D Report':  // Add new case for Experimental 3D Report
        return <ThreeDHealthReport />;
      case 'Prescription Scan':  // Add new case for Prescription Scan
        return <PrescriptionScan />;
      case 'Dashboard':
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