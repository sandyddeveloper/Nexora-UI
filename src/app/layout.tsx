import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/app-providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nexora.io'),

  title: {
    default: 'Nexora Business OS',
    template: '%s | Nexora Business OS',
  },

  applicationName: 'Nexora Business OS',

  description:
    'Nexora Business OS is an AI-powered enterprise platform that unifies workflow automation, CRM, HRMS, project management, analytics, knowledge, and intelligent business operations into one modern workspace.',

  keywords: [
    'Business OS',
    'AI Platform',
    'Workflow Automation',
    'Enterprise Software',
    'CRM',
    'HRMS',
    'Project Management',
    'Analytics',
    'AI Copilot',
    'Automation Platform',
    'Business Management',
    'Productivity',
    'Knowledge Base',
    'Business Intelligence',
    'SaaS',
    'Enterprise AI',
    'Workspace',
  ],

  authors: [
    {
      name: 'Nexora',
      url: 'https://nexora.io',
    },
  ],

  creator: 'Nexora',

  publisher: 'Nexora',

  category: 'Business Software',

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://nexora.io',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexora.io',
    siteName: 'Nexora Business OS',
    title: 'Nexora Business OS',
    description:
      'The AI-powered Business Operating System for modern enterprises.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nexora Business OS',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nexora Business OS',
    description:
      'The AI-powered Business Operating System for modern enterprises.',
    images: ['/og-image.png'],
    creator: '@nexora',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
  },

  manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Nexora',
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    'theme-color': '#7C3AED',
    'color-scheme': 'dark light',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[#8b5cf6]/20 selection:text-[#8b5cf6] transition-colors duration-200`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
