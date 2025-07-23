# MedBook - Medical Appointment Booking App

A clean, responsive Next.js application for booking medical appointments online.

## Features

### Sign In Page (/login)
- Email and password authentication form
- Form validation with error handling
- Responsive design with centered layout
- Loading states and user feedback
- Mock authentication for demo

### Doctor Listing (/doctors)
- Browse available doctors with search and filter
- Doctor cards showing specialty, experience, and ratings
- Direct booking and profile viewing options

### Doctor Profile (/doctors/[id])
- Detailed doctor information and credentials
- Availability schedule and consultation fees
- Patient reviews and ratings
- Direct appointment booking

### Appointment Booking Flow (/book)
- Step 1: Select appointment date with calendar UI
- Step 2: Choose available time slots
- Step 3: Enter patient details and medical information
- Step 4: Confirm booking with summary review
- Step 5: Booking confirmation with next steps

### Appointments Management (/appointments)
- View all appointments (upcoming, past, cancelled)
- Filter and search functionality
- Reschedule and cancel options
- Detailed appointment information

### Additional Features
- Patient chat system (/chat)
- Appointment rescheduling (/reschedule)
- Appointment cancellation (/cancel)
- Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Components**: Custom reusable React components
- **State Management**: React hooks (useState)

## Project Structure

```
├── components/
│   ├── Button.js          # Reusable button component
│   ├── Input.js           # Form input component with validation
│   ├── Layout.js          # Main layout wrapper
│   ├── Navigation.js      # Navigation bar component
│   ├── DoctorCard.js      # Doctor information card
│   ├── DatePicker.js      # Calendar date selection
│   ├── TimeSlots.js       # Time slot selection
│   ├── PatientForm.js     # Patient information form
│   └── ConfirmationCard.js # Booking confirmation
├── pages/
│   ├── _app.js           # Next.js app configuration
│   ├── index.js          # Home page
│   ├── login.js          # Sign in page
│   ├── doctors.js        # Doctor listing page
│   ├── doctors/[id].js   # Individual doctor profile
│   ├── book.js           # Multi-step appointment booking
│   ├── appointments.js   # Appointments management
│   ├── appointments/[id].js # Individual appointment details
│   ├── chat.js           # Patient chat interface
│   ├── reschedule.js     # Appointment rescheduling
│   └── cancel.js         # Appointment cancellation
├── data/
│   └── mockData.js       # Mock data for doctors and appointments
├── styles/
│   └── globals.css       # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Component Documentation

### Button Component
```jsx
<Button
  variant="primary|secondary|outline"
  size="sm|md|lg"
  disabled={boolean}
  onClick={handler}
>
  Button Text
</Button>
```

### Input Component
```jsx
<Input
  label="Field Label"
  type="text|email|password"
  value={value}
  onChange={handler}
  error={errorMessage}
  required={boolean}
  placeholder="Placeholder text"
/>
```

## Pages Overview

### Login Page Features
- Form validation (required fields, email format, password length)
- Real-time error clearing
- Loading states during submission
- Responsive mobile-first design

### Appointment Booking Features
- Doctor Selection: Grid layout with doctor cards showing specialty, experience, and ratings
- Time Selection: Grid of available time slots with visual selection states
- Confirmation: Summary view with booking details and confirmation feedback
- Navigation: Step-by-step progress with previous/next buttons
- Validation: Prevents progression without required selections

## Styling Approach

- Tailwind CSS for utility-first styling
- Custom CSS classes for reusable patterns
- Responsive design with mobile-first approach
- Consistent color scheme using CSS custom properties
- Accessible design with proper contrast and focus states

## Future Enhancements

- Backend API integration
- User authentication system
- Calendar integration
- Email notifications
- Payment processing
- Doctor availability management
- Patient dashboard

## Development Notes

- All components use functional React with hooks
- No external UI libraries (pure Tailwind implementation)
- Modular component architecture
- Clean separation of concerns
- Production-ready code structure
