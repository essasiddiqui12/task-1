import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { appointments } from '../../data/mockData'

const AppointmentDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundAppointment = appointments.find(apt => apt.id === parseInt(id))
      setAppointment(foundAppointment)
      setLoading(false)
    }
  }, [id])

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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

  const isUpcoming = (dateString) => {
    const appointmentDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return appointmentDate >= today
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!appointment) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Not Found</h1>
            <p className="text-gray-600 mb-6">The appointment you're looking for doesn't exist.</p>
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
        <title>Appointment Details - MedBook</title>
        <meta name="description" content="View your appointment details" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/appointments" className="hover:text-primary-600">
              My Appointments
            </Link>
            <span>›</span>
            <span className="text-gray-900">Appointment Details</span>
          </div>
        </nav>

        {/* Appointment Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Details</h1>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">ID: #{appointment.id}</span>
              </div>
            </div>
            
            {isUpcoming(appointment.date) && appointment.status === 'confirmed' && (
              <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                <Link href={`/reschedule?appointmentId=${appointment.id}`}>
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                    Reschedule
                  </Button>
                </Link>
                <Link href={`/cancel?appointmentId=${appointment.id}`}>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50">
                    Cancel
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Doctor Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor Information</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Photo</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{appointment.doctorName}</h4>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900">{appointment.location}</span>
                </div>
              </div>
            </div>

            {/* Appointment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="text-gray-900">{appointment.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-gray-900">30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="text-gray-900">{appointment.appointmentType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Patient Name:</span>
                <span className="text-gray-900">{appointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="text-gray-900">{appointment.patientAge} years</span>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <span className="text-gray-600 text-sm">Reason for Visit:</span>
                <p className="text-gray-900 text-sm mt-1">{appointment.symptoms}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Appointment Instructions</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Please arrive 15 minutes before your scheduled appointment time</p>
            <p>• Bring a valid ID and insurance card</p>
            <p>• Bring a list of current medications</p>
            <p>• If you need to cancel or reschedule, please do so at least 24 hours in advance</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact the Clinic</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Phone: (555) 123-4567</p>
                <p>Email: appointments@medbook.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Emergency</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>For medical emergencies, call 911</p>
                <p>For urgent care: (555) 999-8888</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/appointments">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Appointments
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="secondary" className="w-full sm:w-auto">
              Message Doctor
            </Button>
          </Link>
          <Button variant="outline" className="w-full sm:w-auto">
            Download Details
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default AppointmentDetails
