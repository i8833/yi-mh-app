import { ReactNode } from 'react';

export interface DivinationMethod {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  color: string;
} 