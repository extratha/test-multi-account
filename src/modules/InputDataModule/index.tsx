"use client";

import { IconSparkle } from "@/assets";
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
  const [isDisableInterpretButton] = useState(false);
  const handleClickBackButton = () => {
    router.back();
  };
  return (
    <ContentContainer>
      <ContentContainerWrapper>
        <Stack mb={1}>
          <CommonButton data-testid="back-button" onClick={handleClickBackButton}>
            {<Typography variant="labelLargeSemiBold">{tAi("button.backToMain")}</Typography>}
          </CommonButton>
          <Divider></Divider>
        </Stack>
        <Stack>
          <Stack direction="row">
            <Typography variant="headlineSmallSemiBold">{tAi("pages.tryInputData")}</Typography>
            <Stack ml="auto">
              <Stack direction="row" spacing={2}>
                <CommonButton>
                  {<Typography variant="labelLargeSemiBold">{tAi("button.useExampleData")}</Typography>}
                </CommonButton>
                <ButtonInterpretDataStyled>
                  {
                    <>
                      <IconSparkle />
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
            </Stack>
          </Stack>
        </Stack>
      </ContentContainerWrapper>
    </ContentContainer>
  );
};

export default InputDataModule;
