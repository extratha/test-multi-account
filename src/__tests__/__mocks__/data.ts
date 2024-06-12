import { ExampleData } from "@/types/aiInterpret";

export const mockLoginResponse = {
  accessToken: 'mockAccessToken',
  refreshToken: 'mockRefreshToken',
  user: {
    id: 'mockUserId',
    email: 'test@example.com',
    passwordChanged: true,
  },
  userProfile: {
    ID: 'mockUserProfileId',
    userID: 'mockUserId',
    email: 'test@example.com',
    prefix: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
    corporate: 'Example Corp',
    isActive: true,
  },
};

export const MOCK_ACCESS_TOKEN = 'TOKENTOKENTOKEN'

export const mockExampleDataList : ExampleData[] = [
  {
    id: '1',
    caseName: 'Example Case 1',
    gender: 'male',
    age: '30',
    aiModelVersion: '1.0.0',
  },
  {
    id: '2',
    caseName: 'Example Case 2',
    gender: 'female',
    age: '25',
    aiModelVersion: '1.0.1',
  },
];
