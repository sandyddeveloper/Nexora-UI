import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexora Business OS',
    short_name: 'Nexora',
    description:
      'Nexora Business OS is an AI-powered enterprise platform that unifies workflow automation, CRM, HRMS, project management, analytics, knowledge, and intelligent business operations into one modern workspace.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05030a',
    theme_color: '#7C3AED',
    icons: [
      {
        src: '/Nexora.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Nexora.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
