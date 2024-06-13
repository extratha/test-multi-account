import { KeyboardArrowDown } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AutocompleteCustomStyle } from "./styled";

export interface Option {
  label: string;
  value: string;
}

interface FormAutocompleteProps {
  name: string;
  label: string;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = ({ name, label, options, required = false, placeholder }) => {
  const { control } = useFormContext();
  const t = useTranslations("Common");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <AutocompleteCustomStyle
          {...field}
          options={options || []}
          getOptionLabel={(option: any) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              required={required}
              error={!!fieldState.error}
              placeholder={`${placeholder || t("placeholder.selectValue")}`}
            />
          )}
          onChange={(_, data: any) => field.onChange(data?.value || null)}
          popupIcon={<KeyboardArrowDown></KeyboardArrowDown>}
        />
      )}
    />
  );
};

export default FormAutocomplete;
