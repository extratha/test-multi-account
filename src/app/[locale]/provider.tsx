"use client";

import ModalLayer from '@/components/Modal/ModalLayer';
import PageLoading from '@/components/Loading/PageLoading';
import ToastSnackBar  from '@/components/Toast';
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastSnackBar />
      <PageLoading />
      <ModalLayer />
      {children}
    </>
  );
}
