"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getLabInterpretsByTransactionId, submitLabInterprets } from "@/api/api";
import { IconArrowLeft } from "@/assets";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { INTERPRET_STATUS, NAVIGATION } from "@/constant";
import { useGetLabExampleId } from "@/hooks/useApi";
import useTranslation from "@/locales/useLocale";
import { InterpretResult } from "@/types/model.api";
import { InputDataConfig, InputGroupConfigResult } from "@/types/model.ui";
import { getLabInterpretFieldsConfig } from "@/utils/firebase";
import { mapInputDataToSubmitInterprets } from "@/utils/mapper";
import InputDataFieldType from "./InputDataFieldType";
import InputDataHeader from "./InputDataHeader";
import { useInputDataFieldYupSchema } from "./InputDataSchema";
import InterpretModal from "./InterpretModal";

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
const PAP_SMEAR_GROUP_NAME = "papSmear";
const PAP_SMEAR_FINDING = "papsmear_finding";
const MALE = "Male";

const InputDataModule = () => {
  const router = useRouter();
  const { translation } = useTranslation();
  const searchParams = useSearchParams();
  const interpretId = searchParams.get("exampleId");

  const [isFetching, setIsFetching] = useState(true);
  const [modalInterpretStatus, setModalInterpretStatus] = useState("");
  const [inputGroupConfigs, setInputGroupConfigs] = useState<InputGroupConfigResult[]>([]);
  const refIsCancelledSubmit = useRef(false);

  const { data, isLoading: isGetLabExampleIdLoading } = useGetLabExampleId(interpretId || "");
  const inputData = data?.data?.inputData || [];
  const modelVersion = data?.data?.aiModelVersion || "";

  const isLoading = isGetLabExampleIdLoading || isFetching;

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
    setIsFetching(true);
    const remoteConfig = await getLabInterpretFieldsConfig();
    setInputGroupConfigs(remoteConfig);
    setIsFetching(false);
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

  const cancelSubmitInterpret = () => {
    refIsCancelledSubmit.current = modalInterpretStatus === INTERPRET_STATUS.PENDING;
    setModalInterpretStatus("");
  };

  const onSubmit = async (formValues: FormInputDataValuesType) => {
    try {
      refIsCancelledSubmit.current = false;
      setModalInterpretStatus(INTERPRET_STATUS.PENDING);

      const response = await submitLabInterprets(mapInputDataToSubmitInterprets(formValues, inputGroupConfigs));
      const aiResult = await fetchInterpretResult(response.data.transactionID, Date.now());

      router.replace(`${NAVIGATION.AI_INTERPRET_RESULT}?transactionId=${aiResult.id}`);
    } catch (error) {
      const isNotCancelled = !refIsCancelledSubmit.current;
      refIsCancelledSubmit.current = false;

      if (isNotCancelled) {
        setModalInterpretStatus(INTERPRET_STATUS.FAILED);
      }
    }
  };

  const renderByInputGroupConfig = useMemo(() => {
    return inputGroupConfigs.filter(
      (group) => group.groupName !== PAP_SMEAR_GROUP_NAME || (group.groupName === PAP_SMEAR_GROUP_NAME && !isGenderMale)
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
      setValue(PAP_SMEAR_FINDING, null);
    }
  }, [gender]);

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
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
      {modalInterpretStatus && <InterpretModal status={modalInterpretStatus} onClose={cancelSubmitInterpret} />}
    </>
  );
};

export default InputDataModule;
