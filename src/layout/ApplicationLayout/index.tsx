import { ReactNode } from "react";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ToastSnackBar from "@/components/Toast";

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <ToastSnackBar />
      <FullScreenLoading />
      {children}
    </>
  );
};

export default ApplicationLayout;
