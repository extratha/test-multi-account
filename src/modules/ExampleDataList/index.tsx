"use client";

import { IconAiInterpret, IconPen, IconSparkle } from "@/assets";
import { NEUTRAL } from "@/config/config-mui/theme/colors";
import { webPaths } from "@/constant/webPaths";
import { useGetExampleDataList } from "@/hooks/services/useGetExampleDataList";
import { ExampleData } from "@/types/aiInterpret";
import { CircularProgress, Divider, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ContentContainer, ContentContainerWrapper, TypographyPageHeadline } from "../HomePageModule/styled";
import { ButtonEditDataStyled, ButtonInterpretDataStyled, TagValueStyle } from "./styled";

const EmployeeDataList = () => {
  const tAi = useTranslations("AiInterpret");
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading: isGetExampleDataLoading, error: getExampleDataError } = useGetExampleDataList(true);

  const exampleData = data || [];
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleClickEditData = (exampleData: ExampleData) => {
    const { id } = exampleData;
    try {
      if (!id) throw "no data id.";
      router.push(`${webPaths.aiInterpret.tryInputData}?${createQueryString("id", id)}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContentContainer>
      <ContentContainerWrapper>
        {isGetExampleDataLoading ? (
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
                  {tAi("pages.aiInterpret")}
                </TypographyPageHeadline>
                <Typography
                  variant="labelExtraLargeSemiBold"
                  sx={{
                    margin: "auto 10px 0 auto",
                  }}
                >
                  {tAi("label.aiInterpret")}
                </Typography>
              </Stack>
              <Divider></Divider>
            </Stack>

            <Typography variant="headlineSmallSemiBold" mt={2}>
              {tAi("pages.tryExampleData")}
            </Typography>
            <Stack direction="row" mt={2}>
              <Typography variant="titleLargeSemiBold" mr={1}>
                {tAi("label.exampleData")}
              </Typography>
              {exampleData.length > 0 && <Typography variant="titleLargeSemiBold">({exampleData.length})</Typography>}
            </Stack>

            {exampleData.length > 0 && (
              <Typography variant="titleLargeSemiBold" textAlign={"center"}>
                {getExampleDataError?.message ?? tAi("message.noExampleData")}
              </Typography>
            )}

            <List
              sx={{
                maxHeight: "100%",
                marginTop: "0 !important",
                overflowY: "auto",
              }}
            >
              {exampleData.map((item: ExampleData, index: number) => (
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
                      <Typography variant="titleMediumSemiBold" color={theme.palette.action.active}>
                        {`${tAi("label.exampleData")} ${index + 1}`}
                      </Typography>
                      <Typography variant="titleLargeSemiBold">{item.caseName}</Typography>
                      <Stack direction="row" spacing={1}>
                        <TagValueStyle>
                          {item.gender && (
                            <Typography variant="labelLargeSemiBold">
                              {`${tAi("field.gender")} ${tAi(`text.${item.gender.toLowerCase()}`)}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                        <TagValueStyle>
                          {item.age && (
                            <Typography variant="labelLargeSemiBold">
                              {`${tAi("field.age")} ${item.age} ${tAi("field.yearsOld")}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                      </Stack>
                    </Stack>
                    <Stack minWidth={"48%"} margin={"0 0 0 auto"}>
                      <Stack direction="row" justifyContent={"end"} spacing={1}>
                        <ButtonEditDataStyled onClick={() => handleClickEditData(item)}>
                          <IconPen />
                          <Typography variant="labelLargeSemiBold" color={theme.palette.grey[700]} ml={1}>
                            {tAi("button.editData")}
                          </Typography>
                        </ButtonEditDataStyled>
                        <ButtonInterpretDataStyled>
                          <IconSparkle />
                          <Typography variant="labelLargeSemiBold" color={theme.palette.background.paper} ml={1}>
                            {tAi("button.interpretData")}
                          </Typography>
                        </ButtonInterpretDataStyled>
                      </Stack>
                      <Stack direction="row" spacing={1} margin={"10px 0 0 auto"} color={theme.palette.action.active}>
                        <Typography variant="labelLarge">{tAi("field.modelVersion")}</Typography>
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
