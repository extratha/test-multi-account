export interface normalRange {
  value: string;
  description: string;
}

export interface InputDataConfig {
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

export interface InputGroupConfig {
  groupName: string;
  data: InputDataConfig[];
}

interface FieldValuesForSubmit {
  key: string;
  value: unknown;
  unit: string;
  range: normalRange[];
}
interface LabInfoType {
  groupName: string;
  data: FieldValuesForSubmit[];
}
export interface SubmitHealthDataType {
  labInfo: LabInfoType[];
}
