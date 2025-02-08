import React, { useState, useRef } from 'react';
import { 
  Building2, ExternalLink, 
  Search, Filter, X, Menu, 
  CheckCircle, Clock, AlertCircle 
} from 'lucide-react';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([
    {
      id: 1,
      name: 'Healthcare Subsidy Program',
      description: 'Financial assistance for low-income patients',
      eligibility: 'Annual income below $30,000',
      coverage: 'Up to 80% of medical expenses',
      requiredDocuments: [
        'Proof of income',
        'Identification proof',
        'Medical expense records'
      ],
      applicationStatus: null
    },
    {
      id: 2,
      name: 'Senior Care Initiative',
      description: 'Special healthcare benefits for elderly',
      eligibility: 'Age 65 and above',
      coverage: 'Full coverage on selected treatments',
      requiredDocuments: [
        'Age proof',
        'Medical history',
        'Residency certificate'
      ],
      applicationStatus: null
    }
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const eligibilityFormRef = useRef({
    name: '',
    age: '',
    income: '',
    medicalCondition: ''
  });

  const applicationFormRef = useRef({
    fullName: '',
    contactNumber: '',
    email: '',
    selectedSchemeId: null
  });

  const handleCheckEligibility = () => {
    const form = eligibilityFormRef.current;
    const income = parseFloat(form.income);
    const age = parseInt(form.age);

    // Sample eligibility logic
    const eligibilityResults = schemes.map(scheme => {
      let eligible = false;
      let reason = '';

      if (scheme.name === 'Healthcare Subsidy Program') {
        eligible = income < 80000;
        reason = eligible 
          ? 'Eligible for Healthcare Subsidy Program' 
          : 'Income exceeds program limits';
      }

      if (scheme.name === 'Senior Care Initiative') {
        eligible = age >= 65;
        reason = eligible 
          ? 'Eligible for Senior Care Initiative' 
          : 'Age requirement not met';
      }

      return { ...scheme, eligible, reason };
    });

    // You would typically send this to a backend for verification
    console.log('Eligibility Results:', eligibilityResults);
    alert(eligibilityResults.map(r => `${r.name}: ${r.reason}`).join('\n'));
  };

  const handleApplyForScheme = (schemeId) => {
    const form = applicationFormRef.current;
    form.selectedSchemeId = schemeId;
    
    // Simulate application submission
    const updatedSchemes = schemes.map(scheme => 
      scheme.id === schemeId 
        ? { ...scheme, applicationStatus: 'Pending' } 
        : scheme
    );
    
    setSchemes(updatedSchemes);
    setIsApplicationModalOpen(false);
    alert('Application submitted successfully!');
  };

  const filteredSchemes = schemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderEligibilityModal = () => {
    if (!isEligibilityModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Check Eligibility</h3>
            <button onClick={() => setIsEligibilityModalOpen(false)}>
              <X size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => eligibilityFormRef.current.name = e.target.value}
            />
            <input 
              type="number" 
              placeholder="Age"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => eligibilityFormRef.current.age = e.target.value}
            />
            <input 
              type="number" 
              placeholder="Annual Income ($)"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => eligibilityFormRef.current.income = e.target.value}
            />
            <textarea 
              placeholder="Medical Condition (Optional)"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => eligibilityFormRef.current.medicalCondition = e.target.value}
            />
            <button 
              onClick={handleCheckEligibility}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicationModal = (scheme) => {
    if (!isApplicationModalOpen || !scheme) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Apply for {scheme.name}</h3>
            <button onClick={() => setIsApplicationModalOpen(false)}>
              <X size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Required Documents</h4>
              <ul className="list-disc list-inside text-blue-800">
                {scheme.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => applicationFormRef.current.fullName = e.target.value}
            />
            <input 
              type="tel" 
              placeholder="Contact Number"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => applicationFormRef.current.contactNumber = e.target.value}
            />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full border rounded-lg p-2 text-gray-800"
              onChange={(e) => applicationFormRef.current.email = e.target.value}
            />
            <button 
              onClick={() => handleApplyForScheme(scheme.id)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileActionMenu = () => {
    return (
      <div className={`
        fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Actions</h2>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} className="text-gray-700" />
          </button>
        </div>
        <div className="space-y-4 p-4">
          <button 
            onClick={() => {
              setIsEligibilityModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-start p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-900"
          >
            <CheckCircle className="mr-3 text-blue-700" /> Check Eligibility
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Government Schemes</h1>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="text-indigo-700"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex space-x-2">
        <div className="flex-grow flex items-center border rounded-lg px-2 bg-white">
          <Search className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search schemes" 
            className="w-full py-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-gray-100 p-2 rounded-lg">
          <Filter className="text-gray-600" />
        </button>
      </div>

      {/* Desktop Check Eligibility Button */}
      <div className="hidden md:flex justify-end mb-4">
        <button 
          onClick={() => setIsEligibilityModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
        >
          <CheckCircle className="mr-2" /> Check Eligibility
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-4">
        {filteredSchemes.map((scheme) => (
          <div 
            key={scheme.id} 
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{scheme.name}</h3>
                <p className="text-gray-600 mt-2">{scheme.description}</p>
                <div className="mt-4 space-y-2">
                  <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                  <p><strong>Coverage:</strong> {scheme.coverage}</p>
                  {scheme.applicationStatus && (
                    <div className="flex items-center mt-2">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium mr-2
                        ${scheme.applicationStatus === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'}
                      `}>
                        {scheme.applicationStatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button 
                  onClick={() => {
                    setSelectedScheme(scheme);
                    setIsApplicationModalOpen(true);
                  }}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <ExternalLink className="w-5 h-5 mr-1" />
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {renderEligibilityModal()}
      {renderApplicationModal(selectedScheme)}
      {renderMobileActionMenu()}
    </div>
  );
};

export default GovernmentSchemes;