import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import Button from '../components/Button'
import DatePicker from '../components/DatePicker'
import TimeSlots from '../components/TimeSlots'
import PatientForm from '../components/PatientForm'
import ConfirmationCard from '../components/ConfirmationCard'
import { doctors, timeSlots } from '../data/mockData'

const BookAppointment = () => {
  const router = useRouter()
  const { doctorId } = router.query
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [patientInfo, setPatientInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Load doctor from URL parameter
  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find(d => d.id === parseInt(doctorId))
      if (doctor) {
        setSelectedDoctor(doctor)
      }
    }
  }, [doctorId])

  // Get available time slots for selected date
  const getAvailableTimeSlots = (date) => {
    if (!date || !selectedDoctor) return []
    
    // Mock logic: some dates have no availability
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return [] // No weekend slots
    
    // Simulate some slots being taken
    const availableSlots = timeSlots.filter((_, index) => {
      // Mock: every 3rd slot is taken
      return index % 3 !== 0
    })
    
    return availableSlots
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handlePatientInfoSubmit = (info) => {
    setPatientInfo(info)
    setCurrentStep(4) // Go to confirmation
  }

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmBooking = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsComplete(true)
      setCurrentStep(5) // Go to completion step
    }, 2000)
  }

  const handleEditDetails = () => {
    setCurrentStep(3) // Go back to patient info
  }

  const stepTitles = [
    'Select Date',
    'Select Time',
    'Patient Details',
    'Confirm Booking',
    'Complete'
  ]

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`
                  w-12 h-1 mx-2
                  ${currentStep > step ? 'bg-primary-600' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Step {currentStep}: {stepTitles[currentStep - 1]}
        </h2>
      </div>
    </div>
  )

  const renderDateSelection = () => (
    <div>
      {selectedDoctor && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-xs">Dr</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
            </div>
          </div>
        </div>
      )}
      
      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  )

  const renderTimeSelection = () => {
    const availableSlots = getAvailableTimeSlots(selectedDate)
    
    return (
      <div>
        {selectedDoctor && selectedDate && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xs">Dr</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                <p className="text-sm text-gray-500">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <TimeSlots
          availableSlots={availableSlots}
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
        />
      </div>
    )
  }

  const renderPatientForm = () => (
    <PatientForm onSubmit={handlePatientInfoSubmit} />
  )

  const renderConfirmation = () => (
    <ConfirmationCard
      doctor={selectedDoctor}
      appointmentDate={selectedDate}
      appointmentTime={selectedTime}
      patientInfo={patientInfo}
      onConfirm={handleConfirmBooking}
      onEdit={handleEditDetails}
      isLoading={isLoading}
    />
  )

  const renderComplete = () => (
    <div className="text-center">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment with {selectedDoctor?.name} has been successfully booked.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-medium text-gray-900 mb-2">Appointment Details</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Doctor:</span> {selectedDoctor?.name}</p>
            <p><span className="font-medium">Date:</span> {selectedDate?.toLocaleDateString()}</p>
            <p><span className="font-medium">Time:</span> {selectedTime}</p>
            <p><span className="font-medium">Location:</span> {selectedDoctor?.location}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            You will receive a confirmation email with appointment details and instructions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/appointments">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Go to My Appointments
              </Button>
            </Link>
            <Link href="/doctors">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Book Another Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  // If no doctor selected and no doctorId in URL, redirect to doctors page
  if (!selectedDoctor && !doctorId) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Select a Doctor First</h1>
          <p className="text-gray-600 mb-6">Please select a doctor before booking an appointment.</p>
          <Link href="/doctors">
            <Button variant="primary">Browse Doctors</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Book Appointment - MedBook</title>
        <meta name="description" content="Book an appointment with our doctors" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="step-container">
          {renderStepIndicator()}
          
          {currentStep === 1 && renderDateSelection()}
          {currentStep === 2 && renderTimeSelection()}
          {currentStep === 3 && renderPatientForm()}
          {currentStep === 4 && renderConfirmation()}
          {currentStep === 5 && renderComplete()}
          
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                onClick={handlePrevStep}
                variant="secondary"
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNextStep}
                variant="primary"
                disabled={
                  (currentStep === 1 && !selectedDate) ||
                  (currentStep === 2 && !selectedTime)
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BookAppointment
