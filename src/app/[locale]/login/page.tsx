"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Page } from "@/components/page";
import LoginModule from "@/modules/LoginModule";

const LoginPage = () => {
  const t = useTranslations();
  return (
    <Page title={t("Common.pages.login")}>
      <LoginModule></LoginModule>
    </Page>
  );
};

export default LoginPage;
