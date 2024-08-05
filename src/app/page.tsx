"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
import { NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";

const LocalePage = () => {
  const { translation } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    router.replace(NAVIGATION.HOME);
  }, []);

  return (
    <Page title={translation("Common.text.loading")}>
      <FullScreenLoading />
    </Page>
  );
};

export default LocalePage;
