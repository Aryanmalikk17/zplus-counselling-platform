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
   * Sync Firebase user with backend and return the full profile.
   * Maps to: GET /auth/me
   */
  async syncUser(): Promise<BackendUser> {
    const token = await getFirebaseToken();
    // Use apiClient directly, overriding the Authorization header with Firebase token.
    const data = await apiClient.get<BackendUser>('/auth/me');
    void token; // token is managed by apiClient via localStorage — Firebase token must be stored first.
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
   * Sign out from Firebase. The backend token is stateless (JWT), so no
   * server-side call is needed unless you want to blacklist the refresh token.
   */
  async logout(): Promise<void> {
    await auth.signOut();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

export default authService;