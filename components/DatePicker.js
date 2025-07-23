import { useState } from 'react'

const DatePicker = ({ selectedDate, onDateSelect, availableDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDate = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }
  
  const isDateAvailable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Date must be today or in the future
    if (date < today) return false
    
    // If availableDates is provided, check if date is in the list
    if (availableDates.length > 0) {
      const dateStr = date.toISOString().split('T')[0]
      return availableDates.includes(dateStr)
    }
    
    // Otherwise, make weekdays available (Monday to Friday)
    const dayOfWeek = date.getDay()
    return dayOfWeek >= 1 && dayOfWeek <= 5
  }
  
  const isSelectedDate = (date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }
  
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth.getMonth()
  }
  
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }
  
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  
  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {formatMonthYear(currentMonth)}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          →
        </button>
      </div>
      
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const available = isDateAvailable(date)
          const selected = isSelectedDate(date)
          const currentMonthDay = isCurrentMonth(date)
          
          return (
            <button
              key={index}
              onClick={() => available && onDateSelect(date)}
              disabled={!available}
              className={`
                p-2 text-sm rounded-md transition-colors duration-200
                ${!currentMonthDay ? 'text-gray-300' : ''}
                ${available 
                  ? 'hover:bg-primary-50 cursor-pointer' 
                  : 'text-gray-300 cursor-not-allowed'
                }
                ${selected 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : ''
                }
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Available dates are highlighted. Select a date to continue.
      </div>
    </div>
  )
}

export default DatePicker
