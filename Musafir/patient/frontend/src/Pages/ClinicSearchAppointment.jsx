
import React, { useState, useMemo } from 'react';
import { 
  SearchIcon, 
  MapPinIcon,
  StarIcon, 
  DollarSignIcon, 
  StethoscopeIcon,
  PhoneCallIcon,
  XIcon
} from 'lucide-react';

// Mock Data for Clinics
const CLINICS = [
  {
    id: 1,
    name: 'Patia Multi-Speciality Clinic',
    location: 'Patia',
    specialties: ['Cardiology', 'Ayurveda'],
    rating: 4.5,
    totalRatings: 245,
    averageFee: 500,
    availableDoctors: [
      { 
        id: 101, 
        name: 'Dr. Priyanka Mohanty', 
        specialty: 'Cardiology', 
        availableSlots: [
          { date: '2024-03-15', time: '10:00 AM' },
          { date: '2024-03-15', time: '02:00 PM' }
        ]
      },
      { 
        id: 102, 
        name: 'Dr. Rajesh Patnaik', 
        specialty: 'Ayurveda', 
        availableSlots: [
          { date: '2024-03-16', time: '11:00 AM' },
          { date: '2024-03-16', time: '04:00 PM' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Khandagiri Health Hub',
    location: 'Khandagiri',
    specialties: ['Pediatrics', 'Dermatology'],
    rating: 4.2,
    totalRatings: 189,
    averageFee: 400,
    availableDoctors: [
      { 
        id: 201, 
        name: 'Dr. Suresh Nayak', 
        specialty: 'Pediatrics', 
        availableSlots: [
          { date: '2024-03-15', time: '09:00 AM' },
          { date: '2024-03-15', time: '03:00 PM' }
        ]
      },
      { 
        id: 202, 
        name: 'Dr. Anjali Das', 
        specialty: 'Dermatology', 
        availableSlots: [
          { date: '2024-03-16', time: '10:30 AM' },
          { date: '2024-03-16', time: '05:00 PM' }
        ]
      }
    ]
  }
];


// Rating Modal Component
const RatingModal = ({ clinic, onClose, onSubmitRating }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(rating, feedback);
      onClose();
    } else {
      alert('Please select a rating');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XIcon size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Rate {clinic.name}</h2>
        
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon 
              key={star}
              className={`cursor-pointer transition-colors duration-200 ${
                (hoverRating || rating) >= star 
                  ? 'text-yellow-500 fill-yellow-500' 
                  : 'text-gray-300'
              }`}
              size={32}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        
        <textarea 
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="Write your feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
        
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

// Clinic Card Component
const ClinicCard = ({ clinic, onSelectClinic, onOpenRatingModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{clinic.name}</h2>
        
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => onOpenRatingModal(clinic)}
        >
          <StarIcon className="text-yellow-500 mr-1" fill="#FFC107" />
          <span className="font-semibold">{clinic.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({clinic.totalRatings})</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPinIcon className="mr-2 text-blue-500" />
          <span>{clinic.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <StethoscopeIcon className="mr-2 text-green-500" />
          <span>{clinic.specialties.join(', ')}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="mr-2 text-green-500">₹</span>
          <span>Avg. Fee: ₹{clinic.averageFee}</span>
        </div>
      </div>

      <button 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        onClick={() => onSelectClinic(clinic)}
      >
        Book Appointment
      </button>
    </div>
  );
};

// Main Clinic Search Component
const ClinicSearchAppointment = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [sortOption, setSortOption] = useState('rating');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [ratingModalClinic, setRatingModalClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    reason: ''
  });

  // Filtering and Sorting Logic
  const filteredAndSortedClinics = useMemo(() => {
    let result = CLINICS.filter(clinic => 
      (locationFilter === '' || clinic.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (specialtyFilter === '' || clinic.specialties.some(s => 
        s.toLowerCase().includes(specialtyFilter.toLowerCase()))) &&
      (searchQuery === '' || 
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.specialties.some(s => 
          s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );

    // Sorting logic
    switch(sortOption) {
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      case 'fee':
        return result.sort((a, b) => a.averageFee - b.averageFee);
      case 'name':
        return result.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [searchQuery, locationFilter, specialtyFilter, sortOption]);

  // Handlers
  const handleBookAppointment = () => {
    if (selectedClinic && selectedDoctor && appointmentDetails.date && appointmentDetails.time) {
      alert(`Booking confirmed with ${selectedDoctor.name} at ${selectedClinic.name} on ${appointmentDetails.date} at ${appointmentDetails.time}`);
      // Reset selections
      setSelectedClinic(null);
      setSelectedDoctor(null);
      setAppointmentDetails({ date: '', time: '', reason: '' });
    } else {
      alert('Please complete all booking details');
    }
  };

  const handleSubmitRating = (rating, feedback) => {
    console.log(`Rating submitted: ${rating}, Feedback: ${feedback}`);
    // In a real app, you'd send this to an API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Appointment </h1>

        {/* Search and Filter Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <input 
              type="text" 
              placeholder="Search clinics, doctors, or specialties..."
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-blue-950"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Filters Dropdown */}
          <div className="flex space-x-2">
            <select 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-blue-950"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Downtown">Downtown</option>
              <option value="Suburbs">Suburbs</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters and Sorting */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="px-4 py-2 rounded-lg border border-gray-300 text-blue-950"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          {/* Sorting Dropdown */}
          <select 
            className="px-4 py-2 rounded-lg border border-gray-300 text-blue-950"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="rating">Sort by Rating</option>
            <option value="fee">Sort by Fee</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Clinic Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-blue-950">
          {filteredAndSortedClinics.map(clinic => (
            <ClinicCard 
              key={clinic.id} 
              clinic={clinic} 
              onSelectClinic={setSelectedClinic}
              onOpenRatingModal={setRatingModalClinic}
            />
          ))}
        </div>

        {/* Rating Modal */}
        {ratingModalClinic && (
          <RatingModal 
            clinic={ratingModalClinic}
            onClose={() => setRatingModalClinic(null)}
            onSubmitRating={handleSubmitRating}
          />
        )}

        {/* Appointment Booking Modal */}
        {selectedClinic && (
          <div className="fixed inset-0 text-blue-950 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>
              
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Select Doctor</label>
                <select 
                  className="w-full px-4 py-2 border rounded-lg"
                  onChange={(e) => {
                    const doctor = selectedClinic.availableDoctors.find(
                      d => d.id === parseInt(e.target.value)
                    );
                    setSelectedDoctor(doctor);
                  }}
                >
                  <option value="">Choose Doctor</option>
                  {selectedClinic.availableDoctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDoctor && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Select Date</label>
                    <select 
                      className="w-full px-4 py-2 border rounded-lg"
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev, 
                        date: e.target.value
                      }))}
                    >
                      <option value="">Choose Date</option>
                      {selectedDoctor.availableSlots.map(slot => (
                        <option key={slot.date} value={slot.date}>
                          {slot.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Select Time</label>
                    <select 
                      className="w-full px-4 py-2 border rounded-lg"
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev, 
                        time: e.target.value
                      }))}
                    >
                      <option value="">Choose Time</option>
                      {selectedDoctor.availableSlots
                        .filter(slot => slot.date === appointmentDetails.date)
                        .map(slot => (
                          <option key={slot.time} value={slot.time}>
                            {slot.time}
                            </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Reason for Visit</label>
                    <textarea 
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Brief description of your medical concern"
                      onChange={(e) => setAppointmentDetails(prev => ({
                        ...prev, 
                        reason: e.target.value
                      }))}
                    />
                  </div>

                  <button 
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    onClick={handleBookAppointment}
                  >
                    Confirm Appointment
                  </button>
                </>
              )}

              <button 
                className="w-full mt-4 text-red-500 hover:text-red-700"
                onClick={() => {
                  setSelectedClinic(null);
                  setSelectedDoctor(null);
                  setAppointmentDetails({
                    date: '',
                    time: '',
                    reason: ''
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicSearchAppointment;
