import { DataTypes, isDataTypes } from '@/types/base';
export const getFormatCurrency = (
  value: DataTypes | Record<string, any>,
  digits?: number,
) => {
  if (!value || !isDataTypes(value) || typeof value === 'boolean') value = 0;
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const fractionDigits =
    digits === undefined ? (Number.isInteger(numericValue) ? 0 : 2) : digits;
  if (!isNaN(numericValue)) {
    return numericValue.toLocaleString('th-TH', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  } else {
    return value;
  }
};
