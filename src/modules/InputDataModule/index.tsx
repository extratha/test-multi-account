"use client";

import { IconArrowLeft, IconImportExampleData, IconSparkle, IconSparkleDisabled } from "@/assets";
import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import { theme } from "@/config/config-mui";
import useInterpretInputDataConfig from "@/hooks/useInterpretInputDataConfig";
import { Field, Group } from "@/types/interpretInputDataConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonInterpretDataStyled } from "../ExampleDataList/styled";
import { ContentContainer } from "../HomePageModule/styled";
import { inputDataFieldYupSchema } from "./InputDataSchema";
import {
  CommonButton,
  ContentContainerWrapper,
  InputDataFieldWrapper,
  InputDataGroupContainer,
  InputDataGroupContent,
  InputDataGroupHeader,
  TypoUnit,
} from "./styled";
type FormValues = Record<string, unknown>;
const InputDataModule = () => {
  // const { interpretDataFields } = useInterpretInputData();
  const tCommon = useTranslations("Common");
  const inputConfig = useInterpretInputDataConfig();
  const validateSchema = inputDataFieldYupSchema(inputConfig, tCommon as (key: string) => string);
  const tAi = useTranslations("AiInterpret");
  const router = useRouter();
  const [modelVersion] = useState<string | null>(null);
  const methods = useForm<FormValues>({
    resolver: yupResolver(validateSchema),
    defaultValues: {},
    mode: "onChange",
  });
  const { handleSubmit, formState } = methods;

  const isDisableInterpretButton = useMemo(() => !formState.isValid, [formState.isValid]);

  const handleClickBackButton = () => {
    router.back();
  };
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  const displayUnit = (field: Field) => {
    if (field.key === "age") return "ปี";
    return field.unit;
  };
  const displayInputComponents = (field: Field) => {
    let placeholder = "";
    if (field.key === "gender") {
      placeholder = tAi("th.placeholder.gender");
    }
    switch (field.fieldType) {
      case "Dropdown":
        return (
          <FormAutocomplete
            name={field.key}
            label={tAi(`th.field.${field.key}`)}
            options={field.dropdownValue?.map((value) => ({
              label: value,
              value: value,
            }))}
            required={field.required}
            placeholder={placeholder}
          />
        );
      case "Number":
        return <FormNumberInput name={field.key} label={tAi(`th.field.${field.key}`)} required={field.required} />;
      default:
        return null;
    }
  };
  return (
    <ContentContainer>
      <ContentContainerWrapper>
        <Stack mb={3}>
          <CommonButton data-testid="back-button" onClick={handleClickBackButton}>
            {
              <>
                <IconArrowLeft />
                <Typography ml={1} variant="labelLargeSemiBold">
                  {tAi("button.backToMain")}
                </Typography>
              </>
            }
          </CommonButton>
        </Stack>
        <Divider></Divider>
        <Stack mt={3}>
          <Stack direction="row">
            <Typography variant="headlineSmallSemiBold">{tAi("pages.tryInputData")}</Typography>
            <Stack ml="auto">
              <Stack direction="row" spacing={2} justifyContent={"end"}>
                <CommonButton>
                  {
                    <>
                      <IconImportExampleData />
                      <Typography ml={1} variant="labelLargeSemiBold">
                        {tAi("button.useExampleData")}
                      </Typography>
                    </>
                  }
                </CommonButton>
                <ButtonInterpretDataStyled disabled={isDisableInterpretButton} onClick={() => handleSubmit(onSubmit)()}>
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

        <Stack>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {inputConfig.length > 0 ? (
                <>
                  {inputConfig.map((group: Group, groupIndex: number) => (
                    <InputDataGroupContainer key={groupIndex}>
                      <InputDataGroupHeader>
                        <Typography variant="titleLargeSemiBold">{tAi(`th.groupName.${group.groupName}`)}</Typography>
                        <Typography
                          variant="bodyLarge"
                          color={theme.palette.grey[600]}
                        >{`(${tAi(`en.groupName.${group.groupName}`)})`}</Typography>
                      </InputDataGroupHeader>
                      <InputDataGroupContent>
                        {group.data.length > 0 && (
                          <>
                            {group.data.map((field: Field, fieldIndex: number) => (
                              <InputDataFieldWrapper container key={fieldIndex}>
                                <Grid item xs={8}>
                                  <Stack direction="row">
                                    <Typography variant="titleMediumSemiBold">
                                      {tAi(`th.field.${field.key}`)}
                                    </Typography>
                                    {field.required && (
                                      <Typography
                                        ml={0.5}
                                        variant="titleLargeSemiBold"
                                        color={theme.palette.error.light}
                                      >
                                        *
                                      </Typography>
                                    )}
                                  </Stack>
                                  <Typography
                                    variant="titleMedium"
                                    color={theme.palette.grey[600]}
                                  >{`(${tAi(`en.field.${field.key}`)})`}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Grid container>
                                    <Grid xs={10} pr={2}>
                                      {displayInputComponents(field)}
                                    </Grid>
                                    <Grid xs={2}>
                                      <TypoUnit variant="bodyLarge">{displayUnit(field)}</TypoUnit>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </InputDataFieldWrapper>
                            ))}
                          </>
                        )}
                      </InputDataGroupContent>
                    </InputDataGroupContainer>
                  ))}
                </>
              ) : (
                <Stack width="100%">
                  <CircularProgress style={{ margin: "auto" }} />
                </Stack>
              )}
            </form>
          </FormProvider>
        </Stack>
      </ContentContainerWrapper>
    </ContentContainer>
  );
};

export default InputDataModule;
