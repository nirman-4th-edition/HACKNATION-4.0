import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  FileText, Upload, Download, BookOpen, 
  TrendingUp, Shield, Search, RefreshCw, 
  ChevronDown, ChevronUp, Menu, X 
} from 'lucide-react';

const PatientAnalyticsDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedRecordId, setExpandedRecordId] = useState(null);

  const medicalRecords = [
    {
      _id: { $oid: "67a3a4a0b7eeffa848e1053e" },
      eligibleschemes: "SCH003|SCH006",
      patientID: "PAT156",
      dob: new Date("1985-03-15"),
      fullName: "Rajesh Kumar Sharma",
      medicalHistory: "Hypertension, Pre-diabetic",
      healthRecords: "Annual checkup 2024: BP 140/90, Glucose 110 mg/dL"
    }
  ];

  const recordAnalytics = [
    { month: 'Jan', uploads: 45, schemes: 22 },
    { month: 'Feb', uploads: 62, schemes: 35 },
    { month: 'Mar', uploads: 78, schemes: 47 }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const filteredRecords = medicalRecords.filter(record => 
    (filterType === 'All' || record.eligibleschemes.includes(filterType)) &&
    (record.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.medicalHistory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const MobileRecordCard = ({ record }) => {
    const isExpanded = expandedRecordId === record._id.$oid;
    const age = new Date().getFullYear() - record.dob.getFullYear();

    return (
      <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden text-gray-900">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">{record.fullName}</h3>
            <p className="text-sm text-gray-700">{record.medicalHistory}</p>
          </div>
          <button 
            onClick={() => setExpandedRecordId(isExpanded ? null : record._id.$oid)}
            className="text-purple-700"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        
        {isExpanded && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600">Patient ID</p>
                <p className="text-sm text-purple-700">{record.patientID}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Age</p>
                <p className="text-sm text-gray-800">{age} years</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-600">Health Records</p>
                <p className="text-sm text-gray-800">{record.healthRecords}</p>
              </div>
              <div className="col-span-2 flex justify-between">
                <button className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded">
                  <Download size={16} className="mr-2" /> Download
                </button>
                <button className="flex items-center text-green-700 hover:bg-green-100 p-2 rounded">
                  <RefreshCw size={16} className="mr-2" /> Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 min-h-screen bg-gray-50">
      <div className="md:hidden bg-white shadow-md p-4 flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-purple-900">Medical Records</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-purple-700"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 mb-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Search Records</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search patients or conditions"
                className="w-full p-2 pl-8 border rounded-lg text-black placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-3 text-gray-500" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Filter Schemes</label>
            <select 
              className="w-full p-2 border rounded-lg text-gray-800"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Schemes</option>
              <option value="SCH003">Scheme 003</option>
              <option value="SCH006">Scheme 006</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <Upload className="mr-2 text-purple-700" />
            Upload Medical Records
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input 
              type="file" 
              id="fileUpload" 
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center">
              <FileText className="text-gray-500 mb-2" size={48} />
              <p className="text-gray-700">
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to upload medical records'}
              </p>
              <span className="text-xs text-gray-600 mt-1">Supported formats: PDF, DOC</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <TrendingUp className="mr-2 text-purple-700" />
            Record Analytics
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recordAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uploads" stroke="#6D28D9" name="Record Uploads" />
              <Line type="monotone" dataKey="schemes" stroke="#9333EA" name="Eligible Schemes" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white rounded-xl p-4 shadow-lg hidden md:block">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center text-gray-900">
              <BookOpen className="mr-2 text-purple-700" />
              Medical Records
            </h2>
            <div className="flex space-x-2">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Search records"
                  className="p-2 pl-8 border rounded-lg placeholder-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-3 text-gray-500" size={18} />
              </div>
              <select 
                className="p-2 border rounded-lg text-gray-800"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Schemes</option>
                <option value="SCH003">Scheme 003</option>
                <option value="SCH006">Scheme 006</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-800 border-b">
                  <th className="pb-3 px-2">Patient Name</th>
                  <th className="pb-3 px-2">Patient ID</th>
                  <th className="pb-3 px-2">Medical History</th>
                  <th className="pb-3 px-2">Health Records</th>
                  <th className="pb-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record._id.$oid} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{record.fullName}</td>
                    <td className="py-3 px-2 text-gray-800">{record.patientID}</td>
                    <td className="py-3 px-2 text-sm text-purple-700">{record.medicalHistory}</td>
                    <td className="py-3 px-2 text-gray-800">{record.healthRecords}</td>
                    <td className="py-3 px-2 flex space-x-2">
                      <button className="text-blue-700 hover:bg-blue-100 p-2 rounded">
                        <Download size={18} />
                      </button>
                      <button className="text-green-700 hover:bg-green-100 p-2 rounded">
                        <RefreshCw size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 md:hidden">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <BookOpen className="mr-2 text-purple-700" />
            Medical Records
          </h2>
          {filteredRecords.map((record) => (
            <MobileRecordCard key={record._id.$oid} record={record} />
          ))}
          {filteredRecords.length === 0 && (
            <div className="text-center py-4 text-gray-700">
              No records match your search criteria
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 bg-blue-50 rounded-xl p-4 flex items-center">
          <Shield className="text-blue-800 mr-4 hidden md:block" size={48} />
          <div>
            <h3 className="font-bold text-blue-900">Secure Document Management</h3>
            <p className="text-blue-800 text-sm">
              All medical records are encrypted and protected with advanced security protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAnalyticsDashboard;