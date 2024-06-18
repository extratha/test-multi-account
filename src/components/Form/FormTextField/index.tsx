import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { FieldErrorMessage } from "../FieldErrorMessage";

export interface FormTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

const FormTextField = ({ name, label, required, maxLength }: FormTextFieldProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const error = fieldState.error?.message || "";

  const t = useTranslations("Common");

  return (
    <>
      <TextField
        {...field}
        value={field.value}
        required={required}
        fullWidth
        error={!!error}
        placeholder={t("placeholder.enterValue")}
        InputProps={{
          inputProps: {
            "data-testid": `input-text-${name}`,
          },
        }}
      />
      {error && (
        <FieldErrorMessage data-testid={`error-field-${name}`} variant="bodyLarge">
          {error}
        </FieldErrorMessage>
      )}
    </>
  );
};

export default FormTextField;
