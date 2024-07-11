"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Page } from "@/components/Page";
import { webPaths } from "@/constant/webPaths";
import useTranslation from "@/locales/useLocale";
import Loading from "@/modules/Loading";

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
