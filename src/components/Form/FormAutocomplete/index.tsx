import { useController, useFormContext } from "react-hook-form";

import useTranslation from "@/locales/useLocale";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ListItem, Autocomplete as MuiAutocomplete, styled, TextField, Typography } from "@mui/material";
import { FieldErrorMessage } from "../FieldErrorMessage";

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

const OptionItem = styled(ListItem)(({ theme }) => ({
  padding: "16px 24px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.grey[100],
  },
  "&&[aria-selected=true], &[aria-selected=true].Mui-focused, .Mui-focused": {
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },
  },
}));
interface AutocompleteCustomStyleProps {
  onChange: (event: React.ChangeEvent<"object">, data: Option | null) => void;
}

export const Autocomplete = styled(MuiAutocomplete)<AutocompleteCustomStyleProps>(() => ({
  minWidth: "200px",
}));

const FormAutocomplete = ({ name, options, required = false, placeholder }: FormAutocompleteProps) => {
  const { translation } = useTranslation();

  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  return (
    <>
      <Autocomplete
        {...field}
        value={field.value || ""}
        data-testid={`autocomplete-${name}`}
        options={options || []}
        // TODO : Refactor
        isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
        noOptionsText={translation("Common.text.noOptions")}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            error={!!fieldState.error}
            placeholder={`${placeholder || translation("Common.placeholder.selectValue")}`}
          />
        )}
        renderOption={(props, option) => (
          <OptionItem {...props} key={(option as Option).value}>
            <Typography variant="bodySmallMedium" color="blueGrey.500">
              {(option as Option).label}
            </Typography>
          </OptionItem>
        )}
        onChange={(_, data) => {
          field.onChange((data as Option)?.value || null);
        }}
        popupIcon={<KeyboardArrowDown data-testid="drop-icon" />}
      />
      {error && <FieldErrorMessage data-testid={`error-field-${name}`}>{error}</FieldErrorMessage>}
    </>
  );
};

export default FormAutocomplete;
