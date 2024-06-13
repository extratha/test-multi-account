"use client";

import { Button, CircularProgress, Divider, Stack, Typography, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

import { IconArrowLeft, IconCopy, IconPen, IconSparkle } from "@/assets";
import Tag from "@/components/Tag";
import { CUSTOM_COLORS, linearGradient } from "@/config/config-mui/theme/colors";
import { GENDER } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId } from "@/hooks/useApi";

export interface ConfigurationInterpretParams {
  [key: string]: string | string[];
  interpretId: string;
}

const ContentContainer = styled(Stack)({
  height: "100%",
  width: "100%",
  padding: "24px",
});

const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  padding: "24px 30px",
  borderRadius: "16px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  "& .MuiButton-root": {
    width: "fit-content;",
    height: "40px",
    padding: "10px 16px",
    alignItems: "center",
    borderRadius: "8px",
    border: "1px solid #CFD8DC",
    fontSize: "12px",
    fontWeight: 700,
    color: CUSTOM_COLORS.textHighEmp,
  },
  "& > .MuiButton-startIcon": {
    marginRight: "8px",
  },
}));

const DividerLine = styled(Divider)({
  margin: "8px 0px",
});

const InformationBackground = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: "2px",
  borderRadius: "24px",
  background: theme.palette.gradients?.main,
}));

const InformationBox = styled(Stack)(({ theme }) => ({
  width: "100%",
  justifyContent: "start",
  borderRadius: "22px",
  background: theme.palette.common.white,
}));

const Example = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.lighter,
}));

const ModelVersion = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.lighter,
}));

const Version = styled(Typography)({
  fontWeight: 600,
});

const Name = styled(Typography)({
  fontWeight: 700,
  color: CUSTOM_COLORS.textHighEmp,
});

const InterpretTile = styled(Stack)(({ theme }) => ({
  padding: "8px 16px",
  alignItems: "center",
  alignSelf: "center",
  borderRadius: "32px",
  background: theme.palette.gradients?.main,
}));

const DividerDashed = styled("div")({
  padding: "1px 0px",
  margin: "0px 0px -18px 0px",
  backgroundImage: linearGradient.dashed,
  backgroundPosition: "top",
  backgroundSize: "10px 1px",
  backgroundRepeat: "repeat-x",
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.common.white,
}));

const TitleResult = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.lighter,
}));

const DescriptionResult = styled(Typography)({
  color: CUSTOM_COLORS.textHighEmp,
});

const AiInterpretResult = () => {
  const params = useParams<ConfigurationInterpretParams>();
  const interpretId = params.interpretId || "";
  const tAi = useTranslations("AiInterpret");
  const router = useRouter();

  const { data, isLoading } = useGetLabExampleId(interpretId);
  const interpretData = data?.data;
  const aiResultData = interpretData?.aiResult.data || [];

  const gender = useMemo(() => {
    return interpretData?.gender === GENDER.MALE
      ? tAi("AiInterpretResult.gender.male")
      : tAi("AiInterpretResult.gender.female");
  }, []);

  const handleClickBack = () => {
    router.push(webPaths.aiInterpret.tryExampleData);
  };

  const handleClickCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ContentContainer>
      {isLoading ? (
        <Stack width="100%" height="100%" data-testid="ai-interpret-loading">
          <CircularProgress style={{ margin: "auto" }} data-testid="ai-interpret-circular-progress" />
        </Stack>
      ) : (
        <ContentContainerWrapper>
          <Stack direction="row" justifyContent="space-between">
            <Button startIcon={<IconArrowLeft />} onClick={handleClickBack} data-testid="ai-interpret-button-back">
              {tAi("AiInterpretResult.button.back")}
            </Button>
            <Button startIcon={<IconPen />} data-testid="ai-interpret-button-edit">
              {tAi("AiInterpretResult.button.edit")}
            </Button>
          </Stack>
          <DividerLine />
          <Stack spacing="16px" padding="16px 0px">
            <InformationBackground>
              <InformationBox>
                <Stack padding="24px" spacing="8px">
                  <Stack direction="row" justifyContent="space-between">
                    <Example variant="labelMedium" data-testid="ai-interpret-example-rank">
                      {tAi("AiInterpretResult.example", { num: interpretData?.ranking })}
                    </Example>
                    <ModelVersion direction="row" spacing="4px">
                      <Typography variant="bodySmall">{tAi("AiInterpretResult.modalVersion")}</Typography>
                      <Version variant="labelMedium" data-testid="ai-interpret-version">
                        {interpretData?.aiModelVersion}
                      </Version>
                    </ModelVersion>
                  </Stack>
                  <Name variant="titleLargeSemiBold" data-testid="ai-interpret-example-name">
                    {interpretData?.caseName}
                  </Name>
                  <Stack direction="row" spacing="8px">
                    <Tag name="ai-interpret-gender" text={gender} />
                    <Tag name="ai-interpret-age" text={tAi("AiInterpretResult.age", { age: interpretData?.age })} />
                  </Stack>
                </Stack>
                {aiResultData.length > 0 && (
                  <>
                    <Stack padding="16px 0px 0px 0px">
                      <DividerDashed />
                      <InterpretTile direction="row" spacing="6px">
                        <IconSparkle />
                        <Title variant="labelMedium" data-testid="ai-interpret-title">
                          {tAi("AiInterpretResult.title")}
                        </Title>
                      </InterpretTile>
                    </Stack>
                    <Stack padding="24px" spacing="24px" divider={<Divider flexItem />}>
                      {aiResultData.map((option, index) => (
                        <Stack key={`ai-interpret-result-${index}`} spacing="16px">
                          <TitleResult variant="labelExtraLargeSemiBold" data-testid={`ai-interpret-title-${index}`}>
                            {index + 1}. {option.title}
                          </TitleResult>
                          <DescriptionResult data-testid={`ai-interpret-description-${index}`}>
                            {option.description}
                          </DescriptionResult>
                          <Button
                            startIcon={<IconCopy />}
                            onClick={() => {
                              handleClickCopy(option.description);
                            }}
                            data-testid={`ai-interpret-button-copy-${index}`}
                          >
                            {tAi("AiInterpretResult.button.copy")}
                          </Button>
                        </Stack>
                      ))}
                    </Stack>
                  </>
                )}
              </InformationBox>
            </InformationBackground>
          </Stack>
        </ContentContainerWrapper>
      )}
    </ContentContainer>
  );
};

export default AiInterpretResult;
