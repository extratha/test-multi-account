"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Divider, Stack, styled, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { submitLabInterprets } from "@/api/api";
import { IconArrowLeft, IconImportExampleData, IconSparkle, IconSparkleDisabled } from "@/assets";
import { theme } from "@/config/config-mui";
import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { remoteConfigKey } from "@/constant/firebase";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId } from "@/hooks/useApi";
import { InputDataConfig, InputGroupConfig } from "@/types/interpretInputDataConfig";
import { remoteConfig } from "@/utils/firebase";
import { mapInputDataToSubmitInterprets } from "@/utils/mapper";
import { ButtonInterpretDataStyled } from "../ExampleDataList/styled";
import InputDataFieldType from "./InputDataFieldType";
import { useInputDataFieldYupSchema } from "./InputDataSchema";

type FormValues = Record<string, unknown>;

interface DefaultValues {
  [key: string]: string;
}

const CommonButton = styled(Button)(({ theme }) => ({
  padding: 10,
  height: 40,
  background: theme.palette.background.paper,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[500]}`,
  width: "fit-content",
  color: CUSTOM_COLORS.buttonText,
}));

const ContentContainer = styled(Stack)({
  height: "100%",
  width: "100%",
  padding: "24px",
});

const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  maxWidth: "1080px",
  width: "100%",
  height: "100%",
  padding: "2rem",
  margin: "auto",
  overflowY: "auto",
}));

const InputDataGroupContainer = styled(Stack)(({ theme }) => ({
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[400]}`,
  margin: "2rem 0",
}));

const InputDataGroupHeader = styled(Stack)({
  background: NEUTRAL[97],
  padding: "1rem",
  borderRadius: "8px 8px 0px 0px",
});

const InputDataGroupContent = styled(Stack)({
  padding: "1rem",
});

const CircularLoading = styled(CircularProgress)({
  margin: "auto",
});

const InputDataModule = () => {
  const router = useRouter();
  const tAi = useTranslations("AiInterpret");
  const searchParams = useSearchParams();
  const interpretId = searchParams.get("id");

  const [inputGroupConfigs, setInputGroupConfigs] = useState<InputGroupConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: isGetLabExampleIdLoading } = useGetLabExampleId(interpretId || "");
  const inputData = data?.data?.inputData || [];
  const modelVersion = data?.data?.aiModelVersion || "";

  const validateSchema = useInputDataFieldYupSchema(inputGroupConfigs);
  const methods = useForm<FormValues>({
    resolver: yupResolver(validateSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const { handleSubmit, formState, setValue, trigger } = methods;
  const isDisableInterpretButton = isGetLabExampleIdLoading || isLoading || !formState.isValid;

  const defaultInputData: DefaultValues = useMemo(() => {
    const result: DefaultValues = {};

    if (inputData.length === 0) {
      return result;
    }

    inputData.forEach((group) => {
      group.data.forEach((item) => {
        result[item.key] = item.value;
      });
    });

    return result;
  }, [inputData.length]);

  const fetchConfigData = async () => {
    setIsLoading(true);
    const remoteConfigData = await remoteConfig.getString(remoteConfigKey.LAB_INTERPRET_REQUIRE_FIELDS);

    setInputGroupConfigs(JSON.parse(remoteConfigData));
    setIsLoading(false);
  };

  const handleClickBackButton = () => {
    router.push(webPaths.aiInterpret.tryExampleData);
  };

  const handleClickUseExampleData = () => {
    router.push(webPaths.aiInterpret.tryExampleData);
  };

  const onSubmit = async (formValues: FormValues) => {
    try {
      setIsLoading(true);
      await submitLabInterprets(mapInputDataToSubmitInterprets(formValues, inputGroupConfigs));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigData();
  }, []);

  useEffect(() => {
    const fieldNames = Object.keys(defaultInputData);

    if (defaultInputData && fieldNames.length > 0) {
      fieldNames.forEach((fieldName) => {
        setValue(fieldName, defaultInputData[fieldName]);
        trigger(fieldName);
      });
    }
  }, [defaultInputData]);

  return (
    <ContentContainer>
      <ContentContainerWrapper>
        <Stack mb={3}>
          <CommonButton data-testid="back-button" onClick={handleClickBackButton}>
            <IconArrowLeft />
            <Typography ml={1} variant="labelLargeSemiBold">
              {tAi("button.backToMain")}
            </Typography>
          </CommonButton>
        </Stack>
        <Divider></Divider>
        <Stack mt={3}>
          <Stack direction="row">
            <Typography data-testid="page-title" variant="headlineSmallSemiBold">
              {tAi("pages.tryInputData")}
            </Typography>
            <Stack ml="auto">
              <Stack direction="row" spacing={2} justifyContent={"end"}>
                <CommonButton data-testid="use-example-data-button" onClick={handleClickUseExampleData}>
                  <IconImportExampleData />
                  <Typography ml={1} variant="labelLargeSemiBold">
                    {tAi("button.useExampleData")}
                  </Typography>
                </CommonButton>
                <ButtonInterpretDataStyled
                  data-testid="submit-interpret-button"
                  disabled={isDisableInterpretButton}
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  {isDisableInterpretButton ? <IconSparkleDisabled /> : <IconSparkle />}
                  <Typography
                    variant="labelLargeSemiBold"
                    color={isDisableInterpretButton ? theme.palette.grey[600] : theme.palette.background.paper}
                    ml={1}
                  >
                    {tAi("button.interpretData")}
                  </Typography>
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
                    <Typography variant="bodyLargeSemiBold">{modelVersion}</Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          {isLoading ? (
            <Stack width="100%">
              <CircularLoading />
            </Stack>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {inputGroupConfigs.map((group: InputGroupConfig, groupIndex: number) => (
                  <InputDataGroupContainer key={groupIndex}>
                    <InputDataGroupHeader>
                      <Typography variant="titleLargeSemiBold">{tAi(`th.groupName.${group.groupName}`)}</Typography>
                      <Typography
                        variant="bodyLarge"
                        color={theme.palette.grey[600]}
                      >{`(${tAi(`en.groupName.${group.groupName}`)})`}</Typography>
                    </InputDataGroupHeader>
                    <InputDataGroupContent>
                      {group.data.map((field: InputDataConfig, fieldIndex: number) => (
                        <InputDataFieldType key={fieldIndex} field={field} />
                      ))}
                    </InputDataGroupContent>
                  </InputDataGroupContainer>
                ))}
              </form>
            </FormProvider>
          )}
        </Stack>
      </ContentContainerWrapper>
    </ContentContainer>
  );
};

export default InputDataModule;
