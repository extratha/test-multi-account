import { Grid, Stack, styled, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import FormAutocomplete from "@/components/Form/FormAutocomplete";
import FormNumberInput from "@/components/Form/FormNumberInput";
import FormTextInput from "@/components/Form/FormTextInput";
import { CONFIG_FIELD_TYPES } from "@/constant/constant";
import { InputDataConfig } from "@/types/interpretInputDataConfig";

interface InputDataFieldTypeProps {
  field: InputDataConfig;
}
// TODO: Unit test

const InputDataFieldWrapper = styled(Grid)({
  padding: "1rem",
});

const TypoUnit = styled(Typography)(({ theme }) => ({
  wordBreak: "break-word",
  whiteSpace: "pre-line",
  width: "100%",
  color: theme.palette.grey[600],
  margin: "auto 0",
}));

const InputDataFieldType = ({ field }: InputDataFieldTypeProps) => {
  const t = useTranslations("Common");
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

  const displayUnit = (field: InputDataConfig) => {
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
          <Grid item xs={10} pr={2}>
            {field.fieldType === CONFIG_FIELD_TYPES.DROPDOWN && (
              <FormAutocomplete
                name={field.key}
                label={tAi(`th.field.${field.key}`)}
                options={getDropdownOptions()}
                placeholder={getPlaceholder()}
                required={field.required}
              />
            )}
            {field.fieldType === CONFIG_FIELD_TYPES.NUMBER && (
              <FormNumberInput name={field.key} placeholder={t("placeholder.enterValue")} required={field.required} />
            )}
            {field.fieldType === CONFIG_FIELD_TYPES.STRING && (
              <FormTextInput name={field.key} placeholder={t("placeholder.enterValue")} required={field.required} />
            )}
          </Grid>
          <Grid item xs={2} display={"flex"}>
            <TypoUnit variant="bodyLarge">{displayUnit(field)}</TypoUnit>
          </Grid>
        </Grid>
      </Grid>
    </InputDataFieldWrapper>
  );
};

export default InputDataFieldType;
