"use client";

import { CircularProgress, Divider, List, ListItem, Stack, Typography, useTheme } from "@mui/material";

import { useRouter } from "next/navigation";

import { IconAiInterpret, IconPen, IconSparkle } from "@/assets";
import { NEUTRAL } from "@/config/config-mui/theme/colors";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleList } from "@/hooks/useApi";
import useTranslation from "@/locales/useLocale";
import { ExampleDataResult } from "@/types/model.api";
import { ContentContainer, ContentContainerWrapper, TypographyPageHeadline } from "../HomePageModule/styled";
import { ButtonEditDataStyled, ButtonInterpretDataStyled, TagValueStyle } from "./styled";

const EmployeeDataList = () => {
  const router = useRouter();
  const { translation } = useTranslation();
  const theme = useTheme();

  const { data, isLoading, error } = useGetLabExampleList();
  const exampleData = data?.data || [];

  const handleClickAiInterpret = (id: string) => {
    router.push(`${webPaths.aiInterpret.aiInterpretResult}?exampleId=${id}`);
  };

  const handleClickEditData = (exampleData: ExampleDataResult) => {
    const { id } = exampleData;
    try {
      if (!id) throw "no data id.";
      router.push(`${webPaths.aiInterpret.tryInputData}?exampleId=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentContainer>
      <ContentContainerWrapper>
        {isLoading ? (
          <Stack width="100%" height="100%">
            <CircularProgress data-testid="progression" style={{ margin: "auto" }} />
          </Stack>
        ) : (
          <Stack padding="2rem" position={"relative"}>
            <Stack spacing={2.4}>
              <Stack direction="row">
                <IconAiInterpret style={{ margin: "auto 0" }} />
                <TypographyPageHeadline
                  variant="displayMediumSemiBold"
                  sx={{
                    margin: "auto 0 auto 20px",
                  }}
                >
                  {translation("AiInterpret.pages.aiInterpret")}
                </TypographyPageHeadline>
                <Typography
                  variant="labelExtraLargeSemiBold"
                  sx={{
                    margin: "auto 10px 0 auto",
                  }}
                >
                  {translation("AiInterpret.label.aiInterpret")}
                </Typography>
              </Stack>
              <Divider></Divider>
            </Stack>

            <Typography variant="headlineSmallSemiBold" mt={2}>
              {translation("AiInterpret.pages.tryExampleData")}
            </Typography>
            <Stack direction="row" mt={2}>
              <Typography variant="titleLargeSemiBold" mr={1}>
                {translation("AiInterpret.label.exampleData")}
              </Typography>
              {exampleData.length > 0 && <Typography variant="titleLargeSemiBold">({exampleData.length})</Typography>}
            </Stack>

            {exampleData.length === 0 && (
              <Typography variant="titleLargeSemiBold" textAlign={"center"}>
                {error?.message ?? translation("AiInterpret.message.noExampleData")}
              </Typography>
            )}

            <List
              sx={{
                maxHeight: "100%",
                marginTop: "0 !important",
                overflowY: "auto",
              }}
            >
              {exampleData.map((item: ExampleDataResult, index: number) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: "0.8em 0",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      backgroundColor: NEUTRAL[97],
                      borderRadius: "20px",
                      padding: "1.5em",
                      width: "100%",
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="titleMediumSemiBold" color="primary.lighter">
                        {`${translation("AiInterpret.label.exampleData")} ${index + 1}`}
                      </Typography>
                      <Typography variant="titleLargeSemiBold">{item.caseName}</Typography>
                      <Stack direction="row" spacing={1}>
                        <TagValueStyle>
                          {item.gender && (
                            <Typography variant="labelLargeSemiBold">
                              {`${translation("AiInterpret.field.gender")} ${translation(
                                `AiInterpret.text.${item.gender.toLowerCase()}`
                              )}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                        <TagValueStyle>
                          {item.age && (
                            <Typography variant="labelLargeSemiBold">
                              {`${translation("AiInterpret.field.age")} ${item.age} ${translation(
                                "AiInterpret.field.yearsOld"
                              )}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                      </Stack>
                    </Stack>
                    <Stack minWidth="48%" margin="10px 0 0 auto">
                      <Stack direction="row" justifyContent={"end"} spacing={1}>
                        <ButtonEditDataStyled onClick={() => handleClickEditData(item)}>
                          <IconPen />
                          <Typography variant="labelLargeSemiBold" color={theme.palette.grey[700]} ml={1}>
                            {translation("AiInterpret.button.editData")}
                          </Typography>
                        </ButtonEditDataStyled>
                        <ButtonInterpretDataStyled onClick={() => handleClickAiInterpret(item.id)}>
                          <IconSparkle />
                          <Typography variant="labelLargeSemiBold" color={theme.palette.background.paper} ml={1}>
                            {translation("AiInterpret.button.interpretData")}
                          </Typography>
                        </ButtonInterpretDataStyled>
                      </Stack>
                      <Stack direction="row" spacing={1} margin="10px 0 0 auto" color="primary.lighter">
                        <Typography variant="labelLarge">{translation("AiInterpret.field.modelVersion")}</Typography>
                        <Typography variant="labelLargeSemiBold">{item.aiModelVersion}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Stack>
        )}
      </ContentContainerWrapper>
    </ContentContainer>
  );
};

export default EmployeeDataList;
