import { TextField, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

export interface FormNumberInputProps {
  name: string;
  label: string;
  required?: boolean;
  decimalScale?: number;
  min?: number;
  max?: number;
}

const FormNumberInput: React.FC<FormNumberInputProps> = ({ name, label, required = false, decimalScale, min, max }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  const t = useTranslations("Common");

  const theme = useTheme();
  return (
    <>
      <TextField
        {...field}
        value={field.value}
        fullWidth
        error={!!error}
        placeholder={t("placeholder.enterValue")}
        InputProps={{
          inputProps: {
            min,
            max,
            step: decimalScale ? 1 / Math.pow(10, decimalScale) : 1,
            "data-testid": `input-number-${name}`,
          },
        }}
      />
      {error && (
        <Typography data-testid={`error-field-${name}`} variant="bodyLarge" color={theme.palette.error.light}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default FormNumberInput;
