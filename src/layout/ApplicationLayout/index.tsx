import { ReactNode } from "react";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ModalLayer from "@/components/Modal/ModalLayer";
import ToastSnackBar from "@/components/Toast";

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <ToastSnackBar />
      <FullScreenLoading />
      <ModalLayer />
      {children}
    </>
  );
};

export default ApplicationLayout;
