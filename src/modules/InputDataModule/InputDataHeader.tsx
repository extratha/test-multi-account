import { Button, Stack, styled, Typography } from "@mui/material";

import { IconImportExampleData, IconSparkle, IconSparkleDisabled } from "@/assets";
import useTranslation from "@/locales/useLocale";
import { ButtonInterpretDataStyled } from "../ExampleDataList/styled";

const CommonButton = styled(Button)(({ theme }) => ({
  height: 40,
  padding: "10px 16px",
  borderRadius: "8px",
  color: theme.palette.text.hight,
  border: `1px solid ${theme.palette.background.border}`,
  background: theme.palette.background.paper,
  "&:hover": {
    border: `1px solid ${theme.palette.background.border}`,
  },
}));

export interface InputDataHeaderProps {
  isDisableSubmit: boolean;
  modelVersion?: string;
  onClickUseExampleData: () => void;
  onSubmit: () => void;
}

const InputDataHeader = (props: InputDataHeaderProps) => {
  const { isDisableSubmit, onSubmit, onClickUseExampleData, modelVersion } = props;
  const { translation } = useTranslation();
  return (
    <Stack mt={3}>
      <Stack direction="row">
        <Stack justifyContent="center">
          <Typography data-testid="page-title" variant="headerSemiBold">
            {translation("AiInterpret.pages.tryInputData")}
          </Typography>
        </Stack>
        <Stack ml="auto">
          <Stack direction="row" spacing={2} justifyContent="end">
            <CommonButton
              variant="outlined"
              startIcon={<IconImportExampleData />}
              data-testid="use-example-data-button"
              onClick={onClickUseExampleData}
            >
              {translation("AiInterpret.button.useExampleData")}
            </CommonButton>
            <ButtonInterpretDataStyled
              variant="contained"
              startIcon={isDisableSubmit ? <IconSparkleDisabled /> : <IconSparkle />}
              disabled={isDisableSubmit}
              data-testid="submit-interpret-button"
              onClick={onSubmit}
            >
              {translation("AiInterpret.button.interpretData")}
            </ButtonInterpretDataStyled>
          </Stack>
          <Stack direction="row" mt={2}>
            <Stack direction="row" spacing={1}>
              <Typography variant="labelExtraSmall">{translation("AiInterpret.text.myCredit")}</Typography>
              <Typography variant="labelExtraSmallBold">{translation("AiInterpret.text.unlimited")}</Typography>
            </Stack>
            {modelVersion && (
              <Stack direction="row" ml={2} spacing={1}>
                <Typography variant="labelExtraSmall">{translation("AiInterpret.field.modelVersion")}</Typography>
                <Typography variant="labelExtraSmallBold">{modelVersion}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InputDataHeader;
