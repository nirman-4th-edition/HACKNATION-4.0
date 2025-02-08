import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, Users, RotateCw, AlertCircle, User, Stethoscope, Calendar } from 'lucide-react';

const Patients = () => {
  const [data, setData] = useState({
    statsData: [],
    appointments: [],
    treatments: [],
    patientData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [viewMode, setViewMode] = useState('chart');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data/patients-data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => window.location.reload(), 500);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-purple-600">{`Patients: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Load Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCw className='h-4 w-4'/>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 min-h-screen bg-white">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        {data.statsData.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.bg} rounded-lg p-2 sm:p-3 shadow-sm transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1 sm:p-2 rounded-full ${stat.iconBg}`}>
                {stat.icon === 'user' ? 
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : 
                  <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
              </div>
              <div>
                <div className={`text-sm sm:text-lg font-bold ${stat.text}`}>{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-700 truncate">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4">
        {/* Patient Flow Section */}
        <div className="lg:col-span-8 bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Monthly Patient Flow</h2>
            <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setViewMode('chart')}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-lg ${
                  viewMode === 'chart' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Chart
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded-lg ${
                  viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          {viewMode === 'chart' ? (
            <div className="h-48 xs:h-56 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.patientData}>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    tick={{ fill: '#374151', fontSize: 12 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="patients" 
                    fill="#6D28D9" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="text-left text-xs sm:text-sm text-gray-600">
                    <th className="pb-2 sm:pb-3">Month</th>
                    <th className="pb-2 sm:pb-3">Patients</th>
                    <th className="pb-2 sm:pb-3">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  {data.patientData.map((monthData, index) => (
                    <tr 
                      key={index}
                      className="border-t hover:bg-gray-50 cursor-pointer text-xs sm:text-sm"
                    >
                      <td className="py-2 sm:py-3 text-gray-900">{monthData.month}</td>
                      <td className="text-purple-600">{monthData.patients}</td>
                      <td className={monthData.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {monthData.change}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Today's Appointments */}
        <div className="lg:col-span-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Today's Appointments</h2>
            <Calendar className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {data.appointments.map((appointment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-1.5 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="max-w-[120px] sm:max-w-none">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{appointment.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 truncate">{appointment.type}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{appointment.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Schedule */}
        <div className="lg:col-span-8 bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Treatment Schedule</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm">Filter</button>
              <button className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm">Sort</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-left text-xs sm:text-sm text-gray-600">
                  <th className="pb-2 sm:pb-3 pr-2">Treatment</th>
                  <th className="pb-2 sm:pb-3 pr-2">Type</th>
                  <th className="pb-2 sm:pb-3 pr-2">Date</th>
                  <th className="pb-2 sm:pb-3 pr-2">Status</th>
                  <th className="pb-2 sm:pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.treatments.map((treatment) => (
                  <tr 
                    key={treatment.id}
                    className="border-t hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    <td className="py-2 sm:py-3 pr-2 text-gray-900 truncate">{treatment.name}</td>
                    <td className="pr-2 text-gray-600 truncate">{treatment.type}</td>
                    <td className="pr-2 text-gray-600 whitespace-nowrap">{treatment.date}</td>
                    <td className="pr-2">
                      <span className={`inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs ${
                        treatment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        treatment.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {treatment.status}
                      </span>
                    </td>
                    <td>
                      <button className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="lg:col-span-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Demographics</h2>
            <Users className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="h-40 xs:h-48 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.patientData}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#374151', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fill: '#374151', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="patients" 
                  fill="#6D28D9" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row gap-2">
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              Schedule
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              Patients
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;