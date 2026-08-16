import { apiClient, ApiResponse } from "./apiClient";
import { APICountry, APILanguage } from "./utilitiesService";

export type OrganizationType =
  | "company"
  | "startup"
  | "agency"
  | "non_profit"
  | "educational"
  | "government"
  | "other";

export type IndustryType =
  | "information_technology"
  | "software"
  | "finance"
  | "healthcare"
  | "education"
  | "manufacturing"
  | "retail"
  | "marketing"
  | "consulting"
  | "other";

export type CompanySizeType =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "501-1000"
  | "1000+";

export interface TenantInfo {
  id: number;
  tenant_id: string;
  name: string;
  schema_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OnboardingState {
  organization_created: boolean;
  basic_settings: boolean;
  members: boolean;
  organization_structure: boolean;
  departments: boolean;
  teams: boolean;
  projects: boolean;
}

export interface OrganizationSettings {
  timezone: string;
  currency: string;
  language: string;
  date_format?: string;
  time_format?: string;
  number_format?: string;
}

export interface Organization {
  id: number;
  name: string;
  slug: string;
  country: number;
  country_name: string;
  country_code: string;
  organization_type?: OrganizationType;
  industry?: IndustryType;
  company_size?: CompanySizeType;
  timezone: string;
  currency: string;
  language?: number;
  language_name?: string;
  language_code?: string;
  status: "active" | "suspended" | "pending";
  tenant: TenantInfo;
  created_by: number;
  created_by_username: string;
  owner: number;
  owner_username: string;
  owner_email: string;
  domain?: string;
  billing_email?: string;
  logo_url?: string;
  settings?: OrganizationSettings;
  onboarding_state?: OnboardingState;
  is_active: boolean;
  members_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrganizationPayload {
  name: string;
  country_code?: string;
  country_id?: number;
  organization_type?: OrganizationType;
  industry?: IndustryType;
  company_size?: CompanySizeType;
  timezone?: string;
  currency?: string;
  language_code?: string;
  domain?: string;
  billing_email?: string;
  logo_url?: string;
  // Client Owner Credentials (provisioned by Staff)
  owner_email?: string;
  owner_username?: string;
  owner_first_name?: string;
  owner_last_name?: string;
  owner_password?: string;
}

export interface UpdateOrganizationPayload {
  name?: string;
  organization_type?: OrganizationType;
  industry?: IndustryType;
  company_size?: CompanySizeType;
  timezone?: string;
  currency?: string;
  language_code?: string;
  domain?: string;
  billing_email?: string;
  logo_url?: string;
}

// Select Enum Options
export const ORGANIZATION_TYPE_OPTIONS: { value: OrganizationType; label: string }[] = [
  { value: "company", label: "Company" },
  { value: "startup", label: "Startup" },
  { value: "agency", label: "Agency" },
  { value: "non_profit", label: "Non-Profit" },
  { value: "educational", label: "Educational Institution" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

export const INDUSTRY_OPTIONS: { value: IndustryType; label: string }[] = [
  { value: "information_technology", label: "Information Technology" },
  { value: "software", label: "Software" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "marketing", label: "Marketing" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

export const COMPANY_SIZE_OPTIONS: { value: CompanySizeType; label: string }[] = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "501-1000", label: "501–1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

export const COUNTRY_SUGGESTIONS: Record<
  string,
  { timezone: string; currency: string; language: string }
> = {
  IN: { timezone: "Asia/Kolkata", currency: "INR", language: "EN" },
  US: { timezone: "America/New_York", currency: "USD", language: "EN" },
  GB: { timezone: "Europe/London", currency: "GBP", language: "EN" },
  CA: { timezone: "America/Toronto", currency: "CAD", language: "EN" },
  AU: { timezone: "Australia/Sydney", currency: "AUD", language: "EN" },
  DE: { timezone: "Europe/Berlin", currency: "EUR", language: "DE" },
  FR: { timezone: "Europe/Paris", currency: "EUR", language: "FR" },
  JP: { timezone: "Asia/Tokyo", currency: "JPY", language: "JA" },
  AE: { timezone: "Asia/Dubai", currency: "AED", language: "AR" },
  SG: { timezone: "Asia/Singapore", currency: "SGD", language: "EN" },
  BR: { timezone: "America/Sao_Paulo", currency: "BRL", language: "PT" },
  ZA: { timezone: "Africa/Johannesburg", currency: "ZAR", language: "EN" },
  NL: { timezone: "Europe/Amsterdam", currency: "EUR", language: "NL" },
  SE: { timezone: "Europe/Stockholm", currency: "SEK", language: "SV" },
  CH: { timezone: "Europe/Zurich", currency: "CHF", language: "DE" },
};

export const organizationService = {
  /**
   * Create a new Organization / Tenant
   * POST /api/users/organizations/
   */
  async createOrganization(payload: CreateOrganizationPayload): Promise<Organization> {
    const response = await apiClient.post<Organization>("/api/users/organizations/", payload);
    return response.data;
  },

  /**
   * List organizations with optional pagination
   * GET /api/users/organizations/?page=1
   */
  async listOrganizations(page: number = 1): Promise<{
    items: Organization[];
    total: number;
    page: number;
  }> {
    const response = await apiClient.get<any>("/api/users/organizations/", { page });
    const data = response.data;

    // Support flat array or paginated response format
    if (Array.isArray(data)) {
      return { items: data, total: data.length, page };
    }
    if (data && Array.isArray(data.items)) {
      return { items: data.items, total: data.total || data.items.length, page };
    }
    if (data && Array.isArray(data.results)) {
      return { items: data.results, total: data.count || data.results.length, page };
    }

    return { items: [], total: 0, page };
  },

  /**
   * Get single organization by ID
   * GET /api/users/organizations/{id}/
   */
  async getOrganization(id: number | string): Promise<Organization> {
    const response = await apiClient.get<Organization>(`/api/users/organizations/${id}/`);
    return response.data;
  },

  /**
   * Update organization settings
   * PATCH /api/users/organizations/{id}/
   */
  async updateOrganization(
    id: number | string,
    payload: UpdateOrganizationPayload
  ): Promise<Organization> {
    const response = await apiClient.request<Organization>(`/api/users/organizations/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return response.data;
  },
};
