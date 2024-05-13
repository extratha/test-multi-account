"use client";

import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";
import { Page } from "@/components/page";
import { Typography } from "@mui/material";
import { ColorModeContext } from "@/config/config-mui/RootStyleProvider/ColorModeContext";
import { useTheme } from "@mui/material";

const LandingPage = () => {
  const t = useTranslations();
  return (
    <Page title={t("Common.pages.landing")}>
      <Typography>Landing</Typography>
    </Page>
  );
};

export default LandingPage;
