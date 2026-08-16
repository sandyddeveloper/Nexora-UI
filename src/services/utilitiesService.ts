import { apiClient, ApiResponse } from "./apiClient";

export interface APILanguage {
  id: number;
  name: string;
  country: string | null;
  code: string;
}

export interface APICountry {
  id: number;
  name: string;
  code: string;
}

export interface APIUserPreference {
  id?: number;
  theme: "light" | "dark" | "system";
  language: APILanguage | null;
  email_notifications: boolean;
  sms_notifications: boolean;
}

export interface UpdatePreferencePayload {
  theme?: "light" | "dark" | "system";
  language_id?: number | null;
  language_code?: string;
  email_notifications?: boolean;
  sms_notifications?: boolean;
}

export const utilitiesService = {
  /**
   * Fetch all active languages from Django backend
   * Supports ?search= query parameter
   */
  async getLanguages(search?: string): Promise<APILanguage[]> {
    const params = search && search.trim() ? { search: search.trim() } : undefined;
    const response = await apiClient.get<APILanguage[]>("/api/utilities/languages/", params);
    return response.data || [];
  },

  /**
   * Fetch all active countries
   */
  async getCountries(search?: string): Promise<APICountry[]> {
    const params = search && search.trim() ? { search: search.trim() } : undefined;
    const response = await apiClient.get<APICountry[]>("/api/utilities/countries/", params);
    return response.data || [];
  },

  /**
   * Retrieve authenticated user preference configuration
   */
  async getUserPreferences(): Promise<APIUserPreference> {
    const response = await apiClient.get<APIUserPreference>("/api/utilities/preferences/");
    return response.data;
  },

  /**
   * Create or update authenticated user preference
   */
  async saveUserPreferences(payload: UpdatePreferencePayload): Promise<APIUserPreference> {
    const response = await apiClient.post<APIUserPreference>("/api/utilities/preferences/", payload);
    return response.data;
  },
};
