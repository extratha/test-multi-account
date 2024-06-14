import { KeyboardArrowDown } from "@mui/icons-material";
import { TextField, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { AutocompleteCustomStyle } from "./styled";

export interface Option {
  label: string;
  value: string;
}

export interface FormAutocompleteProps {
  name: string;
  label: string;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = ({ name, label, options, required = false, placeholder }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  const t = useTranslations("Common");

  const theme = useTheme();
  return (
    <>
      <AutocompleteCustomStyle
        {...field}
        data-testid={`autocomplete-${name}`}
        options={options || []}
        getOptionLabel={(option: any) => option?.label || ""}
        isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
        noOptionsText={t("text.noOptions")}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            error={!!fieldState.error}
            placeholder={`${placeholder || t("placeholder.selectValue")}`}
          />
        )}
        onChange={(_, data: any) => field.onChange(data?.value || null)}
        popupIcon={<KeyboardArrowDown data-testid="drop-icon"></KeyboardArrowDown>}
      />
      {error && (
        <Typography data-testid={`error-field-${name}`} variant="bodyLarge" color={theme.palette.error.light}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default FormAutocomplete;
