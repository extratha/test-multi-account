"use client";

import { Box, Button, Divider, List, ListItem, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { IconAiInterpret, IconPen, IconSparkle } from "@/assets";
import DashboardPage from "@/components/Page/DashboardPage";
import PageTitle from "@/components/Typography/PageTitle";
import { webPaths } from "@/constant/webPaths";
import { useGetLabExampleList } from "@/hooks/useApi";
import useTranslation from "@/locales/useLocale";
import { usePageLoadingStore } from "@/store";
import { ExampleDataResult } from "@/types/model.api";
import { ButtonInterpretDataStyled } from "./styled";

const ListTitle = styled(Typography)({
  "& span": {
    marginLeft: "4px",
  },
});

const TagValueStyle = styled(Stack)(({ theme }) => ({
  padding: "4px 8px",
  backgroundColor: theme.palette.blueGrey[50],
  borderRadius: "8px",
}));

const ButtonEditDataStyled = styled(Button)(({ theme }) => ({
  height: 40,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[400]}`,
  "&:hover": {
    border: `1px solid ${theme.palette.grey[400]}`,
  },
}));

const EmployeeDataList = () => {
  const router = useRouter();
  const { translation } = useTranslation();
  const { setPageLoading } = usePageLoadingStore();

  const { data, isLoading, error } = useGetLabExampleList();
  const exampleData = data?.data || [];

  const handleClickAiInterpret = (id: string) => {
    router.replace(`${webPaths.aiInterpret.aiInterpretResult}?exampleId=${id}`);
  };

  const handleClickEditData = (exampleData: ExampleDataResult) => {
    const { id } = exampleData;
    try {
      if (!id) throw "no data id.";
      router.replace(`${webPaths.aiInterpret.tryInputData}?exampleId=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPageLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <DashboardPage>
          <Stack padding="2rem">
            <Stack spacing={2.4}>
              <Stack direction="row" alignItems="center">
                <IconAiInterpret />
                <PageTitle variant="headerExtraLargeBold" marginLeft="20px">
                  {translation("AiInterpret.pages.aiInterpret")}
                </PageTitle>
                <Box flex="1" />
                <Typography variant="bodyMedium">{translation("AiInterpret.label.aiInterpret")}</Typography>
              </Stack>
              <Divider></Divider>
            </Stack>
            <Typography variant="headerSemiBold" mt={2}>
              {translation("AiInterpret.pages.tryExampleData")}
            </Typography>
            <ListTitle variant="titleSemibold" marginTop="16px">
              {translation("AiInterpret.label.exampleData")}
              {exampleData.length > 0 && <span>({exampleData.length})</span>}
            </ListTitle>
            {exampleData.length === 0 && (
              <Typography variant="titleSemibold" textAlign="center">
                {error?.message || translation("AiInterpret.message.noExampleData")}
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
                      backgroundColor: "surfaceGray.lowest",
                      borderRadius: "20px",
                      padding: "1.5em",
                      width: "100%",
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="labelExtraSmallBold" color="primary">
                        {`${translation("AiInterpret.label.exampleData")} ${index + 1}`}
                      </Typography>
                      <Typography variant="titleLargeBold">{item.caseName}</Typography>
                      <Stack direction="row" spacing={1}>
                        <TagValueStyle>
                          {item.gender && (
                            <Typography variant="labelExtraSmallBold">
                              {`${translation("AiInterpret.field.gender")} ${translation(
                                `AiInterpret.text.${item.gender.toLowerCase()}`
                              )}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                        <TagValueStyle>
                          {item.age && (
                            <Typography variant="labelExtraSmallBold">
                              {`${translation("AiInterpret.field.age")} ${item.age} ${translation(
                                "AiInterpret.field.yearsOld"
                              )}`}
                            </Typography>
                          )}
                        </TagValueStyle>
                      </Stack>
                    </Stack>
                    <Stack minWidth="48%" spacing="16px" margin="10px 0 0 auto">
                      <Stack direction="row" justifyContent={"end"} spacing={1}>
                        <ButtonEditDataStyled
                          variant="outlined"
                          startIcon={<IconPen />}
                          onClick={() => handleClickEditData(item)}
                        >
                          <Typography variant="labelExtraSmallBold" color="text.hight">
                            {translation("AiInterpret.button.editData")}
                          </Typography>
                        </ButtonEditDataStyled>
                        <ButtonInterpretDataStyled
                          variant="contained"
                          startIcon={<IconSparkle />}
                          onClick={() => handleClickAiInterpret(item.id)}
                        >
                          <Typography variant="labelExtraSmallBold">
                            {translation("AiInterpret.button.interpretData")}
                          </Typography>
                        </ButtonInterpretDataStyled>
                      </Stack>
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Typography variant="labelExtraSmall" color="primary">
                          {translation("AiInterpret.field.modelVersion")}
                        </Typography>
                        <Typography variant="labelExtraSmallBold" color="primary">
                          {item.aiModelVersion}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Stack>
        </DashboardPage>
      )}
    </>
  );
};

export default EmployeeDataList;
