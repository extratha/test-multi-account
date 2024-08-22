// import { CUSTOM_COLORS } from "@/config/config-mui/theme/colors";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

export interface FormCheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const FormCheckbox = ({ name, label, disabled, className }: FormCheckboxProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      disabled={disabled}
      data-testid={`${name}-checkbox`}
      control={
        <Checkbox
          {...field}
          checked={field.value}
          data-testid={`${name}-checkbox-item-button`}
          // @ts-ignore
          inputProps={{ "data-testid": `${name}-checkbox-value` }}
        />
      }
      label={<Typography data-testid={`${name}-checkbox-label`}>{label}</Typography>}
      className={className}
    />
  );
};

export default FormCheckbox;
