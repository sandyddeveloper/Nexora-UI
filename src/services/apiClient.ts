/**
 * Nexora API Client
 * Configured with common platform headers (X-Platform: web, X-Request-ID: uuid)
 * and automatic 401 JWT token refreshing.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  status_code: number;
  message: string;
  timestamp?: string;
  data: T;
  errors?: Record<string, string[]> | any;
}

// Generate unique request UUID v4
export function generateRequestId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "req-" + Math.random().toString(36).substring(2, 15) + "-" + Date.now().toString(36);
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  skipAuthRefresh?: boolean;
}

export class ApiClient {
  private baseUrl: string;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private onTokenRefreshed(newToken: string) {
    this.refreshSubscribers.forEach((callback) => callback(newToken));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private buildHeaders(customHeaders?: HeadersInit, overrideToken?: string): Headers {
    const headers = new Headers(customHeaders);

    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json");
    }
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Required Nexora backend headers
    headers.set("X-Platform", "web");
    headers.set("X-Request-ID", generateRequestId());

    // Attach Bearer token if present
    if (typeof window !== "undefined") {
      const token = overrideToken || localStorage.getItem("access");
      if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${cleanEndpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, headers, skipAuthRefresh, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      // Handle 401 Unauthorized token refresh
      if (response.status === 401 && !skipAuthRefresh && !endpoint.includes("/api/auth/")) {
        if (typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refresh") || localStorage.getItem("refresh_token");
          if (refreshToken) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;

              try {
                const refreshRes = await fetch(`${this.baseUrl}/api/auth/token/refresh/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "X-Platform": "web",
                    "X-Request-ID": generateRequestId(),
                  },
                  body: JSON.stringify({ refresh: refreshToken }),
                });

                const refreshData = await refreshRes.json();

                const newAccess = refreshData.data?.access || refreshData.data?.access_token;
                if (refreshRes.ok && newAccess) {
                  localStorage.setItem("access", newAccess);
                  const newRefresh = refreshData.data?.refresh || refreshData.data?.refresh_token;
                  if (newRefresh) {
                    localStorage.setItem("refresh", newRefresh);
                  }
                  this.isRefreshing = false;
                  this.onTokenRefreshed(newAccess);

                  // Retry original request with new token
                  return this.request<T>(endpoint, {
                    ...options,
                    headers: this.buildHeaders(headers, newAccess),
                  });
                } else {
                  this.isRefreshing = false;
                  localStorage.removeItem("access");
                  localStorage.removeItem("refresh");
                  localStorage.removeItem("active_role");
                  localStorage.removeItem("org_id");
                }
              } catch (refreshErr) {
                this.isRefreshing = false;
              }
            } else {
              // Wait for active token refresh to complete
              return new Promise<ApiResponse<T>>((resolve, reject) => {
                this.addRefreshSubscriber(async (newToken: string) => {
                  try {
                    const retried = await this.request<T>(endpoint, {
                      ...options,
                      headers: this.buildHeaders(headers, newToken),
                    });
                    resolve(retried);
                  } catch (e) {
                    reject(e);
                  }
                });
              });
            }
          }
        }
      }

      const data = await response.json();

      if (!response.ok) {
        const errorObj: any = new Error(data.message || `Request failed with status ${response.status}`);
        errorObj.errors = data.errors || null;
        errorObj.status_code = data.status_code || response.status;
        throw errorObj;
      }

      return data as ApiResponse<T>;
    } catch (error: any) {
      throw error;
    }
  }

  get<T = any>(endpoint: string, params?: Record<string, any>, headers?: HeadersInit) {
    return this.request<T>(endpoint, { method: "GET", params, headers });
  }

  post<T = any>(endpoint: string, body?: any, headers?: HeadersInit) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  put<T = any>(endpoint: string, body?: any, headers?: HeadersInit) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  delete<T = any>(endpoint: string, headers?: HeadersInit) {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }
}

export const apiClient = new ApiClient();
