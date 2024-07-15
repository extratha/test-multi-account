"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import LoginModule from "@/modules/LoginModule";

const LoginPage = () => {
  const { translation } = useTranslation();

  return (
    <Page title={translation("Common.pages.login")}>
      <LoginModule />
    </Page>
  );
};

export default LoginPage;
