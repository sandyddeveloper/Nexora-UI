"use client";

import { useState, useEffect, useCallback } from "react";
import { utilitiesService, APICountry } from "@/services/utilitiesService";
import { countryCodeToFlag } from "./useLanguages";

export interface CountryOption extends APICountry {
  flag: string;
}

export function useCountries(initialSearch: string = "") {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await utilitiesService.getCountries(query);
      if (Array.isArray(data)) {
        const enriched: CountryOption[] = data.map((c) => ({
          ...c,
          flag: countryCodeToFlag(c.code),
        }));
        setCountries(enriched);
      } else {
        setCountries([]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to retrieve countries");
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCountries(search);
    }, 200);

    return () => clearTimeout(handler);
  }, [search, fetchCountries]);

  return {
    countries,
    search,
    setSearch,
    isLoading,
    error,
    refetch: () => fetchCountries(search),
  };
}
