import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import Button from '../components/Button'
import DatePicker from '../components/DatePicker'
import TimeSlots from '../components/TimeSlots'
import { appointments, timeSlots } from '../data/mockData'

const Reschedule = () => {
  const router = useRouter()
  const { appointmentId } = router.query
  
  const [appointment, setAppointment] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (appointmentId) {
      const foundAppointment = appointments.find(apt => apt.id === parseInt(appointmentId))
      setAppointment(foundAppointment)
    }
  }, [appointmentId])

  const getAvailableTimeSlots = (date) => {
    if (!date) return []
    
    // Mock logic: some dates have no availability
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return [] // No weekend slots
    
    // Simulate some slots being taken
    const availableSlots = timeSlots.filter((_, index) => {
      return index % 3 !== 0 // Every 3rd slot is taken
    })
    
    return availableSlots
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleConfirmReschedule = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Appointment rescheduled successfully!')
      router.push('/appointments')
    }, 2000)
  }

  if (!appointment) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h1>
            <p className="text-gray-600 mb-6">The appointment you're trying to reschedule doesn't exist.</p>
            <Link href="/appointments">
              <Button variant="primary">Back to Appointments</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Reschedule Appointment - MedBook</title>
        <meta name="description" content="Reschedule your medical appointment" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/appointments" className="hover:text-primary-600">
              My Appointments
            </Link>
            <span>›</span>
            <span className="text-gray-900">Reschedule</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reschedule Appointment</h1>
          <p className="text-lg text-gray-600">
            Select a new date and time for your appointment
          </p>
        </div>

        {/* Current Appointment Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Appointment</h2>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">Photo</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
              <p className="text-sm text-gray-500">
                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {[1, 2].map((step) => (
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
                {step < 2 && (
                  <div
                    className={`
                      w-16 h-1 mx-2
                      ${currentStep > step ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Step {currentStep}: {currentStep === 1 ? 'Select New Date' : 'Select New Time'}
            </h2>
          </div>
        </div>

        {/* Step Content */}
        <div className="step-container">
          {currentStep === 1 && (
            <div>
              <DatePicker
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              {selectedDate && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">Dr</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
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
                availableSlots={getAvailableTimeSlots(selectedDate)}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div className="flex space-x-3">
              <Link href="/appointments">
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>
              
              {currentStep > 1 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="secondary"
                >
                  Previous
                </Button>
              )}
            </div>
            
            <div>
              {currentStep < 2 ? (
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="primary"
                  disabled={!selectedDate}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleConfirmReschedule}
                  variant="primary"
                  disabled={!selectedTime || isLoading}
                >
                  {isLoading ? 'Rescheduling...' : 'Confirm Reschedule'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reschedule Policy */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">Reschedule Policy</h3>
          <div className="space-y-2 text-sm text-yellow-800">
            <p>• Appointments can be rescheduled up to 24 hours before the scheduled time</p>
            <p>• Rescheduling within 24 hours may incur a fee</p>
            <p>• You can reschedule up to 3 times without penalty</p>
            <p>• Emergency rescheduling may be accommodated on a case-by-case basis</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Reschedule
