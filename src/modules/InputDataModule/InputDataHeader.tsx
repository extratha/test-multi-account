import { Button, Stack, styled, Typography } from "@mui/material";

import { IconImportExampleData, IconSparkle, IconSparkleDisabled } from "@/assets";
import { CUSTOM_COLORS } from "@/config/config-mui/theme/colors";
import { ButtonInterpretDataStyled } from "../ExampleDataList/styled";
import useTranslation from "@/locales/useLocale";

const CommonButton = styled(Button)(({ theme }) => ({
  width: "fit-content",
  height: 40,
  padding: 10,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.grey[500]}`,
  background: theme.palette.background.paper,
  color: CUSTOM_COLORS.buttonText,
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
        <Typography data-testid="page-title" variant="headlineSmallSemiBold">
          {translation("AiInterpret.pages.tryInputData")}
        </Typography>
        <Stack ml="auto">
          <Stack direction="row" spacing={2} justifyContent="end">
            <CommonButton data-testid="use-example-data-button" onClick={onClickUseExampleData}>
              <IconImportExampleData />
              <Typography ml={1} variant="labelLargeSemiBold">
                {translation("AiInterpret.button.useExampleData")}
              </Typography>
            </CommonButton>
            <ButtonInterpretDataStyled
              data-testid="submit-interpret-button"
              disabled={isDisableSubmit}
              onClick={onSubmit}
            >
              {isDisableSubmit ? <IconSparkleDisabled /> : <IconSparkle />}
              <Typography variant="labelLargeSemiBold" color={isDisableSubmit ? "grey.600" : "background.paper"} ml={1}>
                {translation("AiInterpret.button.interpretData")}
              </Typography>
            </ButtonInterpretDataStyled>
          </Stack>
          <Stack direction="row" mt={2}>
            <Stack direction="row" spacing={1}>
              <Typography variant="bodyLarge">{translation("AiInterpret.text.myCredit")}</Typography>
              <Typography variant="bodyLargeSemiBold">{translation("AiInterpret.text.unlimited")}</Typography>
            </Stack>
            {modelVersion && (
              <Stack direction="row" ml={2} spacing={1}>
                <Typography variant="bodyLarge">{translation("AiInterpret.field.modelVersion")}</Typography>
                <Typography variant="bodyLargeSemiBold">{modelVersion}</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InputDataHeader;
