import { JSX } from 'react';
export type DataTypes = string | number | boolean | null | undefined;
export const isDataTypes = (value: any): value is DataTypes => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === null ||
    typeof value === undefined
  );
}
