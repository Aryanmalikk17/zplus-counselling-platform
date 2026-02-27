/**
 * apiClient.ts — Centralized API client with production-grade error handling.
 *
 * All API calls should go through this client so that auth errors (401),
 * permission errors (403), and server errors (500) are handled consistently.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    console.error(
        '[apiClient] VITE_API_URL is not set. ' +
        'Add it to your .env file for local dev, or set it in the Netlify dashboard for production.'
    );
}

export class ApiError extends Error {
    readonly status: number;
    readonly data: unknown;

    constructor(status: number, message: string, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

import { getAuth } from 'firebase/auth';
import { auth } from '../config/firebase'; // The initialized Firebase app

/**
 * Gets the stored access token from Firebase securely.
 * Note: Since this is async, we modify the fetch wrapping rather than a sync fn.
 */
async function getAuthHeader(): Promise<Record<string, string>> {
    const user = auth.currentUser;
    if (user) {
        try {
            const token = await user.getIdToken();
            return { Authorization: `Bearer ${token}` };
        } catch (error) {
            console.error("Failed to get Firebase token", error);
        }
    }
    // Fallback to local storage (e.g. for non-Firebase tokens if previously supported)
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Core fetch wrapper. Parses the response and throws a typed ApiError on failure.
 */
async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${path}`;

    const authHeaders = await getAuthHeader();
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...(options.headers as Record<string, string> | undefined),
        },
    });

    if (response.status === 401) {
        // Token expired or invalid — clear local storage and redirect to login.
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Use a custom event to decouple the redirect from this module.
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        throw new ApiError(401, 'Your session has expired. Please log in again.');
    }

    if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;
        try {
            const errorBody = await response.json() as { message?: string };
            if (errorBody?.message) {
                errorMessage = errorBody.message;
            }
        } catch {
            // Response body is not JSON — use the default message.
        }
        throw new ApiError(response.status, errorMessage);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

const apiClient = {
    get: <T>(path: string): Promise<T> =>
        request<T>(path, { method: 'GET' }),

    post: <T>(path: string, body?: unknown): Promise<T> =>
        request<T>(path, { method: 'POST', body: JSON.stringify(body) }),

    put: <T>(path: string, body?: unknown): Promise<T> =>
        request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),

    delete: <T>(path: string): Promise<T> =>
        request<T>(path, { method: 'DELETE' }),
};

export default apiClient;
