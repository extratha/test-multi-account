import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import { RESULT, UNIT_LAB } from "@/constant/constant";
import { InputData } from "@/types/aiInterpret";

export interface AiInterpretLabUnitProps {
  name: string;
  groupName: string;
  inputData: InputData;
}

const UNIT_NO_SHOW = [UNIT_LAB.BLOOD, UNIT_LAB.MG_DL, UNIT_LAB.U_L, UNIT_LAB.NO_UNIT];

const RESULT_POSITIVE_NEGATIVE = [RESULT.NEGATIVE, RESULT.POSITIVE];

const LAB_COLOR_STATUS = ["White", "Yellow", "Turbid", "Amber", "Brown", "Red", "Green", "Orange"];

const AiInterpretLabUnit = (props: AiInterpretLabUnitProps) => {
  const { name, groupName, inputData } = props;
  const tAi = useTranslations("AiInterpret");

  const getValue = () => {
    const unit = !UNIT_NO_SHOW.includes(inputData.unit) ? `(${inputData.unit})` : "";

    if (RESULT_POSITIVE_NEGATIVE.includes(inputData.value)) {
      return `${tAi(`aiInterpretResult.lab.result.${inputData.value.toLowerCase()}`)}${unit}`;
    }

    if (LAB_COLOR_STATUS.includes(inputData.value)) {
      return `${tAi(`aiInterpretResult.lab.color.${inputData.value}`)}${unit}`;
    }

    return `${inputData.value}${unit}`;
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack width="100%" spacing="8px">
        <Typography
          variant="titleMedium"
          fontSize="16px"
          fontWeight={700}
          data-testid={`${name}-${groupName}-${inputData.key}-label`}
        >
          {tAi(`aiInterpretResult.lab.group.${groupName}.${inputData.key}.label`)}
        </Typography>
      </Stack>
      <Stack width="25%">
        <Typography
          variant="titleMedium"
          fontWeight={700}
          textAlign="end"
          data-testid={`${name}-${groupName}-${inputData.key}-value`}
        >
          {getValue()}
        </Typography>
        <Typography variant="bodyMedium" textAlign="end" data-testid={`${name}-${groupName}-${inputData.key}-unit`}>
          {inputData.unit && `(${inputData.range[0].value} ${inputData.unit})`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AiInterpretLabUnit;
