import { ExampleDataResult, InterpretResult } from "@/types/aiInterpret";

export const mockLoginResponse = {
  accessToken: "mockAccessToken",
  refreshToken: "mockRefreshToken",
  user: {
    id: "mockUserId",
    email: "test@example.com",
    passwordChanged: true,
  },
  userProfile: {
    ID: "mockUserProfileId",
    userID: "mockUserId",
    email: "test@example.com",
    prefix: "Mr.",
    firstName: "John",
    lastName: "Doe",
    corporate: "Example Corp",
    isActive: true,
  },
};

export const MOCK_ACCESS_TOKEN = "TOKENTOKENTOKEN";

export const mockExampleDataList: ExampleDataResult[] = [
  {
    id: "1",
    caseName: "Example Case 1",
    gender: "male",
    age: "30",
    aiModelVersion: "1.0.0",
  },
  {
    id: "2",
    caseName: "Example Case 2",
    gender: "female",
    age: "25",
    aiModelVersion: "1.0.1",
  },
];

export const mockAiInterpretResult: InterpretResult = {
  id: "mock_id",
  caseName: "case name",
  inputData: [
    {
      transactionID: "123",
      version: "1.0.1",
      timeStamp: "1715923651355",
      data: {
        title: "title-input-data",
        description: "description-input-data",
      },
    },
  ],
  aiResult: {
    transactionID: "mock tid",
    version: "1.0.0",
    timeStamp: "",
    data: [
      {
        title: "title-ai-result",
        description: "description-ai-result",
      },
    ],
  },
  gender: "Male",
  age: "29",
  ranking: 1,
  aiModelVersion: "1.0.0",
  createdAt: "",
  updatedAt: "",
};
