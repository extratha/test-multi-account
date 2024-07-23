"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getLabInterpretsByTransactionId, submitLabInterprets } from "@/api/api";
import { IconArrowLeft } from "@/assets";
import { INTERPRET_STATUS, NAVIGATION } from "@/constant";
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
const PAPSMEAR_GROUP_NAME = "papSmear";
const PAPSMEAR_FINDING = "papsmear_finding";
const MALE = "Male";

const InputDataModule = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { translation } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { isPageLoading, setPageLoading } = usePageLoadingStore();

  const interpretId = searchParams.get("exampleId");

  const [inputGroupConfigs, setInputGroupConfigs] = useState<InputGroupConfigResult[]>([]);
  const refIsCancelledSubmit = useRef(false);

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

  const { formState, setValue, trigger, watch } = methods;
  const isDisableInterpretButton = isGetLabExampleIdLoading || formState.isValidating || !formState.isValid;
  const gender = watch("gender");
  const isGenderMale = gender === MALE;

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
    router.replace(NAVIGATION.AI_INTERPRET_TRY_EXAMPLE_DATA);
  };

  const handleClickUseExampleData = () => {
    router.replace(NAVIGATION.AI_INTERPRET_TRY_EXAMPLE_DATA);
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
    if (refIsCancelledSubmit.current) {
      throw new Error("CANCEL_SUBMIT");
    } else if (Date.now() - startTime > MAX_INTERVAL) {
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

  const handleClickCancelSubmit = () => {
    refIsCancelledSubmit.current = true;
    closeModal();
  };

  const onSubmit = async (formValues: FormInputDataValuesType) => {
    try {
      refIsCancelledSubmit.current = false;
      openModal(
        (props) => (
          <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.PENDING} onCancel={handleClickCancelSubmit} />
        ),
        false
      );

      const response = await submitLabInterprets(mapInputDataToSubmitInterprets(formValues, inputGroupConfigs));
      const aiResult = await fetchInterpretResult(response.data.transactionID, Date.now());

      closeModal();
      router.replace(`${NAVIGATION.AI_INTERPRET_RESULT}?transactionId=${aiResult.id}`);
    } catch (error) {
      if (!refIsCancelledSubmit.current) {
        openModal((props) => <InterpretModals {...props} interpretStatus={INTERPRET_STATUS.FAILED} />, false);
      }

      refIsCancelledSubmit.current = false;
    }
  };

  const renderByInputGroupConfig = useMemo(() => {
    return inputGroupConfigs.filter(
      (group) => group.groupName !== PAPSMEAR_GROUP_NAME || (group.groupName === PAPSMEAR_GROUP_NAME && !isGenderMale)
    );
  }, [inputGroupConfigs, gender]);

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

  useEffect(() => {
    if (isGenderMale) {
      setValue(PAPSMEAR_FINDING, null);
    }
  }, [gender]);

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
                {renderByInputGroupConfig.map((group, groupIndex) => (
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
