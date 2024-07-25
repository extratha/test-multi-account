import { ReactNode } from "react";

import ToastSnackBar from "@/components/Toast";

interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <ToastSnackBar />
      {children}
    </>
  );
};

export default ApplicationLayout;
