export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginUserData {
  id: string;
  email: string;
  passwordChanged: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginUserProfileData {
  ID: string;
  userID: string;
  email: string;
  prefix: string;
  firstName: string;
  lastName: string;
  corporate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: LoginUserData;
  userProfile: LoginUserProfileData;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface SetNewPasswordRequest {
  passwordResetToken: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export interface ExampleDataResult {
  id: string;
  caseName: string;
  gender: string;
  age: string;
  aiModelVersion: string;
}

interface InputDataRage {
  value: string;
  description: string;
}

export interface InputData {
  key: string;
  value: string;
  unit: string;
  range: InputDataRage[];
}

export interface InputDataResult {
  groupName: string;
  data: InputData[];
}

interface AiData {
  title: string;
  description: string;
}

interface AiResult {
  transactionID: string;
  version: string;
  timeStamp: string;
  data: AiData[];
}

export interface InterpretResult {
  id: string;
  caseName: string;
  inputData: InputDataResult[];
  aiResult: AiResult;
  gender: string;
  age: string;
  ranking: number;
  aiModelVersion: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

export interface SubmitLabInterpretsResult {
  transactionID: string;
}

interface FieldValuesForSubmit {
  key: string;
  value: unknown;
  unit: string;
  range: normalRange[];
}

interface LabInfoData {
  groupName: string;
  data: FieldValuesForSubmit[];
}

export interface SubmitLabInterpretsRequest {
  labInfo: LabInfoData[];
}

interface ConsentService {
  title: string;
  logo: string;
  content: string;
}

export interface ConsentData {
  content: string;
  services: ConsentService[];
}

export interface ConsentResult {
  isConsent: boolean;
  version: string;
  consent: ConsentData;
}

export interface ConsentResultLatest {
  version: string;
  consent: ConsentData;
}
