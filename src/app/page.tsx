"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Page } from "@/components/Page";
import { NAVIGATION } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";

const LocalePage = () => {
  const { translation } = useTranslation();
  const { setPageLoading } = usePageLoadingStore();
  const router = useRouter();

  useEffect(() => {
    setPageLoading(true);
    router.replace(NAVIGATION.HOME);
  }, []);

  return <Page title={translation("Common.text.loading")} />;
};

export default LocalePage;
