// Mock data for the medical appointment booking app

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.9,
    image: '/api/placeholder/120/120',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and cardiac rehabilitation.',
    education: 'MD from Harvard Medical School',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    consultationFee: 150,
    location: 'Heart Care Center, Downtown'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    experience: '12 years',
    rating: 4.8,
    image: '/api/placeholder/120/120',
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in skin cancer detection, cosmetic dermatology, and pediatric skin conditions.',
    education: 'MD from Johns Hopkins University',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: 120,
    location: 'Skin Health Clinic, Medical District'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: '10 years',
    rating: 4.9,
    image: '/api/placeholder/120/120',
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence.',
    education: 'MD from Stanford University',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    consultationFee: 100,
    location: 'Children\'s Health Center, Westside'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedist',
    experience: '18 years',
    rating: 4.7,
    image: '/api/placeholder/120/120',
    about: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine, joint replacement, and trauma surgery.',
    education: 'MD from Mayo Clinic College of Medicine',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    consultationFee: 180,
    location: 'Orthopedic Sports Center, Northside'
  },
  {
    id: 5,
    name: 'Dr. Lisa Park',
    specialty: 'Neurologist',
    experience: '14 years',
    rating: 4.8,
    image: '/api/placeholder/120/120',
    about: 'Dr. Lisa Park specializes in treating neurological disorders including migraines, epilepsy, and movement disorders.',
    education: 'MD from UCLA Medical School',
    availability: ['Monday', 'Wednesday', 'Friday'],
    consultationFee: 160,
    location: 'Neurology Institute, Central'
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatrist',
    experience: '11 years',
    rating: 4.6,
    image: '/api/placeholder/120/120',
    about: 'Dr. Robert Kim provides comprehensive mental health care including therapy, medication management, and crisis intervention.',
    education: 'MD from Columbia University',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: 140,
    location: 'Mental Health Center, Eastside'
  }
]

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
]

export const appointments = [
  {
    id: 1,
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    patientName: 'John Doe',
    patientAge: 45,
    symptoms: 'Chest pain and shortness of breath',
    location: 'Heart Care Center, Downtown',
    appointmentType: 'Consultation'
  },
  {
    id: 2,
    doctorId: 3,
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    date: '2024-01-18',
    time: '2:30 PM',
    status: 'confirmed',
    patientName: 'Emma Smith',
    patientAge: 8,
    symptoms: 'Regular checkup and vaccination',
    location: 'Children\'s Health Center, Westside',
    appointmentType: 'Checkup'
  },
  {
    id: 3,
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    date: '2024-01-20',
    time: '11:30 AM',
    status: 'pending',
    patientName: 'Sarah Johnson',
    patientAge: 32,
    symptoms: 'Skin rash and irritation',
    location: 'Skin Health Clinic, Medical District',
    appointmentType: 'Consultation'
  }
]

export const chatMessages = [
  {
    id: 1,
    sender: 'Dr. Sarah Johnson',
    message: 'Hello! How are you feeling today?',
    timestamp: '10:30 AM',
    isDoctor: true
  },
  {
    id: 2,
    sender: 'You',
    message: 'Hi Doctor, I\'m feeling much better after the medication.',
    timestamp: '10:32 AM',
    isDoctor: false
  },
  {
    id: 3,
    sender: 'Dr. Sarah Johnson',
    message: 'That\'s great to hear! Continue taking the medication as prescribed and let me know if you have any concerns.',
    timestamp: '10:35 AM',
    isDoctor: true
  }
]
