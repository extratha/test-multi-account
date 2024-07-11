"use client";

import { Box, Container, Divider, Paper, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { getPrivacyPolicyLatest } from "@/api/api";
import ConsentContent from "@/components/ConsentContent";
import useTranslation from "@/locales/useLocale";
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

const SettingPrivacyPolicy = () => {
  const { translation } = useTranslation()

  const [consent, setConsent] = useState<ConsentResultLatest>();

  const fetchPrivacyPolicy = async () => {
    try {
      const { data } = await getPrivacyPolicyLatest();
      setConsent(data);
    } catch (error) {
      //TODO : handle error
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <Wrapper>
      <WrapperLayout>
        {consent && (
          <Content data-testid="privacy-policy-consent">
            <Typography variant="titleLargeSemiBold">{translation("Common.settingPrivacyPolicy.title")}</Typography>
            <Typography variant="titleLargeSemiBold">{translation("Common.button.next")}</Typography>
            <TitleDivider />
            <ConsentContent name="privacy-policy" data={consent.consent} />
          </Content>
        )}
      </WrapperLayout>
    </Wrapper>
  );
};

export default SettingPrivacyPolicy;
