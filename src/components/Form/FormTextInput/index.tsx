import { TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { FieldErrorMessage } from "../FieldErrorMessage";

export interface FormTextInputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
}

const FormTextInput = ({ name, placeholder, required }: FormTextInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  return (
    <>
      <TextField
        {...field}
        value={field.value || ""}
        required={required}
        fullWidth
        error={!!error}
        placeholder={placeholder}
        InputProps={{
          inputProps: {
            "data-testid": `input-text-${name}`,
          },
        }}
      />
      {error && <FieldErrorMessage data-testid={`error-field-${name}`}>{error}</FieldErrorMessage>}
    </>
  );
};

export default FormTextInput;
