import { ReactNode } from "react";

import PageLoading from "@/components/Loading/PageLoading";
import ModalLayer from "@/components/Modal/ModalLayer";
import ToastSnackBar from "@/components/Toast";

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <ToastSnackBar />
      <PageLoading />
      <ModalLayer />
      {children}
    </>
  );
};

export default ApplicationLayout;
