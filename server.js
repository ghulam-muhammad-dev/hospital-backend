const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 Server starting...');

// ============ DATA STORAGE ============
const patients = [
  { _id: '1', name: 'John Doe', age: 30, contact: '1234567890', email: 'john@test.com' },
  { _id: '2', name: 'Jane Smith', age: 25, contact: '0987654321', email: 'jane@test.com' }
];

const doctors = [
  { _id: '1', name: 'Ahmed Khan', specialization: 'Cardiologist', contact: '111222333', fee: 2000 },
  { _id: '2', name: 'Fatima Ali', specialization: 'Neurologist', contact: '444555666', fee: 2500 }
];

// IMPORTANT: Appointments array - INITIAL DATA
const appointments = [
  { 
    _id: '1', 
    patientId: { _id: '1', name: 'John Doe' }, 
    doctorId: { _id: '1', name: 'Ahmed Khan' }, 
    date: '2024-01-15', 
    time: '10:00 AM', 
    status: 'Scheduled',
    reason: 'Regular checkup'
  }
];

const users = [
  { id: '0', name: 'Admin User', email: 'admin@medicare.com', password: 'admin123' }
];

// ============ API ROUTES ============

app.get('/api', (req, res) => {
  res.json({ message: 'Hospital API is running!' });
});

// Patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  const newPatient = { _id: Date.now().toString(), ...req.body };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

app.delete('/api/patients/:id', (req, res) => {
  const index = patients.findIndex(p => p._id === req.params.id);
  if (index !== -1) {
    patients.splice(index, 1);
    res.json({ message: 'Patient deleted' });
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// Doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/api/doctors', (req, res) => {
  const newDoctor = { _id: Date.now().toString(), ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
});

app.delete('/api/doctors/:id', (req, res) => {
  const index = doctors.findIndex(d => d._id === req.params.id);
  if (index !== -1) {
    doctors.splice(index, 1);
    res.json({ message: 'Doctor deleted' });
  } else {
    res.status(404).json({ message: 'Doctor not found' });
  }
});

// ============ APPOINTMENTS - FIXED ============

// GET all appointments
app.get('/api/appointments', (req, res) => {
  console.log('📋 GET appointments - Returning:', appointments.length, 'appointments');
  res.json(appointments);
});

// POST new appointment
app.post('/api/appointments', (req, res) => {
  console.log('📝 POST appointment - Request body:', req.body);
  
  const { patientId, doctorId, date, time, reason } = req.body;
  
  // Find patient and doctor full details
  const patient = patients.find(p => p._id === patientId);
  const doctor = doctors.find(d => d._id === doctorId);
  
  console.log('🔍 Found patient:', patient?.name);
  console.log('🔍 Found doctor:', doctor?.name);
  
  const newAppointment = {
    _id: Date.now().toString(),
    patientId: patient ? { _id: patient._id, name: patient.name } : { _id: patientId, name: 'Unknown Patient' },
    doctorId: doctor ? { _id: doctor._id, name: doctor.name } : { _id: doctorId, name: 'Unknown Doctor' },
    date: date || new Date().toISOString().split('T')[0],
    time: time || '12:00 PM',
    status: 'Scheduled',
    reason: reason || ''
  };
  
  appointments.push(newAppointment);
  console.log('✅ Appointment added successfully!');
  console.log('📊 Total appointments now:', appointments.length);
  console.log('📝 New appointment:', newAppointment);
  
  res.status(201).json(newAppointment);
});

// DELETE appointment
app.delete('/api/appointments/:id', (req, res) => {
  const index = appointments.findIndex(a => a._id === req.params.id);
  if (index !== -1) {
    appointments.splice(index, 1);
    console.log('🗑️ Appointment deleted. Remaining:', appointments.length);
    res.json({ message: 'Appointment deleted' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

// ============ AUTH ROUTES ============

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  
  const token = jwt.sign({ email, name }, 'secretkey', { expiresIn: '7d' });
  res.status(201).json({ token, user: { name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ email, name: user.name }, 'secretkey', { expiresIn: '7d' });
    return res.json({ token, user: { name: user.name, email: user.email } });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`📊 Initial appointments count: ${appointments.length}`);
});