import { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface Question {
  id: string;
  text: string;
  type: string;
  options: Option[];
  dimension: string;
  required: boolean;
  category: string;
  image?: string;
  timeLimit?: number;
  correctAnswer?: string;
  points?: number;
}

export interface Option {
  id: string;
  text: string;
  weights?: Record<string, number>;
}

export interface AssessmentTemplate {
  id?: string;
  testType: string;
  version?: string;
  title: string;
  description: string;
  category: string;
  estimatedTimeMinutes: number;
  totalQuestions: number;
  isActive: boolean;
  instructions: string[];
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

const adminService = {
  async getAllAssessments(): Promise<AssessmentTemplate[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/admin/assessments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assessments');
    }

    const data: ApiResponse<AssessmentTemplate[]> = await response.json();
    return data.data || [];
  },

  async getAssessmentById(id: string): Promise<AssessmentTemplate> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const response = await fetch(`${API_BASE_URL}/admin/assessments/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assessment');
    }

    const data: ApiResponse<AssessmentTemplate> = await response.json();
    return data.data;
  },

  async createAssessment(template: AssessmentTemplate): Promise<AssessmentTemplate> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/assessments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error('Failed to create assessment');
    }

    const data: ApiResponse<AssessmentTemplate> = await response.json();
    return data.data;
  },

  async updateAssessment(id: string, template: AssessmentTemplate): Promise<AssessmentTemplate> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/assessments/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error('Failed to update assessment');
    }

    const data: ApiResponse<AssessmentTemplate> = await response.json();
    return data.data;
  },

  async deleteAssessment(id: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/assessments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete assessment');
    }
  },
};

export default adminService;
