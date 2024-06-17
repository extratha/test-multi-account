jest.mock("firebase/app", () => ({
  getApps: jest.fn().mockReturnValue([]),
  initializeApp: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));

jest.mock("firebase/remote-config", () => ({
  getRemoteConfig: jest.fn(() => ({ settings: { minimumFetchIntervalMillis: 60000 } })),
  fetchAndActivate: jest.fn().mockResolvedValue(""),
  getValue: jest.fn().mockReturnValue({ asString: jest.fn().mockReturnValue("[]") }),
}));
