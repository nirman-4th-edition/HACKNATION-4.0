import React, { useState } from 'react';
import {
  CalendarIcon,
  SearchIcon,
  AlertCircleIcon,
  ShieldCheckIcon,
  XIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CheckCircleIcon,
  ClipboardListIcon
} from 'lucide-react';

// Clinic Data
const CLINICS = [
  {
    id: 1,
    name: 'City Health Clinic',
    location: 'Downtown',
    address: '123 Main Street, Downtown',
    doctors: [
      { 
        id: 1, 
        name: 'Dr. John Smith', 
        specialization: 'Cardiologist',
        availableSlots: [
          '2024-02-25 09:00',
          '2024-02-25 10:00',
          '2024-02-25 14:00',
          '2024-02-26 11:00',
        ]
      },
      { 
        id: 2, 
        name: 'Dr. Sarah Wilson', 
        specialization: 'General Physician',
        availableSlots: [
          '2024-02-25 11:00',
          '2024-02-25 15:00',
          '2024-02-26 10:00',
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Metro Healthcare Center',
    location: 'Suburbs',
    address: '456 Oak Avenue, Suburbs',
    doctors: [
      { 
        id: 3, 
        name: 'Dr. Michael Chen', 
        specialization: 'Dermatologist',
        availableSlots: [
          '2024-02-25 13:00',
          '2024-02-26 14:00',
          '2024-02-26 16:00',
        ]
      },
      {
        id: 4,
        name: 'Dr. Emily Brown',
        specialization: 'Pediatrician',
        availableSlots: [
          '2024-02-25 10:00',
          '2024-02-25 14:00',
          '2024-02-26 11:00',
        ]
      }
    ]
  }
];

// Expanded Health Insights with more comprehensive data
const HEALTH_INSIGHTS = [
  {
    id: 1,
    title: 'Seasonal Flu Prevention',
    description: 'Latest guidelines for protecting yourself from seasonal influenza.',
    category: 'Preventive Care',
    detailedInfo: 'Get vaccinated, wash hands frequently, maintain social distance, and boost your immune system with proper nutrition and rest.'
  },
  {
    id: 2,
    title: 'Mental Health Awareness',
    description: 'Understanding and managing stress in modern life.',
    category: 'Mental Wellness',
    detailedInfo: 'Practice mindfulness, seek professional help if needed, maintain social connections, and prioritize self-care routines.'
  },
  {
    id: 3,
    title: 'Heart Health Checkup',
    description: 'Essential screenings for cardiovascular health.',
    category: 'Preventive Screening',
    detailedInfo: 'Regular blood pressure checks, cholesterol screening, and lifestyle assessment can help prevent heart diseases.'
  }
];

// Enhanced Government Schemes with Detailed Eligibility Criteria
const USER_SCHEMES = [
  {
    id: 1,
    name: 'National Health Insurance Scheme',
    description: 'Comprehensive health coverage for citizens',
    eligibilityCriteria: {
      age: { min: 18, max: 65 },
      income: { max: 500000 },
      residency: 'Permanent citizen',
      employment: 'Any employment status'
    },
    benefits: [
      'Hospitalization expenses',
      'Outpatient treatments',
      'Prescription medication coverage'
    ]
  },
  {
    id: 2,
    name: 'Senior Citizen Healthcare Support',
    description: 'Specialized healthcare support for elderly',
    eligibilityCriteria: {
      age: { min: 60 },
      income: { max: 300000 },
      residency: 'Permanent citizen'
    },
    benefits: [
      'Free annual health checkups',
      'Discounted medical treatments',
      'Home healthcare services'
    ]
  },
  {
    id: 3,
    name: 'Low-Income Medical Assistance',
    description: 'Healthcare support for economically vulnerable populations',
    eligibilityCriteria: {
      income: { max: 200000 },
      age: { min: 18, max: 70 },
      familyStatus: 'Below poverty line'
    },
    benefits: [
      'Free medical consultations',
      'Subsidized medication',
      'Emergency medical treatment'
    ]
  }
];

const Appointment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  
  // New state for insights and schemes
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({});
  const [eligibilityResult, setEligibilityResult] = useState(null);

  // Unified search function
  const searchResults = searchQuery ? CLINICS.flatMap(clinic => {
    const matchingDoctors = clinic.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const clinicMatches = 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase());

    if (clinicMatches || matchingDoctors.length > 0) {
      return matchingDoctors.map(doctor => ({
        clinic,
        doctor,
        type: 'doctor'
      }));
    }
    return [];
  }) : [];

  const handleBooking = (clinic, doctor) => {
    setSelectedClinic(clinic);
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = () => {
    if (!selectedClinic || !selectedDoctor || !selectedTime) return;

    const newBooking = {
      id: Date.now(),
      clinic: selectedClinic.name,
      doctor: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      time: selectedTime,
      status: 'Upcoming',
      timestamp: new Date(selectedTime).getTime()
    };

    const updatedBookings = [...bookings, newBooking]
      .sort((a, b) => a.timestamp - b.timestamp);

    setBookings(updatedBookings);
    setIsBookingModalOpen(false);
    resetBookingState();
  };

  const resetBookingState = () => {
    setSelectedClinic(null);
    setSelectedDoctor(null);
    setSelectedTime('');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const openInsightModal = (insight) => {
    setSelectedInsight(insight);
  };

  const openEligibilityTest = (scheme) => {
    setSelectedScheme(scheme);
    setEligibilityAnswers({});
    setEligibilityResult(null);
  };

  const handleEligibilityAnswer = (question, answer) => {
    setEligibilityAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const checkEligibility = () => {
    const criteria = selectedScheme.eligibilityCriteria;
    let isEligible = true;

    // Age Check
    if (criteria.age) {
      const age = parseInt(eligibilityAnswers.age);
      isEligible = isEligible && 
        (!criteria.age.min || age >= criteria.age.min) &&
        (!criteria.age.max || age <= criteria.age.max);
    }

    // Income Check
    if (criteria.income) {
      const income = parseInt(eligibilityAnswers.income);
      isEligible = isEligible && income <= criteria.income.max;
    }

    // Additional criteria checks can be added here
    setEligibilityResult(isEligible);
  };

  // Modals
  const InsightModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{selectedInsight.title}</h2>
          <button 
            onClick={() => setSelectedInsight(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Category: {selectedInsight.category}</h3>
            <p className="text-sm text-gray-600">{selectedInsight.description}</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Detailed Information</h3>
            <p className="text-sm text-gray-800">{selectedInsight.detailedInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const EligibilityTestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Eligibility Test: {selectedScheme.name}</h2>
          <button 
            onClick={() => setSelectedScheme(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">Eligibility Criteria</h3>
            {Object.entries(selectedScheme.eligibilityCriteria).map(([key, value]) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)} Requirements:
                </label>
                {typeof value === 'object' ? (
                  <input
                    type="number"
                    placeholder={`Enter your ${key}`}
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={(e) => handleEligibilityAnswer(key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={`Enter your ${key}`}
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={(e) => handleEligibilityAnswer(key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {eligibilityResult !== null && (
            <div className={`p-4 rounded-lg text-center ${eligibilityResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {eligibilityResult ? (
                <>
                  <CheckCircleIcon className="mx-auto mb-2 w-10 h-10 text-green-600" />
                  <p>Congratulations! You are eligible for this scheme.</p>
                </>
              ) : (
                <>
                  <XIcon className="mx-auto mb-2 w-10 h-10 text-red-600" />
                  <p>Unfortunately, you do not meet the eligibility criteria for this scheme.</p>
                </>
              )}
            </div>
          )}

          <button 
            onClick={checkEligibility}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Check Eligibility
          </button>
        </div>
      </div>
    </div>
  );

  // Booking Modal from previous implementation
  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button 
            onClick={() => setIsBookingModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">{selectedDoctor?.name}</h3>
            <p className="text-sm text-gray-600">{selectedDoctor?.specialization}</p>
            <p className="text-sm text-gray-600 mt-1">{selectedClinic?.name}</p>
            <p className="text-sm text-gray-500">{selectedClinic?.address}</p>
          </div>

          <h3 className="font-semibold mb-3">Available Time Slots</h3>
          <div className="space-y-2">
            {selectedDoctor?.availableSlots.map(slot => (
              <div 
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors
                  ${selectedTime === slot ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {formatDateTime(slot)}
                  </span>
                </div>
              </div>
                          ))}
                          </div>
                        </div>
                
                        <button 
                          onClick={confirmBooking}
                          disabled={!selectedTime}
                          className={`w-full px-4 py-2 rounded-lg transition-colors
                            ${selectedTime 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  );
                
                  // Search Results Component
                  const SearchResults = () => (
                    <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                      {searchResults.length === 0 ? (
                        <div className="p-4 text-gray-500">No results found</div>
                      ) : (
                        searchResults.map((result, index) => (
                          <div 
                            key={`${result.clinic.id}-${result.doctor.id}`}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b"
                            onClick={() => handleBooking(result.clinic, result.doctor)}
                          >
                            <div className="flex items-start gap-4">
                              <UserIcon className="w-5 h-5 mt-1 text-gray-400" />
                              <div>
                                <h3 className="font-semibold">{result.doctor.name}</h3>
                                <p className="text-sm text-gray-600">{result.doctor.specialization}</p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{result.clinic.name} - {result.clinic.location}</span>
                                </div>
                                <button 
                                  className="mt-2 px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBooking(result.clinic, result.doctor);
                                  }}
                                >
                                  Book Appointment
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                
                  return (
                    <div
                    className="min-h-screen bg-gray-100 text-blue-950">
                      <div className="container mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                        <div className="relative mb-6">
                          <input
                            type="text"
                            placeholder="Search by doctor name, specialization, clinic, or location..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          {searchQuery && <SearchResults />}
                        </div>
                
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                              <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <CalendarIcon className="mr-2" /> Upcoming Appointments
                              </h2>
                              {bookings.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                  <p>No upcoming appointments</p>
                                  <p className="text-sm mt-1">Search for a doctor or clinic to book an appointment</p>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  {bookings.map(booking => (
                                    <div key={booking.id} className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="font-semibold">{booking.clinic}</p>
                                          <p className="text-sm text-gray-600">
                                            {booking.doctor} - {booking.specialization}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {formatDateTime(booking.time)}
                                          </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {booking.status}
                                          </span>
                                          <button 
                                            className="text-sm text-red-600 hover:text-red-800"
                                            onClick={() => {
                                              const updatedBookings = bookings.filter(b => b.id !== booking.id);
                                              setBookings(updatedBookings);
                                            }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                
                          <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                              <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <AlertCircleIcon className="mr-2" /> Health Insights
                              </h2>
                              {HEALTH_INSIGHTS.map(insight => (
                                <div 
                                  key={insight.id} 
                                  className="bg-blue-50 p-4 rounded-lg mb-4 hover:bg-blue-100 cursor-pointer"
                                  onClick={() => openInsightModal(insight)}
                                >
                                  <h3 className="font-semibold">{insight.title}</h3>
                                  <p className="text-sm text-gray-600">{insight.description}</p>
                                  <div className="flex items-center text-blue-600 mt-2 text-sm">
                                    <ClipboardListIcon className="mr-2 w-4 h-4" />
                                    Learn More
                                  </div>
                                </div>
                              ))}
                            </div>
                
                            <div className="bg-white rounded-lg shadow p-6">
                              <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <ShieldCheckIcon className="mr-2" /> Government Schemes
                              </h2>
                              {USER_SCHEMES.map(scheme => (
                                <div 
                                  key={scheme.id} 
                                  className="bg-green-50 p-4 rounded-lg mb-4 hover:bg-green-100 cursor-pointer"
                                  onClick={() => openEligibilityTest(scheme)}
                                >
                                  <h3 className="font-semibold">{scheme.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                                  <div className="flex items-center text-green-600 text-sm">
                                    <ClipboardListIcon className="mr-2 w-4 h-4" />
                                    Check Eligibility
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                
                        {/* Modals */}
                        {isBookingModalOpen && <BookingModal />}
                        {selectedInsight && <InsightModal />}
                        {selectedScheme && <EligibilityTestModal />}
                      </div>
                    </div>
                  );
                };
                
                export default Appointment;