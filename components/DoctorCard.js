import Link from 'next/link'
import Button from './Button'

const DoctorCard = ({ doctor, showBookButton = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-sm">Photo</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {doctor.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
          <p className="text-sm text-gray-500 mb-2">{doctor.experience} experience</p>
          
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600">{doctor.rating}</span>
          </div>
          
          {doctor.location && (
            <p className="text-xs text-gray-500 mb-3">{doctor.location}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href={`/doctors/${doctor.id}`}>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                View Profile
              </Button>
            </Link>
            
            {showBookButton && (
              <Link href={`/book?doctorId=${doctor.id}`}>
                <Button variant="primary" size="sm" className="w-full sm:w-auto">
                  Book Appointment
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
