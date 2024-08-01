import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import FormTextInput from "@/components/Form/FormTextInput";
import Tooltip from "@/components/Tooltip";
import { CONFIG_FIELD_TYPES } from "@/constant";
import { FIELD_NAME } from "@/constant/AiInterpret";
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
    return field.key === FIELD_NAME.GENDER
      ? translation("AiInterpret.th.placeholder.gender")
      : translation("AiInterpret.th.placeholder.select");
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
