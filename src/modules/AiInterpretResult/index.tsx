"use client";

import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { IconArrowLeft, IconCopy, IconPen, IconSparkle } from "@/assets";
import Tag from "@/components/Tag";
import { GENDER, GENERAL_CHECK_UP, GROUP_NAME } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId, useGetLabInterpretResultId } from "@/hooks/useApi";
import useTranslation from "@/locales/useLocale";
import { InputData, InputDataResult } from "@/types/model.api";
import AiInterpretLabResult from "./AiInterpretLebResult";

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  width: "100%",
  padding: "24px",
  backgroundColor: theme.palette.background.grayLight,
}));

const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  flex: 1,
  width: "100%",
  maxWidth: "1080px",
  margin: "0px auto",
  padding: "24px 30px",
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
  "& .MuiButton-root": {
    padding: "10px 16px",
    alignItems: "center",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.background.border}`,
    fontSize: "12px",
    fontWeight: 700,
    color: theme.palette.text.hight,
  },
  "& > .MuiButton-startIcon": {
    marginRight: "8px",
  },
}));

const DividerLine = styled(Divider)({
  margin: "8px 0px",
});

const InformationBackground = styled(Stack)(({ theme }) => ({
  padding: "2px",
  borderRadius: "24px",
  background: theme.palette.background.gradient,
}));

const InformationBox = styled(Stack)(({ theme }) => ({
  width: "100%",
  justifyContent: "start",
  borderRadius: "22px",
  background: theme.palette.common.white,
}));

const Example = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const ModelVersion = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Version = styled(Typography)({
  fontWeight: 600,
});

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.hight,
}));

const InterpretTile = styled(Stack)(({ theme }) => ({
  padding: "8px 16px",
  alignItems: "center",
  margin: "-18px auto 0px",
  borderRadius: "32px",
  background: theme.palette.background.gradient,
}));

const DividerDashed = styled("div")(({ theme }) => ({
  padding: "1px 0px",
  backgroundImage: `linear-gradient(to right, ${theme.palette.background.border} 50%, #FFFFFF 50%)`,
  backgroundSize: "12px 1px",
  backgroundRepeat: "repeat-x",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.common.white,
}));

const TitleResult = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const Markdown = styled(ReactMarkdown)(({ theme }) => ({
  fontSize: "16px",
  whiteSpace: "normal",
  color: theme.palette.text.hight,
}));

const General = styled(Stack)(({ theme }) => ({
  color: theme.palette.text.hight,
  border: `1px solid ${theme.palette.background.borderLight}`,
  borderRadius: "8px",
  overflow: "hidden",
}));

const GeneralHeader = styled(Stack)(({ theme }) => ({
  padding: "24px 24px 12px 24px",
  backgroundColor: theme.palette.surfaceGray.lowest,
}));

const GeneralTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
});

const GeneralInformation = styled(Stack)({
  padding: "12px 24px 24px",
});

const GeneralInformationUnit = styled(Typography)(({ theme }) => ({
  width: "60px",
  color: theme.palette.text.medium,
}));

const AiInterpretResult = () => {
  const searchParams = useSearchParams();
  const exampleId = searchParams.get("exampleId") || "";
  const transactionId = searchParams.get("transactionId") || "";
  const { translation } = useTranslation();
  const router = useRouter();

  const labInterpretResult = useGetLabInterpretResultId(transactionId);
  const labExampleResult = useGetLabExampleId(transactionId ? "" : exampleId);

  const interpretData = labExampleResult.data?.data || labInterpretResult.data?.data;
  const aiResultData = interpretData?.aiResult.data || [];
  const inputDataResultData = interpretData?.inputData || [];
  const isLoading = labExampleResult.isLoading || labInterpretResult.isLoading;

  const gender: Record<string, string> = {
    [GENDER.MALE]: translation("AiInterpret.aiInterpretResult.gender.male"),
    [GENDER.FEMALE]: translation("AiInterpret.aiInterpretResult.gender.female"),
  };

  const informationGender: Record<string, string> = {
    [GENDER.MALE]: translation("AiInterpret.aiInterpretResult.general.information.gender.male"),
    [GENDER.FEMALE]: translation("AiInterpret.aiInterpretResult.general.information.gender.female"),
  };

  const { generalData, labData } = useMemo(() => {
    const generalData: InputDataResult[] = [];
    const labData: InputDataResult[] = [];

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
    router.push(`${webPaths.aiInterpret.tryInputData}?exampleId=${exampleId}`);
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
        return translation("AiInterpret.aiInterpretResult.general.information.age.unit");
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
              {translation("AiInterpret.aiInterpretResult.button.back")}
            </Button>
            <Button startIcon={<IconPen />} onClick={handleClickEdit} data-testid="ai-interpret-button-edit">
              {translation("AiInterpret.aiInterpretResult.button.edit")}
            </Button>
          </Stack>
          <DividerLine />
          <Stack spacing="16px" padding="16px 0px">
            <InformationBackground>
              <InformationBox>
                <Stack padding="24px" spacing="8px">
                  <Stack direction="row" justifyContent="space-between">
                    <Example variant="labelExtraSmallBold" data-testid="ai-interpret-example-rank">
                      {translation("AiInterpret.aiInterpretResult.example", { num: interpretData?.ranking })}
                    </Example>
                    <ModelVersion direction="row" spacing="4px">
                      <Typography variant="labelExtraSmall">
                        {translation("AiInterpret.aiInterpretResult.modalVersion")}
                      </Typography>
                      <Version variant="labelExtraSmallBold" data-testid="ai-interpret-version">
                        {interpretData?.aiModelVersion}
                      </Version>
                    </ModelVersion>
                  </Stack>
                  <Name variant="titleLargeBold" data-testid="ai-interpret-example-name">
                    {interpretData?.caseName}
                  </Name>
                  <Stack direction="row" spacing="8px">
                    <Tag name="ai-interpret-gender" text={gender[interpretData?.gender || ""]} />
                    <Tag
                      name="ai-interpret-age"
                      text={translation("AiInterpret.aiInterpretResult.age", { age: interpretData?.age })}
                    />
                  </Stack>
                </Stack>
                {aiResultData.length > 0 && (
                  <>
                    <Stack padding="16px 0px 0px 0px">
                      <DividerDashed />
                      <InterpretTile direction="row" spacing="6px">
                        <IconSparkle />
                        <Title variant="labelExtraSmallBold" data-testid="ai-interpret-title">
                          {translation("AiInterpret.aiInterpretResult.title")}
                        </Title>
                      </InterpretTile>
                    </Stack>
                    <Stack padding="24px" spacing="24px" divider={<Divider flexItem />}>
                      {aiResultData.map((option, index) => (
                        <Stack key={`ai-interpret-result-${index}`} spacing="16px">
                          <TitleResult data-testid={`ai-interpret-title-${index}`}>
                            {`${index + 1}. ${option.title}`}
                          </TitleResult>
                          <Markdown data-testid={`ai-interpret-description-${index}`}>{option.description}</Markdown>
                          <Stack direction="row">
                            <Button
                              startIcon={<IconCopy />}
                              onClick={() => handleClickCopy(option.description)}
                              data-testid={`ai-interpret-button-copy-${index}`}
                            >
                              {translation("AiInterpret.aiInterpretResult.button.copy")}
                            </Button>
                          </Stack>
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
                  <GeneralTitle variant="titleBold">
                    {translation("AiInterpret.aiInterpretResult.general.title")}
                  </GeneralTitle>
                </GeneralHeader>
                {generalData[0].data.map((item, index) => (
                  <GeneralInformation key={`general-${index}`} direction="row" justifyContent="space-between">
                    <Typography variant="bodyBold" data-testid={`ai-interpret-general-information-title-${item.key}`}>
                      {translation(`AiInterpret.aiInterpretResult.general.information.${item.key}.title`)}
                    </Typography>
                    <Stack direction="row" spacing="36px">
                      <Typography
                        variant="bodySmall"
                        data-testid={`ai-interpret-general-information-${item.key}-value`}
                      >
                        {getInformationValue(item)}
                      </Typography>
                      <GeneralInformationUnit
                        variant="bodySmall"
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
