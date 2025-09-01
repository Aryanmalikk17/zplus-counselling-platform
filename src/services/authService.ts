import { User, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock auth service for development (replace with real API calls later)
const mockAuthService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const user: User = {
      id: '1',
      email,
      fullName: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    
    // Store mock user data
    localStorage.setItem('mock-user', JSON.stringify(user));
    
    return { user, token };
  },

  async register(email: string, password: string, fullName: string): Promise<{ user: User; token: string }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      email,
      fullName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    
    // Store mock user data
    localStorage.setItem('mock-user', JSON.stringify(user));
    
    return { user, token };
  },

  async getCurrentUser(): Promise<User> {
    const userData = localStorage.getItem('mock-user');
    if (!userData) {
      throw new Error('No user found');
    }
    return JSON.parse(userData);
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const currentUser = await this.getCurrentUser();
    const updatedUser = { 
      ...currentUser, 
      ...userData, 
      updatedAt: new Date() 
    };
    
    localStorage.setItem('mock-user', JSON.stringify(updatedUser));
    return updatedUser;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  async forgotPassword(email: string): Promise<void> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};

// Use mock service for development, real service for production
export const authService = mockAuthService;

export default mockAuthService;