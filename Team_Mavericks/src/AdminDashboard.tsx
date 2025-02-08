import React, { useState } from 'react';
import { FileText, Shield, UserCheck, X, Check, Search } from 'lucide-react';

// Mock data - replace with actual data from your backend
const initialFIRs = [
  { 
    id: 1, 
    name: "John Doe", 
    date: "2024-03-10", 
    status: "pending", 
    document: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    date: "2024-03-09", 
    status: "pending", 
    document: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000" 
  },
];

const initialCertificates = [
  { 
    id: 1, 
    lawyer: "Adv. Michael Brown", 
    date: "2024-03-08", 
    status: "pending", 
    document: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: 2, 
    lawyer: "Adv. Sarah Wilson", 
    date: "2024-03-07", 
    status: "pending", 
    document: "https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?auto=format&fit=crop&q=80&w=1000" 
  },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('fir');
  const [searchTerm, setSearchTerm] = useState('');
  const [firs, setFirs] = useState(initialFIRs);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleApprove = (id: number, type: 'fir' | 'certificate') => {
    if (type === 'fir') {
      setFirs(firs.map(fir => 
        fir.id === id ? { ...fir, status: 'approved' } : fir
      ));
      alert(`FIR #${id} has been approved`);
    } else {
      setCertificates(certificates.map(cert => 
        cert.id === id ? { ...cert, status: 'approved' } : cert
      ));
      alert(`Certificate #${id} has been approved`);
    }
  };

  const handleDeny = (id: number, type: 'fir' | 'certificate') => {
    if (type === 'fir') {
      setFirs(firs.map(fir => 
        fir.id === id ? { ...fir, status: 'denied' } : fir
      ));
      alert(`FIR #${id} has been denied`);
    } else {
      setCertificates(certificates.map(cert => 
        cert.id === id ? { ...cert, status: 'denied' } : cert
      ));
      alert(`Certificate #${id} has been denied`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0A2F5D] text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-[#FFD700]" size={24} />
            <h1 className="text-2xl font-bold">Court Connect Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#0A2F5D] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck size={20} className="text-[#FFD700]" />
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'fir'
                ? 'bg-[#0A2F5D] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('fir')}
          >
            FIR Approvals
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'certificates'
                ? 'bg-[#0A2F5D] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('certificates')}
          >
            Lawyer Certificates
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {activeTab === 'fir' ? 'Name' : 'Lawyer'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(activeTab === 'fir' ? firs : certificates).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activeTab === 'fir' ? item.name : item.lawyer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'denied'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedDocument(item.document)}
                        className="text-[#0A2F5D] hover:text-[#0A2F5D]/80 flex items-center space-x-1"
                      >
                        <FileText size={16} />
                        <span>View Document</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id, activeTab === 'fir' ? 'fir' : 'certificate')}
                              className="bg-green-100 text-green-600 hover:bg-green-200 p-2 rounded-full transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleDeny(item.id, activeTab === 'fir' ? 'fir' : 'certificate')}
                              className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Document Preview</h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedDocument}
                alt="Document Preview"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;