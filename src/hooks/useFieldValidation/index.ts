import { useTranslations } from 'next-intl';
import { FieldValues, Path, useController, Control, UseFormSetError } from 'react-hook-form';

const useFieldValidation = <T extends FieldValues>(
  control: Control<T>,
  fieldName: Path<T>,
  validateFn: (value: any) => string | null,
  setError: UseFormSetError<T>,
) => {
  const t = useTranslations('Common');

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error , isDirty},
  } = useController({
    name: fieldName,
    control,
  });
  return {
    isValid: error?.message?.length && error?.message.length > 0 ? false : true,
    value,
    onChange: (e: any) => {
      setError(fieldName, { type: '', message: '' });
      const errorKey = validateFn(e.target.value)
      if (errorKey) {
        setError(fieldName, { type: 'validate', message: t(errorKey) });
      }
      onChange(e.target.value);
      onBlur();
    },
    onBlur,
    isDirty,
    ref,
    errorMessage: error?.message || '',
  };
};

export default useFieldValidation;