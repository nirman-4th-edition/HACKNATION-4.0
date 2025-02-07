const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  department: String,
  specialization: String
});

const UserSchema = new mongoose.Schema({
  name: String,
  yearOfBirth: Number,
  sex: 
{
  type: String,
  enum: ['Male', 'Female'],
  required: true
}
});

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  problemSummary: String,
  notes: {
    type: String,
    default: ''
  },
  status : 
{
    type: String,
    enum: ['Pending', 'Cancelled', 'Completed'],
    default: 'Pending'
}
});

const DoctorDayHistorySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', DoctorSchema);
const User = mongoose.model('User', UserSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);
const DoctorDayHistory = mongoose.model('DoctorDayHistory', DoctorDayHistorySchema);

module.exports = { Doctor, User, Appointment, DoctorDayHistory };