'use client';

import 'dayjs/locale/th';

import { RootStyleProvider } from '@/config/config-mui';
import { ReactNode } from 'react';


export function Providers({ children }: { children: ReactNode }) {
  return (
    <RootStyleProvider>
      {children}
    </RootStyleProvider>
  );
}
