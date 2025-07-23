const TimeSlots = ({ 
  availableSlots = [], 
  selectedTime, 
  onTimeSelect, 
  unavailableMessage = "No available time slots for this date." 
}) => {
  if (availableSlots.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="text-gray-500 mb-2">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to book</h3>
        <p className="text-gray-600">{unavailableMessage}</p>
        <p className="text-sm text-gray-500 mt-2">Please try selecting a different date.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {availableSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`
              p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200
              ${selectedTime === time
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Select your preferred time slot to continue.
      </div>
    </div>
  )
}

export default TimeSlots
