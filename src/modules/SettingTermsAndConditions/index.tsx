"use client";

import { Box, Container, Divider, Paper, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { getTermsAndConditionsLatest } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";
import { ConsentResultLatest } from "@/types/model.api";

const Wrapper = styled(Container)({
  position: "relative",
  flex: 1,
  maxWidth: "1024px",
});

// TODO: refactor layout
const WrapperLayout = styled(Box)({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  padding: "24px",
});

const Content = styled(Paper)({
  width: "100%",
  height: "100%",
  padding: "36px 40px",
  borderRadius: "16px",
  boxShadow: "none",
  overflowY: "auto",
});

const TitleDivider = styled(Divider)({
  margin: "8px 0px 24px",
});

const SettingTermsAndConditions = () => {
  const { translation } = useTranslation();
  const { setPageLoading } = usePageLoadingStore();

  const [consent, setConsent] = useState<ConsentResultLatest>();

  const fetchTermsAndConditions = async () => {
    try {
      setPageLoading(true);
      const { data } = await getTermsAndConditionsLatest();
      setConsent(data);
      setPageLoading(false);
    } catch (error) {
      //TODO : handle error
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  return (
    <Wrapper>
      <WrapperLayout>
        {consent && (
          <Content data-testid="terms-and-conditions-consent">
            <Typography variant="titleLargeBold">{translation("Common.settingTermsAndConditions.title")}</Typography>
            <TitleDivider />
            <ConsentContent name="term-and-conditions" data={consent.consent} />
          </Content>
        )}
      </WrapperLayout>
    </Wrapper>
  );
};

export default SettingTermsAndConditions;
