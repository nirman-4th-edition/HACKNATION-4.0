import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, Clock, Users, Search, 
  FileText, ChevronDown, ChevronUp, 
  BarChart2, MapPin, Info 
} from 'lucide-react';

const StudiesConsultantDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedStudyId, setExpandedStudyId] = useState(null);

  const clinicalStudies = [
    {
      id: 'ST001',
      title: 'Cardiology Clinical Trial',
      description: 'Long-term study on cardiovascular health interventions',
      principalInvestigator: 'Dr. Dighambar Sahoo',
      participants: 142,
      status: 'Active',
      startDate: '2023-06-15',
      estimatedCompletion: '2025-12-31',
      fundingSource: 'NIH Grant',
      researchInstitution: 'Central Medical Research Center',
      potentialImpact: 'High',
      geographicReach: 'National',
      recommendationStatus: 'Recommended'
    },
    {
      id: 'ST002',
      title: 'Neurology Research Study',
      description: 'Comprehensive analysis of neurological disorder progression',
      principalInvestigator: 'Dr. Nihar Ranjan Das',
      participants: 89,
      status: 'Recruiting',
      startDate: '2024-01-10',
      estimatedCompletion: '2026-06-30',
      fundingSource: 'Brain Research Foundation',
      researchInstitution: 'Neurological Institute',
      potentialImpact: 'Medium',
      geographicReach: 'Regional',
      recommendationStatus: 'Under Review'
    },
    {
      id: 'ST003',
      title: 'Oncology Treatment Trial',
      description: 'Innovative targeted therapy for advanced cancer patients',
      principalInvestigator: 'Dr. Lipika Pradhan',
      participants: 204,
      status: 'Completed',
      startDate: '2022-03-01',
      estimatedCompletion: '2024-02-01',
      fundingSource: 'Cancer Research IND',
      researchInstitution: 'Comprehensive Cancer Center',
      potentialImpact: 'Very High',
      geographicReach: 'International',
      recommendationStatus: 'Highly Recommended'
    }
  ];

  // Memoized filtered studies
  const filteredStudies = useMemo(() => 
    clinicalStudies.filter(study => 
      (filterStatus === 'All' || study.status === filterStatus) &&
      (study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       study.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       study.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase()))
    ), 
    [searchTerm, filterStatus]
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-purple-100 text-purple-800';
      case 'Recruiting': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch(recommendation) {
      case 'Highly Recommended': return 'bg-green-100 text-green-800';
      case 'Recommended': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDesktopView = () => (
    <div className="hidden md:block">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="pb-3 px-2">Study Details</th>
            <th className="pb-3 px-2">Participants</th>
            <th className="pb-3 px-2">Impact</th>
            <th className="pb-3 px-2">Recommendation</th>
            <th className="pb-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudies.map((study) => (
            <tr key={study.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-2">
                <div className="font-semibold">{study.title}</div>
                <div className="text-xs text-gray-500">{study.principalInvestigator}</div>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${getStatusColor(study.status)}`}>
                  {study.status}
                </span>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  <Users className="mr-2 text-gray-500" size={16} />
                  {study.participants}
                </div>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center">
                  <BarChart2 className="mr-2 text-gray-500" size={16} />
                  {study.potentialImpact}
                </div>
              </td>
              <td className="py-3 px-2">
                <span className={`px-3 py-1 rounded-full text-xs ${getRecommendationColor(study.recommendationStatus)}`}>
                  {study.recommendationStatus}
                </span>
              </td>
              <td className="py-3 px-2">
                <button 
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded"
                  onClick={() => setExpandedStudyId(expandedStudyId === study.id ? null : study.id)}
                >
                  <Info size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMobileView = () => (
    <div className="md:hidden">
      {filteredStudies.map((study) => (
        <div 
          key={study.id} 
          className="bg-white shadow-sm rounded-lg mb-4 border"
        >
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{study.title}</h3>
              <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${getStatusColor(study.status)}`}>
                {study.status}
              </div>
            </div>
            <button 
              onClick={() => setExpandedStudyId(expandedStudyId === study.id ? null : study.id)}
              className="text-gray-500"
            >
              {expandedStudyId === study.id ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedStudyId === study.id && (
            <div className="p-4 border-t bg-gray-50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500">Investigator</div>
                  <div>{study.principalInvestigator}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Participants</div>
                  <div className="flex items-center">
                    <Users className="mr-2 text-gray-500" size={16} />
                    {study.participants}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Potential Impact</div>
                  <div className="flex items-center">
                    <BarChart2 className="mr-2 text-gray-500" size={16} />
                    {study.potentialImpact}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Recommendation</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getRecommendationColor(study.recommendationStatus)}`}>
                    {study.recommendationStatus}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500">Geographic Reach</div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-gray-500" size={16} />
                    {study.geographicReach}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 min-h-screen bg-gray-50 text-gray-800">
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Clinical Studies Consultant Dashboard</h2>
        
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Total Studies</h3>
              <ClipboardList className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold mt-2 text-purple-900">{clinicalStudies.length}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Active Studies</h3>
              <Clock className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold mt-2 text-blue-900">
              {clinicalStudies.filter(study => study.status === 'Active').length}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Total Participants</h3>
              <Users className="text-green-600" />
            </div>
            <p className="text-2xl font-bold mt-2 text-green-900">
              {clinicalStudies.reduce((sum, study) => sum + study.participants, 0)}
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search studies by ID, title, or investigator"
              className="w-full p-2 pl-8 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={18} />
          </div>
          <select
            className="p-2 border rounded-lg w-full md:w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Studies List */}
        {renderDesktopView()}
        {renderMobileView()}

        {filteredStudies.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No studies match your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudiesConsultantDashboard;