import { CUSTOM_COLORS } from "@/config/config-mui/theme/colors";
import { FormControlLabel, Checkbox as MuiCheckbox, styled, Typography } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

const Checkbox = styled(MuiCheckbox)({
  color: CUSTOM_COLORS.checkboxText
})

export interface FormCheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
}

const FormCheckbox = ({ name, label, disabled }: FormCheckboxProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <FormControlLabel
      disabled={disabled}
      data-testid={`${name}-checkbox`}
      control={
        <Checkbox
          checked={field.value}
          {...field}
          data-testid={`${name}-checkbox-item-button`}
          // @ts-ignore
          inputProps={{ "data-testid": `${name}-checkbox-value` }}
        />
      }
      label={
        <Typography variant="bodyLargeSemiBold" data-testid={`${name}-checkbox-label`} color={CUSTOM_COLORS.checkboxText}>
          {label}
        </Typography>
      }
    />
  );
};

export default FormCheckbox;
