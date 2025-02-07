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
  X
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const menuItems = [
    { icon: Layout, label: 'Dashboard' },
    { icon: Calendar, label: 'Appointments' },
    { icon: User, label: 'Patients' },
    // { icon: Stethoscope, label: 'Consultations' },
    { icon: ClipboardList, label: 'Records' },
    { icon: FileText, label: 'Tests & Reports' },
    { icon: Pill, label: 'Prescriptions' },
    { icon: Building2, label: 'Government Schemes' },
    { icon: Users, label: 'Staff Management' },
    { icon: ScrollText, label: 'Documentation' },
    { icon: Settings, label: 'Settings' }
  ];

  const plans = [
    {
      title: 'Basic',
      price: '$0',
      features: ['Up to 10 patients', '5 consultations/month', 'Basic support'],
      recommended: false,
    },
    {
      title: 'Pro',
      price: '$29',
      features: ['Unlimited patients', 'Unlimited consultations', 'Priority support', 'Advanced analytics'],
      recommended: true,
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      features: ['Customizable solutions', 'Dedicated support', 'Staff management', 'API access'],
      recommended: false,
    },
  ];

  return (
    <div className="block">
      {/* Upgrade Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 text-black">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.title} className={`border rounded-xl p-4 ${plan.recommended ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}`}>
                  {plan.recommended && (
                    <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full mb-4 w-fit">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 rounded-lg font-medium ${plan.recommended 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Content */}
      <div className="flex flex-col bg-gray-900 p-2 sm:p-4 rounded-3xl m-2 transition-all duration-300">
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={`group flex items-center px-2 sm:px-4 py-2 mb-4 rounded-3xl cursor-pointer transition-colors relative
                ${activeSection === item.label
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'text-gray-400 hover:bg-gray-800'}`}
              onClick={() => setActiveSection(item.label)}
            >
              <item.icon className="w-5 h-5 sm:mr-3 min-w-[20px]" />
              <span className="absolute left-12 bg-gray-800 text-white px-2 py-1 rounded hidden group-hover:block sm:hidden whitespace-nowrap text-sm z-50">
                {item.label}
              </span>
              <span className={`hidden sm:block ${activeSection === item.label ? 'font-medium' : ''}`}>
                {item.label}
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