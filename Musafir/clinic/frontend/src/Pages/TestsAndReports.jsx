import React, { useState, useRef } from 'react';
import { 
  FileText, Search, Download, Eye, 
  Calendar, Upload, Lightbulb, 
  BarChart, Menu, X 
} from 'lucide-react';

const TestsAndReports = () => {
  const [reports, setReports] = useState([
    { id: 1, patient: 'Alok Kumar', type: 'Blood Test', date: '2024-02-03', status: 'Completed', downloadLink: '/reports/1', aiInsights: 'Cholesterol levels slightly elevated' },
    { id: 2, patient: 'Omkar Lenka', type: 'X-Ray', date: '2024-02-03', status: 'Pending', downloadLink: '/reports/2', aiInsights: 'No significant abnormalities detected' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const fileInputRef = useRef(null);

  const filteredReports = reports.filter(report => 
    report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (report) => {
    console.log(`Downloading report for ${report.patient}`);
    window.open(report.downloadLink, '_blank');
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleUploadResults = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploading file: ${file.name}`);
      // Implement file upload logic here
    }
  };

  const handleScheduleTest = () => {
    console.log('Open scheduling modal');
    // Implement scheduling logic
  };

  const renderMobileActionMenu = () => (
    <div className={`
      fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
      ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="flex justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <button onClick={() => setMobileMenuOpen(false)}>
          <X size={24} className="text-gray-700" />
        </button>
      </div>
      <div className="space-y-4 p-4">
        <button 
          onClick={handleScheduleTest}
          className="w-full flex items-center justify-start p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-900"
        >
          <Calendar className="mr-3 text-blue-700" /> Schedule Diagnostic Test
        </button>
        <button 
          onClick={handleUploadResults}
          className="w-full flex items-center justify-start p-3 bg-green-100 hover:bg-green-200 rounded-lg text-green-900"
        >
          <Upload className="mr-3 text-green-700" /> Upload Test Results
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );

  const renderReportModal = () => {
    if (!selectedReport) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Report Details</h3>
            <button onClick={() => setSelectedReport(null)}>
              <X size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Patient:</strong> {selectedReport.patient}</p>
            <p className="text-gray-700"><strong>Test Type:</strong> {selectedReport.type}</p>
            <p className="text-gray-700"><strong>Date:</strong> {selectedReport.date}</p>
            <p className="text-gray-700"><strong>Status:</strong> {selectedReport.status}</p>
            <div className="bg-blue-100 p-3 rounded-lg">
              <h4 className="font-semibold flex items-center text-blue-900">
                <Lightbulb className="mr-2 text-blue-700" /> AI Insights
              </h4>
              <p className="text-blue-800">{selectedReport.aiInsights}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button 
              onClick={() => handleDownload(selectedReport)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Download className="mr-2" /> Download
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center text-gray-800">
          <FileText className="mr-2 text-gray-700" /> Tests & Reports
        </h2>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="text-blue-700"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center text-gray-800">
          <FileText className="mr-2 text-gray-700" /> Tests & Reports
        </h2>
        <div className="flex items-center border rounded-md px-2 py-1">
          <Search className="text-gray-600 mr-2" size={20} />
          <input 
            type="text" 
            placeholder="Search patients or tests" 
            className="outline-none text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mb-4">
        <div className="flex items-center border rounded-md px-2 py-1">
          <Search className="text-gray-600 mr-2" size={20} />
          <input 
            type="text" 
            placeholder="Search patients or tests" 
            className="outline-none w-full text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Quick Actions */}
      <div className="hidden md:flex space-x-4 mb-4">
        <button 
          onClick={handleScheduleTest}
          className="flex items-center bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg text-blue-900"
        >
          <Calendar className="mr-2 text-blue-700" /> Schedule Test
        </button>
        <button 
          onClick={handleUploadResults}
          className="flex items-center bg-green-100 hover:bg-green-100 px-4 py-2 rounded-lg text-green-900"
        >
          <Upload className="mr-2 text-green-700" /> Upload Results
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload}
        />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse hidden md:table">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left text-gray-800">Patient</th>
              <th className="p-2 text-left text-gray-800">Test Type</th>
              <th className="p-2 text-left text-gray-800">Date</th>
              <th className="p-2 text-left text-gray-800">Status</th>
              <th className="p-2 text-left text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-100">
                <td className="p-2 text-gray-800">{report.patient}</td>
                <td className="p-2 text-gray-800">{report.type}</td>
                <td className="p-2 text-gray-800">{report.date}</td>
                <td className="p-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${report.status === 'Completed' 
                      ? 'bg-green-100 text-green-900' 
                      : 'bg-yellow-100 text-yellow-900'}
                  `}>
                    {report.status}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewReport(report)}
                      className="text-blue-700 hover:text-blue-900"
                      title="View Report"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => handleDownload(report)}
                      className="text-green-700 hover:text-green-900"
                      title="Download Report"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Report Cards */}
        <div className="md:hidden space-y-4">
          {filteredReports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800">{report.patient}</h3>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-semibold
                  ${report.status === 'Completed' 
                    ? 'bg-green-100 text-green-900' 
                    : 'bg-yellow-100 text-yellow-900'}
                `}>
                  {report.status}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <p>{report.type} | {report.date}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewReport(report)}
                    className="text-blue-700 hover:text-blue-900"
                    title="View Report"
                  >
                    <Eye size={20} />
                  </button>
                  <button 
                    onClick={() => handleDownload(report)}
                    className="text-green-700 hover:text-green-900"
                    title="Download Report"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {renderMobileActionMenu()}
      {renderReportModal()}
    </div>
  );
};

export default TestsAndReports;