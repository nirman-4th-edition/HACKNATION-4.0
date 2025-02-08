import React, { useState, useEffect } from 'react';
import { Clock, User, Check, X, Calendar, RefreshCw, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Custom Button component
const Button = ({ variant = 'default', size = 'default', ...props }) => {
  const variantStyles = {
    default: 'bg-purple-500 text-white hover:bg-purple-600',
    outline: 'border border-purple-500 text-purple-500 hover:bg-purple-50',
    ghost: 'hover:bg-gray-100'
  };

  const sizeStyles = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-2 py-1 text-xs',
    lg: 'px-6 py-3 text-md'
  };

  return (
    <button
      className={`rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    />
  );
};

// Custom Dialog component
const Dialog = ({ open, onOpenChange, children }) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ${
      open ? 'visible' : 'invisible'
    }`}
    onClick={() => onOpenChange(false)}
  >
    <div
      className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { 
      appointmentID: '1', 
      patientID: 'PAT001', 
      patientName: 'Priya Sharma',
      clinicID: 'CLINIC001', 
      date: '2024-02-05T09:30:00', 
      status: 'Scheduled'
    },
    { 
      appointmentID: '2', 
      patientID: 'PAT002', 
      patientName: 'Aarav Sahoo',
      clinicID: 'CLINIC002', 
      date: '2024-02-05T11:15:00', 
      status: 'Scheduled'
    },
    { 
      appointmentID: '3', 
      patientID: 'PAT003', 
      patientName: 'Dev Mishra',
      clinicID: 'CLINIC001', 
      date: '2024-02-04T14:00:00', 
      status: 'Completed'
    },
    { 
      appointmentID: '4', 
      patientID: 'PAT004', 
      patientName: 'Shubhojeet Jena',
      clinicID: 'CLINIC003', 
      date: '2024-02-03T15:45:00', 
      status: 'Cancelled'
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);

  // Compute appointment statistics for graph
  const computeAppointmentStats = () => {
    const statusCounts = {
      Scheduled: 0,
      Completed: 0,
      Cancelled: 0
    };

    appointments.forEach(app => {
      statusCounts[app.status]++;
    });

    return [
      { status: 'Scheduled', count: statusCounts.Scheduled },
      { status: 'Completed', count: statusCounts.Completed },
      { status: 'Cancelled', count: statusCounts.Cancelled }
    ];
  };

  // Handler for rescheduling appointment
  const handleRescheduleAppointment = (id, newdate) => {
    setAppointments(prev => 
      prev.map(app => 
        app.appointmentID === id 
          ? { ...app, date: newdate, status: 'Scheduled' } 
          : app
      )
    );
    setIsRescheduleDialogOpen(false);
  };

  // Separate appointments by status
  const upcomingAppointments = appointments
    .filter(app => app.status === 'Scheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastAppointments = appointments
    .filter(app => app.status !== 'Scheduled')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Appointment notification simulation
  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = new Date();
      upcomingAppointments.forEach(app => {
        const appdate = new Date(app.date);
        const hoursDifference = (appdate - now) / (1000 * 60 * 60);
        
        if (hoursDifference <= 24 && hoursDifference > 0) {
          console.log(`Reminder: Appointment for ${app.patientName} in ${Math.round(hoursDifference)} hours`);
        }
      });
    };

    const notificationInterval = setInterval(checkUpcomingAppointments, 60 * 60 * 1000);
    return () => clearInterval(notificationInterval);
  }, [upcomingAppointments]);

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Appointment Statistics Graph */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Appointment Status Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={computeAppointmentStats()}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#6D28D9" 
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 shadow-lg text-black">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div 
                key={appointment.appointmentID} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <span className="font-medium block">{appointment.patientName}</span>
                    <span className="text-xs text-gray-500">{appointment.clinicID}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 mr-2">
                    <Clock size={16} className="inline mr-1" />
                    {new Date(appointment.date).toLocaleTimeString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setIsRescheduleDialogOpen(true);
                    }}
                  >
                    <RefreshCw size={14} className="mr-1" /> Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Appointments Section */}
      <div className="mt-6 bg-white rounded-xl p-4 shadow-lg text-black">
        <h2 className="text-xl font-bold mb-4">Past Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pastAppointments.map((appointment) => (
            <div 
              key={appointment.appointmentID} 
              className={`p-4 rounded-lg ${
                appointment.status === 'Completed' 
                  ? 'bg-green-50' 
                  : 'bg-red-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{appointment.patientName}</span>
                <span 
                  className={`text-xs px-2 py-1 rounded ${
                    appointment.status === 'Completed' 
                      ? 'bg-green-200 text-green-800' 
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <Calendar size={14} className="inline mr-1" />
                {new Date(appointment.date).toLocaleDateString()} at {new Date(appointment.date).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reschedule Dialog */}
      {selectedAppointment && (
        <Dialog 
          open={isRescheduleDialogOpen} 
          onOpenChange={setIsRescheduleDialogOpen}
        >
          <div className="space-y-4 text-gray-800">
            <input 
              type="date-local" 
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setSelectedAppointment(prev => ({
                  ...prev, 
                  date: e.target.value
                }));
              }}
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={() => setIsRescheduleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleRescheduleAppointment(
                  selectedAppointment.appointmentID, 
                  selectedAppointment.date
                )}
              >
                Reschedule
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Appointments;