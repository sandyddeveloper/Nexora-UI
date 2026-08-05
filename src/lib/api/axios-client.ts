import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/use-auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true, // Enables HttpOnly refresh token cookie support
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: 401 Handling & Token Refresh Retry
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Avoid infinite loop if refresh API itself fails
      if (originalRequest.url?.includes('/accounts/refresh/') || originalRequest.url?.includes('/accounts/login/')) {
        useAuthStore.getState().resetAuth();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefresh = useAuthStore.getState().refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('nexora_refresh_token') : null);
        const response = await axios.post<{ data: { access: string; refresh?: string } }>(
          `${API_BASE_URL}/accounts/refresh/`,
          { refresh: storedRefresh },
          { withCredentials: true }
        );

        const newAccessToken = response.data?.data?.access || (response.data as any)?.access;
        const newRefreshToken = response.data?.data?.refresh || (response.data as any)?.refresh;

        if (newAccessToken) {
          useAuthStore.getState().setAccessToken(newAccessToken);
          if (newRefreshToken) {
            useAuthStore.getState().setRefreshToken(newRefreshToken);
            if (typeof window !== 'undefined') {
              localStorage.setItem('nexora_refresh_token', newRefreshToken);
            }
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          return apiClient(originalRequest);
        } else {
          throw new Error('Refresh token invalid');
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        useAuthStore.getState().resetAuth();
        if (typeof window !== 'undefined') {
          localStorage.removeItem('nexora_refresh_token');
          window.location.href = `/session-expired?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
