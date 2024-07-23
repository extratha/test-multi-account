import "@testing-library/jest-dom";
import "jest-canvas-mock";

import "@/__mocks__/Markdown";
import "@/__mocks__/MockFirebase";
import "@/__mocks__/NextImage";
import { LOCALE_LANGUAGE } from "@/config";
import { initI18next } from "@/locales/i18n";
import locale from "@/locales/th.json";

initI18next(LOCALE_LANGUAGE.TH, locale);

jest.mock("@/api/api", () => {
  const actualModule = jest.requireActual("@/api/api");
  return { ...actualModule, __esModule: true };
});

jest.mock("@/api/apiUnauthorize", () => {
  const actualModule = jest.requireActual("@/api/apiUnauthorize");
  return { ...actualModule, __esModule: true };
});

jest.mock("next/config", () => () => ({
  setConfig: jest.fn(),
  publicRuntimeConfig: {
    apiToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY2NzUzNDQsImlhdCI6MTcwNjU4ODk0NCwicHJvZmlsZUlkIjoiZDU1YWY3NDUtOTYyZS00MTk2LTkyOTEtZDg2YTliYWNiZWY2In0.sNgwYjIGLYEVAptqILGgRVGXwt9FCPKHRubEZyaodhg",
    mockBaseApiUrl: "https://www.mock-playground-dashboard.co.th",
    baseApiUrl: "https://www.mock-playground-dashboard.co.th",
    globalEndpoint: "playground-dashboard",
    publicApiHost: "http://localhost:3000/",
  },
}));

jest.mock("cookies-next", () => ({
  __esModule: true,
  ...jest.requireActual("cookies-next"),
  getCookie: jest.fn().mockReturnValue("MOCK_ACCESS_TOKEN"),
}));
