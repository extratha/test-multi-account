"use client";

import UnauthorizedLayout from "@/layout/UnauthorizedLayout";
import LoginForm from "./LoginForm";

const LoginModule = () => {
  return (
    <UnauthorizedLayout>
      <LoginForm />
    </UnauthorizedLayout>
  );
};

export default LoginModule;
