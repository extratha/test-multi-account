import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormNumberInputProps {
  name: string;
  label: string;
  required?: boolean;
  decimalScale?: number;
  min?: number;
  max?: number;
}

const FormNumberInput: React.FC<FormNumberInputProps> = ({ name, label, required = false, decimalScale, min, max }) => {
  const { control } = useFormContext();
  const t = useTranslations("Common");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          type="number"
          required={required}
          error={!!fieldState.error}
          placeholder={t("placeholder.enterValue")}
          InputProps={{
            inputProps: {
              min,
              max,
              step: decimalScale ? 1 / Math.pow(10, decimalScale) : 1,
            },
          }}
        />
      )}
    />
  );
};

export default FormNumberInput;
