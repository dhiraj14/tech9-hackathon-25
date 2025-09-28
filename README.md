# 🚀 Talent Matching Platform

A modern, AI-powered talent matching platform built with React, TypeScript, and Tailwind CSS. This application helps recruiters find the perfect candidates by using intelligent resume matching with job descriptions.

![Talent Matching Platform](https://img.shields.io/badge/Status-Active-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-blue)

## ✨ Features

- 🤖 **AI-Powered Matching**: Intelligent resume-to-job description matching using vector embeddings
- 📄 **Resume Management**: Upload, view, and download resumes with support for multiple file formats
- 🎯 **Smart Scoring**: Advanced relevance scoring with visual indicators
- 🔍 **Instant Search**: Real-time job description matching with sample queries
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🎨 **Premium Animations**: Smooth transitions and hover effects
- 🔐 **Authentication**: Secure login system with development mode
- 📊 **Analytics Dashboard**: Comprehensive talent pipeline management

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS animations
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (version 8 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:dhiraj14/tech9-hackathon-25.git
cd tech9-hackathon-25
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=https://hackethon-0bcf0c236f6f.herokuapp.com
VITE_API_TIMEOUT=30000

# Authentication Configuration
VITE_DEV_TOKEN=dev-token-12345

# Application Configuration
VITE_APP_NAME=Talent Matching Platform
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_DEV_LOGIN=true

# File Upload Configuration
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=.txt,.pdf,.doc,.docx

# UI Configuration
VITE_ITEMS_PER_PAGE=20
VITE_ANIMATION_DURATION=300
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## � Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header with navigation
│   ├── LoginPage.tsx   # Authentication interface
│   ├── JobMatcher.tsx  # AI-powered job matching
│   ├── ResumeUpload.tsx # File upload functionality
│   ├── ResumeList.tsx  # Resume listing and management
│   ├── ResumeModal.tsx # Resume preview modal
│   └── Tabs.tsx        # Tab navigation component
├── config/             # Configuration management
│   └── index.ts        # Environment variable handling
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication management
├── pages/              # Main application pages
│   └── Dashboard.tsx   # Main dashboard interface
├── services/           # API integration
│   └── api.ts          # HTTP client and API calls
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and animations
```

## 🎯 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run dev:debug` - Start with debug mode enabled
- `npm run dev:prod` - Start with production-like settings

### Building
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

All environment variables must be prefixed with `VITE_` for Vite to include them in the build.

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://hackethon-0bcf0c236f6f.herokuapp.com` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `30000` |
| `VITE_DEV_TOKEN` | Development authentication token | `dev-token-12345` |
| `VITE_APP_NAME` | Application name | `Talent Matching Platform` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_ENABLE_DEBUG_MODE` | Enable debug logging | `true` |
| `VITE_ENABLE_DEV_LOGIN` | Enable development login | `true` |
| `VITE_MAX_FILE_SIZE` | Maximum upload file size (bytes) | `10485760` |
| `VITE_ALLOWED_FILE_TYPES` | Comma-separated allowed extensions | `.txt,.pdf,.doc,.docx` |

### API Endpoints

The application connects to a Rails backend API with the following endpoints:

- `GET /auth/dev_login` - Development authentication
- `GET /resumes` - Fetch all resumes
- `POST /upload-resume` - Upload new resume
- `POST /match-jd` - Match job description with resumes
- `GET /rails/active_storage/blobs/redirect/*` - Download resume files

## 📖 How to Use

### 1. Authentication
- Click "Sign in (Dev Mode)" on the login page
- The app will authenticate you automatically with development credentials

### 2. Upload Resumes
- Navigate to the "📄 Upload Resume" tab
- Enter a descriptive title for the resume
- Select a resume file (supports .txt, .pdf, .doc, .docx)
- File size limit: 10MB
- Click "🚀 Upload Resume"

### 3. Find Matches
- Go to the "🔍 Find Matches" tab
- Enter a detailed job description
- Use sample job descriptions for quick testing
- Click "🚀 Find Matching Resumes"
- View AI-ranked results with relevance scores

### 4. Browse Results
- Switch to "👥 Browse Resumes" tab to see all results
- Only quality matches (negative scores) are shown
- Click "👁️ View" to preview resumes in a modal
- Click "📥 Download" to save resume files
- Color-coded relevance scores: Green (70%+), Yellow (40-70%), Red (<40%)

## 🎨 UI Features

### Design System
- **Modern Glass-morphism**: Translucent backgrounds with backdrop blur
- **Gradient Colors**: Blue to Purple color scheme with accent colors
- **Smooth Animations**: Hover effects, floating elements, and transitions
- **Responsive Layout**: Mobile-first design that works on all devices

### Interactive Elements
- **Hover Effects**: Scale and shadow animations on buttons and cards
- **Loading States**: Beautiful loading spinners and progress indicators
- **Score Badges**: Color-coded relevance scores with visual feedback
- **Modal Previews**: Full-screen resume viewing with smooth transitions

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with user info
│   ├── LoginPage.tsx   # Authentication page
│   ├── ResumeUpload.tsx # Resume upload form
│   ├── JobMatcher.tsx  # Job matching interface
│   ├── ResumeList.tsx  # Resume list/grid display
│   ├── ResumeModal.tsx # Resume preview modal
│   └── Tabs.tsx        # Tab navigation component
├── pages/              # Main application pages
│   └── Dashboard.tsx   # Main dashboard page
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication hook
├── services/           # API integration
│   └── api.ts          # API client configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
└── main.tsx           # Application entry point
```

## 🎯 Key Components

- **Dashboard**: Main application interface with tabbed navigation
- **ResumeUpload**: Drag-and-drop file upload with validation
- **JobMatcher**: AI-powered job description input and matching
- **ResumeModal**: Full-screen resume preview with download
- **ResumeList**: Responsive grid of resumes with filtering

## � How AI Matching Works

### Scoring System
- **Negative scores** (closer to 0) = Better matches
- **Positive scores** = Poor matches (automatically filtered out)
- **Percentage conversion**: `(1 + score) * 100` for negative scores only
- **Example**: Score of -0.1535 becomes 84.65% match

### Vector Embeddings
1. Backend converts resume text and job descriptions to vector embeddings
2. Calculates cosine similarity between vectors
3. Returns ranked results with similarity scores
4. Frontend filters and displays only quality matches

## 🚀 Deployment

### Production Build
```bash
npm run build:prod
```

### Environment Variables for Production
```env
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_DEV_LOGIN=false
VITE_API_BASE_URL=https://your-production-api.com
```

### Deployment Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder or connect Git
- **AWS S3/CloudFront**: Upload build files to S3 bucket
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## 🛡️ Security

- Environment variables for sensitive configuration
- API authentication with bearer tokens
- File type validation for uploads
- File size limits to prevent abuse
- CORS protection on backend API

## 🆘 Troubleshooting

### Common Issues

**Development server won't start**
- Ensure Node.js version 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check if ports 5173-5177 are available

**API connection issues**
- Verify `VITE_API_BASE_URL` in `.env` file
- Check if backend API is running
- Enable debug mode to see detailed API logs

**File upload failures**
- Check file size limits in configuration
- Verify file type is in allowed extensions
- Ensure backend storage is properly configured

**Build failures**
- Run `npm run type-check` to identify TypeScript errors
- Ensure all environment variables are properly set
- Clear Vite cache: `rm -rf node_modules/.vite`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Developer**: [Dhiraj](https://github.com/dhiraj14)
- **Repository**: [tech9-hackathon-25](https://github.com/dhiraj14/tech9-hackathon-25)

## 📞 Support

For support and questions:
- Create an issue on [GitHub](https://github.com/dhiraj14/tech9-hackathon-25/issues)
- Check existing issues for solutions
- Review the troubleshooting guide above

## 📝 License

This project is licensed under the MIT License. Created for the Tech9 Hackathon 2025.

---

Made with ❤️ for intelligent talent matching
