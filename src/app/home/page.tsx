"use client";

import { Page } from "@/components/Page";
import useTranslation from "@/locales/useLocale";
import HomePageModule from "@/modules/HomePageModule";

const HomePage = () => {
  const { translation } = useTranslation();

  return (
    <Page title={translation("Common.pages.home")}>
      <HomePageModule />
    </Page>
  );
};

export default HomePage;
