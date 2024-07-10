import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { mockTermsAndConsData } from "@/__mocks__/data";
import * as Api from "@/api/api";
import { webPaths } from "@/constant/webPaths";
import { spyUseRouter, SpyUseRouter } from "@/testUtils/navigation";
import { API, flushPromise, render } from "@/testUtils/testUtils";
import axiosInstance from "@/utils/axios";
import TermsAndConsModules from ".";

describe("TermsAndConditions", () => {
  let mockApiAdapter: MockAdapter;
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spyRouter = spyUseRouter();

    jest.spyOn(Api, "getTermsAndConditions");
    jest.spyOn(Api, "submitConsent");

    mockApiAdapter = new MockAdapter(axiosInstance);
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).reply(200, mockTermsAndConsData);
    mockApiAdapter.onPost(API.CONSENT).reply(201);
  });

  const renderTermsAndCons = async () => {
    const view = render(<TermsAndConsModules />);
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderTermsAndCons();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should submit consent and navigate to Home page when submit terms and cons agreement success", async () => {
    await renderTermsAndCons();

    await userEvent.click(screen.getByTestId("agreement-checkbox"));

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();

    await userEvent.click(screen.getByTestId("submit-button"));

    expect(Api.submitConsent).toHaveBeenCalledTimes(1);
    expect(spyRouter.push).toHaveBeenCalledWith(webPaths.privacyPolicy);
  });

  it("should not display consent when fetch consent error", () => {
    mockApiAdapter.onGet(API.TERMS_AND_CONDITIONS).networkError();

    renderTermsAndCons();

    expect(screen.queryByTestId("terms-and-conditions-consent")).not.toBeInTheDocument();
  });
});
