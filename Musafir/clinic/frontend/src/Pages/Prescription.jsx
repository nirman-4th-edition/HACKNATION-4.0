import React, { useState, useEffect } from 'react';
import { 
  Pill, Plus, AlertTriangle, X, Menu, 
  Clock, User, Search, ChevronDown, Trash2, Edit 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const Prescriptions = () => {
  // State Management
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medication: 'Amoxicillin',
      patient: 'John Smith',
      date: '2024-03-15',
      dosage: '500mg',
      frequency: '3x daily',
      status: 'Active',
      aiInsights: {
        interactions: ['May interact with birth control'],
        precautions: ['Take with food']
      }
    },
    {
      id: 2,
      medication: 'Lisinopril',
      patient: 'Sarah Johnson',
      date: '2024-03-14',
      dosage: '10mg',
      frequency: '1x daily',
      status: 'Pending',
      aiInsights: {
        interactions: ['Potassium supplements interaction'],
        precautions: ['Monitor BP regularly']
      }
    }
  ]);

  const [stats] = useState([
    { label: 'Active', value: 24, color: 'bg-green-100', text: 'text-green-800' },
    { label: 'Pending', value: 5, color: 'bg-yellow-100', text: 'text-yellow-800' },
    { label: 'Expired', value: 3, color: 'bg-red-100', text: 'text-red-800' },
    { label: 'Total', value: 32, color: 'bg-blue-100', text: 'text-blue-800' }
  ]);

  const [monthlyData] = useState([
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 68 },
    { month: 'Apr', count: 47 },
    { month: 'May', count: 59 },
    { month: 'Jun', count: 63 }
  ]);

  const [showNewModal, setShowNewModal] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: '1x daily'
  });

  // Effects
  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [mobileMenu]);

  // Handlers
  const createPrescription = () => {
    if (!formData.patient || !formData.medication) return;
    
    const newRx = {
      id: prescriptions.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      aiInsights: {
        interactions: ['Checking interactions...'],
        precautions: ['Verify patient allergies']
      }
    };

    setPrescriptions([...prescriptions, newRx]);
    setShowNewModal(false);
    setFormData({ patient: '', medication: '', dosage: '', frequency: '1x daily' });
  };

  const deletePrescription = (id) => {
    setPrescriptions(prescriptions.filter(rx => rx.id !== id));
  };

  const filteredRx = prescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Components
  const NewPrescriptionModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md animate-slideUp">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">New Prescription</h3>
          <button onClick={() => setShowNewModal(false)}>
            <X className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Patient Name</label>
            <input
              value={formData.patient}
              onChange={(e) => setFormData({...formData, patient: e.target.value})}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 ring-purple-500 text-gray-900 placeholder-gray-400 "
              placeholder="Enter patient name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Medication</label>
              <input
                value={formData.medication}
                onChange={(e) => setFormData({...formData, medication: e.target.value})}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 ring-purple-500 text-gray-900 placeholder-gray-400"
                placeholder="Drug name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Dosage</label>
              <input
                value={formData.dosage}
                onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 ring-purple-500 text-gray-900 placeholder-gray-400"
                placeholder="e.g., 500mg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 ring-purple-500 text-gray-900"
            >
              <option>1x daily</option>
              <option>2x daily</option>
              <option>3x daily</option>
              <option>As needed</option>
            </select>
          </div>

          <button 
            onClick={createPrescription}
            className="w-full bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Prescription
          </button>
        </div>
      </div>
    </div>
  );

  const InsightsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md animate-slideUp">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">AI Safety Insights</h3>
          <button onClick={() => setShowInsights(false)}>
            <X className="text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 flex items-center mb-2">
              <AlertTriangle className="mr-2" /> Drug Interactions
            </h4>
            <ul className="list-disc pl-5 text-red-700">
              {selectedRx?.aiInsights.interactions.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 flex items-center mb-2">
              <AlertTriangle className="mr-2" /> Precautions
            </h4>
            <ul className="list-disc pl-5 text-blue-700">
              {selectedRx?.aiInsights.precautions.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
      <div className="absolute right-0 w-64 bg-white h-full transform transition-transform">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
          <button onClick={() => setMobileMenu(false)}>
            <X className="text-gray-600" />
          </button>
        </div>
        <button
          onClick={() => { setShowNewModal(true); setMobileMenu(false); }}
          className="w-full flex items-center p-4 hover:bg-gray-100 text-gray-900"
        >
          <Plus className="mr-3 text-purple-600" /> New Prescription
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Manager</h1>
          <p className="text-gray-600 mt-1 flex items-center">
            <Clock className="mr-2 w-4 h-4" /> Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="hidden lg:flex items-center bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="mr-2" /> New Rx
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} p-4 rounded-xl`}>
            <div className={`text-2xl font-bold ${stat.text} mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Prescriptions List */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h2>
          </div>

          {/* Mobile View */}
          <div className="p-4 lg:hidden space-y-4">
            {filteredRx.map(rx => (
              <div key={rx.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center mb-1">
                      <Pill className="w-5 h-5 text-purple-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">{rx.medication}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{rx.patient}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rx.status === 'Active' ? 'bg-green-100 text-green-800' :
                    rx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {rx.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-700 space-y-1 mt-2">
                  <p><span className="font-medium">Dosage:</span> {rx.dosage}</p>
                  <p><span className="font-medium">Frequency:</span> {rx.frequency}</p>
                  <p><span className="font-medium">Date:</span> {rx.date}</p>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => { setSelectedRx(rx); setShowInsights(true); }}
                    className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                  >
                    <AlertTriangle className="mr-1 w-4 h-4" /> Insights
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Medication</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dosage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRx.map(rx => (
                  <tr key={rx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">
                      <div className="flex items-center">
                        <Pill className="w-5 h-5 text-purple-600 mr-2" />
                        {rx.medication}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{rx.patient}</td>
                    <td className="px-4 py-3 text-gray-700">{rx.dosage}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        rx.status === 'Active' ? 'bg-green-100 text-green-800' :
                        rx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedRx(rx); setShowInsights(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-purple-600"
                      >
                        <AlertTriangle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Prescriptions</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#6d28d9" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileMenu(true)}
        className="fixed bottom-20 right-4 lg:hidden bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700"
      >
        <Plus size={26} />
      </button>

      {/* Modals */}
      {showNewModal && <NewPrescriptionModal />}
      {showInsights && <InsightsModal />}
      {mobileMenu && <MobileMenu />}
    </div>
  );
};

export default Prescriptions;