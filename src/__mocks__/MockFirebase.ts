import { mockInputFieldConfig } from "./data";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/remote-config", () => ({
  getRemoteConfig: jest.fn().mockReturnValue({ settings: {} }),
  fetchAndActivate: jest.fn().mockResolvedValue(""),
  getValue: jest.fn().mockReturnValue({
    asString: () => mockInputFieldConfig,
  }),
}));
