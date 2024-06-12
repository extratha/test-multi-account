"use client";

import { IconSparkle, IconSparkleDisabled } from "@/assets";
import { theme } from "@/config/config-mui";
import { useInterpretInputData } from "@/hooks/useInterpretInputData";
import { Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonInterpretDataStyled } from "../ExampleDataList/styled";
import { ContentContainer } from "../HomePageModule/styled";
import { CommonButton, ContentContainerWrapper } from "./styled";
const InputDataModule = () => {
  const { interpretDataFields } = useInterpretInputData();
  const tAi = useTranslations("AiInterpret");
  const router = useRouter();
  const [isDisableInterpretButton] = useState(true);
  const [modelVersion, setModelVersion] = useState<string | null>(null);
  const handleClickBackButton = () => {
    router.back();
  };
  return (
    <ContentContainer>
      <ContentContainerWrapper>
        <Stack mb={3}>
          <CommonButton data-testid="back-button" onClick={handleClickBackButton}>
            {<Typography variant="labelLargeSemiBold">{tAi("button.backToMain")}</Typography>}
          </CommonButton>
        </Stack>
        <Divider></Divider>
        <Stack mt={3}>
          <Stack direction="row">
            <Typography variant="headlineSmallSemiBold">{tAi("pages.tryInputData")}</Typography>
            <Stack ml="auto">
              <Stack direction="row" spacing={2} justifyContent={"end"}>
                <CommonButton>
                  {<Typography variant="labelLargeSemiBold">{tAi("button.useExampleData")}</Typography>}
                </CommonButton>
                <ButtonInterpretDataStyled disabled={isDisableInterpretButton}>
                  {
                    <>
                      {isDisableInterpretButton ? <IconSparkleDisabled /> : <IconSparkle />}
                      <Typography
                        variant="labelLargeSemiBold"
                        color={isDisableInterpretButton ? theme.palette.grey[600] : theme.palette.background.paper}
                        ml={1}
                      >
                        {tAi("button.interpretData")}
                      </Typography>
                    </>
                  }
                </ButtonInterpretDataStyled>
              </Stack>
              <Stack direction="row" mt={2}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="bodyLarge">{tAi("text.myCredit")}</Typography>
                  <Typography variant="bodyLargeSemiBold">{tAi("text.unlimited")}</Typography>
                </Stack>
                {modelVersion && (
                  <Stack direction="row" ml={2} spacing={1}>
                    <Typography variant="bodyLarge">{tAi("field.modelVersion")}</Typography>
                    <Typography variant="bodyLargeSemiBold">{}</Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ContentContainerWrapper>
    </ContentContainer>
  );
};

export default InputDataModule;
