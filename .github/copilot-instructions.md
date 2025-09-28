<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Talent Matching Platform

This is a React TypeScript application for intelligent resume matching using AI. The application connects to a Rails backend API for resume upload, vector search, and AI-powered job description matching.

## Project Structure
- **Components**: Reusable UI components in `/src/components/`
- **Pages**: Main application pages in `/src/pages/`
- **Services**: API integration in `/src/services/`
- **Types**: TypeScript definitions in `/src/types/`
- **Hooks**: Custom React hooks in `/src/hooks/`
- **Utils**: Utility functions in `/src/utils/`

## Key Features
- Google SSO authentication (dev mode available)
- Resume upload with file handling
- AI-powered job description matching
- Resume preview in modal
- File download functionality
- Modern responsive UI with Tailwind CSS

## Development Guidelines
- Use TypeScript for all new code
- Follow React functional component patterns
- Use custom hooks for stateful logic
- Implement proper error handling
- Ensure responsive design with Tailwind CSS
- Type all API responses and component props

## Backend API Integration
- Base URL: https://hackethon-0bcf0c236f6f.herokuapp.com
- Authentication: Bearer token from dev login
- File uploads: FormData with multipart/form-data
- Vector search: AI-powered resume matching by job description
