"use client";

import { Page } from "@/components/Page";
import { useEffect } from "react";

import { webPaths } from "@/constant/webPaths";
import Loading from "@/modules/Loading";
import { useRouter } from "next/navigation";
import useTranslation from "@/locales/useLocale";

const LocalePage = () => {
  const { translation } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    router.push(webPaths.login);
  });

  return (
    <Page title={translation("Common.text.loading")}>
      <Loading />
    </Page>
  );
};

export default LocalePage;
