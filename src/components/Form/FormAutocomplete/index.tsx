import { KeyboardArrowDown } from "@mui/icons-material";
import { Autocomplete as MuiAutocomplete, styled, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";

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

interface AutocompleteCustomStyleProps {
  onChange: (event: React.ChangeEvent<"object">, data: Option | null) => void;
}

export const Autocomplete = styled(MuiAutocomplete)<AutocompleteCustomStyleProps>(() => ({
  minWidth: "200px",
}));

const FormAutocomplete = ({ name, options, required = false, placeholder }: FormAutocompleteProps) => {
  const t = useTranslations("Common");

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  return (
    <>
      <Autocomplete
        {...field}
        data-testid={`autocomplete-${name}`}
        options={options || []}
        // TODO : Refactor
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
        popupIcon={<KeyboardArrowDown data-testid="drop-icon" />}
      />
      {error && (
        <Typography data-testid={`error-field-${name}`} variant="bodyLarge" color="error.light">
          {error}
        </Typography>
      )}
    </>
  );
};

export default FormAutocomplete;
