"use client";

import { Page } from "@/components/Page";
import LoginModule from "@/modules/LoginModule";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations();

  return (
    <Page title={t("Common.pages.login")}>
      <LoginModule />
    </Page>
  );
};

export default LoginPage;
