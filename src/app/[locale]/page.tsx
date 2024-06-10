"use client";

import { Page } from "@/components/Page";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { webPaths } from "@/constant/webPaths";
import Loading from "@/modules/Loading";
import { useRouter } from "next/navigation";

const LocalePage = () => {
  const t = useTranslations();
  const router = useRouter();
  useEffect(() => {
    router.push(webPaths.login);
  });
  return (
    <Page title={t("Common.text.loading")}>
      <Loading />
    </Page>
  );
};

export default LocalePage;
