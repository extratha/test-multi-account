export interface ExampleDataResult {
  id: string;
  caseName: string;
  gender: string;
  age: string;
  aiModelVersion: string;
}
export interface GroupName {
  groupName: string;
  data: InputData[];
}

export interface InputData {
  key: string;
  value: string;
  unit: string;
  range: ValueDescription[];
}

export interface ValueDescription {
  value: string;
  description: string;
}

interface AiResult {
  transactionID: string;
  version: string;
  timeStamp: string;
  data: InformationValue[];
}

interface InformationValue {
  title: string;
  description: string;
}

export interface InterpretResult {
  id: string;
  caseName: string;
  inputData: GroupName[];
  aiResult: AiResult;
  gender: string;
  age: string;
  ranking: number;
  aiModelVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface LAB_GROUP {
  group: string;
  value: string[];
}

