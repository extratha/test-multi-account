"use client";

import ModalLayer from '@/components/modal/ModalLayer';
import PageLoading from '@/components/loading/PageLoading';
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoading />
      <ModalLayer />
      {children}
    </>
  );
}
