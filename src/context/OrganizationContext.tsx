"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  Organization,
  CreateOrganizationPayload,
  organizationService,
} from "@/services/organizationService";

interface OrganizationContextType {
  currentOrganization: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  createOrganization: (payload: CreateOrganizationPayload) => Promise<Organization>;
  switchOrganization: (org: Organization) => void;
  refreshOrganizations: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshOrganizations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await organizationService.listOrganizations(1);
      if (response && response.items && response.items.length > 0) {
        setOrganizations(response.items);

        // Check if there is a saved active organization ID
        const savedId = localStorage.getItem("org_id");
        if (savedId) {
          const found = response.items.find((o) => String(o.id) === savedId);
          if (found) {
            setCurrentOrganization(found);
            return;
          }
        }
        setCurrentOrganization(response.items[0]);
      } else {
        setOrganizations([]);
        setCurrentOrganization(null);
      }
    } catch {
      // Backend not running or no auth -> keep clean state
      setOrganizations([]);
      setCurrentOrganization(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshOrganizations();
  }, [refreshOrganizations]);

  const switchOrganization = (org: Organization) => {
    setCurrentOrganization(org);
    try {
      localStorage.setItem("org_id", String(org.id));
      localStorage.removeItem("nexora-active-org-id");
      localStorage.removeItem("nexora-active-tenant-id");
    } catch {}
  };

  const createOrganization = async (payload: CreateOrganizationPayload): Promise<Organization> => {
    setIsLoading(true);
    try {
      const newOrg = await organizationService.createOrganization(payload);
      setOrganizations((prev) => [newOrg, ...prev]);
      setCurrentOrganization(newOrg);

      try {
        localStorage.setItem("org_id", String(newOrg.id));
        localStorage.removeItem("nexora-active-org-id");
        localStorage.removeItem("nexora-active-tenant-id");
      } catch {}

      return newOrg;
    } catch (err: any) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        organizations,
        isLoading,
        createOrganization,
        switchOrganization,
        refreshOrganizations,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within an OrganizationProvider");
  }
  return context;
}
