import React, { useState, useRef, useEffect } from 'react';
import {
  User, Bell, Shield, Edit, Lock, Key, Building, CreditCard,
  Stethoscope, ArrowRight, CheckCircle2, XCircle, Menu, X
} from 'lucide-react';

const Settings = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clinicDetails, setClinicDetails] = useState({
    name: 'Kishor Medical Center',
    address: '123 Healthcare Blvd, InfoCity',
    contact: '+91 76483 12345',
    specialization: 'Family Medicine'
  });

  const [profileDetails, setProfileDetails] = useState({
    name: 'Dr. Gopal Kishore Das',
    title: 'Senior Physician',
    email: 'Kishore@example.com',
    phone: '+91 92378 26277'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-02-01'
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    pharmacyIntegration: false,
    paymentSystem: 'Not Connected',
    aiServices: 'Basic'
  });

  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      closeMobileMenu();
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        {
          label: 'Personal Information',
          description: 'Update your personal details and information',
          action: () => { setActiveModal('personalInfo'); closeMobileMenu(); }
        },
        {
          label: 'Clinic Details',
          description: 'Manage your clinic information',
          action: () => { setActiveModal('clinicDetails'); closeMobileMenu(); }
        }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        {
          label: 'Password Management',
          description: 'Change password and reset credentials',
          action: () => { setActiveModal('passwordManagement'); closeMobileMenu(); }
        },
        {
          label: 'Two-Factor Authentication',
          description: 'Enhance account security',
          action: () => { setActiveModal('twoFactor'); closeMobileMenu(); }
        }
      ]
    },
    {
      title: 'Integrations',
      icon: Stethoscope,
      items: [
        {
          label: 'Pharmacy Integration',
          description: 'Connect with pharmacy systems',
          action: () => { setActiveModal('pharmacyIntegration'); closeMobileMenu(); }
        },
        {
          label: 'Payment Systems',
          description: 'Manage payment method connections',
          action: () => { setActiveModal('paymentIntegration'); closeMobileMenu(); }
        },
        {
          label: 'AI Medical Services',
          description: 'Configure AI-powered medical tools',
          action: () => { setActiveModal('aiServices'); closeMobileMenu(); }
        }
      ]
    }
  ];

  const renderModal = () => {
    switch (activeModal) {
      case 'personalInfo':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                <User className="mr-2 text-purple-700" /> Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800">Full Name</label>
                  <input
                    type="text"
                    value={profileDetails.name}
                    onChange={(e) => setProfileDetails({ ...profileDetails, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Title</label>
                  <input
                    type="text"
                    value={profileDetails.title}
                    onChange={(e) => setProfileDetails({ ...profileDetails, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Email</label>
                  <input
                    type="email"
                    value={profileDetails.email}
                    onChange={(e) => setProfileDetails({ ...profileDetails, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Phone Number</label>
                  <input
                    type="text"
                    value={profileDetails.phone}
                    onChange={(e) => setProfileDetails({ ...profileDetails, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'clinicDetails':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                <Building className="mr-2 text-purple-700" /> Clinic Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800">Clinic Name</label>
                  <input
                    type="text"
                    value={clinicDetails.name}
                    onChange={(e) => setClinicDetails({ ...clinicDetails, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Address</label>
                  <input
                    type="text"
                    value={clinicDetails.address}
                    onChange={(e) => setClinicDetails({ ...clinicDetails, address: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Contact Number</label>
                  <input
                    type="text"
                    value={clinicDetails.contact}
                    onChange={(e) => setClinicDetails({ ...clinicDetails, contact: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800">Specialization</label>
                  <input
                    type="text"
                    value={clinicDetails.specialization}
                    onChange={(e) => setClinicDetails({ ...clinicDetails, specialization: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-400 text-gray-900 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500/50"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'twoFactor':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                <Lock className="mr-2 text-purple-700" /> Two-Factor Authentication
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-700">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setSecuritySettings({
                      ...securitySettings,
                      twoFactorEnabled: !securitySettings.twoFactorEnabled
                    })}
                    className={`px-4 py-2 rounded-full ${securitySettings.twoFactorEnabled
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                      }`}
                  >
                    {securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                {securitySettings.twoFactorEnabled && (
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-sm text-blue-900">
                      Scan the QR code with your authenticator app to complete setup
                    </p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pharmacyIntegration':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                <Stethoscope className="mr-2 text-purple-700" /> Pharmacy Integration
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Pharmacy System Connection</h3>
                    <p className="text-sm text-gray-700">Integrate with local pharmacy networks</p>
                  </div>
                  <button
                    onClick={() => setIntegrationSettings({
                      ...integrationSettings,
                      pharmacyIntegration: !integrationSettings.pharmacyIntegration
                    })}
                    className={`px-4 py-2 rounded-full ${integrationSettings.pharmacyIntegration
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                      }`}
                  >
                    {integrationSettings.pharmacyIntegration ? 'Connected' : 'Connect'}
                  </button>
                </div>
                {integrationSettings.pharmacyIntegration && (
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-green-900">
                      Pharmacy system successfully integrated. Prescription transfers are now automated.
                    </p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <div className="sm:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {isMobileMenuOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} className="text-gray-900" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 bg-white z-50 overflow-y-auto sm:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} className="text-gray-900" />
              </button>
            </div>

            {settingSections.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900">
                  <section.icon className="mr-2 text-purple-700" />
                  {section.title}
                </h3>
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    onClick={item.action}
                    className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-700">{item.description}</p>
                      </div>
                      <ArrowRight size={20} className="text-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
            <User size={40} className="text-purple-700" />
          </div>
          <div className="text-center sm:text-left flex-grow">
            <h2 className="text-2xl font-bold text-gray-900">{profileDetails.name}</h2>
            <p className="text-gray-700">{profileDetails.title}</p>
          </div>
          <button
            onClick={() => setActiveModal('personalInfo')}
            className="w-full sm:w-auto bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 gap-6">
          {settingSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <section.icon className="w-6 h-6 text-purple-700 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    onClick={item.action}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                    <button className="mt-2 sm:mt-0 text-purple-700 hover:text-purple-900 flex items-center">
                      Configure <ArrowRight size={16} className="ml-1 text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Rendering */}
      {activeModal && renderModal()}
    </div>
  );
};

export default Settings;