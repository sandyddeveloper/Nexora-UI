import { ReactNode } from 'react';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type VariantColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'glass';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
