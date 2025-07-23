import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { chatMessages } from '../data/mockData'

const Chat = () => {
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Johnson')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isDoctor: false
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate doctor response after 2 seconds
    setTimeout(() => {
      const doctorResponse = {
        id: messages.length + 2,
        sender: selectedDoctor,
        message: 'Thank you for your message. I\'ll review this and get back to you shortly.',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        isDoctor: true
      }
      setMessages(prev => [...prev, doctorResponse])
    }, 2000)
  }

  return (
    <Layout>
      <Head>
        <title>Patient Chat - MedBook</title>
        <meta name="description" content="Chat with your healthcare providers" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">Dr</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{selectedDoctor}</h1>
              <p className="text-sm text-gray-600">Cardiologist</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-md flex flex-col h-96">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isDoctor ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`
                      max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                      ${message.isDoctor
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-primary-600 text-white'
                      }
                    `}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`
                        text-xs mt-1
                        ${message.isDoctor ? 'text-gray-500' : 'text-primary-100'}
                      `}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button type="submit" variant="primary">
                Send
              </Button>
            </form>
          </div>
        </div>

        {/* Chat Guidelines */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Chat Guidelines</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• This chat is for non-emergency medical questions and appointment-related inquiries</p>
            <p>• For medical emergencies, please call 911 immediately</p>
            <p>• Response times may vary depending on doctor availability</p>
            <p>• Please be respectful and provide clear, concise information</p>
            <p>• Do not share sensitive personal information beyond medical history</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Schedule Follow-up</h4>
            <p className="text-sm text-gray-600 mb-3">Book your next appointment</p>
            <Button variant="outline" size="sm" className="w-full">
              Schedule
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Medical Records</h4>
            <p className="text-sm text-gray-600 mb-3">View your health records</p>
            <Button variant="outline" size="sm" className="w-full">
              View Records
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Report Issue</h4>
            <p className="text-sm text-gray-600 mb-3">Report a technical problem</p>
            <Button variant="outline" size="sm" className="w-full">
              Report
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Chat
