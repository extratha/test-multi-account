import "@testing-library/jest-dom";
import "jest-canvas-mock";

import "../__mocks__/MockFirebase";
import { MockImage } from "../__mocks__/NextImage";

jest.mock("next/navigation", () => require("next-router-mock"));
jest.mock("next/image", () => MockImage);

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
jest.setTimeout(100000);
