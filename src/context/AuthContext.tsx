"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole, AuthContextType } from "@/types/auth";
import { useRouter } from "next/navigation";

const USER_MOCK: UserProfile = {
  id: "usr_99812",
  name: "Alex Morgan",
  email: "alex.morgan@company.com",
  role: "user",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  title: "Product Lead",
  department: "Growth & Innovation",
  phone: "+1 (555) 234-8900",
  location: "San Francisco, CA",
  bio: "Passionate about building scalable digital experiences, cloud architecture, and modern product analytics.",
  joinedDate: "March 2024",
  twoFactorEnabled: true,
  status: "active",
};

const STAFF_MOCK: UserProfile = {
  id: "stf_44021",
  name: "Jordan Hayes",
  email: "jordan.hayes@staff.nexora.io",
  role: "staff",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  title: "Senior Operations Specialist",
  department: "Tier-2 Technical Support",
  phone: "+1 (555) 876-1234",
  location: "Austin, TX",
  bio: "Lead support operations engineer handling customer incident triage, SLA monitoring, and system deployment management.",
  joinedDate: "January 2023",
  twoFactorEnabled: true,
  status: "busy",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(USER_MOCK);
  const [role, setRole] = useState<UserRole>("user");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check saved session in local storage
    const savedRole = localStorage.getItem("nexora-role") as UserRole | null;
    const savedAuth = localStorage.getItem("nexora-auth");

    if (savedAuth === "false") {
      setIsAuthenticated(false);
      setUser(null);
    } else if (savedRole === "staff") {
      setRole("staff");
      setUser(STAFF_MOCK);
      setIsAuthenticated(true);
    } else {
      setRole("user");
      setUser(USER_MOCK);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, targetRole: UserRole = "user"): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network authentication delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const selectedProfile = targetRole === "staff" ? { ...STAFF_MOCK, email } : { ...USER_MOCK, email };
    setUser(selectedProfile);
    setRole(targetRole);
    setIsAuthenticated(true);
    localStorage.setItem("nexora-role", targetRole);
    localStorage.setItem("nexora-auth", "true");
    setIsLoading(false);

    if (targetRole === "staff") {
      router.push("/dashboard/staff");
    } else {
      router.push("/dashboard");
    }
    return true;
  };

  const signup = async (name: string, email: string, targetRole: UserRole = "user"): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newProfile: UserProfile = {
      ...(targetRole === "staff" ? STAFF_MOCK : USER_MOCK),
      name,
      email,
      role: targetRole,
      id: `usr_${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setUser(newProfile);
    setRole(targetRole);
    setIsAuthenticated(true);
    localStorage.setItem("nexora-role", targetRole);
    localStorage.setItem("nexora-auth", "true");
    setIsLoading(false);

    if (targetRole === "staff") {
      router.push("/dashboard/staff");
    } else {
      router.push("/dashboard");
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.setItem("nexora-auth", "false");
    router.push("/login");
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("nexora-role", newRole);
    if (newRole === "staff") {
      setUser(STAFF_MOCK);
      router.push("/dashboard/staff");
    } else {
      setUser(USER_MOCK);
      router.push("/dashboard");
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
        role,
        isAuthenticated,
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
