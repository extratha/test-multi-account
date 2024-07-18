import { Stack, Typography } from "@mui/material";

import useTranslation from "@/locales/useLocale";
import { InputData } from "@/types/model.api";

export interface AiInterpretLabUnitProps {
  name: string;
  groupName: string;
  inputData: InputData;
}

const AiInterpretLabUnit = (props: AiInterpretLabUnitProps) => {
  const { name, groupName, inputData } = props;
  const { translation } = useTranslation();

  const getValue = () => {
    const unit = inputData.unit && ` (${inputData.unit})`;
    return `${inputData.value}${unit}`;
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack width="100%" spacing="8px">
        <Typography variant="bodyBold" data-testid={`${name}-${groupName}-${inputData.key}-label`}>
          {translation(`AiInterpret.aiInterpretResult.lab.group.${groupName}.${inputData.key}.label`)}
        </Typography>
      </Stack>
      <Stack width="25%">
        <Typography variant="bodyBold" textAlign="end" data-testid={`${name}-${groupName}-${inputData.key}-value`}>
          {getValue()}
        </Typography>
        <Typography variant="bodySmall" textAlign="end" data-testid={`${name}-${groupName}-${inputData.key}-unit`}>
          {inputData.unit && `(${inputData.range[0].value} ${inputData.unit})`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AiInterpretLabUnit;
