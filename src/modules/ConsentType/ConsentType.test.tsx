import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { mockPrivacyPolicyData, mockTermsAndConsData } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { apiAxios } from "@/api/api";
import { CONSENT_TYPE } from "@/constant";
import { spyUseParams, spyUseRouter, SpyUseRouter } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import ConsentType, { ConsentTypeParams } from ".";

describe("ConsentType", () => {
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;
  let params: ConsentTypeParams;

  beforeEach(() => {
    params = { consentType: CONSENT_TYPE.TERMS_CONDITIONS };

    spyUseParams(params);
    spyRouter = spyUseRouter();

    jest.spyOn(Api, "getConsent");
    jest.spyOn(Api, "submitConsent");

    mockApiAdapter = new MockAdapter(apiAxios);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).reply(200, mockTermsAndConsData);
    mockApiAdapter.onGet(API.PRIVACY_POLICY).reply(200, mockPrivacyPolicyData);
    mockApiAdapter.onPost(API.CONSENT).reply(201);
  });

  const renderConsentType = async () => {
    const view = render(<ConsentType />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderConsentType();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display consent when fetch consent error", async () => {
    mockApiAdapter.onGet(API.PRIVACY_POLICY).networkError();

    await renderConsentType();

    expect(screen.queryByTestId("privacy-policy-consent")).not.toBeInTheDocument();
  });

  it("should not navigate to Home page when submit consent error", async () => {
    mockApiAdapter.onPost(API.CONSENT).networkError();

    await renderConsentType();

    await userEvent.click(screen.getByTestId("agreement-checkbox"));
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(spyRouter.push).not.toHaveBeenCalled();
  });
});
