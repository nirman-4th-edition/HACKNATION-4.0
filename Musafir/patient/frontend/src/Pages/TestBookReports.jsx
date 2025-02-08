import React, { useState } from 'react';
import { Search, Calendar, FileText, Brain } from 'lucide-react';

const HealthTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');

  const tests = [
    { id: 1, name: 'Complete Blood Count', price: '₹799' },
    { id: 2, name: 'MRI Brain Scan', price: '₹8999' },
    { id: 3, name: 'Lipid Profile', price: '₹599' }
  ];

  const reports = [
    { id: 1, name: 'Blood Test Report', date: '2024-02-01', status: 'Normal' },
    { id: 2, name: 'MRI Scan Results', date: '2024-01-15', status: 'Review Required' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto text-blue-950">
      <h1 className="text-3xl font-bold mb-8">Test & Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Search Section */}
        <div className="bg-white p-6 rounded-lg shadow text-blue-950">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Test Search</h2>
          </div>
          <input
            type="text"
            placeholder="Search for tests..."
            className="w-full p-2 border rounded mb-4 text-blue-950"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2 text-blue-950">
            {tests
              .filter(test => 
                test.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(test => (
                <div 
                  key={test.id}
                  className="flex justify-between items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTest(test.name)}
                >
                  <span>{test.name}</span>
                  <span className="font-semibold">{test.price}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow text-blue-950">
          <div className="flex items-center gap-2 mb-4 text-blue-950">
            <Calendar className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Book Test</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Selected Test</label>
              <input
                type="text"
                value={selectedTest}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Select Clinic</label>
              <select 
                className="w-full p-2 border rounded"
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
              >
                <option value="">Select a clinic</option>
                <option value="clinic1">Health Plus Clinic</option>
                <option value="clinic2">City Medical Center</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              type="submit"
            >
              Book Appointment
            </button>
          </form>
        </div>

        {/* Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow text-blue-950">
          <div className="flex items-center gap-2 mb-4 text-blue-950">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Your Reports</h2>
          </div>
          <div className="space-y-3 text-blue-950">
            {reports.map(report => (
              <div key={report.id} className="border rounded p-4 text-blue-950">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{report.name}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    report.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">Date: {report.date}</div>
                <button className="mt-2 text-blue-600 hover:text-blue-800">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow text-blue-950">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5" />
            <h2 className="text-xl font-semibold">AI Analysis</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Latest Analysis</h3>
              <p className="text-sm text-gray-600">
                Based on your recent blood work, your cholesterol levels have improved by 15% compared to last month.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Recommendations</h3>
              <ul className="text-sm text-gray-600 list-disc pl-4">
                <li>Consider scheduling a follow-up lipid profile test</li>
                <li>Regular exercise showing positive impact on results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;