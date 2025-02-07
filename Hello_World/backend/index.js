import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Appointment, Doctor, DoctorDayHistory, User } from './Models/Models.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// In-memory data structures
const appointmentQueue = {};
// Define doctor status types
const DoctorStatusEnum = {
    NOT_STARTED: 'notstarted',
    LIVE: 'live',
    BREAK: 'break',
    OVER: 'over'
};
// Initialize doctor status with enum values
const doctorStatus = {};




// Routes


app.post('/user/add', async (req, res) => {
    try {
        const { name, year, sex } = req.body;
        const user = new User({
            name,
            yearOfBirth: year,
            sex
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});



app.post('/doctor/add', async (req, res) => {
    try {
        const { name, department, specialization } = req.body;
        const doctor = new Doctor({
            name,
            department,
            specialization
        });
        await doctor.save();
        res.status(201).json(doctor);
        
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctor', error });
        
    }
});

app.post('/appointment', (req, res) => {
  const { userId, doctorId, problemSummary } = req.body;
  
  const appointment = new Appointment({
    userId,
    doctorId,
    problemSummary,
    status: 'Pending'
  });
  
  appointment.save();
  
  // Add to queue
  if (!appointmentQueue[doctorId]) {
    appointmentQueue[doctorId] = [];
  }
  appointmentQueue[doctorId].push(appointment._id);
  
  res.status(201).json(appointment);
});

app.post('/doctor/next', async (req, res) => {
    const { doctorId, skip , note } = req.body;

    if (!appointmentQueue[doctorId] || appointmentQueue[doctorId].length === 0) {
        return res.status(404).json({ message: 'No appointments' });
    }

    const nextAppointmentId = appointmentQueue[doctorId].shift();

    try {
        const today = new Date().toISOString().split('T')[0];

        const appointment = await Appointment.findById(nextAppointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        appointment.status = skip ? 'Cancelled':'Completed'
        appointment.notes = note;
        await appointment.save();

        let history = await DoctorDayHistory.findOne({ doctorId, date: today });
        if (history) {
            history.appointments.push(nextAppointmentId);
            await history.save();
        } else {
            const doctorDayHistory = new DoctorDayHistory({
                doctorId,
                date: today,
                appointments: [nextAppointmentId]
            });
            await doctorDayHistory.save();
        }

        res.status(200).json({ appointmentId: nextAppointmentId });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
});



app.post('/doctor/status', (req, res) => {
  const { doctorId, status } = req.body;
  doctorStatus[doctorId] = status;
  res.status(200).json({ status });
});

app.get('/doctor/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    
    try {
        const appointments = await Appointment.find({ 
            _id: { $in: appointmentQueue[doctorId] } 
        }).populate('userId').sort({ 
            _id: {
                $function: {
                    body: function(ids) {
                        return ids.indexOf(this._id);
                    },
                    args: [appointmentQueue[doctorId]],
                    lang: 'js'
                }
            }
        });

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
 
        res.status(200).json({
            doctor,
            status: doctorStatus[doctorId],
            appointments
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
 });


app.listen(3000, '0.0.0.0' , () => {
    console.log('Server is running on port 3000');
});
