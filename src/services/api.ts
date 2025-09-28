import axios from 'axios';
import config from '../config';
import type { 
  Resume, 
  JobMatchResponse, 
  AuthResponse, 
  UploadResumeRequest, 
  UploadResumeResponse 
} from '../types';

// Create axios instance with environment configuration
const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
});

// Add token to requests if available
api.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  
  // Only log in debug mode
  if (config.ENABLE_DEBUG_MODE) {
    console.log(`🌐 API Request: ${requestConfig.method?.toUpperCase()} ${config.API_BASE_URL}${requestConfig.url}`, requestConfig.data);
  }
  
  return requestConfig;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    if (config.ENABLE_DEBUG_MODE) {
      console.log(`✅ API Response: ${response.status}`, response.data);
    }
    return response;
  },
  (error) => {
    if (config.ENABLE_DEBUG_MODE) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
      });
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  devLogin: async (): Promise<AuthResponse> => {
    const response = await api.get('/auth/dev_login');
    return response.data;
  }
};

// Resume endpoints
export const resumeAPI = {
  getAllResumes: async (): Promise<{ resumes: Resume[] }> => {
    const response = await api.get('/resumes');
    return response.data;
  },

  uploadResume: async (data: UploadResumeRequest): Promise<UploadResumeResponse> => {
    const formData = new FormData();
    formData.append('resume[title]', data.title);
    formData.append('resume[file]', data.file);

    const response = await api.post('/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  matchJobDescription: async (jobDescription: string): Promise<JobMatchResponse> => {
    const response = await api.post('/match-jd', {
      job_description: jobDescription,
    });
    return response.data;
  },

  downloadResume: async (fileUrl: string): Promise<Blob> => {
    const response = await api.get(fileUrl, {
      responseType: 'blob',
    });
    return response.data;
  }
};

export default api;
