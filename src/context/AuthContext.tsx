"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types/auth";
import { authService, AuthUserData, LoginCredentials } from "@/services/authService";
import { useRouter } from "next/navigation";

export interface LoginResult {
  success: boolean;
  access_token: string;
  refresh_token: string;
  active_role: string | null;
  org_id: number | null;
  hasOrganization: boolean;
  user?: AuthUserData | null;
}

export interface AuthContextType {
  user: UserProfile | null;
  authUserData: AuthUserData | null;
  role: UserRole;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  signup: (name: string, email: string, targetRole?: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function buildProfileFromClaims(claims: any, activeRole: string | null, fallbackUsername: string = ""): UserProfile {
  const isStaff = activeRole === "super_admin" || activeRole === "staff" || claims?.user_type === "staff";
  const username = claims?.username || fallbackUsername || (isStaff ? "Staff User" : "User");
  const email = claims?.email || "";
  const id = String(claims?.user_id || claims?.id || "");

  return {
    id: id || `usr_${Date.now()}`,
    name: username,
    email: email,
    role: isStaff ? "staff" : "user",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`,
    title: isStaff ? (activeRole === "super_admin" ? "Super Admin" : "Staff Engineer") : "Member",
    bio: "",
    joinedDate: new Date().toLocaleDateString(),
    twoFactorEnabled: false,
    status: "active",
  };
}

function mapBackendUserToProfile(backendUser: AuthUserData): UserProfile {
  const isStaff = Boolean(backendUser.is_staff || backendUser.is_superuser || backendUser.user_type === "staff");
  const fullName = `${backendUser.first_name || ""} ${backendUser.last_name || ""}`.trim() || backendUser.username;

  return {
    id: String(backendUser.id),
    name: fullName,
    email: backendUser.email,
    role: isStaff ? "staff" : "user",
    avatar: backendUser.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
    title: backendUser.role_name || (backendUser.is_org_owner ? "Organization Owner" : "Member"),
    department: backendUser.department_name || undefined,
    phone: backendUser.phone_number || undefined,
    bio: backendUser.bio || "",
    joinedDate: backendUser.date_joined ? new Date(backendUser.date_joined).toLocaleDateString() : new Date().toLocaleDateString(),
    twoFactorEnabled: false,
    status: "active",
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authUserData, setAuthUserData] = useState<AuthUserData | null>(null);
  const [role, setRole] = useState<UserRole>("user");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Load stored auth session on mount from real JWT token
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("access");
      const activeRole = localStorage.getItem("active_role");

      if (!storedToken) {
        setIsAuthenticated(false);
        setUser(null);
        setAuthUserData(null);
      } else {
        const claims = parseJwt(storedToken);
        const isStaff = activeRole === "super_admin" || activeRole === "staff" || claims?.user_type === "staff";
        setIsAuthenticated(true);
        setRole(isStaff ? "staff" : "user");
        setUser(buildProfileFromClaims(claims, activeRole));
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /**
   * Login using Django Backend API
   * POST /api/auth/login/
   */
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    setIsLoading(true);

    try {
      const data = await authService.login(credentials);

      const accessToken = data.access_token || data.access || "";
      const refreshToken = data.refresh_token || data.refresh || "";
      const activeRole = data.active_role || (data.user?.is_staff ? "super_admin" : (data.user?.is_org_owner ? "owner" : null));
      const orgId = data.org_id !== undefined && data.org_id !== null ? data.org_id : (data.user?.organization_id || null);

      // Save strictly the 5 required keys
      if (accessToken) {
        localStorage.setItem("access", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refresh", refreshToken);
      }
      if (activeRole) {
        localStorage.setItem("active_role", activeRole);
      }
      if (orgId !== null && orgId !== undefined) {
        localStorage.setItem("org_id", String(orgId));
      }

      const isStaff = activeRole === "super_admin" || activeRole === "staff" || Boolean(data.user?.is_staff || data.user?.is_superuser);
      const computedRole: UserRole = isStaff ? "staff" : "user";

      if (data.user) {
        const mappedProfile = mapBackendUserToProfile(data.user);
        setUser(mappedProfile);
        setAuthUserData(data.user);
      } else {
        const claims = parseJwt(accessToken);
        const dynamicProfile = buildProfileFromClaims(claims, activeRole, credentials.username);
        setUser(dynamicProfile);
      }

      setRole(computedRole);
      setIsAuthenticated(true);

      return {
        success: true,
        access_token: accessToken,
        refresh_token: refreshToken,
        active_role: activeRole,
        org_id: orgId,
        hasOrganization: Boolean(orgId),
        user: data.user || null,
      };
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Dev Demo Signup
   */
  const signup = async (
    name: string,
    email: string,
    targetRole: UserRole = "user"
  ): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockToken = "token_" + Date.now();
    localStorage.setItem("access", mockToken);
    localStorage.setItem("refresh", mockToken);
    localStorage.setItem("active_role", targetRole === "staff" ? "staff" : "owner");

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: targetRole,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      title: targetRole === "staff" ? "Staff Engineer" : "Member",
      bio: "",
      joinedDate: new Date().toLocaleDateString(),
      twoFactorEnabled: false,
      status: "active",
    };

    setUser(newProfile);
    setRole(targetRole);
    setIsAuthenticated(true);
    setIsLoading(false);

    if (targetRole === "staff") {
      router.push("/dashboard/staff");
    } else {
      router.push("/dashboard/workspaces");
    }
    return true;
  };

  /**
   * Logout user and revoke tokens
   * POST /api/auth/logout/
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch {}

    setUser(null);
    setAuthUserData(null);
    setIsAuthenticated(false);
    
    // Clear only auth keys (theme is preserved)
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("active_role");
    localStorage.removeItem("org_id");
    
    setIsLoading(false);
    router.push("/login");
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const newActiveRole = newRole === "staff" ? "staff" : "owner";
    localStorage.setItem("active_role", newActiveRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
    if (newRole === "staff") {
      router.push("/dashboard/staff");
    } else {
      router.push("/dashboard/workspaces");
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authUserData,
        role,
        isAuthenticated,
        isInitialized,
        isLoading,
        login,
        signup,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
