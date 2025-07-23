import { useState } from 'react'
import Input from './Input'
import Button from './Button'

const PatientForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    age: initialData.age || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    symptoms: initialData.symptoms || '',
    medicalHistory: initialData.medicalHistory || '',
    allergies: initialData.allergies || '',
    currentMedications: initialData.currentMedications || ''
  })
  
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Patient name is required'
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required'
    } else if (isNaN(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Please describe your symptoms or reason for visit'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Information</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
            placeholder="Enter patient's full name"
          />
          
          <Input
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            error={errors.age}
            required
            placeholder="Enter age"
            min="1"
            max="120"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
            placeholder="(555) 123-4567"
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="patient@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms / Reason for Visit <span className="text-red-500">*</span>
          </label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleInputChange}
            rows={3}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              ${errors.symptoms ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            `}
            placeholder="Please describe your symptoms or reason for this appointment..."
          />
          {errors.symptoms && (
            <p className="mt-1 text-sm text-red-600">{errors.symptoms}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical History (Optional)
          </label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any relevant medical history..."
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies (Optional)
            </label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Any known allergies..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Medications (Optional)
            </label>
            <input
              type="text"
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Current medications..."
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" className="w-full">
            Continue to Confirmation
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PatientForm
