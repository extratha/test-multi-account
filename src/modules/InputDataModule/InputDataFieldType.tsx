import { Grid, Stack, styled, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import { CONFIG_FIELD_TYPES } from "@/constant/constant";
import { Field } from "@/types/interpretInputDataConfig";

interface InputDataFieldTypeProps {
  field: Field;
}
// TODO: Unit test

const InputDataFieldWrapper = styled(Grid)({
  padding: "1rem",
});

const TypoUnit = styled(Typography)(({ theme }) => ({
  wordWrap: "break-word",
  color: theme.palette.grey[600],
  margin: "auto 0",
}));

const InputDataFieldType = ({ field }: InputDataFieldTypeProps) => {
  const tAi = useTranslations("AiInterpret");

  const getPlaceholder = () => {
    if (field.key === "gender") {
      return tAi("th.placeholder.gender");
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

  const displayUnit = (field: Field) => {
    if (field.key === "age") return tAi("field.yearsOld");
    return field.unit;
  };

  return (
    <InputDataFieldWrapper container>
      <Grid item xs={8}>
        <Stack direction="row">
          <Typography variant="titleMediumSemiBold">{tAi(`th.field.${field.key}`)}</Typography>
          {field.required && (
            <Typography ml={0.5} variant="titleLargeSemiBold" color="error.light">
              *
            </Typography>
          )}
        </Stack>
        <Typography variant="titleMedium" color="grey.600">{`(${tAi(`en.field.${field.key}`)})`}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid xs={10} pr={2}>
            {field.fieldType === CONFIG_FIELD_TYPES.DROPDOWN && (
              <FormAutocomplete
                name={field.key}
                label={tAi(`th.field.${field.key}`)}
                options={getDropdownOptions()}
                required={field.required}
                placeholder={getPlaceholder()}
              />
            )}
            {field.fieldType === CONFIG_FIELD_TYPES.NUMBER && (
              <FormNumberInput name={field.key} label={tAi(`th.field.${field.key}`)} required={field.required} />
            )}
          </Grid>
          <Grid xs={2}>
            <TypoUnit variant="bodyLarge">{displayUnit(field)}</TypoUnit>
          </Grid>
        </Grid>
      </Grid>
    </InputDataFieldWrapper>
  );
};

export default InputDataFieldType;
