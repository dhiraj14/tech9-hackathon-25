# Environment Configuration

This application uses environment variables for configuration. All environment variables for Vite must be prefixed with `VITE_`.

## Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configuration.

## Available Environment Variables

### API Configuration
- `VITE_API_BASE_URL` - Base URL for the backend API (default: https://hackethon-0bcf0c236f6f.herokuapp.com)
- `VITE_API_TIMEOUT` - API request timeout in milliseconds (default: 30000)

### Authentication
- `VITE_DEV_TOKEN` - Development authentication token (default: dev-token-12345)

### Application Settings
- `VITE_APP_NAME` - Application name displayed in the UI (default: Talent Matching Platform)
- `VITE_APP_VERSION` - Application version (default: 1.0.0)

### Feature Flags
- `VITE_ENABLE_DEBUG_MODE` - Enable debug logging and dev tools (default: true)
- `VITE_ENABLE_DEV_LOGIN` - Enable development login mode (default: true)

### File Upload
- `VITE_MAX_FILE_SIZE` - Maximum file size in bytes (default: 10485760 = 10MB)
- `VITE_ALLOWED_FILE_TYPES` - Comma-separated list of allowed file extensions (default: .txt,.pdf,.doc,.docx)

### UI Configuration
- `VITE_ITEMS_PER_PAGE` - Number of items to display per page (default: 20)
- `VITE_ANIMATION_DURATION` - CSS animation duration in milliseconds (default: 300)

## Development Scripts

- `npm run dev` - Start development server with default settings
- `npm run dev:debug` - Start development server with debug mode enabled
- `npm run dev:prod` - Start development server with production-like settings
- `npm run build:prod` - Build for production with optimized settings

## Production Deployment

For production deployment, ensure you set appropriate environment variables:

```bash
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_DEV_LOGIN=false
VITE_API_BASE_URL=https://your-production-api.com
```

## Security Notes

- Never commit the `.env` file to version control
- Use `.env.example` as a template for required variables
- In production, use your platform's environment variable system (Heroku Config Vars, Vercel Environment Variables, etc.)
