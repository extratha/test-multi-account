"use client";
import { styled } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { Page } from "@/components/Page";
import DashboardPage from "@/components/Page/DashboardPage";
import { ASR_SERVICE_KEY } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { useUserProfileStore } from "@/store";
import { AsrConfig } from "@/types/model.ui";
import { getDashboardMenuConfig } from "@/utils/firebase";

export interface AsrServiceParams {
  service: string;
  [key: string]: string | string[];
}

const IFrame = styled("iframe")({
  width: "100%",
  height: "100%",
  border: "0px",
});

const initialConfig: AsrConfig = {
  name: "",
  url: "",
};

const AsrService = () => {
  const { service } = useParams<AsrServiceParams>();
  const { data } = useUserProfileStore();
  const { translation } = useTranslation();

  const [config, setConfig] = useState(initialConfig);
  const [isLoading, setIsLoading] = useState(true);

  const getTitle = () => {
    return translation(`${ASR_SERVICE_KEY[service]}.title`);
  };

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const { asr } = await getDashboardMenuConfig();
      const pageConfig = asr.find((item) => item.name === service);

      if (!pageConfig) throw new Error("config not found");

      setConfig(pageConfig);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Page title={getTitle()}>
          <DashboardPage>
            <IFrame
              src={`${config.url}?source=${data.corporate}`}
              allow="camera; microphone; clipboard-read; clipboard-write;"
            />
          </DashboardPage>
        </Page>
      )}
    </>
  );
};

export default AsrService;
