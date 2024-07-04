"use client";

import UnauthorizedLayout from "@/layout/UnauthorizedLayout";
import SetNewPasswordForm from "./SetNewPasswordForm";

const SetNewPasswordModule = () => {
  return (
    <UnauthorizedLayout>
      <SetNewPasswordForm />
    </UnauthorizedLayout>
  );
};

export default SetNewPasswordModule;
