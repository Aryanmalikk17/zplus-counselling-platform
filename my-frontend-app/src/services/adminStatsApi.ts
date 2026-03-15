import axios from 'axios';
import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const adminStatsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/stats`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for injecting Firebase ID Token
adminStatsApi.interceptors.request.use(async (config) => {
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
adminStatsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('[AdminStatsApi] Error:', message);
    return Promise.reject(new Error(message));
  }
);

export const adminStatsService = {
  getStats: () => adminStatsApi.get(''),
};

export default adminStatsService;
