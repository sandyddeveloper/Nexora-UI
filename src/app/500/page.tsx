import ErrorBoundary from '@/app/error';

export const metadata = {
  title: '500 - Internal Server Error | Nexora Business OS',
  description: 'An internal server execution error occurred in Nexora OS.',
};

export default function Explicit500Page() {
  const simulatedError = {
    name: 'InternalServerError',
    message: 'Simulated 500 Internal Server Execution Error in Nexora OS workspace engine.',
    digest: 'ERR-NX-500-SIMULATED',
  };

  return <ErrorBoundary error={simulatedError as any} />;
}
