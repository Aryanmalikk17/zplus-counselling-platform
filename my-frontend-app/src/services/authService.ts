import apiClient from './apiClient';
import { ApiResponse } from '../types';
import { BackendUser } from '../types/assessmentTypes';

/**
 * authService.ts — Migrated to centralized apiClient.
 *
 * Uses Firebase to obtain fresh ID tokens, then calls the backend.
 * IMPORTANT: Route mapping verified against AuthController.java:
 *   GET  /auth/me           → syncUser()
 *   PUT  /users/profile     → updateProfile()  (NOTE: UserController, NOT AuthController)
 *   POST /auth/logout       → logout()
 */

import { auth } from '../config/firebase';

/**
 * Gets a fresh Firebase ID token for the current user.
 * Throws if the user is not logged in.
 */
async function getFirebaseToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user found. Please log in.');
  }
  // Force refresh=false — Firebase handles caching and auto-refresh of the token.
  return user.getIdToken(false);
}

const authService = {
  /**
   * Sync user with backend and return the full profile.
   * If a Firebase user exists, it uses the Firebase token.
   * Otherwise, it relies on the accessToken in localStorage.
   * Maps to: GET /auth/me
   */
  async syncUser(): Promise<BackendUser> {
    // We don't call getFirebaseToken() here because the apiClient's 
    // getAuthHeader() already handles the priority: Firebase Token > localStorage accessToken.
    const data = await apiClient.get<BackendUser>('/auth/me');
    return data;
  },

  /**
   * Update user profile fields.
   * Maps to: PUT /users/profile (UserController.java)
   */
  async updateProfile(userData: Partial<BackendUser>): Promise<BackendUser> {
    const data = await apiClient.put<ApiResponse<BackendUser>>('/users/profile', userData);
    return (data as unknown as ApiResponse<BackendUser>).data ?? (data as unknown as BackendUser);
  },

  /**
   * Sign in using backend credentials (PostgreSQL).
   * Maps to: POST /auth/login
   */
  async backendLogin(email: string, password: string): Promise<AuthResponse & { user: BackendUser }> {
    const data = await apiClient.post<AuthResponse & { user: BackendUser }>('/auth/login', { email, password });
    
    // Store tokens locally for apiClient to use
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    
    return data;
  },

  /**
   * Sign out from Firebase and clear local storage.
   */
  async logout(): Promise<void> {
    try {
      if (auth.currentUser) {
        await auth.signOut();
      }
    } catch (e) {
      console.warn("Firebase logout failed (may already be logged out):", e);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

// Add AuthResponse interface for the local scope if not imported
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export default authService;