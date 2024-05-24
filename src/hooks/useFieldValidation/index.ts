import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FieldValues, UseFormSetError,Path } from 'react-hook-form';

const useFieldValidation = <T extends FieldValues>(
  fieldName: Path<T>,
  value: unknown,
  validateFn: (value: any) => string | null,
  setError: UseFormSetError<T>
) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const t = useTranslations('Common');

  useEffect(() => {
    const errorKey = validateFn(value);
    if (errorKey) {
      //ts-ignore-next-line
      setError(fieldName , { type: 'validate', message: t(errorKey) });
      setIsValid(false);
    } else {
      setError(fieldName, { type: '', message: '' });
      setIsValid(true);
    }
  }, [value, fieldName, validateFn, setError, t]);

  return isValid;
};

export default useFieldValidation;