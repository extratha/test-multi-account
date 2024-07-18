import { Box, Grid, Stack, styled, Typography } from "@mui/material";

import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import FormTextInput from "@/components/Form/FormTextInput";
import { CONFIG_FIELD_TYPES } from "@/constant/constant";
import useTranslation from "@/locales/useLocale";
import { InputDataConfig } from "@/types/model.ui";

interface InputDataFieldTypeProps {
  field: InputDataConfig;
}

// TODO: Unit test
const InputDataFieldWrapper = styled(Grid)({
  padding: "16px",
});

const TypoUnit = styled(Typography)(({ theme }) => ({
  wordBreak: "break-word",
  color: theme.palette.grey[600],
}));

const InputDataFieldType = ({ field }: InputDataFieldTypeProps) => {
  const { translation } = useTranslation();

  const getPlaceholder = () => {
    if (field.key === "gender") {
      return translation("AiInterpret.th.placeholder.gender");
    }
    return "";
  };

  const getDropdownOptions = () => {
    const dropdown = field.dropdownValue || [];
    return dropdown.map((value) => ({
      label: value,
      value,
    }));
  };

  const displayUnit = (field: InputDataConfig) => {
    if (field.key === "age") return translation("AiInterpret.field.yearsOld");
    return field.unit;
  };

  return (
    <InputDataFieldWrapper container>
      <Grid item xs={7}>
        <Stack direction="row">
          <Typography variant="bodyBold">{translation(`AiInterpret.th.field.${field.key}`)}</Typography>
          {field.required && (
            <Typography ml={0.5} variant="bodyBold" color="error">
              *
            </Typography>
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
              {displayUnit(field)}
            </TypoUnit>
          </Stack>
        </Stack>
      </Grid>
    </InputDataFieldWrapper>
  );
};

export default InputDataFieldType;
