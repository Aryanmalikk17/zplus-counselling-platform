import axios from 'axios';
import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const adminAssessmentApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/assessments`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for injecting Firebase ID Token
adminAssessmentApi.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for consistent error handling
adminAssessmentApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('[AdminAssessmentApi] Error:', message);
    return Promise.reject(new Error(message));
  }
);

export const assessmentService = {
  getAll: () => adminAssessmentApi.get(''),
  getById: (id: string) => adminAssessmentApi.get(`/${id}`),
  create: (data: any) => adminAssessmentApi.post('', data),
  update: (id: string, data: any) => adminAssessmentApi.put(`/${id}`, data),
  delete: (id: string) => adminAssessmentApi.delete(`/${id}`),
};

export default assessmentService;
