import { apiClient } from './axios-client';
import { AuthUser, OrganizationContext } from '@/store/use-auth-store';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: AuthUser;
  };
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

export interface VerifyEmailPayload {
  otp?: string;
  token?: string;
  email?: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface CompleteOnboardingPayload {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
  company_name: string;
  company_address?: string;
}

export const authApi = {
  // Login Endpoint
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    return apiClient.post('/accounts/login/', payload);
  },

  // Register Endpoint
  register: async (payload: RegisterPayload) => {
    return apiClient.post('/accounts/register/', payload);
  },

  // Refresh Token Endpoint
  refreshToken: async (refreshToken?: string) => {
    return apiClient.post('/accounts/refresh/', { refresh: refreshToken });
  },

  // Logout Endpoint
  logout: async (refreshToken?: string) => {
    return apiClient.post('/accounts/logout/', { refresh: refreshToken });
  },

  // Verify Email OTP Endpoint
  verifyEmail: async (payload: string | VerifyEmailPayload) => {
    const data = typeof payload === 'string' ? { token: payload } : payload;
    return apiClient.post('/accounts/verify-email/', data);
  },

  // Resend Verification Email/OTP Endpoint
  resendVerification: async (email: string) => {
    return apiClient.post('/accounts/resend-verification/', { email });
  },

  // Forgot Password Endpoint
  forgotPassword: async (email: string) => {
    return apiClient.post('/accounts/forgot-password/', { email });
  },

  // Reset Password Endpoint
  resetPassword: async (payload: ResetPasswordPayload) => {
    return apiClient.post('/accounts/reset-password/', payload);
  },

  // ── Onboarding Multi-Step Pipeline Endpoints ──────────────────────────────────
  sendOnboardingEmailOtp: async (email: string) => {
    return apiClient.post('/accounts/onboarding/send-email-otp/', { email });
  },

  verifyOnboardingEmailOtp: async (email: string, otp: string) => {
    return apiClient.post('/accounts/onboarding/verify-email-otp/', { email, otp });
  },

  sendOnboardingPhoneOtp: async (email: string, phone_number: string) => {
    return apiClient.post('/accounts/onboarding/send-phone-otp/', { email, phone_number });
  },

  verifyOnboardingPhoneOtp: async (phone_number: string, otp: string) => {
    return apiClient.post('/accounts/onboarding/verify-phone-otp/', { phone_number, otp });
  },

  completeOnboarding: async (payload: CompleteOnboardingPayload) => {
    return apiClient.post('/accounts/onboarding/complete/', payload);
  },

  // Get Current User Profile Endpoint
  getCurrentUser: async (): Promise<{ data: AuthUser }> => {
    return apiClient.get('/accounts/users/me/');
  },

  // Fetch User Organizations Endpoint
  getOrganizations: async (): Promise<{ data: OrganizationContext[] }> => {
    return apiClient.get('/organizations/');
  },

  // Fetch Organization Feature Flags Endpoint
  getOrganizationFeatureFlags: async (orgId: string): Promise<{ data: Record<string, boolean> }> => {
    return apiClient.get(`/organizations/${orgId}/feature-flags/`);
  },
};
