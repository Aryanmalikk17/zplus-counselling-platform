import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const publicAssessmentApi = axios.create({
  baseURL: `${API_BASE_URL}/public/assessments`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicAssessmentService = {
  getAll: () => publicAssessmentApi.get(''),
};

export default publicAssessmentService;
