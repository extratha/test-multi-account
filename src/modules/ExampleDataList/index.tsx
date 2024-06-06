'use client'

import { useTranslations } from "next-intl";
import { ContentContainer, ContentContainerWrapper, TypographyPageHeadline } from "../HomePageModule/styled";
import { Button, CircularProgress, Divider, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { IconAiInterpret, IconPen, IconSparkle } from "@/assets";
import { useGetExampleDataList } from "@/hooks/services/useGetExampleDataList";
import { ExampleData } from "@/types/aiInterpret";
import { NEUTRAL } from "@/config/config-mui/theme/colors";
import { ButtonEditDataStyled, ButtonInterpretDataStyled, TagValueStyle } from "./styled";

const EmployeeDataList = () => {
  const tAi = useTranslations('AiInterpret')
  const theme = useTheme()
  const {
    data: exampleData,
    isLoading: isGetExampleDataLoading,
    error: getExampleDataError,
  } = useGetExampleDataList(true)
  return (
    <>
      <ContentContainer>
        <ContentContainerWrapper>
          {isGetExampleDataLoading ?
            <Stack width="100%" height="100%" >
              <CircularProgress style={{ margin: 'auto' }} />
            </Stack>
            :
            <Stack padding="2rem" position={"relative"}>
              <Stack
                spacing={2.4}
              >
                <Stack direction="row">
                  <Image alt="" src={IconAiInterpret} data-testid="icon-menu-item" style={{ margin: "auto 0" }} ></Image>
                  <TypographyPageHeadline
                    variant='displayMediumSemiBold'
                    sx={{
                      margin: 'auto 0 auto 20px'
                    }}
                  >
                    {tAi('pages.aiInterpret')}
                  </TypographyPageHeadline>
                  <Typography
                    variant="labelExtraLargeSemiBold"
                    sx={{
                      margin: 'auto 10px 0 auto'
                    }}
                  >
                    {tAi('label.aiInterpret')}
                  </Typography>
                </Stack>
                <Divider ></Divider>
              </Stack>

              <Typography variant="headlineSmallSemiBold" mt={2}>
                {tAi('pages.tryExampleData')}
              </Typography>
              <Stack direction="row" >
                <Typography variant="titleLargeSemiBold" mr={1}>
                  {tAi('label.exampleData')}
                </Typography>
                {
                  exampleData?.length && exampleData.length > 0 ?
                    <Typography variant="titleLargeSemiBold">({exampleData.length})</Typography>
                    : null
                }
              </Stack>

              {
                !exampleData?.length ?
                  <Typography variant="titleLargeSemiBold" textAlign={'center'}>
                    {
                      getExampleDataError?.message ??
                      tAi('message.noExampleData')
                    }
                  </Typography>
                  : null
              }

              <List
                sx={{
                  maxHeight: '100%',
                  marginTop: '0 !important',
                  overflowY: 'auto',
                }}
                >
                {
                  exampleData && exampleData.map((data: ExampleData, index: number) => {
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          padding: "0.8em 0"
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            backgroundColor: NEUTRAL[97],
                            borderRadius: '20px',
                            padding: '1.5em',
                            width: '100%'
                          }}
                        >
                          <Stack spacing={1}>
                            <Typography variant="titleMediumSemiBold" color={theme.palette.action.active}>
                              {`${tAi('label.exampleData')} ${index + 1}`}
                            </Typography>
                            <Typography variant="titleLargeSemiBold" >
                              {data.caseName}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <TagValueStyle>
                                {
                                  data.gender ?
                                    <Typography variant="labelLargeSemiBold">
                                      {`${tAi('field.gender')} ${tAi(`text.${data.gender.toLowerCase()}`)}`}
                                    </Typography>
                                    : null
                                }
                              </TagValueStyle>
                              <TagValueStyle>
                                {
                                  data.age ?
                                    <Typography variant="labelLargeSemiBold">
                                      {`${tAi('field.age')} ${data.age}`}
                                    </Typography>
                                    : null
                                }
                              </TagValueStyle>
                            </Stack>

                          </Stack>
                          <Stack minWidth={'48%'} margin={'0 0 0 auto'}>
                            <Stack direction="row" justifyContent={'end'} spacing={1}>
                              <ButtonEditDataStyled
                              >
                                <Image alt="" src={IconPen}></Image>
                                <Typography
                                  variant="labelLargeSemiBold"
                                  color={theme.palette.grey[700]}
                                  ml={1}
                                >
                                  {tAi('button.editData')}
                                </Typography>
                              </ButtonEditDataStyled>
                              <ButtonInterpretDataStyled
                              >
                                <Image alt="" src={IconSparkle} ></Image>
                                <Typography
                                  variant="labelLargeSemiBold"
                                  color={theme.palette.background.paper}
                                  ml={1}
                                >
                                  {tAi('button.interpretData')}
                                </Typography>
                              </ButtonInterpretDataStyled>
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={1}
                              margin={'10px 0 0 auto'}
                              color={theme.palette.action.active}
                            >
                              <Typography
                                variant="labelLarge"
                              >
                                {tAi('field.modelVersion')}
                              </Typography>
                              <Typography variant="labelLargeSemiBold">
                                {data.aiModelVersion}
                              </Typography>
                            </Stack>

                          </Stack>
                        </Stack>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Stack>
          }

        </ContentContainerWrapper>
      </ContentContainer>
    </>
  )
}

export default EmployeeDataList;