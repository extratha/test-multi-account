"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Page } from "@/components/Page";

import Loading from "@/modules/Loading";
import { useRouter } from "next/navigation";
import { webPaths } from "@/constant/webPaths";
import VerticalMenu from "@/components/Menus/VerticalMenu";

const LocalePage = () => {
  const t = useTranslations();
  const router = useRouter()
  useEffect(() => {
    router.push(webPaths.login)
  })
  return (
    <Page title={t("Common.text.loading")}>
      <Loading />
    </Page>
  );
};

export default LocalePage;
