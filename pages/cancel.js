import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { appointments } from '../data/mockData'

const Cancel = () => {
  const router = useRouter()
  const { appointmentId } = router.query
  
  const [appointment, setAppointment] = useState(null)
  const [reason, setReason] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const cancellationReasons = [
    'Schedule conflict',
    'Feeling better',
    'Found another doctor',
    'Financial reasons',
    'Transportation issues',
    'Personal emergency',
    'Other'
  ]

  useEffect(() => {
    if (appointmentId) {
      const foundAppointment = appointments.find(apt => apt.id === parseInt(appointmentId))
      setAppointment(foundAppointment)
    }
  }, [appointmentId])

  const handleCancelAppointment = async () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowConfirmation(true)
    }, 2000)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!appointment) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h1>
            <p className="text-gray-600 mb-6">The appointment you're trying to cancel doesn't exist.</p>
            <Link href="/appointments">
              <Button variant="primary">Back to Appointments</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  if (showConfirmation) {
    return (
      <Layout>
        <Head>
          <title>Appointment Cancelled - MedBook</title>
        </Head>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Cancelled</h1>
              <p className="text-gray-600 mb-6">
                Your appointment with {appointment.doctorName} on {formatDate(appointment.date)} at {appointment.time} has been successfully cancelled.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-medium text-gray-900 mb-2">Cancellation Details</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Appointment ID:</span> #{appointment.id}</p>
                  <p><span className="font-medium">Cancelled on:</span> {new Date().toLocaleDateString()}</p>
                  {reason && <p><span className="font-medium">Reason:</span> {reason}</p>}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  You will receive a cancellation confirmation email shortly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/appointments">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      View My Appointments
                    </Button>
                  </Link>
                  <Link href="/doctors">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Book New Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Cancel Appointment - MedBook</title>
        <meta name="description" content="Cancel your medical appointment" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/appointments" className="hover:text-primary-600">
              My Appointments
            </Link>
            <span>›</span>
            <span className="text-gray-900">Cancel Appointment</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cancel Appointment</h1>
          <p className="text-lg text-gray-600">
            We're sorry to see you cancel your appointment
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment to Cancel</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">Photo</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
              <p className="text-sm text-gray-500">{appointment.location}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-900">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="text-gray-900">{appointment.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Patient:</span>
              <span className="text-gray-900">{appointment.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="text-gray-900">{appointment.appointmentType}</span>
            </div>
          </div>
        </div>

        {/* Cancellation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancellation Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for cancellation <span className="text-red-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a reason</option>
                {cancellationReasons.map(reasonOption => (
                  <option key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional feedback (optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Please let us know how we can improve our service..."
              />
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-red-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Cancellation Policy</h3>
          <div className="space-y-2 text-sm text-red-800">
            <p>• Cancellations made 24+ hours in advance: No fee</p>
            <p>• Cancellations made within 24 hours: $25 cancellation fee may apply</p>
            <p>• No-shows: Full consultation fee may be charged</p>
            <p>• Emergency cancellations will be reviewed on a case-by-case basis</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/appointments">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Keep Appointment
            </Button>
          </Link>
          
          <Button
            onClick={handleCancelAppointment}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500"
            disabled={!reason || isLoading}
          >
            {isLoading ? 'Cancelling...' : 'Confirm Cancellation'}
          </Button>
        </div>

        {/* Alternative Options */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Instead of cancelling, would you like to reschedule your appointment?
          </p>
          <Link href={`/reschedule?appointmentId=${appointment.id}`}>
            <Button variant="secondary">
              Reschedule Instead
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Cancel
