"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import ForgetPasswordModule from "@/modules/ForgetPassword";

const ForgetPasswordPage = () => {
  const { translation } = useTranslation();
  return (
    <Page title={translation("Common.pages.forgetPassword")}>
      <ForgetPasswordModule />
    </Page>
  );
};

export default ForgetPasswordPage;
