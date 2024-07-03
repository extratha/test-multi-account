"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Divider, Stack, styled, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getLabInterpretsByTransactionId, submitLabInterprets } from "@/api/api";
import { IconArrowLeft } from "@/assets";
import { CUSTOM_COLORS, NEUTRAL } from "@/config/config-mui/theme/colors";
import { INTERPRET_STATUS } from "@/constant/constant";
import { remoteConfigKey } from "@/constant/firebase";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId } from "@/hooks/useApi";
import useModal from "@/store/modal";
import { InterpretResult } from "@/types/model.api";
import { InputDataConfig, InputGroupConfig } from "@/types/model.ui";
import { remoteConfig } from "@/utils/firebase";
import { mapInputDataToSubmitInterprets } from "@/utils/mapper";
import InputDataFieldType from "./InputDataFieldType";
import InputDataHeader from "./InputDataHeader";
import { useInputDataFieldYupSchema } from "./InputDataSchema";
import InterpretModals from "./InterpretingModals";

export type FormInputDataValuesType = Record<string, unknown>;

interface DefaultValues {
  [key: string]: string;
}

const CommonButton = styled(Button)(({ theme }) => ({
  width: "fit-content",
  height: 40,
  padding: 10,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[500]}`,
  background: theme.palette.background.paper,
  color: CUSTOM_COLORS.buttonText,
}));

const ContentContainer = styled(Stack)({
  height: "100%",
  width: "100%",
  padding: "24px",
});

const ContentContainerWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxWidth: "1080px",
  padding: "2rem",
  margin: "auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  overflowY: "auto",
}));

const InputDataGroupContainer = styled(Stack)(({ theme }) => ({
  margin: "2rem 0",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[400]}`,
}));

const InputDataGroupHeader = styled(Stack)({
  padding: "1rem",
  background: NEUTRAL[97],
  borderRadius: "8px 8px 0px 0px",
});

const InputDataGroupContent = styled(Stack)({
  padding: "1rem",
});

const CircularLoading = styled(CircularProgress)({
  margin: "auto",
});

const MAX_INTERVAL = 30000;
const INTERVAL_DELAY = 5000;

const InputDataModule = () => {
  const router = useRouter();
  const tAi = useTranslations("AiInterpret");
  const searchParams = useSearchParams();
  const interpretId = searchParams.get("id");
  const { openModal } = useModal();

  const [inputGroupConfigs, setInputGroupConfigs] = useState<InputGroupConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: isGetLabExampleIdLoading } = useGetLabExampleId(interpretId || "");
  const inputData = data?.data?.inputData || [];
  const modelVersion = data?.data?.aiModelVersion || "";

  const validateSchema = useInputDataFieldYupSchema(inputGroupConfigs);
  const methods = useForm<FormInputDataValuesType>({
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

  const waitTimer = (millisecond: number) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, millisecond);
    });
  };

  const fetchInterpretResult = async (transactionID: string, startTime: number): Promise<InterpretResult> => {
    if (Date.now() - startTime > MAX_INTERVAL) {
      throw new Error("fetchInterpretResult: timeout");
    }

    const { data } = await getLabInterpretsByTransactionId(transactionID);

    if (data.status === INTERPRET_STATUS.SUCCESS) {
      return data;
    } else {
      await waitTimer(INTERVAL_DELAY);
      return fetchInterpretResult(transactionID, startTime);
    }
  };

  const onSubmit = async (formValues: FormInputDataValuesType) => {
    try {
      setIsLoading(true);
      const response = await submitLabInterprets(mapInputDataToSubmitInterprets(formValues, inputGroupConfigs));
      setIsLoading(false);

      openModal((props) => <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.PENDING} />, false);
      await fetchInterpretResult(response.data.transactionID, Date.now());
    } catch (error) {
      setIsLoading(false);
      openModal((props) => <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.FAILED} />, false);
    }
  };

  useEffect(() => {
    fetchConfigData();
  }, []);

  useEffect(() => {
    const fieldNames = Object.keys(defaultInputData);

    const setFieldValues = () => {
      if (defaultInputData && fieldNames.length > 0) {
        fieldNames.map((fieldName) => {
          setValue(fieldName, defaultInputData[fieldName], { shouldValidate: true });
          trigger(fieldName);
        });
      }
    };

    setFieldValues();
  }, [defaultInputData]);

  useEffect(() => {
    if (inputData.length > 0 && defaultInputData) {
      trigger();
    }
  }, [isLoading]);

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
        <Divider />
        <InputDataHeader
          isDisableSubmit={isDisableInterpretButton}
          modelVersion={modelVersion}
          onSubmit={() => handleSubmit(onSubmit)()}
          onClickUseExampleData={handleClickUseExampleData}
        />

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
                        color="grey.600"
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
