import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { doctors } from '../../data/mockData'

const DoctorProfile = () => {
  const router = useRouter()
  const { id } = router.query
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const foundDoctor = doctors.find(doc => doc.id === parseInt(id))
      setDoctor(foundDoctor)
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!doctor) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
            <p className="text-gray-600 mb-6">The doctor you're looking for doesn't exist.</p>
            <Link href="/doctors">
              <Button variant="primary">Browse All Doctors</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{doctor.name} - MedBook</title>
        <meta name="description" content={`Book an appointment with ${doctor.name}, ${doctor.specialty}`} />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/doctors" className="hover:text-primary-600">
              Doctors
            </Link>
            <span>›</span>
            <span className="text-gray-900">{doctor.name}</span>
          </div>
        </nav>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
            {/* Doctor Photo */}
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600">Photo</span>
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-lg text-primary-600 mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-4">{doctor.experience} of experience</p>
              
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 mr-2">★</span>
                <span className="text-gray-900 font-medium">{doctor.rating}</span>
                <span className="text-gray-500 ml-2">(Based on patient reviews)</span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{doctor.location}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/book?doctorId=${doctor.id}`}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Book Appointment
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Message Doctor
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* About */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 mb-4">{doctor.about}</p>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600">{doctor.education}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Consultation Fee</h3>
              <p className="text-2xl font-bold text-primary-600">${doctor.consultationFee}</p>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Available Days</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div
                    key={day}
                    className={`
                      p-2 text-sm text-center rounded
                      ${doctor.availability.includes(day)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Typical Hours</h3>
              <p className="text-gray-600">9:00 AM - 5:00 PM</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Next Available</h4>
              <p className="text-blue-800">Tomorrow at 10:00 AM</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Reviews</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-2">★★★★★</span>
                <span className="font-medium text-gray-900">Sarah M.</span>
                <span className="text-gray-500 ml-2">2 days ago</span>
              </div>
              <p className="text-gray-600">
                Excellent doctor! Very thorough examination and clear explanation of the treatment plan.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-2">★★★★★</span>
                <span className="font-medium text-gray-900">John D.</span>
                <span className="text-gray-500 ml-2">1 week ago</span>
              </div>
              <p className="text-gray-600">
                Professional and caring. The appointment was on time and the staff was very helpful.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-2">★★★★☆</span>
                <span className="font-medium text-gray-900">Maria L.</span>
                <span className="text-gray-500 ml-2">2 weeks ago</span>
              </div>
              <p className="text-gray-600">
                Good experience overall. The doctor was knowledgeable and answered all my questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DoctorProfile
