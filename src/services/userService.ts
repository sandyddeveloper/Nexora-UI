import { apiClient, ApiResponse } from "./apiClient";

export type ClientUserRole = "Owner" | "Admin" | "Manager" | "Member" | "Viewer" | "Staff";

export interface ClientUserItem {
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  organization_id: number;
  organization_name: string;
  role_name: ClientUserRole | string;
  department_name?: string;
  phone_number?: string;
  is_active: boolean;
  twoFactorEnabled?: boolean;
  created_at?: string;
  last_login?: string;
}

export interface CreateUserPayload {
  organization_id: number;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  role_name: ClientUserRole;
  password?: string;
  department_name?: string;
  phone_number?: string;
  send_invite_email?: boolean;
}

export const USER_ROLE_OPTIONS: { value: ClientUserRole; label: string; description: string }[] = [
  { value: "Owner", label: "Organization Owner", description: "Full administrative & billing control of client workspace" },
  { value: "Admin", label: "Client Administrator", description: "Manages users, permissions, integrations, and project environments" },
  { value: "Manager", label: "Team Manager", description: "Supervises workflows, deployments, and member activities" },
  { value: "Member", label: "Standard Employee / Member", description: "Executes standard tasks, view logs, and collaborate on projects" },
  { value: "Viewer", label: "Read-Only Viewer", description: "Audit, view telemetry metrics, and read reports only" },
];

export const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Product & Design",
  "DevOps / Infrastructure",
  "Operations",
  "Finance & Accounting",
  "Customer Support",
  "Sales & Marketing",
  "Human Resources",
  "Executive",
];

export const userService = {
  /**
   * Create and provision a new user under a specific organization
   * POST /api/users/
   */
  async createUser(payload: CreateUserPayload): Promise<ClientUserItem> {
    const response = await apiClient.post<ClientUserItem>("/api/users/", payload);
    return response.data;
  },

  /**
   * List users, optionally filtered by organization ID
   * GET /api/users/?organization_id=...
   */
  async listUsers(organizationId?: number): Promise<ClientUserItem[]> {
    const params = organizationId ? { organization_id: organizationId } : undefined;
    const response = await apiClient.get<ClientUserItem[]>("/api/users/", params);
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Assign or update user's role and permissions
   * PATCH /api/users/{id}/role/
   */
  async assignRole(userId: number | string, role_name: ClientUserRole): Promise<ClientUserItem> {
    const response = await apiClient.request<ClientUserItem>(`/api/users/${userId}/`, {
      method: "PATCH",
      body: JSON.stringify({ role_name }),
    });
    return response.data;
  },
};
