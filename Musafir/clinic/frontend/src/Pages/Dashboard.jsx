import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, Calendar, Clock, TrendingUp, PieChart as PieIcon, Bell, Plus, X, Menu } from 'lucide-react';

const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [users, setUsers] = useState([
    { userID: '1', name: 'Dr. Rajesh Sharma', email: 'rajesh@hospital.com', phoneNumber: '9876543210', role: 'Doctor', address: 'Mumbai' }
  ]);

  const [patients, setPatients] = useState([
    {
      patientID: 'P001',
      name: 'Aarav Singh',
      dob: '1990-05-15',
      eligibleSchemes: 'Ayushman Bharat',
      medicalHistory: 'Diabetes Type 2',
      healthRecords: 'Annual Checkup 2024'
    }
  ]);

  const [clinics, setClinics] = useState([
    {
      clinicID: 'C001',
      name: 'Sahoo bhai dokaan',
      location: 'Mumbai',
      specializations: 'General Medicine',
      contactDetails: '022-12345678'
    }
  ]);

  const [appointments, setAppointments] = useState([
    {
      appointmentID: 'APT001',
      patientID: 'P001',
      clinicID: 'C001',
      dateTime: '2024-02-07T10:00:00',
      status: 'Confirmed'
    }
  ]);

  const [healthReports] = useState([
    {
      reportID: 'RPT001',
      patientID: 'P001',
      clinicID: 'C001',
      reportDetails: 'Annual Health Checkup',
      aiInsights: 'Low risk, recommend lifestyle changes',
      dateGenerated: '2024-01-15'
    }
  ]);

  const [governmentSchemes] = useState([
    {
      schemeID: 'SCH001',
      schemeName: 'Ayushman Bharat',
      eligibilityCriteria: 'Below poverty line',
      benefits: 'Free medical treatment up to ₹5 lakhs'
    }
  ]);

  const [pharmacies, setPharmacies] = useState([
    {
      pharmacyID: 'PH001',
      name: 'City Central Pharmacy',
      location: 'Mumbai',
      contactDetails: '022-87654321'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      orderID: 'ORD001',
      patientID: 'P001',
      pharmacyID: 'PH001',
      medicationList: 'Metformin, Insulin',
      status: 'Processed'
    }
  ]);

  const [payments, setPayments] = useState([
    {
      paymentID: 'PAY001',
      appointmentID_orderID: 'APT001',
      amount: 500,
      paymentDate: '2024-02-07',
      paymentMethod: 'Online',
      status: 'Completed'
    }
  ]);

  const [stats, setStats] = useState([
    { title: 'Total Patients', value: String(patients.length), icon: Users },
    {
      title: "Today's Appointments",
      value: String(appointments.filter(a =>
        new Date(a.dateTime).toDateString() === new Date().toDateString()
      ).length),
      icon: Calendar
    },
    {
      title: 'Monthly Revenue',
      value: `₹${payments.reduce((sum, p) => sum + p.amount, 0)}`,
      icon: TrendingUp
    },
    { title: 'Patient Growth', value: '+18.2%', icon: TrendingUp },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientID: '',
    clinicID: '',
    dateTime: '',
    status: 'Pending'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New Registration', read: false },
    { id: 2, message: 'Ayushman Bharat Claim Approved', read: true },
    { id: 3, message: 'Admission Request', read: false },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [chartPeriod, setChartPeriod] = useState('monthly');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const revenueData = {
    monthly: payments.map((p, index) => ({
      name: `P${index + 1}`,
      value: p.amount
    })),
    quarterly: [120, 150, 180, 210].map(v => v * 22500),
    yearly: [450, 600].map(v => v * 90000),
  };

  const demographicsData = [
    { name: 'Male', value: 55 },
    { name: 'Female', value: 45 },
  ];

  const COLORS = ['#4F46E5', '#EC4899'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateTimeString = currentDateTime.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ', ' + currentDateTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppt = {
      appointmentID: `APT${appointments.length + 1}`,
      ...newAppointment,
      dateTime: newAppointment.dateTime || new Date().toISOString()
    };
    setAppointments([...appointments, newAppt]);
    setShowAddModal(false);
    setNewAppointment({ patientID: '', clinicID: '', dateTime: '', status: 'Pending' });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = patients.find(p => p.patientID === appt.patientID)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || appt.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatRevenue = (value) => `₹${new Intl.NumberFormat('en-IN').format(value)}`;

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen text-blue-950">
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center mb-2">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-1 hover:bg-gray-200 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white p-2 rounded-lg shadow-sm mb-2">
          <button
            onClick={() => {
              setShowAddModal(true);
              setShowMobileMenu(false);
            }}
            className="w-full bg-indigo-600 text-white px-2 py-1.5 rounded-md flex items-center justify-center mb-1 text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add New
          </button>
          <button className="w-full bg-purple-100 text-purple-700 px-2 py-1.5 rounded-md text-sm">
            Health Reports
          </button>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Management Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-3 py-1.5 rounded-md flex items-center hover:bg-indigo-700 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Appointment
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 hover:bg-gray-100 rounded-md"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg p-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowNotifications(false)}
                  />
                </div>
                {notifications.map(notification => (
                  <div
                    key={`notification-${notification.id}`}
                    className={`p-1 text-xs ${!notification.read ? 'bg-blue-50' : ''} rounded mb-0.5 cursor-pointer`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {notification.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500 flex justify-center">{dateTimeString}</p>
        </div>
        {stats.map((stat) => (
          <div key={`stat-${stat.title.replace(/\s+/g, '-').toLowerCase()}`} className="bg-white p-2 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">{stat.title}</p>
                <p className="text-base font-semibold mt-0.5">{stat.value}</p>
              </div>
              <stat.icon className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <h2 className="text-sm sm:text-base font-semibold mb-1 sm:mb-0">Revenue Growth (INR)</h2>
            <select
              value={chartPeriod}
              onChange={(e) => setChartPeriod(e.target.value)}
              className="bg-gray-50 border rounded-md px-2 py-0.5 text-xs sm:text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="h-40 xs:h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData[chartPeriod].map((value, index) => ({
                  name: `P${index + 1}`,
                  value
                }))}
              >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={formatRevenue} />
                <Tooltip formatter={(value) => [formatRevenue(value), 'Revenue']} />
                <Bar dataKey="value" fill="#4F46E5" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Chart */}
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm sm:text-base font-semibold">Patient Demographics</h2>
            <PieIcon className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="h-40 xs:h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  wrapperStyle={{ fontSize: '10px' }}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white p-2 rounded-lg shadow-sm mt-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
          <h2 className="text-sm sm:text-base font-semibold"> Appointments</h2>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-1">
            <input
              type="text"
              placeholder="Search Patient..."
              className="border rounded-md px-2 py-0.5 text-xs sm:text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-50 border rounded-md px-2 py-0.5 text-xs sm:text-sm w-full sm:w-32"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-xs sm:text-sm">
                <th className="py-1 px-1">Patient Name</th>
                <th className="py-1 px-1">Time</th>
                <th className="py-1 px-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => {
                const patient = patients.find(p => p.patientID === appointment.patientID);
                return (
                  <tr
                    key={`${appointment.appointmentID}-${appointment.patientID}`}
                    className="border-b hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    <td className="py-1.5 px-1">{patient ? patient.name : 'Unknown Patient'}</td>
                    <td className="py-1.5 px-1">{new Date(appointment.dateTime).toLocaleTimeString()}</td>
                    <td className="py-1.5 px-1">
                      <span
                        className={`px-1.5 py-0.5 rounded-full ${appointment.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : appointment.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
          <div className="bg-white p-3 rounded-lg w-full max-w-xs">
            <form onSubmit={handleAddAppointment}>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium mb-0.5">Patient Name</label>
                  <select
                    required
                    className="w-full border rounded-md px-2 py-1 text-xs"
                    value={newAppointment.patientID}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientID: e.target.value })}
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.patientID} value={patient.patientID}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-0.5">Clinic</label>
                  <select
                    required
                    className="w-full border rounded-md px-2 py-1 text-xs"
                    value={newAppointment.clinicID}
                    onChange={(e) => setNewAppointment({ ...newAppointment, clinicID: e.target.value })}
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map(clinic => (
                      <option key={clinic.clinicID} value={clinic.clinicID}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-0.5">Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded-md px-2 py-1 text-xs"
                    value={newAppointment.dateTime}
                    onChange={(e) => setNewAppointment({ ...newAppointment, dateTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-0.5">Status</label>
                  <select
                    className="w-full border rounded-md px-2 py-1 text-xs"
                    value={newAppointment.status}
                    onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-1.5 rounded-md hover:bg-indigo-700 text-xs sm:text-sm"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Remaining code continues in next message */}
    </div>
  );
};

export default Dashboard;