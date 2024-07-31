import { KeyboardArrowDown } from "@mui/icons-material";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { useController, useFormContext } from "react-hook-form";

import useTranslation from "@/locales/useLocale";
import { FieldErrorMessage } from "../FieldErrorMessage";

export interface Option {
  label: string;
  value: string;
}

export interface FormAutocompleteProps {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
}

const FormAutocomplete = ({ name, options, required = false, placeholder }: FormAutocompleteProps) => {
  const { translation } = useTranslation();

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const value = field.value || null;
  const error = fieldState.error?.message || "";

  const handleChangeValue = (_: SyntheticEvent, data: Option | null) => {
    field.onChange(data?.value || null);
  };

  return (
    <>
      <Autocomplete
        {...field}
        value={value}
        data-testid={`autocomplete-${name}`}
        options={options}
        noOptionsText={translation("Common.text.noOptions")}
        isOptionEqualToValue={(option) => option.value === value}
        renderInput={(params) => (
          <TextField {...params} required={required} error={!!fieldState.error} placeholder={placeholder} />
        )}
        renderOption={(props, option) => (
          <Typography {...props} component="li" variant="bodySmallMedium" color="blueGrey.500">
            {option.label}
          </Typography>
        )}
        popupIcon={<KeyboardArrowDown data-testid="drop-icon" />}
        onChange={handleChangeValue}
      />
      {error && <FieldErrorMessage data-testid={`error-field-${name}`}>{error}</FieldErrorMessage>}
    </>
  );
};

export default FormAutocomplete;
