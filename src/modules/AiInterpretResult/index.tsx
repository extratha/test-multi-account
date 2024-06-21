"use client";

import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { IconArrowLeft, IconCopy, IconPen, IconSparkle } from "@/assets";
import Tag from "@/components/Tag";
import { CUSTOM_COLORS, NEUTRAL, linearGradient } from "@/config/config-mui/theme/colors";
import { GENDER, GENERAL_CHECK_UP, GROUP_NAME } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId } from "@/hooks/useApi";
import { GroupName, InputData } from "@/types/aiInterpret";
import AiInterpretLabResult from "./AiInterpretLebResult";

const ContentContainer = styled(Stack)({
  height: "100%",
  width: "100%",
  padding: "24px",
});

const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  maxWidth: "1080px",
  margin: "auto",
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

const Markdown = styled(ReactMarkdown)({
  fontSize: "16px",
  whiteSpace: "normal",
  color: CUSTOM_COLORS.textHighEmp,
});

const General = styled(Stack)({
  color: CUSTOM_COLORS.textHighEmp,
  border: `1px solid ${NEUTRAL[99]}`,
  borderRadius: "8px",
  overflow: "hidden",
});

const GeneralHeader = styled(Stack)({
  padding: "24px 24px 12px 24px",
  backgroundColor: NEUTRAL[97],
});

const GeneralTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
});

const GeneralInformation = styled(Stack)({
  padding: "12px 24px 24px",
});

const GeneralInformationUnit = styled(Typography)({
  width: "60px",
  color: CUSTOM_COLORS.lightSteelgray,
});

const AiInterpretResult = () => {
  const searchParams = useSearchParams();
  const interpretId = searchParams.get("id") || "";
  const tAi = useTranslations("AiInterpret");
  const router = useRouter();

  const { data, isLoading } = useGetLabExampleId(interpretId);
  const interpretData = data?.data;

  const aiResultData = interpretData?.aiResult.data || [];
  const inputDataResultData = interpretData?.inputData || [];

  const gender: Record<string, string> = {
    [GENDER.MALE]: tAi("aiInterpretResult.gender.male"),
    [GENDER.FEMALE]: tAi("aiInterpretResult.gender.female"),
  };

  const informationGender: Record<string, string> = {
    [GENDER.MALE]: tAi("aiInterpretResult.general.information.gender.male"),
    [GENDER.FEMALE]: tAi("aiInterpretResult.general.information.gender.female"),
  };

  const { generalData, labData } = useMemo(() => {
    const generalData: GroupName[] = [];
    const labData: GroupName[] = [];

    inputDataResultData.forEach((item) => {
      if (item.groupName === GROUP_NAME.GENERAL_CHECK_UP) {
        generalData.push(item);
      } else {
        labData.push(item);
      }
    });

    return { generalData, labData };
  }, [inputDataResultData.length]);

  const handleClickEdit = () => {
    router.push(`${webPaths.aiInterpret.tryInputData}?id=${interpretId}`);
  };

  const handleClickBack = () => {
    router.push(webPaths.aiInterpret.tryExampleData);
  };

  const handleClickCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getInformationValue = (item: InputData) => {
    switch (item.key) {
      case GENERAL_CHECK_UP.GENDER:
        return informationGender[item.value];
      default:
        return item.value;
    }
  };

  const getInformationUnit = (item: InputData) => {
    switch (item.key) {
      case GENERAL_CHECK_UP.AGE:
        return tAi("aiInterpretResult.general.information.age.unit");
      default:
        return item.unit;
    }
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
              {tAi("aiInterpretResult.button.back")}
            </Button>
            <Button startIcon={<IconPen />} onClick={handleClickEdit} data-testid="ai-interpret-button-edit">
              {tAi("aiInterpretResult.button.edit")}
            </Button>
          </Stack>
          <DividerLine />
          <Stack spacing="16px" padding="16px 0px">
            <InformationBackground>
              <InformationBox>
                <Stack padding="24px" spacing="8px">
                  <Stack direction="row" justifyContent="space-between">
                    <Example variant="labelMedium" data-testid="ai-interpret-example-rank">
                      {tAi("aiInterpretResult.example", { num: interpretData?.ranking })}
                    </Example>
                    <ModelVersion direction="row" spacing="4px">
                      <Typography variant="bodySmall">{tAi("aiInterpretResult.modalVersion")}</Typography>
                      <Version variant="labelMedium" data-testid="ai-interpret-version">
                        {interpretData?.aiModelVersion}
                      </Version>
                    </ModelVersion>
                  </Stack>
                  <Name variant="titleLargeSemiBold" data-testid="ai-interpret-example-name">
                    {interpretData?.caseName}
                  </Name>
                  <Stack direction="row" spacing="8px">
                    <Tag name="ai-interpret-gender" text={gender[interpretData?.gender || ""]} />
                    <Tag name="ai-interpret-age" text={tAi("aiInterpretResult.age", { age: interpretData?.age })} />
                  </Stack>
                </Stack>
                {aiResultData.length > 0 && (
                  <>
                    <Stack padding="16px 0px 0px 0px">
                      <DividerDashed />
                      <InterpretTile direction="row" spacing="6px">
                        <IconSparkle />
                        <Title variant="labelMedium" data-testid="ai-interpret-title">
                          {tAi("aiInterpretResult.title")}
                        </Title>
                      </InterpretTile>
                    </Stack>
                    <Stack padding="24px" spacing="24px" divider={<Divider flexItem />}>
                      {aiResultData.map((option, index) => (
                        <Stack key={`ai-interpret-result-${index}`} spacing="16px">
                          <TitleResult variant="labelExtraLargeSemiBold" data-testid={`ai-interpret-title-${index}`}>
                            {index + 1}. {option.title}
                          </TitleResult>
                          <Markdown data-testid={`ai-interpret-description-${index}`}>{option.description}</Markdown>
                          <Button
                            startIcon={<IconCopy />}
                            onClick={() => {
                              handleClickCopy(option.description);
                            }}
                            data-testid={`ai-interpret-button-copy-${index}`}
                          >
                            {tAi("aiInterpretResult.button.copy")}
                          </Button>
                        </Stack>
                      ))}
                    </Stack>
                  </>
                )}
              </InformationBox>
            </InformationBackground>
            {inputDataResultData.length > 0 && (
              <General>
                <GeneralHeader>
                  <GeneralTitle variant="titleMediumBold">{tAi("aiInterpretResult.general.title")}</GeneralTitle>
                </GeneralHeader>
                {generalData[0].data.map((item, index) => (
                  <GeneralInformation key={`general-${index}`} direction="row" justifyContent="space-between">
                    <Typography
                      variant="titleMediumBold"
                      fontWeight={700}
                      data-testid={`ai-interpret-general-information-title-${item.key}`}
                    >
                      {tAi(`aiInterpretResult.general.information.${item.key}.title`)}
                    </Typography>

                    <Stack direction="row" spacing="36px">
                      <Typography
                        variant="bodyMedium"
                        data-testid={`ai-interpret-general-information-${item.key}-value`}
                      >
                        {getInformationValue(item)}
                      </Typography>
                      <GeneralInformationUnit
                        variant="bodyMedium"
                        data-testid={`ai-interpret-general-information-${item.key}-unit`}
                      >
                        {getInformationUnit(item)}
                      </GeneralInformationUnit>
                    </Stack>
                  </GeneralInformation>
                ))}
              </General>
            )}
            {labData.map((item, index) => (
              <AiInterpretLabResult key={`ai-interpret-lab-${index}`} name="ai-interpret-lab" group={item} />
            ))}
          </Stack>
        </ContentContainerWrapper>
      )}
    </ContentContainer>
  );
};

export default AiInterpretResult;
