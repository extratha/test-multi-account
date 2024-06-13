export type normalRange = {
  value: string;
  description: string;
};

export type Field = {
  key: string;
  value: string;
  unit: string;
  required: boolean;
  fieldType: string;
  minLength?: string;
  maxLength?: string;
  dropdownValue?: string[];
  range: normalRange[];
  placeholder?: string;
};

export type Group = {
  groupName: string;
  data: Field[];
};

export type FieldConfig = Group[];
