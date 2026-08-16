"use client";

import { useState, useEffect, useCallback } from "react";
import { utilitiesService, APILanguage } from "@/services/utilitiesService";

// Helper to convert 2-letter ISO country code to emoji flag
export function countryCodeToFlag(countryCode?: string | null): string {
  if (!countryCode || countryCode.length !== 2) {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function useLanguages(initialSearch: string = "") {
  const [languages, setLanguages] = useState<APILanguage[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await utilitiesService.getLanguages(query);
      if (Array.isArray(data)) {
        setLanguages(data);
      } else {
        setLanguages([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to retrieve languages from server");
      setLanguages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search trigger against API
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLanguages(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search, fetchLanguages]);

  return {
    languages,
    search,
    setSearch,
    isLoading,
    error,
    refetch: () => fetchLanguages(search),
  };
}
