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

// Fallback seed languages if backend server is offline
const FALLBACK_LANGUAGES: APILanguage[] = [
  { id: 1, name: "English", country: "US", code: "en" },
  { id: 2, name: "English", country: "GB", code: "en" },
  { id: 3, name: "Spanish", country: "ES", code: "es" },
  { id: 4, name: "French", country: "FR", code: "fr" },
  { id: 5, name: "German", country: "DE", code: "de" },
  { id: 6, name: "Tamil", country: "IN", code: "ta" },
  { id: 7, name: "Hindi", country: "IN", code: "hi" },
  { id: 8, name: "Chinese (Simplified)", country: "CN", code: "zh" },
  { id: 9, name: "Japanese", country: "JP", code: "ja" },
  { id: 10, name: "Arabic", country: "SA", code: "ar" },
  { id: 11, name: "Portuguese", country: "BR", code: "pt" },
  { id: 12, name: "Russian", country: "RU", code: "ru" },
  { id: 13, name: "Korean", country: "KR", code: "ko" },
  { id: 14, name: "Italian", country: "IT", code: "it" },
];

export function useLanguages(initialSearch: string = "") {
  const [languages, setLanguages] = useState<APILanguage[]>(FALLBACK_LANGUAGES);
  const [search, setSearch] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await utilitiesService.getLanguages(query);
      if (Array.isArray(data) && data.length > 0) {
        setLanguages(data);
        setIsLiveApi(true);
      } else if (query.trim()) {
        // Filter local list if query returned empty from api or when searching
        const filtered = FALLBACK_LANGUAGES.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.code.toLowerCase().includes(query.toLowerCase()) ||
            (l.country && l.country.toLowerCase().includes(query.toLowerCase()))
        );
        setLanguages(filtered);
      }
    } catch (err: any) {
      // Backend is offline or returned error -> filter fallback dataset
      setIsLiveApi(false);
      if (query.trim()) {
        const filtered = FALLBACK_LANGUAGES.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.code.toLowerCase().includes(query.toLowerCase()) ||
            (l.country && l.country.toLowerCase().includes(query.toLowerCase()))
        );
        setLanguages(filtered);
      } else {
        setLanguages(FALLBACK_LANGUAGES);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search trigger
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
    isLiveApi,
    error,
    refetch: () => fetchLanguages(search),
  };
}
