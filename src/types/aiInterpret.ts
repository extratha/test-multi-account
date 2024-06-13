export interface ExampleDataResult {
  id: string;
  caseName: string;
  gender: string;
  age: string;
  aiModelVersion: string;
}

export interface InterpretResult {
  id: string;
  caseName: string;
  inputData: any[];
  aiResult: AiResult;
  gender: string;
  age: string;
  ranking: number;
  aiModelVersion: string;
  createdAt: string;
  updatedAt: string;
}

interface AiResult {
  transactionID: string;
  version: string;
  timeStamp: string;
  data: informationValue[];
}

interface informationValue {
  title: string;
  description: string;
}
