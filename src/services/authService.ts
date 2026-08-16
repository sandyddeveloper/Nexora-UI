import { apiClient, ApiResponse } from "./apiClient";

export interface UserRoleObject {
  id: number | null;
  name: string;
  code: string;
}

export interface AuthUserData {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: "staff" | "client";
  role?: UserRoleObject | null;
  role_id?: number | null;
  role_name?: string;
  role_code?: string;
  permissions?: string[];
  organization_id?: number | null;
  organization_name?: string | null;
  tenant_id?: string | null;
  department_id?: number | null;
  department_name?: string | null;
  employee_code?: string | null;
  phone_number?: string | null;
  bio?: string;
  avatar_url?: string | null;
  is_email_verified?: boolean;
  is_org_owner?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  is_active?: boolean;
  date_joined?: string;
  last_login?: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  active_role: string | null;
  org_id: number | null;
  // Compatibility fallbacks
  access?: string;
  refresh?: string;
  user?: AuthUserData;
}

export interface RefreshTokenResponseData {
  access: string;
  refresh?: string;
  access_token?: string;
  refresh_token?: string;
  token_type: string;
  expires_in_seconds: number;
}

export interface LoginCredentials {
  username: string; // Supports username or email
  password: string;
}

export const authService = {
  /**
   * Login user with username/email and password
   * POST /api/auth/login/
   */
  async login(credentials: LoginCredentials): Promise<LoginResponseData> {
    const response = await apiClient.post<LoginResponseData>("/api/auth/login/", credentials);
    return response.data;
  },

  /**
   * Refresh JWT access token
   * POST /api/auth/token/refresh/
   */
  async refreshToken(refresh: string): Promise<RefreshTokenResponseData> {
    const response = await apiClient.post<RefreshTokenResponseData>("/api/auth/token/refresh/", {
      refresh,
    });
    return response.data;
  },

  /**
   * Verify JWT Token validity
   * POST /api/auth/token/verify/
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      await apiClient.post("/api/auth/token/verify/", { token });
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Logout user and invalidate refresh token on backend
   * POST /api/auth/logout/
   */
  async logout(): Promise<void> {
    try {
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh")
          : null;
      if (refreshToken) {
        await apiClient.post("/api/auth/logout/", { refresh: refreshToken });
      }
    } catch {
      // Best-effort logout on backend
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("active_role");
        localStorage.removeItem("org_id");
      }
    }
  },

  /**
   * Get user profile
   * GET /api/users/profile/
   */
  async getProfile(): Promise<AuthUserData> {
    const response = await apiClient.get<AuthUserData>("/api/users/profile/");
    return response.data;
  },
};
