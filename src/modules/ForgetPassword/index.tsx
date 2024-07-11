"use client";

import UnauthorizedLayout from "@/layout/UnauthorizedLayout";
import ForgetPasswordForm from "./ForgetPasswordForm";

const ForgetPasswordModule = () => {
  return (
    <UnauthorizedLayout>
      <ForgetPasswordForm />
    </UnauthorizedLayout>
  );
};

export default ForgetPasswordModule;
