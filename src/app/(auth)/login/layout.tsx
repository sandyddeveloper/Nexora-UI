export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 overflow-x-hidden">
      {children}
    </div>
  );
}
