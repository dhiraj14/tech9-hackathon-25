// Environment configuration utility
interface Config {
  // API Configuration
  API_BASE_URL: string;
  API_TIMEOUT: number;
  
  // Authentication
  DEV_TOKEN: string;
  
  // Application
  APP_NAME: string;
  APP_VERSION: string;
  
  // Feature Flags
  ENABLE_DEBUG_MODE: boolean;
  ENABLE_DEV_LOGIN: boolean;
  
  // File Upload
  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: string[];
  
  // UI
  ITEMS_PER_PAGE: number;
  ANIMATION_DURATION: number;
}

// Helper function to get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// Helper function to get boolean environment variable
const getBooleanEnvVar = (key: string, fallback: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

// Helper function to get number environment variable
const getNumberEnvVar = (key: string, fallback: number = 0): number => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

// Configuration object
export const config: Config = {
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'https://hackethon-0bcf0c236f6f.herokuapp.com'),
  API_TIMEOUT: getNumberEnvVar('VITE_API_TIMEOUT', 30000),
  
  // Authentication
  DEV_TOKEN: getEnvVar('VITE_DEV_TOKEN', 'dev-token-12345'),
  
  // Application
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Talent Matching Platform'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  
  // Feature Flags
  ENABLE_DEBUG_MODE: getBooleanEnvVar('VITE_ENABLE_DEBUG_MODE', true),
  ENABLE_DEV_LOGIN: getBooleanEnvVar('VITE_ENABLE_DEV_LOGIN', true),
  
  // File Upload
  MAX_FILE_SIZE: getNumberEnvVar('VITE_MAX_FILE_SIZE', 10485760), // 10MB
  ALLOWED_FILE_TYPES: getEnvVar('VITE_ALLOWED_FILE_TYPES', '.txt,.pdf,.doc,.docx').split(','),
  
  // UI
  ITEMS_PER_PAGE: getNumberEnvVar('VITE_ITEMS_PER_PAGE', 20),
  ANIMATION_DURATION: getNumberEnvVar('VITE_ANIMATION_DURATION', 300),
};

// Development helper to log configuration (only in debug mode)
if (config.ENABLE_DEBUG_MODE && import.meta.env.MODE === 'development') {
  console.log('🔧 Application Configuration:', {
    ...config,
    DEV_TOKEN: config.DEV_TOKEN.substring(0, 8) + '...', // Hide full token
  });
}

export default config;
