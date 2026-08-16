import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { PreferencesProvider } from "@/context/PreferencesContext";
import { AuthProvider } from "@/context/AuthContext";
import { NetworkDetector } from "@/components/common/NetworkDetector";
import { NavigationProgressBar } from "@/components/common/NavigationProgressBar";

export const metadata: Metadata = {
  title: "Nexora - Unified Cloud Operations & Multi-Role SaaS Platform",
  description:
    "Production-ready Next.js platform featuring landing page, authentication, and dedicated User & Staff operational dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nexora-theme');
                  var root = document.documentElement;
                  if (saved === 'dark') {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <ThemeProvider>
          <PreferencesProvider>
            <AuthProvider>
              {children}
              <NetworkDetector />
            </AuthProvider>
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
