export interface normalRange {
  value: string;
  description: string;
}

export interface Field {
  key: string;
  value: string;
  unit: string;
  required: boolean;
  fieldType: string;
  maxLength?: string;
  minValue: string;
  maxValue: string;
  dropdownValue?: string[];
  range: normalRange[];
  placeholder?: string;
}

export interface Group {
  groupName: string;
  data: Field[];
}

export type FieldConfig = Group[];
