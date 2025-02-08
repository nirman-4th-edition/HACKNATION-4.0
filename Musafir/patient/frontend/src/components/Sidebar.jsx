import React, { useState } from 'react';
import {
  Calendar,
  User,
  Stethoscope,
  ClipboardList,
  Pill,
  Settings,
  Star,
  Layout,
  ScrollText,
  Users,
  FileText,
  Building2,
  X,
  Dna,  // Keep Dna icon
  Beaker  // Replace Flask with Beaker
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isExperimentalModalOpen, setIsExperimentalModalOpen] = useState(false);

  const menuItems = [
    { icon: Layout, label: 'Dashboard' },
    { icon: Calendar, label: 'Clinic Search Appointment' },
    { icon: Stethoscope, label: 'Health Dashboard' },
    { icon: Pill, label: 'Pharmacy Med' },
    { icon: User, label: 'Profile' },
    { icon: FileText, label: 'Testbook Reports' },
    { icon: ClipboardList, label: 'Prescription Scan' },
    { 
      icon: Beaker,  // Use Beaker icon 
      label: 'Experimental 3D Report', 
      experimental: true 
    }
  ];

  return (
    <div className="block">
      {/* Existing Upgrade Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-black">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
            <p className="text-gray-600">Get access to premium features.</p>
          </div>
        </div>
      )}

      {/* Experimental Feature Modal */}
      {isExperimentalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-black">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsExperimentalModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-yellow-600">Experimental Feature</h2>
            <div className="flex items-center mb-4">
              <Beaker className="w-10 h-10 mr-4 text-yellow-500" />
              <p className="text-gray-700">
                This is an experimental feature. It may contain bugs, incomplete functionality, 
                or significant changes. Use with caution.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Proceed at your own risk
              </div>
              <button 
                onClick={() => {
                  setActiveSection('Experimental 3D Report');
                  setIsExperimentalModalOpen(false);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col bg-gray-900 p-2 sm:p-4 rounded-3xl m-2 transition-all duration-300">
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`group flex items-center px-2 sm:px-4 py-2 mb-4 rounded-3xl cursor-pointer transition-colors relative
                ${activeSection === item.label
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'text-gray-400 hover:bg-gray-800'} 
                ${item.experimental ? 'border-2 border-yellow-500/30' : ''}`}
              onClick={() => {
                if (item.experimental) {
                  setIsExperimentalModalOpen(true);
                } else {
                  setActiveSection(item.label);
                }
              }}
            >
              <item.icon className={`w-5 h-5 sm:mr-3 min-w-[20px] 
                ${item.experimental ? 'text-yellow-500' : ''}`} 
              />
              <span className="absolute left-12 bg-gray-800 text-white px-2 py-1 rounded hidden group-hover:block sm:hidden whitespace-nowrap text-sm z-50">
                {item.label}
              </span>
              <span className={`hidden sm:block ${activeSection === item.label ? 'font-medium' : ''}`}>
                {item.label}
                {item.experimental && (
                  <span className="ml-2 text-xs bg-yellow-500 text-white px-1 rounded">
                    Exp
                  </span>
                )}
              </span>
            </div>
          ))}
        </nav>

        <div className="mt-8 sm:mt-32">
          <div
            className="group relative cursor-pointer"
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            <div className="p-2 sm:p-4 rounded-xl bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center sm:justify-start">
              <Star className="w-5 h-5 text-white" />
              <span className="absolute left-12 bg-gray-800 text-white px-2 py-1 rounded hidden group-hover:block sm:hidden whitespace-nowrap text-sm">
                Upgrade
              </span>
              <div className="hidden sm:block text-white ml-3">
                <button className="flex items-center text-sm hover:underline">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;