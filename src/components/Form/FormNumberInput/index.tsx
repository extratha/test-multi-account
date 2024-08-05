import { TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { FieldErrorMessage } from "../FieldErrorMessage";

export interface FormNumberInputProps {
  name: string;
  placeholder?: string;
  required?: boolean;
  decimalScale?: number;
  min?: number;
  max?: number;
}

const FormNumberInput = ({ name, placeholder, decimalScale, min, max }: FormNumberInputProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const value = field.value || "";
  const error = fieldState.error?.message || "";

  return (
    <>
      <TextField
        {...field}
        value={value}
        fullWidth
        error={!!error}
        placeholder={placeholder}
        inputProps={{
          min,
          max,
          step: decimalScale ? 1 / Math.pow(10, decimalScale) : 1,
          "data-testid": `input-number-${name}`,
        }}
      />
      {error && (
        <FieldErrorMessage color="error.light" data-testid={`error-field-${name}`}>
          {error}
        </FieldErrorMessage>
      )}
    </>
  );
};

export default FormNumberInput;
