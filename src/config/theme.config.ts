export const DESIGN_TOKENS = {
  brand: {
    name: 'Nexora Purple',
    primary: '#8B5CF6',
    secondary: '#A855F7',
    light: '#C084FC',
    hover: '#7C3AED',
    active: '#9333EA',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    '2xl': '24px',
    '3xl': '30px',
    full: '9999px',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.2)',
    purpleGlow: '0 0 24px rgba(139, 92, 246, 0.35)',
    purpleHoverGlow: '0 10px 30px -5px rgba(139, 92, 246, 0.3)',
    floating: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
  },
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
} as const;
