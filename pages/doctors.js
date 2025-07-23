import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import DoctorCard from '../components/DoctorCard'
import Input from '../components/Input'
import { doctors } from '../data/mockData'

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))]

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty
    
    return matchesSearch && matchesSpecialty
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value)
  }

  return (
    <Layout>
      <Head>
        <title>Find Doctors - MedBook</title>
        <meta name="description" content="Find and book appointments with qualified doctors" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our network of qualified healthcare professionals and book your appointment today.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Search Doctors"
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {selectedSpecialty && ` in ${selectedSpecialty}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map(doctor => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                showBookButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available doctors.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find the right doctor?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our support team and we'll help you find the perfect healthcare provider for your needs.
          </p>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Doctors
