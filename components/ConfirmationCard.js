import Button from './Button'

const ConfirmationCard = ({ 
  doctor, 
  appointmentDate, 
  appointmentTime, 
  patientInfo, 
  onConfirm, 
  onEdit,
  isLoading = false 
}) => {
  const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Confirm Your Appointment</h3>
      
      {/* Doctor Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Doctor Details</h4>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm">Photo</span>
          </div>
          <div>
            <h5 className="font-medium text-gray-900">{doctor?.name}</h5>
            <p className="text-sm text-gray-600">{doctor?.specialty}</p>
            <p className="text-sm text-gray-500">{doctor?.location}</p>
          </div>
        </div>
      </div>
      
      {/* Appointment Details */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Appointment Details</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{formatDate(appointmentDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{appointmentTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">30 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-medium">${doctor?.consultationFee}</span>
          </div>
        </div>
      </div>
      
      {/* Patient Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{patientInfo?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium">{patientInfo?.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{patientInfo?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{patientInfo?.email}</span>
          </div>
        </div>
        
        {patientInfo?.symptoms && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-gray-600 text-sm">Reason for visit:</span>
            <p className="text-sm text-gray-900 mt-1">{patientInfo.symptoms}</p>
          </div>
        )}
        
        {patientInfo?.allergies && (
          <div className="mt-2">
            <span className="text-gray-600 text-sm">Allergies:</span>
            <p className="text-sm text-gray-900">{patientInfo.allergies}</p>
          </div>
        )}
        
        {patientInfo?.currentMedications && (
          <div className="mt-2">
            <span className="text-gray-600 text-sm">Current Medications:</span>
            <p className="text-sm text-gray-900">{patientInfo.currentMedications}</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onEdit}
          variant="secondary"
          size="lg"
          className="flex-1"
          disabled={isLoading}
        >
          Edit Details
        </Button>
        
        <Button
          onClick={onConfirm}
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Confirming...' : 'Confirm Appointment'}
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        By confirming, you agree to our terms and conditions. You will receive a confirmation email shortly.
      </div>
    </div>
  )
}

export default ConfirmationCard
