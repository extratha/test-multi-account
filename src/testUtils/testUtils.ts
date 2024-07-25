import { act, render as testRender } from "@testing-library/react";
import dayjs from "dayjs";
import flushPromises from "flush-promises";
import { ReactElement } from "react";

import { TestProvider } from "./TestProvider";

export const API = {
  LOGIN: "/auth/login",
  EXAMPLE_AI_INTERPRET_URL: "/lab/examples/labId",
  GET_LAB_INTERPRETS_ID_URL: "/lab/interprets/labId",
  SUBMIT_LAB_INTERPRETS_URL: "/lab/interprets",
  CONSENT: "/consents",
  TERMS_AND_CONDITIONS: "/consents/terms-conditions",
  TERMS_AND_CONDITIONS_LATEST: "/consents/terms-conditions/latest",
  PRIVACY_POLICY: "/consents/privacy-policies",
  PRIVACY_POLICY_LATEST: "/consents/privacy-policies/latest",
  PUBLIC_TERMS_CONDITIONS: "/consents/terms-conditions/public",
  PUBLIC_PRIVACY_POLICIES: "/consents/privacy-policies/public",
};

export const render = (ui: ReactElement) => {
  return testRender(ui, { wrapper: TestProvider });
};

export const flushPromise = async () => {
  await act(async () => {
    await flushPromises();
  });
};

export const advanceTimersByTime = async (time: number) => {
  await act(async () => {
    jest.advanceTimersByTime(time);
  });
};

export const setMockDate = (date: string) => {
  jest.setSystemTime(dayjs(date).valueOf());
};
