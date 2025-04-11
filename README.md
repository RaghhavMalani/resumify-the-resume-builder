# Resumify - AI-Enhanced Resume Builder

## Overview

Resumify is a comprehensive, full-stack resume building application designed to streamline the job application process. Built with modern web technologies, it offers an intuitive interface for creating, editing, and managing professional resumes with multiple template options.

**Live Demo:** https://resumify-the-resume-builder-1vtatf6ld-flash2404s-projects.vercel.app

## Key Features

- **Multiple Professional Templates**: Choose from a variety of professionally designed templates including Professional, Minimal, Creative, and Executive styles
- **Real-time Preview**: See changes instantly as you build your resume
- **AI-powered Content Enhancement**: Optimize your resume text with AI-driven suggestions for improved readability and impact
- **Section Management**: Easily add, edit, or remove education, work experience, skills, and other sections
- **PDF Export**: Download a print-ready PDF version of your resume with one click
- **Responsive Design**: Create and preview resumes on any device with a fully responsive UI
- **User Authentication**: Secure login system to save and manage multiple resumes
- **Cross-browser Compatibility**: Works seamlessly across modern browsers

## Technical Architecture

### Frontend
- **Framework**: React 18.3+ with TypeScript for type-safe development
- **UI Library**: Tailwind CSS for utility-first styling with shadcn/ui components
- **State Management**: 
  - Context API for global state (ResumeContext, AuthContext)
  - React Query for server state management
- **Routing**: React Router v6 for navigation
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: Custom PDF export using jsPDF and html2canvas
- **Component Structure**: Modular component architecture with separation of concerns

### Backend
- **Server**: Express.js running on Node.js
- **API Architecture**: RESTful API design with proper error handling
- **Database**: MongoDB for document storage
- **Authentication**: JWT (JSON Web Tokens) for secure authentication
- **Middleware**: Custom middleware for auth protection and request validation
- **Error Handling**: Centralized error handling with appropriate status codes

### Development Tooling
- **Build System**: Vite for fast development and optimized production builds
- **Package Management**: npm/bun for dependency management
- **Linting**: ESLint with TypeScript rules
- **Styling**: Tailwind CSS with PostCSS processing
- **Deployment**: Vercel for continuous deployment

## Project Structure

```
resumify/
├── src/
│   ├── backend/               # Backend API implementation
│   │   ├── config/            # Server configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── db/                # Database connection
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   └── utils/             # Utility functions
│   ├── components/            # React components
│   │   ├── templates/         # Resume template designs
│   │   └── ui/                # UI components from shadcn
│   ├── context/               # React context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   ├── pages/                 # Page components
│   ├── services/              # API service layer
│   └── utils/                 # Utility functions
└── public/                    # Static assets
```

## Data Flow

1. User inputs or edits resume content through the user interface
2. The ResumeContext manages the state of the resume data
3. Changes are reflected instantly in the real-time preview
4. On save, data is sent via API to the Express backend
5. The backend validates the data and stores it in MongoDB
6. When the user wants to view their resumes, data is fetched through React Query
7. For PDF generation, the resume template is rendered and converted to PDF format

## Future Enhancements

- **Template Marketplace**: Allow users to purchase premium templates
- **AI Resume Analyzer**: Provide automated feedback on resume content and formatting
- **Resume Sharing**: Generate shareable links for resume viewing
- **ATS Optimization**: Add deeper analysis of resume content for ATS compatibility
- **Multiple Language Support**: Expand to support international resume formats and languages
- **Integration with Job Boards**: Allow direct submission to popular job sites

## Getting Started

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Deployment

The application is deployed on Vercel and can be accessed at: 
[https://resumify-the-resume-builder-1vtatf6ld-flash2404s-projects.vercel.app](https://resumify-the-resume-builder-1vtatf6ld-flash2404s-projects.vercel.app)

## Technologies Used

- **Vite**: Build tooling
- **TypeScript**: Enhanced type safety
- **React**: UI framework
- **Express.js**: Backend API
- **MongoDB**: Database
- **shadcn-ui**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **JWT**: Authentication
- **jsPDF & html2canvas**: PDF generation
