import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import Button from '../components/Button'

const Home = () => {
  const features = [
    {
      title: 'Easy Booking',
      description: 'Book appointments with your preferred doctors in just a few clicks.',
      icon: '📅'
    },
    {
      title: 'Expert Doctors',
      description: 'Access to qualified healthcare professionals across various specialties.',
      icon: '👨‍⚕️'
    },
    {
      title: 'Secure Platform',
      description: 'Your health information is protected with industry-standard security.',
      icon: '🔒'
    }
  ]

  return (
    <Layout>
      <Head>
        <title>MedBook - Online Medical Appointment Booking</title>
        <meta name="description" content="Book medical appointments online with qualified doctors" />
      </Head>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health, <br />
              <span className="text-primary-200">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Book appointments with qualified doctors online. Fast, secure, and convenient healthcare at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/doctors">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Find Doctors
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make healthcare accessible and convenient for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients who trust MedBook for their healthcare needs
          </p>
          <Link href="/doctors">
            <Button variant="primary" size="lg">
              Find Your Doctor
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
