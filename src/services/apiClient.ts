/**
 * Nexora API Client
 * Configured with common platform headers (X-Platform: web, X-Request-ID: uuid)
 */

export interface ApiResponse<T = any> {
  success: boolean;
  status_code: number;
  message: string;
  timestamp?: string;
  data: T;
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
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildHeaders(customHeaders?: HeadersInit): Headers {
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
      const token = localStorage.getItem("nexora-auth-token");
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
    const { params, headers, ...restOptions } = options;
    const url = this.buildUrl(endpoint, params);
    const requestHeaders = this.buildHeaders(headers);

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data as ApiResponse<T>;
    } catch (error: any) {
      // Re-throw structured error
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
