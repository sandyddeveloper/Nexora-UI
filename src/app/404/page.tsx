import NotFound from '@/app/not-found';

export const metadata = {
  title: '404 - Page Not Found | Nexora Business OS',
  description: 'The requested workspace page could not be found.',
};

export default function ExplicitNotFoundPage() {
  return <NotFound />;
}
