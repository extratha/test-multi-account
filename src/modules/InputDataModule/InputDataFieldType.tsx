import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import FormTextInput from "@/components/Form/FormTextInput";
import Tooltip from "@/components/Tooltip";
import { CONFIG_FIELD_TYPES } from "@/constant";
import useTranslation from "@/locales/useLocale";
import { InputDataConfig, NormalRange } from "@/types/model.ui";

interface InputDataFieldTypeProps {
  field: InputDataConfig;
}

const InputDataFieldWrapper = styled(Grid)({
  padding: "16px",
});

const TypoUnit = styled(Typography)(({ theme }) => ({
  wordBreak: "break-word",
  color: theme.palette.grey[600],
}));

const FIELD_NAME = {
  GENDER: "gender",
  STOOL_COLOR: "stool_color",
  STOOL_WBC: "stool_wbc",
  STOOL_RBC: "stool_rbc",
  STOOL_PARASITE: "stool_parasite",
  STOOL_OCCULT_BLOOD: "stool_occult_blood",
  STOOL_CULTURE: "stool_culture",
  URINE_COLOR: "urine_color_value",
  URINE_SP_GR_VALUE: "urine_sp_gr_value",
  URINE_PH_VALUE: "urine_ph_value",
  URINE_WBC_VALUE: "urine_wbc_value",
  URINE_PROTEIN_VALUE: "urine_protein_value",
  URINE_GLUCOSE_VALUE: "urine_glucose_value",
  URINE_ERYTHROCYTE_VALUE: "urine_erythrocyte_value",
  URINE_RBC_VALUE: "urine_rbc_value",
};

const InputDataFieldType = ({ field }: InputDataFieldTypeProps) => {
  const { translation } = useTranslation();
  const fieldRange = field.range || [];

  const { watch } = useFormContext();
  const gender: string = watch(FIELD_NAME.GENDER) || "";

  const normalRange = useMemo(() => {
    if (!gender) return fieldRange;
    return fieldRange.filter((range) => range.type === gender.toLowerCase());
  }, [fieldRange.length, gender]);

  const getPlaceholder = () => {
    switch (field.key) {
      case FIELD_NAME.GENDER:
        return translation("AiInterpret.th.placeholder.gender");
      case FIELD_NAME.STOOL_COLOR:
      case FIELD_NAME.URINE_COLOR:
        return translation("AiInterpret.th.placeholder.selectColor");
      case FIELD_NAME.STOOL_WBC:
      case FIELD_NAME.STOOL_RBC:
      case FIELD_NAME.STOOL_PARASITE:
      case FIELD_NAME.STOOL_OCCULT_BLOOD:
      case FIELD_NAME.STOOL_CULTURE:
      case FIELD_NAME.URINE_SP_GR_VALUE:
      case FIELD_NAME.URINE_PH_VALUE:
      case FIELD_NAME.URINE_WBC_VALUE:
      case FIELD_NAME.URINE_PROTEIN_VALUE:
      case FIELD_NAME.URINE_GLUCOSE_VALUE:
      case FIELD_NAME.URINE_ERYTHROCYTE_VALUE:
        return translation("AiInterpret.th.placeholder.selectStatus");
      default:
        return translation("AiInterpret.th.placeholder.select");
    }
  };

  const getDropdownOptions = () => {
    const dropdown = field.dropdownValue || [];
    return dropdown.map((value) => ({
      label: value,
      value,
    }));
  };

  const getTooltip = (range: NormalRange) => {
    const prefix = gender ? "" : `${translation(`AiInterpret.tooltip.${range.type}`)}: `;
    return `${prefix}${range.value}`;
  };

  const getUnit = (field: InputDataConfig) => {
    if (field.key === "age") return translation("AiInterpret.field.yearsOld");
    return field.unit;
  };

  return (
    <InputDataFieldWrapper container>
      <Grid item xs={7}>
        <Stack direction="row">
          <Typography variant="bodyBold">{translation(`AiInterpret.th.field.${field.key}`)}</Typography>
          {field.required && (
            <Typography variant="bodyBold" color="error">
              *
            </Typography>
          )}
          {normalRange.length > 0 && (
            <Box marginLeft="12px">
              <Tooltip
                content={
                  <Stack>
                    <Typography variant="bodySmallMedium" marginBottom="6px">
                      {translation("AiInterpret.tooltip.normalRange")}
                    </Typography>
                    {normalRange.map((range, index) => (
                      <Typography key={index} variant="bodySmall">
                        {getTooltip(range)}
                      </Typography>
                    ))}
                  </Stack>
                }
              />
            </Box>
          )}
        </Stack>
        <Typography variant="bodySmall" color="text.medium">{`(${translation(
          `AiInterpret.en.field.${field.key}`
        )})`}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Stack direction="row" spacing="8px" width="100%">
          <Box width="100%">
            {field.fieldType === CONFIG_FIELD_TYPES.DROPDOWN && (
              <FormAutocomplete
                name={field.key}
                label={translation(`AiInterpret.th.field.${field.key}`)}
                options={getDropdownOptions()}
                placeholder={getPlaceholder()}
                required={field.required}
              />
            )}
            {field.fieldType === CONFIG_FIELD_TYPES.NUMBER && (
              <FormNumberInput
                name={field.key}
                placeholder={translation("Common.placeholder.enterValue")}
                required={field.required}
              />
            )}
            {field.fieldType === CONFIG_FIELD_TYPES.STRING && (
              <FormTextInput
                name={field.key}
                placeholder={translation("Common.placeholder.enterValue")}
                required={field.required}
              />
            )}
          </Box>
          <Stack width="150px" height="48px" justifyContent="center">
            <TypoUnit variant="bodySmall" color="text.medium">
              {getUnit(field)}
            </TypoUnit>
          </Stack>
        </Stack>
      </Grid>
    </InputDataFieldWrapper>
  );
};

export default InputDataFieldType;
