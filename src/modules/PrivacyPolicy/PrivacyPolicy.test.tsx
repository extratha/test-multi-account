import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { mockPrivacyPolicyData } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { webPaths } from "@/constant/webPaths";
import { spyUseRouter, SpyUseRouter } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import axiosInstance from "@/utils/axios";
import PrivacyPolicyModule from ".";

describe("PrivacyPolicyModule", () => {
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spyRouter = spyUseRouter();

    jest.spyOn(Api, "getPrivacyPolicy");
    jest.spyOn(Api, "submitConsent");

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.PRIVACY_POLICY).reply(200, mockPrivacyPolicyData);
    mockApiAdapter.onPost(API.CONSENT).reply(201);
  });

  const renderPrivacyPolicy = async () => {
    const view = render(<PrivacyPolicyModule />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderPrivacyPolicy();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should submit consent and navigate to Home page when submit privacy policy agreement success", async () => {
    await renderPrivacyPolicy();

    await userEvent.click(screen.getByTestId("agreement-checkbox"));

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();

    await userEvent.click(screen.getByTestId("submit-button"));

    expect(Api.submitConsent).toHaveBeenCalledTimes(1);
    expect(spyRouter.replace).toHaveBeenCalledWith(webPaths.home);
  });

  it("should redirect to Home page when consent is submitted", async () => {
    mockApiAdapter.onGet(API.PRIVACY_POLICY).reply(200, { ...mockPrivacyPolicyData, isConsent: true });

    await renderPrivacyPolicy();

    expect(spyRouter.replace).toHaveBeenCalledWith(webPaths.home);
  });

  it("should not display consent when fetch consent error", async () => {
    mockApiAdapter.onGet(API.PRIVACY_POLICY).networkError();

    await renderPrivacyPolicy();

    expect(screen.queryByTestId("privacy-policy-consent")).not.toBeInTheDocument();
  });

  it("should not navigate to Home page when submit consent error", async () => {
    mockApiAdapter.onPost(API.CONSENT).networkError();

    await renderPrivacyPolicy();

    await userEvent.click(screen.getByTestId("agreement-checkbox"));
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(spyRouter.push).not.toHaveBeenCalled();
  });
});
