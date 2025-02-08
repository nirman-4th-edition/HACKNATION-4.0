import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  Mail, 
  MoreVertical, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  UserCheck 
} from 'lucide-react';

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Custom Input Component
const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 ${className}`}
      {...props}
    />
  );
};

// Custom Select Component
const Select = ({ 
  value, 
  onValueChange, 
  placeholder, 
  children,
  className = ''
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 ${className}`}
    >
      <option value="" className="text-gray-500">{placeholder}</option>
      {children}
    </select>
  );
};

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Dr. Gopal Kishore',
      role: 'Senior Doctor',
      department: 'Cardiology',
      contact: '+1 234-567-8900',
      email: 'gopal.w@hospital.com',
      permissions: ['view_patient', 'edit_medical_record']
    },
    {
      id: 2,
      name: 'Priya Singh',
      role: 'Nurse',
      department: 'Emergency',
      contact: '+1 234-567-8901',
      email: 'priya.p@hospital.com',
      permissions: ['view_patient', 'basic_record_update']
    }
  ]);

  const [shifts, setShifts] = useState([
    {
      staffId: 1,
      date: '2024-02-05',
      shift: 'Morning',
      startTime: '07:00',
      endTime: '15:00'
    },
    {
      staffId: 2,
      date: '2024-02-05',
      shift: 'Evening',
      startTime: '15:00',
      endTime: '23:00'
    }
  ]);

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);

  const handleAddStaff = (newStaff) => {
    const staffWithId = {
      ...newStaff,
      id: staff.length + 1
    };
    setStaff([...staff, staffWithId]);
    setIsAddModalOpen(false);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(staff.map(s => 
      s.id === updatedStaff.id ? updatedStaff : s
    ));
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleAddShift = (newShift) => {
    setShifts([...shifts, newShift]);
    setIsShiftModalOpen(false);
  };

  const renderStaffModal = () => {
    const [formData, setFormData] = useState(selectedStaff || {
      name: '',
      role: '',
      department: '',
      contact: '',
      email: '',
      permissions: []
    });

    const updateForm = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return (
      <Modal
        isOpen={isAddModalOpen || !!selectedStaff}
        onClose={() => {
          setSelectedStaff(null);
          setIsAddModalOpen(false);
        }}
        title={selectedStaff ? 'Edit Staff' : 'Add New Staff'}
      >
        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => updateForm('name', e.target.value)}
          />
          <Select
            value={formData.role}
            onValueChange={(value) => updateForm('role', value)}
            placeholder="Select Role"
          >
            <option value="Doctor" className="text-gray-900">Doctor</option>
            <option value="Nurse" className="text-gray-900">Nurse</option>
            <option value="Admin" className="text-gray-900">Admin</option>
          </Select>
          <Input
            placeholder="Department"
            value={formData.department}
            onChange={(e) => updateForm('department', e.target.value)}
          />
          <Input
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => updateForm('contact', e.target.value)}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => updateForm('email', e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {['view_patient', 'edit_medical_record', 'manage_staff', 'schedule_shifts'].map(perm => (
                <div key={perm} className="flex items-center text-gray-900">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(perm)}
                    onChange={(e) => {
                      const newPermissions = e.target.checked
                        ? [...formData.permissions, perm]
                        : formData.permissions.filter(p => p !== perm);
                      updateForm('permissions', newPermissions);
                    }}
                    className="mr-2"
                  />
                  <span>{perm.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => 
              selectedStaff 
                ? handleEditStaff(formData) 
                : handleAddStaff(formData)
            }
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {selectedStaff ? 'Update' : 'Add'}
          </button>
        </div>
      </Modal>
    );
  };

  const renderShiftModal = () => {
    const [shiftData, setShiftData] = useState({
      staffId: '',
      date: '',
      shift: '',
      startTime: '',
      endTime: ''
    });

    return (
      <Modal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        title="Schedule Shift"
      >
        <div className="space-y-4">
          <Select
            value={shiftData.staffId}
            onValueChange={(value) => 
              setShiftData(prev => ({...prev, staffId: value}))
            }
            placeholder="Select Staff"
          >
            {staff.map(s => (
              <option 
                key={s.id} 
                value={s.id.toString()} 
                className="text-gray-900"
              >
                {s.name}
              </option>
            ))}
          </Select>
          <Input
            type="date"
            value={shiftData.date}
            onChange={(e) => 
              setShiftData(prev => ({...prev, date: e.target.value}))
            }
          />
          <Select
            value={shiftData.shift}
            onValueChange={(value) => 
              setShiftData(prev => ({...prev, shift: value}))
            }
            placeholder="Select Shift"
          >
            <option value="Morning" className="text-gray-900">Morning</option>
            <option value="Evening" className="text-gray-900">Evening</option>
            <option value="Night" className="text-gray-900">Night</option>
          </Select>
          <div className="flex space-x-2">
            <Input
              type="time"
              placeholder="Start Time"
              value={shiftData.startTime}
              onChange={(e) => 
                setShiftData(prev => ({...prev, startTime: e.target.value}))
              }
            />
            <Input
              type="time"
              placeholder="End Time"
              value={shiftData.endTime}
              onChange={(e) => 
                setShiftData(prev => ({...prev, endTime: e.target.value}))
              }
            />
          </div>
          <button 
            onClick={() => handleAddShift(shiftData)}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Schedule Shift
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0 text-gray-900">
          Staff Management
        </h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus className="mr-2 w-4 h-4" /> Add Staff
          </button>
          <button 
            onClick={() => setIsShiftModalOpen(true)}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Calendar className="mr-2 w-4 h-4" /> Schedule Shift
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {staff.map((member) => (
          <div 
            key={member.id} 
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0"
          >
            <div className="flex items-center w-full sm:w-auto">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm">
                  {member.role} - {member.department}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center text-gray-800 text-xs sm:text-sm">
                <Phone className="w-4 h-4 mr-1 text-gray-600" />
                {member.contact}
              </div>
              <div className="flex items-center text-gray-800 text-xs sm:text-sm">
                <Mail className="w-4 h-4 mr-1 text-gray-600" />
                {member.email}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedStaff(member)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteStaff(member.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {renderStaffModal()}
      {renderShiftModal()}
    </div>
  );
};

export default StaffManagement;