"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getLabInterpretsByTransactionId, submitLabInterprets } from "@/api/api";
import { IconArrowLeft } from "@/assets";
import { INTERPRET_STATUS } from "@/constant/constant";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleId } from "@/hooks/useApi";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";
import useModal from "@/store/modal";
import { InterpretResult } from "@/types/model.api";
import { InputDataConfig, InputGroupConfigResult } from "@/types/model.ui";
import { getLabInterpretFieldsConfig } from "@/utils/firebase";
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
  height: 40,
  color: theme.palette.text.hight,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.blueGrey[100]}`,
  background: theme.palette.background.paper,
  "&:hover": {
    border: `1px solid ${theme.palette.blueGrey[100]}`,
  },
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  width: "100%",
  padding: "24px",
  backgroundColor: theme.palette.background.grayLight,
}));

const ContentContainerWrapper = styled(Paper)({
  flex: 1,
  width: "100%",
  maxWidth: "1080px",
  padding: "32px",
  borderRadius: "20px",
  margin: "0px auto",
});

const InputDataGroupContainer = styled(Stack)(({ theme }) => ({
  margin: "2rem 0",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.background.borderLight}`,
}));

const InputDataGroupHeader = styled(Stack)(({ theme }) => ({
  padding: "24px 24px 12px",
  borderRadius: "8px 8px 0px 0px",
  backgroundColor: theme.palette.surfaceGray.lowest,
}));

const InputDataGroupContent = styled(Stack)({
  padding: "16px",
});

const MAX_INTERVAL = 60000;
const INTERVAL_DELAY = 5000;

const InputDataModule = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { translation } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { isPageLoading, setPageLoading } = usePageLoadingStore();

  const interpretId = searchParams.get("exampleId");

  const [inputGroupConfigs, setInputGroupConfigs] = useState<InputGroupConfigResult[]>([]);

  const { data, isLoading: isGetLabExampleIdLoading } = useGetLabExampleId(interpretId || "");
  const inputData = data?.data?.inputData || [];
  const modelVersion = data?.data?.aiModelVersion || "";

  const isLoading = isGetLabExampleIdLoading || isPageLoading;

  const validateSchema = useInputDataFieldYupSchema(inputGroupConfigs);
  const methods = useForm<FormInputDataValuesType>({
    resolver: yupResolver(validateSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const { formState, setValue, trigger } = methods;
  const isDisableInterpretButton = isGetLabExampleIdLoading || !formState.isValid;

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
    setPageLoading(true);
    const remoteConfig = await getLabInterpretFieldsConfig();
    setInputGroupConfigs(remoteConfig);
    setPageLoading(false);
  };

  const handleClickBackButton = () => {
    router.replace(webPaths.aiInterpret.tryExampleData);
  };

  const handleClickUseExampleData = () => {
    router.replace(webPaths.aiInterpret.tryExampleData);
  };

  const handleSetDefaultValue = () => {
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
      openModal((props) => <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.PENDING} />, false);
      const response = await submitLabInterprets(mapInputDataToSubmitInterprets(formValues, inputGroupConfigs));
      const aiResult = await fetchInterpretResult(response.data.transactionID, Date.now());

      router.replace(`${webPaths.aiInterpret.aiInterpretResult}?transactionId=${aiResult.id}`);
      closeModal();
    } catch (error) {
      openModal((props) => <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.FAILED} />, false);
    }
  };

  useEffect(() => {
    fetchConfigData();
  }, []);

  useEffect(() => {
    handleSetDefaultValue();
  }, [defaultInputData]);

  useEffect(() => {
    if (inputData.length > 0 && defaultInputData) {
      trigger();
    }
  }, [inputData.length, isLoading]);

  return (
    <>
      {!isLoading && (
        <ContentContainer>
          <ContentContainerWrapper>
            <Stack mb="16px" alignItems="flex-start">
              <CommonButton
                variant="outlined"
                startIcon={<IconArrowLeft />}
                data-testid="back-button"
                onClick={handleClickBackButton}
              >
                {translation("AiInterpret.button.backToMain")}
              </CommonButton>
            </Stack>
            <Divider />
            <InputDataHeader
              isDisableSubmit={isDisableInterpretButton}
              modelVersion={modelVersion}
              onSubmit={methods.handleSubmit(onSubmit)}
              onClickUseExampleData={handleClickUseExampleData}
            />
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {inputGroupConfigs.map((group, groupIndex) => (
                  <InputDataGroupContainer key={groupIndex}>
                    <InputDataGroupHeader>
                      <Typography variant="titleBold">
                        {translation(`AiInterpret.th.groupName.${group.groupName}`)}
                      </Typography>
                      <Typography variant="bodySmall" marginTop="4px">{`(${translation(
                        `AiInterpret.en.groupName.${group.groupName}`
                      )})`}</Typography>
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
          </ContentContainerWrapper>
        </ContentContainer>
      )}
    </>
  );
};

export default InputDataModule;
