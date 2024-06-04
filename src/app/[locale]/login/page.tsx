"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Page } from "@/components/Page";
import LoginModule from "@/modules/LoginModule";
import { remoteConfig } from "@/utils/firebase";
import { remoteConfigKey } from "@/constant/firebase";

const LoginPage = () => {
  const t = useTranslations();

  useEffect(() => {
    (async() => {
      // setTimeout(async () => {
        const remoteConfigData = await remoteConfig.getString(remoteConfigKey.LAB_INTERPRET_REQUIRE_FIELDS)
        console.log("remoteConfigData", remoteConfigData)
      // }, 3000)
    })()
  }, [])
  
  return (
    <Page title={t("Common.pages.login")}>
      <LoginModule></LoginModule>
    </Page>
  );
};

export default LoginPage;
