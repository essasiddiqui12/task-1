import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Button from '../components/Button'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call with mock authentication
    setTimeout(() => {
      setIsLoading(false)

      // Mock authentication - simulate failed login for demo
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        alert('Login successful!')
        // In a real app, you would redirect to dashboard
        window.location.href = '/doctors'
      } else {
        setErrors({
          email: 'Unable to sign in. Please check your credentials.',
          password: 'Unable to sign in. Please check your credentials.'
        })
      }
    }, 1000)
  }

  return (
    <Layout>
      <Head>
        <title>Login - MedBook</title>
        <meta name="description" content="Login to your MedBook account" />
      </Head>
      
      <div className="container-center">
        <div className="form-container">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <p className="text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-blue-700">Email: demo@example.com</p>
              <p className="text-blue-700">Password: password</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
